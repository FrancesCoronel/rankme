'use strict';

app.directive('authButton', function () {
  return {
    scope: {
      providerName: '@'
    },
    restrict: 'E',
    templateUrl: '/js/common/directives/auth/auth.html'
  };
});