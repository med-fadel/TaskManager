    var routingApp = angular.module('routingApp', ['ngRoute']);

    routingApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'tags.html',
                    controller: 'tagsCtrl'
                })
                .when('/tasks/:tagID/:tagName', {
                    templateUrl: 'tasks.html',
                    controller: 'tasksCtrl'
                })
                .when('/login', {
                    templateUrl: 'login.html',
                    controller: 'loginCtrl'
                })
                .when('/signup', {
                    templateUrl: 'signup.html',
                    controller: 'signupCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                })
        }
    ]
    );

    routingApp.controller('tasksCtrl', ['$scope', '$location', '$routeParams', 'taskService', function ($scope, $location, $routeParams, taskService) {
        var userID = localStorage.getItem('userID');
        if (userID == null) {
            $location.path('/login');
        }

        $scope.currentTagId = $routeParams.tagID;
        $scope.tagName = $routeParams.tagName;
        $scope.showForm = true;
        
        taskService.getNotDoneTasks($scope.currentTagId, function (result) {
            $scope.taskList = result;
        });
        taskService.getDoneTasks($scope.currentTagId, function (result) {
            $scope.doneTaskList = result;
        });

        $scope.add = function () {
            var id = uuidv4();
            var newtask = {
                id: id,
                tagID: $scope.currentTagId,
                label: $scope.task,
                done: false
            }
            
            taskService.saveTask(newtask);
            taskService.getNotDoneTasks($scope.currentTagId, function (result) {
                $scope.taskList = result;
            });
            taskService.getDoneTasks($scope.currentTagId, function (result) {
                $scope.doneTaskList = result;
            });    
            $scope.task = '';
        };

        $scope.updateTask = function (id, done) {
            if(done == false){
                taskService.setTaskNotDone(id);
            }
            else taskService.setTaskDone(id);
            taskService.getNotDoneTasks($scope.currentTagId, function (result) {
                $scope.taskList = result;
            });
            taskService.getDoneTasks($scope.currentTagId, function (result) {
                $scope.doneTaskList = result;
            });
        
        };

        $scope.delete = function (id) {
            taskService.deleteTask(id);
            taskService.getNotDoneTasks($scope.currentTagId, function (result) {
                $scope.taskList = result;
            });
            taskService.getDoneTasks($scope.currentTagId, function (result) {
                $scope.doneTaskList = result;
            });
        
        };
    }]);

    routingApp.controller('tagsCtrl', ['$scope', '$location', 'taskService', function ($scope, $location, taskService) {
        var userID = localStorage.getItem('userID');
        if (userID == null) {
            $location.path('/login');
        }

        $scope.tagList = [];

        taskService.getTags(function (result) {
            $scope.tagList = result;
        });

        $scope.add = function () {
            var id = uuidv4();
            var newtag = {
                id: id,
                userID: userID,
                label: $scope.tag.label,
                descr: $scope.tag.descr,
            }
            taskService.saveTag(newtag);
            taskService.getTags(function (result) {
                $scope.tagList = result;
            });
            $scope.tag.label = "";
            $scope.tag.descr = "";
        };
    }]);

    routingApp.controller('loginCtrl', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
        $scope.login = function () {
            var error = false;

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ("undefined" === typeof $scope.email) {
                $scope.emailError = "Email vide";
                error = true;
            }else if(!re.test($scope.email)){
                $scope.emailError = "Email invalide";
                error = true;
            }
        
            var re2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
            if ("undefined" === typeof $scope.password) {
                $scope.passewordError = "Mot de passe vide";
                error = true;
            }else if(!re2.test($scope.password)){
                $scope.passewordError = "Mot de passe invalide";
                error = true;
            }
        
            
            if(!error){
            var user = {
                email: $scope.email,
                password: $scope.password
            };

            userService.login(user, function (result) {
                console.log(result);
                if (result.data.success === true) {
                    $location.path('/');
                    localStorage.setItem('userID', result.data.data.id);
                }
                else {
                    $scope.error = "ERREUR D'AUTHENTIFICATION";
                }
            });
        }
    }
    }]);


    routingApp.controller('signupCtrl', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
        $scope.signup = function () {

            var error = false;

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ("undefined" === typeof $scope.email) {
            $scope.emailError = "Email vide";
            error = true;
        }else if(!re.test($scope.email)){
            $scope.emailError = "Email invalide";
            error = true;
        }

        var re2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
        if ("undefined" === typeof $scope.password) {
            $scope.passewordError = "Mot de passe vide";
            error = true;
        }else if(!re2.test($scope.password)){
            $scope.passewordError = "Mot de passe invalide";
            error = true;
        }

        
        if(!error){
            var user = {
                email: $scope.email,
                password: $scope.password
            };

            userService.signup(user, function (result) {
                console.log(result);
                if (result.data.success === true) {
                    $location.path('/login');
                }
                else {
                    $scope.error = "ERREUR D'INSCRIPTION";
                }
            });
        }
            
        }
    }]);