var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

/*
    Exports a User mongoose model
*/

var UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String, required: true, index: { unique: true },
        validate: function (val) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(val);
        },
    },
    isAdmin: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    forcePasswordReset: { type: Boolean, default: true },
    password: { type: String,
        validate: function (val) {
            return !val ? true : val.length > 3;
        }
    },
    token: { type: String, index: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

UserSchema.methods.verifyPassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isNew && !user.isModified('password')) {
        // default password to be string left of the @ in the user's email
        user.password = user.email.split('@')[0];
    }
    // hash the password only if the user is new or password has been changed
    if (user.isModified('password')) {
        // update the password with a hash
        bcrypt.hash(user.password, null, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            return next();
        });
    } else {
        return next();
    }
});

UserSchema.pre('save', function (next) {
    if (this.isModified('isAdmin') && this.isAdmin) this.canEdit = true;
    return next();
});

UserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret.id;
        delete ret._id;
        delete ret.password;
        delete ret.token;
    }
});

// return the model
module.exports = mongoose.model('User', UserSchema);
