app.config(function($stateProvider) {
    $stateProvider.state("singleProduct", {
        url: "/product/{id}",
        controller: "ProductCtrl",
        templateUrl: "js/product/product.html",
    });
});

app.controller('ProductCtrl', function($scope, Products, $stateParams, AuthService) {
    // returns product
    Products.getOne($stateParams.id).then(function(product) {
        $scope.singleProduct = product;
        return product;
    }).catch(function(error) {
        console.log(error);
    });

    // checks if user is logged in so that review form is only shown when user is logged in
    AuthService.getLoggedInUser().then(function(user) {
        if (!user) $scope.thereIsALoggedInUser = false;
        else $scope.thereIsALoggedInUser = true;
        return user;
    });
});
