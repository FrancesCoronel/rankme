app.directive("adminUserLine", function() {
    return {
        restrict: "E",
        templateUrl: "js/admin/directives/users/admin-user-line.html",
        controller: "AdminUserLineCtrl",
        scope: {
            theUser: "=user"
        }
    };
});

app.controller("AdminUserLineCtrl", function($scope, User) {
    $scope.roles = ['User', 'Admin'];
    $scope.delete = function() {
        User.deleteUser($scope.theUser._id);
    };
    $scope.update = function() {
        User.updateUser($scope.theUser._id, $scope.theUser);
    };
});