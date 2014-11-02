'use strict';

angular.module('teamhApp')
.controller('AddtaskCtrl', function ($scope, $filter, socket) {
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
            taskName    : 'a',
            creatorName : 'b',
            createdTime : 'c',
            term        : 'd',
            timeLimit   : 'e',
            assignedName: 'f',
            point       : 'g'
        };
        return form;
    };


    var test = new TestCreator();

    $scope.tasks = new Array();
    $scope.tasks.push(test);

    $scope.users = ['A','B','C'];
    $scope.role = 'user';
    $scope.auth = $scope.role == 'user' ? true : false;

    $scope.submit = function (event) {
        event.preventDefault();
        var timeLimit = $filter('date')($scope.form.timeLimit, 'yyyy/MM/dd');
        $scope.form.timeLimit = timeLimit;
        $scope.form.createdTime = $filter('date')(new Date(), 'yyyy/MM/dd');
        $scope.tasks.push($scope.form);
        socket.emit('add', $scope.form);
        $scope.form = new FormSetter();
    };

    socket.on('receive', function (data) {
        $scope.tasks.push(data);
    });

});
