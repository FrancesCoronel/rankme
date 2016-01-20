app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeCtrl"
    });
});

app.controller('HomeCtrl', function($scope, $state, Products) {
    // returns all products
    var assignData = function(data) {
        $scope.products = data;
        if (data.length === 0) {
            $scope.noContent = true;
        }
    };
    if ($scope.search) {
        Products.search($scope.search).then(assignData);
    } else {
        Products.getAll().then(assignData);
    }
    $scope.predicate = 'title';
    $scope.reverse = true;
    $scope.sortBy = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };

});

app.directive("homePage", function() {
    return {
        templateUrl: "js/home/home.html",
        controller: "HomeCtrl",
        scope: {
            search: "=search"
        }
    };
});
