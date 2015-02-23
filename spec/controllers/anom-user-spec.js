describe("Controller: anom_user", function () {

    var request = require('request');
    var User = require('../../server/models/user');
    var app, newUser;
    var baseUrl = 'http://localhost:8080/';

    beforeAll(function (done) {
        process.env.NODE_ENV = 'test';
        app = require('../../server');
        // server.js will call this ready callback after it's ready and listening...
        app.ready = function () {
            newUser = new User({
                firstName: "Johnny",
                lastName: "Carson",
                email: "johnny@carson.com"
            });
            newUser.save(function (err) {
                done();
            });
        };
    });

    afterAll(function (done) {
        // ensure disconnected so that other tests can spin up without error
        User.remove({}, function () {
            app.mongoose.disconnect(function () {
                app.server.close(function () {
                    done();
                });
            });
        });
    });

    it("respond when a request is sent to the server", function(done) {
        request(baseUrl, function (err, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    describe("POST /login", function () {
        var credentials = {
                email: 'johnny@carson.com',
                password: 'johnny'
            };
        var options = {
                method: 'POST',
                url: baseUrl + 'login',
                json: true,
                body: credentials
            };

        describe("/ login with valid credentials /", function () {
            var resData;

            beforeAll(function (done) {
                request(options, function (err, response, body) {
                    resData = body;
                    done();
                });
            });

            it("should have json with a key named 'success' set to true", function () {
                expect(resData.success).toBe(true);
            });

            it("should have json with a key named 'user' with a fullName", function () {
                expect(resData.user.fullName).toBe('Johnny Carson');
            });

            it("should not have json with a key named 'password", function () {
                expect(resData.user.password).toBeUndefined();
            });

        });  // describe "/ login with valid credentials /"

        it("should return json with a key named 'success' set to false when called with improper credentials", function (done) {
            options.body.password = 'invalid password';
            request(options, function (err, response, body) {
                expect(response.statusCode).toBe(200);
                expect(body.success).toBe(false);
                done();
            });
        });




    });  // describe "POST /login"

});