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

    var sortMethod = "title";

    // Products.getAll()
    //     .then(function(data) {
    //         $scope.products = data;
    //     })
    //     .catch(function(err) {
    //         console.log('error', err);
    //     });

    $scope.sortBy = function(predicate) {
        if (predicate === $scope.sortMethod) {
            $scope.sortMethod = "-" + predicate;
        } else {
            $scope.sortMethod = predicate;
        }
        console.log($scope.sortMethod);
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