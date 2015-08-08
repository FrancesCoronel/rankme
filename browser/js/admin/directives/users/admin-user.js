app.directive("adminUsers", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/users/admin-user.html",
		controller: "AdminUserCtrl"
	};
});

app.controller("AdminUserCtrl", function ($scope, $rootScope, User) {
	var getUsers = function () {
		User.getAll().then(function (users) {
			$scope.users = users;
		});
	};

	getUsers();
	

	var unbind = $rootScope.$on("userUpdate", getUsers);
	$scope.$on("$destroy", unbind);
});