 angular.module('teamhApp')
 .controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
      
    $scope.change = function () {
        $modalInstance.close();
    };

    $scope.cancel      = function() {
        $modalInstance.close();
    };
});
