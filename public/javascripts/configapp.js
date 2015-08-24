/**
 * Created by Layric on 8/20/2015.
 */
/**
 * Created by Layric on 8/18/2015.
 */
var myApp = angular.module('AuthenticationApp', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    console.log('running the following code in the configuration phase ... ');
    //$urlRouterProvider.otherwise("/login");
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginController'
    }).state('register', {
        url: '/register',
        templateUrl: 'register.html',
        controller: 'RegisterController'
    });


});

myApp.controller('LoginController', function ($scope, AuthenticationService,LoginandRegister) {
    $scope.message = 'Enter login details .... ';
    $scope.user = {};
    $scope.login = function(){
        LoginandRegister.login($scope.user).then(function (data) {
            console.log(data);
            $scope.user ={};
        }, function (data) {
            console.log(data);
        });
    };

    $scope.logintwitter = function () {
        AuthenticationService.logintwitter().then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    };
});

myApp.controller('RegisterController', function ($scope, LoginandRegister) {
    $scope.message = 'Beginning Registration ... ';
    $scope.user = {};
    $scope.register = function () {
        LoginandRegister.register($scope.user).then(function (data) {
            console.log(data);
            $scope.user = {};
        }, function (data) {
            console.log(data);
        });
    };
});

myApp.controller('MainpageController',function($scope,Mainfunction){
    $scope.viewprofile = function(userid){
        Mainfunction.lookprofile(userid).success(function(data) {
            $scope.profile = data;
            console.log("here is the ",$scope.profile[0]);
            console.log("here is the ",$scope.profile[0].photos);
        });
    };

});

myApp.factory('AuthenticationService', function ($http) {
    return {
        logintwitter: function () {
            return $http.get('/login/twitter');
        },

    };
});
myApp.factory('LoginandRegister', function($http){
    return {
        login:function(loginobj){
            return $http.get('/login', loginobj)
        },
        register:function(regobj){
            return $http.post('/register', regobj)
        }
    }
});
myApp.factory('Mainfunction',function($http){
    return {
        lookprofile:function(profile){
            return $http.get('profile'+profile);
        }
    }
})
