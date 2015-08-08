app.config(function ($stateProvider) {
  $stateProvider.state("search", {
    url: "/search?{terms}",
    templateUrl: "js/search/search.html",
    controller: "SearchCtrl"
  })
});

app.controller("SearchCtrl", function ($scope, $stateParams) {
	$scope.searchTerms = $stateParams.terms;
});


