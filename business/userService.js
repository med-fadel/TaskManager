var randomstring = require("randomstring");
var CryptoJS = require("crypto-js");
const uuidv4 = require('uuid/v4');
var userDao = require('../dao/userDao');

var UserService = function () { }

UserService.login = function (signinParams, cb) {

    var loginResponse = {
        success: true,
        errorCodeSet: []
    };

    //check params
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ("undefined" === typeof signinParams.email) {
        loginResponse.success = false;
        loginResponse.errorCodeSet.push({
            code: 'EMAIL_UNDEFINED'
        });
    }else if(!re.test(signinParams.email)){
        loginResponse.success = false;
        loginResponse.errorCodeSet.push({
            code: 'EMAIL_INVALID'
        });
    }

    var re2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
    if ("undefined" === typeof signinParams.password) {
        loginResponse.success = false;
        loginResponse.errorCodeSet.push({
            code: 'PASSWORD_UNDEFINED'
        });
    }else if(!re2.test(signinParams.password)){
        loginResponse.success = false;
        loginResponse.errorCodeSet.push({
            code: 'PASSWORD_INVALID'
        });
    }

    if (loginResponse.success === false) cb(loginResponse);
    else {
        userDao.getUserByEmail(signinParams.email, function (result) {
            if (result !== null) {
                var hash = CryptoJS.HmacMD5(signinParams.password, result.key);
                if (hash.toString(CryptoJS.enc.Hex) === result.password) {
                    var loginResponse = {
                        success: true,
                        errorCodeSet: [],
                        data: result
                    };

                    //return
                    cb(loginResponse);

                } else {
                    var loginResponse = {
                        success: false,
                        errorCodeSet: [{
                            code: 'EMAIL_OR_PASSWORD_WRONG'
                        }]
                    };

                    //return
                    cb(loginResponse);
                }
            } else {
                var loginResponse = {
                    success: false,
                    errorCodeSet: [{
                        code: 'EMAIL_OR_PASSWORD_WRONG'
                    }]
                };

                //return
                cb(loginResponse);
            }
        });
    }
}

UserService.createUser = function (signupParams, cb) {

    var createUserResponse = {
        success: true,
        errorCodeSet: []
    };

    //check params
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ("undefined" === typeof signupParams.email) {
        createUserResponse.success = false;
        createUserResponse.errorCodeSet.push({
            code: 'EMAIL_UNDEFINED'
        });
    }else if(!re.test(signupParams.email)){
        createUserResponse.success = false;
        createUserResponse.errorCodeSet.push({
            code: 'EMAIL_INVALID'
        });
    }

    var re2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
    if ("undefined" === typeof signupParams.password) {
        createUserResponse.success = false;
        createUserResponse.errorCodeSet.push({
            code: 'PASSWORD_UNDEFINED'
        });
    }else if(!re2.test(signupParams.password)){
        createUserResponse.success = false;
        createUserResponse.errorCodeSet.push({
            code: 'PASSWORD_INVALID'
        });
    }

    if (createUserResponse.success === false) cb(createUserResponse);
    else {
        userDao.getUserByEmail(signupParams.email, function (result) {
            if (result !== null) {
                var createUserResponse = {
                    success: false,
                    errorCodeSet: [{
                        code: 'USER_ALREADY_EXIST'
                    }]
                };
                cb(createUserResponse);
            } else {
                //create user
                //init param
                signupParams.id = uuidv4();
                signupParams.key = randomstring.generate(7);
                signupParams.password = CryptoJS.HmacMD5(signupParams.password, signupParams.key).toString(CryptoJS.enc.Hex);

                userDao.addUser(signupParams, function (addUserResponse) {
                    //prepare object response true
                    var createUserResponse = {
                        success: true,
                        errorCodeSet: [],
                        data: addUserResponse
                    };

                    //return
                    cb(createUserResponse);
                });
            }
        });
    }
}

module.exports = UserService;