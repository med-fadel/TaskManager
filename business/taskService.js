const uuidv4 = require('uuid/v4');
var taskDao = require('../dao/taskDao');

var taskService = function () { }

taskService.saveTask = function (task, cb) {
    var taskResponse = {
        success: true,
        errorCodeSet: []
    };
    
    if ("undefined" === typeof task.id) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'ID_UNDEFINED'
        });
    }
    if ("undefined" === typeof task.tagID) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'TAG_ID_UNDEFINED'
        });
    }
    if ("undefined" === typeof task.label) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'LABEL_UNDEFINED'
        });
    }
    if ("undefined" === typeof task.done) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'STATE_UNDEFINED'
        });
    }
    if (taskResponse.success === false) cb(taskResponse);
    else{
        taskDao.insertTask(task, function (res) {
            if (res.result.ok === 1) {
                var taskResponse = {
                    success: true,
                    errorCodeSet: []
                };
                cb(taskResponse);
            } else {
                var taskResponse = {
                    success: false,
                    errorCodeSet: []
                };
                cb(taskResponse);
            }
        });
    }  
}

taskService.saveTasks = function (taks, cb) {
    taskDao.insertTasks(taks, function (res) {
        if (res.result.ok === 1) {
            var taskResponse = {
                success: true,
                errorCodeSet: []
            };
            cb(taskResponse);
        } else {
            var taskResponse = {
                success: false,
                errorCodeSet: []
            };
            cb(taskResponse);
        }
    });
}

taskService.findTagsTasks = function (tagID, cb) {
    var taskResponse = {
        success: true,
        errorCodeSet: []
    };
    
    if ("undefined" === typeof tagID) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'TAG_ID_UNDEFINED'
        });
    }
    if (taskResponse.success === false) cb(taskResponse);
    else{
        taskDao.getTagsTasks(tagID, function (res) {
            cb(res);
        });
    }
}

taskService.findTagsDoneTasks = function (tagID, cb) {
    var taskResponse = {
        success: true,
        errorCodeSet: []
    };
    
    if ("undefined" === typeof tagID) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'TAG_ID_UNDEFINED'
        });
    }
    if (taskResponse.success === false) cb(taskResponse);
    else{
        taskDao.getTagsDoneTasks(tagID, function (res) {
            cb(res);
        });
    }
}

taskService.findTagsNotDoneTasks = function (tagID, cb) {
    var taskResponse = {
        success: true,
        errorCodeSet: []
    };
    
    if ("undefined" === typeof tagID) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'TAG_ID_UNDEFINED'
        });
    }
    if (taskResponse.success === false) cb(taskResponse);
    else{
        taskDao.getTagsNotDoneTasks(tagID, function (res) {
            cb(res);
        });
    }
}

taskService.removeTask = function (taskID, cb) {
    var taskResponse = {
        success: true,
        errorCodeSet: []
    };
    
    if ("undefined" === typeof taskID) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'TASK_ID_UNDEFINED'
        });
    }
    if (taskResponse.success === false) cb(taskResponse);
    else{
        taskDao.deleteTask(taskID, function (res) {
            if (res > 0) {
                var taskResponse = {
                    success: true,
                    errorCodeSet: []
                };
                cb(taskResponse);
            }
            else {
                var taskResponse = {
                    success: false,
                    errorCodeSet: []
                };
                cb(taskResponse);
            }
        });
    }
}

taskService.setTaskDone = function (taskID, cb) {
    var taskResponse = {
        success: true,
        errorCodeSet: []
    };
    
    if ("undefined" === typeof taskID) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'TASK_ID_UNDEFINED'
        });
    }
    if (taskResponse.success === false) cb(taskResponse);
    else{
        taskDao.updateDoneTask(taskID, function (res) {
            if (res !== null) {
                var taskResponse = {
                    success: true,
                    errorCodeSet: []
                };
                cb(taskResponse);
            }
            else {
                var taskResponse = {
                    success: false,
                    errorCodeSet: []
                };
                cb(taskResponse);
            }
        });
    }
}

taskService.setTaskNotDone = function (taskID, cb) {
    var taskResponse = {
        success: true,
        errorCodeSet: []
    };
    
    if ("undefined" === typeof taskID) {
        taskResponse.success = false;
        taskResponse.errorCodeSet.push({
            code: 'TASK_ID_UNDEFINED'
        });
    }
    if (taskResponse.success === false) cb(taskResponse);
    else{
        taskDao.updateNotDoneTask(taskID, function (res) {
            if (res !== null) {
                var taskResponse = {
                    success: true,
                    errorCodeSet: []
                };
                cb(taskResponse);
            }
            else {
                var taskResponse = {
                    success: false,
                    errorCodeSet: []
                };
                cb(taskResponse);
            }
        });
    }
}

taskService.saveTag = function (tag, cb) {
    var tagResponse = {
        success: true,
        errorCodeSet: []
    };
    if ("undefined" === typeof tag.id) {
        tagResponse.success = false;
        tagResponse.errorCodeSet.push({
            code: 'ID_UNDEFINED'
        });
    }
    if ("undefined" === typeof tag.userID) {
        tagResponse.success = false;
        tagResponse.errorCodeSet.push({
            code: 'USER_ID_UNDEFINED'
        });
    }
    if ("undefined" === typeof tag.label) {
        tagResponse.success = false;
        tagResponse.errorCodeSet.push({
            code: 'LABEL_UNDEFINED'
        });
    }
    if ("undefined" === typeof tag.descr) {
        tagResponse.success = false;
        tagResponse.errorCodeSet.push({
            code: 'DESCRIPTION_UNDEFINED'
        });
    }

    if (tagResponse.success === false) cb(tagResponse);
    else{
        taskDao.insertTag(tag, function (res) {
            if (res.result.ok === 1) {
                var tagResponse = {
                    success: true,
                    errorCodeSet: []
                };
                cb(tagResponse);
            } else {
                var tagResponse = {
                    success: false,
                    errorCodeSet: []
                };
                cb(tagResponse);
            }
        });
    }
}

taskService.findUsersTags = function (userID, cb) {
    var tagResponse = {
        success: true,
        errorCodeSet: []
    };
    if ("undefined" === typeof userID) {
        tagResponse.success = false;
        tagResponse.errorCodeSet.push({
            code: 'USER_ID_UNDEFINED'
        });
    }
    if (tagResponse.success === false) cb(tagResponse);
    else{
        taskDao.getUsersTags(userID, function (res) {
            cb(res);
        });
    }
}

module.exports = taskService;