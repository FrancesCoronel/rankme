app.directive('adminProductLine', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/directives/products/admin-product-line.html',
        controller: "AdminProductLineCtrl",
        scope: {
            theProduct: '=product',
            categories: "=categories",
            stores: "=stores"
        },
    };
});

app.controller("AdminProductLineCtrl", function($scope, Products) {
    $scope.delete = function() {
        Products.deleteProduct($scope.theProduct._id);
    };
    $scope.update = function() {
        Products.updateProduct($scope.theProduct);
    };
    $scope.removeImg = function(index){
        $scope.theProduct.photos.splice(index, 1);
    }


    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
    };
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.theProduct.price = ($scope.theProduct.price/100).toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
});