'use strict';

app.factory('User', function($http, $rootScope) {
    var responseData = function(response){ return response.data; };
    return {
        // returns all users
        getAll: function(query) {
            return $http.get('/api/users/', {params:query}).then(responseData);
        },
        // get single user
        getOne: function(id) {
            return $http.get('/api/users/' + id).then(responseData);
        },
        // deletes user based on ID
        deleteUser: function(id) {
            return $http.delete('/api/users/' + id)
                .then(function(response) {
                    $rootScope.$emit("userUpdate");
                    return response.data;
                });
        },
        // updates user based on form data
        updateUser: function(id, data) {
            return $http.put('/api/users/' + id, data).then(responseData);
        },
        // signs up the user
        signup: function(credentials) {
            credentials.roles = ['User'];
            return $http.post('/api/users/create', credentials).then(responseData);
        }
    };
});
