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
        type: String,
        required: true,
        index: { unique: true },
    //     // sample validation
    //     validate: [
    //         function (val) { return true; },
    //         'Not a valid email format'
    //     ]
    },
    isAdmin: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    forcePasswordReset: { type: Boolean, default: true },
    password: { type: String, select: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

UserSchema.methods.authenticate = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

UserSchema.pre('save', function (next) {
    var user = this;

    // hash the password only if the user is new or password has been changed
    if (!user.isModified('password')) return next();

    // update the password with a hash
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

// return the model
module.exports = mongoose.model('User', UserSchema);

/* need to add method for created_at field: return ObjectId(_id).getTimestamp() */


// class User
//   include Mongoid::Document
//   include Mongoid::Timestamps
//   include ActiveModel::SecurePassword

//   before_update :check_password

//   has_secure_password

//   field :first_name, type: String
//   field :last_name, type: String
//   field :email, type: String
//   field :admin?, type: Boolean, default: false
//   field :can_edit?, type: Boolean, default: true
//   field :active?, type: Boolean, default: true
//   field :reset_password?, type: Boolean, default: true
//   field :password_digest, type: String

//   validates :first_name, :last_name, :email, presence: true
//   validates :email, uniqueness: true
//   validates :password ,length: { minimum: 2 }, :on => :create
//   validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message => "is not a valid email address"
//   validates :password, confirmation: true

//   def full_name
//     "#{self.first_name} #{self.last_name}"
//   end

//   private

//   def check_password
//     is_ok = self.password.nil? || self.password.empty? || self.password.length >= 2
//     self.errors[:password] << "Password is too short (minimum is 2 characters)" unless is_ok
//     return is_ok
//   end

// end