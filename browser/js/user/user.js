app.config(function($stateProvider) {
    $stateProvider.state("user", {
        url: "/user/{id}",
        templateUrl: "js/user/user.html",
        controller: "UserCtrl"
    });
});

app.controller("UserCtrl", function($scope, AuthService, Reviews, Orders, User) {
    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
    });
    $scope.updateProfile = function() {
        User.updateUser($scope.user._id, $scope.user);
    };
});