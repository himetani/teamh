'use strict';

angular.module('teamhApp')
.controller('AddtaskCtrl', function ($scope, $filter, socket, $http, modal) {
    $scope.isCollapsed = true;

    //Date Picker
    //
    $scope.today = function() {
        $scope.dt = null;
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
    //
    //Date Picker

    var FormSetter = function () {
        var form = {
            taskName    : null,
            creatorName : null,
            createdTime : null,
            term        : null,
            timeLimit   : null,
            assignedName: null,
            point       : null
        };
        return form;
    };

    var TestCreator = function () {
        var form = {
            taskName    : 'オフィスの整理',
            creatorName : '塚本',
            createdTime : '2014/11/1',
            term        : '30',
            timeLimit   : '2014/11/25',
            point       : 10
        };
        return form;
    };


    var test = new TestCreator();

    $scope.tasks = new Array();
    $scope.tasks.push(test);

    $scope.users = ['塚本','合原','松岡'];
    //$scope.auth = $scope.auth == 'owner' ? true : false;

    $scope.submit = function (event) {
        event.preventDefault();
        var timeLimit = $filter('date')($scope.form.timeLimit, 'yyyy/MM/dd');
        $scope.form.timeLimit = timeLimit;
        $scope.form.creatorName = $scope.user;
        $scope.form.createdTime = $filter('date')(new Date(), 'yyyy/MM/dd');
        $scope.tasks.push($scope.form);
        socket.emit('add', $scope.form);
        $scope.form = new FormSetter();
    };

    socket.on('receive', function (data) {
        $scope.tasks.push(data);
    });

    socket.on('point', function (data) {
        //console.log(data);
        $scope.tasks[data.index].point = data.newVal;
    });
  
    /*
    $http({
        method: 'POST',
        url:'http://192.168.100.102:8888/all.php',
        data:$.param({user: {id: 1234}}),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

        }
    }).success(function (data) {
        console.log(data);
    }).error(function (error) {
        console.log(error);
    });
*/    

    $scope.edit = function (index) {
        $scope.index = index; 
        modal.openModal($scope);    
    };
});
