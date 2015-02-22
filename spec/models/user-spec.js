describe("Model: User", function () {

    var mongoose = require('mongoose');
    var constants = require('../../server/config/constants');
    var User = require('../../server/models/user');
    var validUser;

    beforeAll(function (done) {
        mongoose.connect('mongodb://127.0.0.1:27017/' + constants.TEST_DB_NAME, function (err) {
            if (err) throw new Error('Test stopped due to mongoose failing to connect. \n' + err);
            done();
        });
    });

    beforeEach(function () {
        validUser = new User({
            firstName: "Jim",
            lastName: "Clark",
            email: "email@jim-clark.com",
            password: "abc123"
        });
    });

    afterAll(function (done) {
        // delete any created users in carf_test db
        User.remove({});
        mongoose.disconnect(done);
    });

    it("mongoose should be connected", function () {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it("should be a valid user", function (done) {
        validUser.validate(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should be invalid without a firstName", function (done) {
        validUser.firstName = null;
        validUser.validate(function (err) {
            expect(err).not.toBeUndefined();
            done();
        });
    });

    it("should have a fullName virtual field", function () {
        expect(validUser.fullName).toBe('Jim Clark');
    });



});

