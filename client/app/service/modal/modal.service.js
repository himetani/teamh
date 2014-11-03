'use strict';

angular.module('teamhApp')
.service('modal', function ($modal) {
    var openModal = function (scope) {
        $modal.open({
        templateUrl: 'app/service/modal/modalContent.html',
        controller: 'ModalInstanceCtrl',
        backdrop: true,
        scope: scope
        });
    };

    return {
        openModal: openModal
    }
});

