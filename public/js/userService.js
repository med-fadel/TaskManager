routingApp.factory('userService', ['$http', function ($http) {
    var userService = {};

    //login to the silo
    userService.login = function (user, cb) {

        $http.post('/login', { email: user.email, password: user.password }).then(function (response) {
            cb(response);
        });
    }

    userService.signup = function (user, cb) {

        $http.post('/signup', { email: user.email, password: user.password }).then(function (response) {
            cb(response);
        });
    }
    return userService;
}]);