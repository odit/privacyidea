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

angular.module('privacyideaApp.loginStates', ['ui.router']).config(
    ['$stateProvider',
        function ($stateProvider) {
            // get the instance, the pathname part
            var instance = window.location.pathname;
            if (instance == "/") {
               instance = "";
            }
            var loginpath = instance + "/static/components/login/views/";
            $stateProvider
                .state('offline', {
                    url: "/offline",
                    templatesUrl: loginpath + "offline.html"
                }).state('login', {
                    url: "/login",
                    templateUrl: loginpath + "login.html"
                }).state('initial_login', {
                    // This is the state, when no login path is specified
                    url: "",
                    templateUrl: loginpath + "login.html"
                })
        }]);