routingApp.factory('taskService', ['$http', function ($http) {
    var taskService = {};

    //To save task in SILO
    taskService.saveTask = function (task) {
        $http.post('/savetask', { task: task }).then(function (response) {
        });
    }

    //Get all tasks from SILO
    taskService.getTasks = function (tagID, cb) {
        $http.post('/getTasks', { tagID: tagID, done: 'all' }).then(function (response) {
            //console.log(response);
            //var res = JSON.parse(response.data);
            cb(response.data);
        });
    }

    //Get all done tasks from SILO
    taskService.getDoneTasks = function (tagID, cb) {
        $http.post('/getTasks', { tagID: tagID, done: 'true' }).then(function (response) {
            //console.log(response);
            //var res = JSON.parse(response.data);
            cb(response.data);
        });
    }

    //Get all not done tasks from localStorage
    taskService.getNotDoneTasks = function (tagID, cb) {
        $http.post('/getTasks', { tagID: tagID, done: 'false' }).then(function (response) {
            //console.log(response);
            //var res = JSON.parse(response.data);
            cb(response.data);
        });
    }

    //make the task done
    taskService.setTaskDone = function (id) {
        $http.post('/updateTask', { taskID: id, done: 'true' }).then(function (response) {

        });
    }

    //make the task not done
    taskService.setTaskNotDone = function (id) {
        $http.post('/updateTask', { taskID: id, done: 'false' }).then(function (response) {

        });
    }

    //delete a task from SILO
    taskService.deleteTask = function (id) {
        $http.post('/removeTask', { taskID: id }).then(function (response) {
        });

    }

    //To save tag in SILO
    taskService.saveTag = function (tag) {
        $http.post('/savetag', { tag: tag }).then(function (response) {

        });
    }

    //Get all tags from SILO
    taskService.getTags = function (cb) {
        var userID = localStorage.getItem('userID');
        $http.post('/getTags', { userID: userID }).then(function (response) {
            //console.log(response);
            //var res = JSON.parse(response.data);
            cb(response.data);
        });
    }

    return taskService;

}]);