/**
 * http://www.privacyidea.org
 * (c) cornelius kölbel, cornelius@privacyidea.org
 *
 * 2015-01-11 Cornelius Kölbel, <cornelius@privacyidea.org>
 *
 * This code is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This code is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
angular.module("privacyideaApp")
    .controller("mainController", function ($scope, $http, $location,
                                            authUrl, auth, $rootScope) {
        // We save the previous State in the $rootScope, so that we
        // can return there
        $rootScope.$on('$stateChangeSuccess',
            function (ev, to, toParams, from, fromParams) {
                console.log("we changed the state from " + from + " to " + to);
                console.log(from);
                console.log(fromParams);
                $rootScope.previousState = {state: from.name, params: fromParams};
        });

        // This holds the user object, the username, the password and the token.
        $scope.login = {username: "", password: ""};

        $scope.authenticate = function () {
            $http.post(authUrl, {
                username: $scope.login.username,
                password: $scope.login.password
            }, {
                withCredentials: true
            }).success(function (data) {
                auth.setUser($scope.login.username, data.result.value.token);
                $scope.user = auth.getUser();
                console.log("successfully authenticated");
                console.log($scope.user);
                $location.path("/token");
            }).error(function (error) {
                $rootScope.restError = error.result;
                console.log("clear the form");
            }).then(function () {
                    // We delete the login object, so that the password is not
                    // contained in the scope
                    $scope.login = {username: "", password: ""};
                }
            );
       };

       $scope.logout = function () {
            // logout: Clear the user and the auth_token.
            auth.dropUser();
            $scope.user = {};
            $location.path("/login");
       };
    });