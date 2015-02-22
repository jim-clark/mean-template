describe("Model: User", function () {

    var mongoose = require('mongoose');
    var constants = require('../../server/config/constants');
    var User = require('../../server/models/user');
    var validNewUser;

    beforeAll(function (done) {
        mongoose.connect('mongodb://127.0.0.1:27017/' + constants.TEST_DB_NAME, function (err) {
            if (err) throw new Error('Test stopped due to mongoose failing to connect. \n' + err);
            done();
        });
    });

    beforeEach(function () {
        validNewUser = new User({
            firstName: "Jim",
            lastName: "Clark",
            email: "email@jim-clark.com"
        });
    });

    afterAll(function (done) {
        // delete any created users in carf_test db
        // User.remove({});
        mongoose.disconnect(done);
    });

    it("mongoose should be connected", function () {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it("should be a valid user", function (done) {
        validNewUser.validate(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    describe("validation / ", function () {

        it("is invalid without a firstName", function (done) {
            validNewUser.firstName = null;
            validNewUser.validate(function (err) {
                expect(err).not.toBeUndefined();
                done();
            });
        });

        it("is invalid without a lastName", function (done) {
            validNewUser.lastName = null;
            validNewUser.validate(function (err) {
                expect(err).not.toBeUndefined();
                done();
            });
        });

        it("is valid without a password", function (done) {
            validNewUser.password = null;
            validNewUser.validate(function (err) {
                expect(err).toBeUndefined();
                done();
            });
        });

        it("is invalid with a password, if provided, with a length < 4", function (done) {
            validNewUser.password = "abc";
            validNewUser.validate(function (err) {
                expect(err).not.toBeUndefined();
                done();
            });
        });

        it("defaults isAdmin to false", function () {
            expect(validNewUser.isAdmin).toBe(false);
        });

        it("defaults canEdit to true", function () {
            expect(validNewUser.canEdit).toBe(true);
        });

        it("defaults isActive to true", function () {
            expect(validNewUser.isActive).toBe(true);
        });

        it("defaults forcePasswordReset to true", function () {
            expect(validNewUser.forcePasswordReset).toBe(true);
        });

        it("should assign a Date to createdAt", function () {
            expect(validNewUser.createdAt instanceof Date).toBe(true);
        });

        it("should assign a Date to updatedAt", function () {
            expect(validNewUser.updatedAt instanceof Date).toBe(true);
        });

        it("should have a fullName virtual field", function () {
            expect(validNewUser.fullName).toBe('Jim Clark');
        });

        describe("requires a valid email format / ", function () {
            var invalidEmails = ['abc', '@abc.com', 'abc@', 'abc@abc', 'abc@abc.a'];

            invalidEmails.forEach(function (email) {
                it(email + " should be invalid", function (done) {
                    validNewUser.email = email;
                    validNewUser.validate(function (err) {
                        expect(err).not.toBeUndefined();
                        done();                    
                    });
                });
            });

        });  // describe "requires a valid email format - "

    });  // describe "validation - "

    describe("application logic / ", function () {



        // it("sets a new user's password to the string left of the emails's @", function (done) {
        //     validNewUser.save(function (err) {
        //         expect(validNewUser.authenticate()).not.toBeUndefined();
        //         done();
        //     });
        // });

    });  // describe "business logic / "


});

