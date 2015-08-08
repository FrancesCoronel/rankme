app.directive('productThumbnail', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/product/product.thumbnail.html',
        scope: {
            theProduct: '=product'
        }
    };
});