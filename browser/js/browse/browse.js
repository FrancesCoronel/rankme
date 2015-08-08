app.config(function ($stateProvider) {

	$stateProvider.state('browse', {
		url: '/browse',
		templateUrl: 'js/browse/browse.html',
		controller: 'BrowseCtrl'
	});

});



app.controller('BrowseCtrl', function ($scope,$state,Games){

	var sortMethod = "title";

	//https://docs.angularjs.org/api/ng/filter/orderBy <-- useful stuff for sorting

	Games.getAll()
	.then(function(games){
		$scope.gamesList = games;
	})
	.catch(function(err){
		console.log('error', err)
	});


	$scope.sortBy = function(predicate){
		if (predicate === $scope.sortMethod){
			$scope.sortMethod = "-" + predicate;
		}
		else{
			$scope.sortMethod = predicate;
		}
		console.log($scope.sortMethod)

	}


})