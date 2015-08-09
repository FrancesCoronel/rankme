app.factory("Scrapers", function($http) {
  var responseData = function(response){ return response.data; };
  return {
    getQuora: function(quoraUrl) {
      return $http.get('/api/quora/' + quoraUrl).then(responseData);
      //console.log("Getting data from Quora.");
    }
  };
});