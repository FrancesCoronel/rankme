app.config(function ($stateProvider) {
  $stateProvider.state("admin", {
    url: "/admin",
    templateUrl: "js/admin/dashboard.html",
    data: {
            isAdmin: true,
            authenticate: true
        },
    controller: "AdminCtrl"
  })
});


app.controller('AdminCtrl', function ($scope, $rootScope, Categories){
  
  $scope.show = function (what) {
    $scope.activeTab = what;
  };

  var getCategories = function () {
    Categories.getAll().then(function(categories) {
      $scope.theCategories = categories;
    });
  }

  getCategories();

  var unbind = $rootScope.$on("categoryUpdate", getCategories);
  $scope.$on("$destroy", unbind);

});
