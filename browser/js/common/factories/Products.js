app.factory("Products", function($http, $rootScope) {
  var responseData = function(response){ return response.data; };
  return {
    // returns all products
    getAll: function(query) {
      return $http.get('/api/products', {params: query}).then(responseData);
    },
    search: function(searchString) {
      return $http.get("/api/search/" + encodeURI(searchString)).then(responseData);
    },
    // creates a product using form data
    createProduct: function(data) {
      // is there an easier way to create a product using all the data inputted into the form?
      return $http.post('/api/products/', data).then(responseData);
    },
    // returns product based on ID
    getOne: function(id) {
      return $http.get('/api/products/' + id).then(responseData);
    },
    // deletes product based on ID
    deleteProduct: function(id) {
      return $http.delete('/api/products/' + id).then(function(response) {
        $rootScope.$emit("productUpdate");
        console.log(response, "Product with ID of " + id + " was successfully deleted.");
      });
    },
    // updates product using form data
    // is there an easier way to update a product using all the data inputted into the form?
    updateProduct: function(data) {
      return $http.put('/api/products/' + data._id, data).then(responseData);
    }
  };
});