app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {
            scope.user = null;
            scope.admin = null;
            scope.merchant = null;
            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };
            scope.logout = function() {
                AuthService.logout().then(function() {
                    scope.user = null;
                    scope.admin = null;
                    scope.merchant = null;
                    $state.go('home');
                });
            };
            scope.viewUserPage = function() {
                $state.go("user", {
                    id: scope.user._id
                });
            };

            scope.search = function () {
                $state.go("search", {
                    terms: scope.searchString
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    if (user) {
                        scope.user = user;
                        if (user.roles.indexOf("Admin") !== -1) {
                            scope.admin = true;
                        }
                        if (user.roles.indexOf("Merchant") !== -1) {
                            scope.merchant = true;
                        }
                    }
                });
            };
            var removeUser = function() {
                scope.user = null;
            };
            setUser();
            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
        }
    };
});
