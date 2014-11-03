 angular.module('teamhApp')
 .controller('ModalInstanceCtrl', function ($scope, $modalInstance, socket) {
      
    $scope.change = function () {
        $modalInstance.close();
    };

    $scope.cancel      = function() {
        $modalInstance.close();
    };

    $scope.$watch("tasks[index].point", function (newVal) {
        console.log("newVal:" + newVal);
        console.log("index:" + $scope.index);
        
       socket.emit('point',{
            newVal: newVal,
            index : $scope.index
       });  
        
    });
});
