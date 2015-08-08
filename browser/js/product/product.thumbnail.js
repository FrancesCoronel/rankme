app.directive('productThumbnail', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/product/product.thumbnail.html',
        scope: {
            theProduct: '=product'
        },
        controller: 'productThumbnailCtrl'
    };
});

app.controller('productThumbnailCtrl', function($scope) {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});