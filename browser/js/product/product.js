app.config(function($stateProvider) {
    $stateProvider.state("singleProduct", {
        url: "/product/{id}",
        controller: "ProductCtrl",
        templateUrl: "js/product/product.html",
    });
});

app.controller('ProductCtrl', function($scope, Products, Reviews, $stateParams, AuthService) {
    // returns product
    Products.getOne($stateParams.id).then(function(product) {
        $scope.singleProduct = product;
        return product
            // gets all reviews for the product that has just been found
    }).then(function(product) {
        Reviews.getReviews({
            product: product._id
        }).then(function(reviews) {
            $scope.reviews = reviews;
        });
    }).catch(function(error) {
        console.log(error)
    })

    // creates reviews
    $scope.createReview = function(reviewData) {
        reviewData.product = $scope.singleProduct._id
        var userName;
        AuthService.getLoggedInUser().then(function(user) {
            userName = user.name;
            reviewData.user = user._id
            return Reviews.createReview(reviewData)
        }).then(function(createdReview){
            createdReview.user = {name: userName};
            $scope.reviews.push(createdReview)
        })
        delete $scope.review
    };

    // checks if user is logged in so that review form is only shown when user is logged in
    AuthService.getLoggedInUser().then(function(user) {
        if (!user) $scope.thereIsALoggedInUser = false
        else $scope.thereIsALoggedInUser = true
        return user
    })

});