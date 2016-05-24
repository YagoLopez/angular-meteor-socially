//todo: poner todos los componentes en el directorio /client/imports => lazy load
//todo: implementar las funciones de rootScope como una factoria

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import 'angular-simple-logger';
import 'angular-google-maps';

export var app = angular.module('socially',
    [angularMeteor, uiRouter, 'accounts.ui', utilsPagination , 'uiGmapgoogle-maps']);

app.config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $stateProvider.state(
        'parties', {
            url:'/parties',
            template: '<parties-list></parties-list>'
        }).state(
        'partyDetails', {
            url: '/parties/:partyId',
            template: '<party-details></party-details>',
            resolve: {
                currentUser($q, $state) {
                    if (!Meteor.userId()) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        }
    );

    $urlRouterProvider.otherwise('/parties');
});

app.run(function ($state, $rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            if (error === 'AUTH_REQUIRED') {
                console.warn('auth error', error);
                $state.go('parties');
                alert('Authentication needed. Redirecting to home page')
            }
        }
    );

    // handle logout event and redirect user to home page
    var _logout = Meteor.logout;
    Meteor.logout = function customLogout() {
        console.log('user loggin out');
        $state.go('parties');
        _logout.apply(Meteor, arguments);
    };

    $rootScope.helpers({
        // todo: revisar este helper ya que el usuario se puede obtener
        // todo: en teoria de forma global usando Meteor.user()
        userLoggedIn(){
            console.info('user', Meteor.user());
            return Meteor.user()
        }
    });

    $rootScope.isEditable = function (party) {
        if(Meteor.user() && party) {
            return Meteor.userId() === party.ownerId;
        }else{
            return false;
        }
    };

    $rootScope.userInvited = function (party) {
        var isInvited = _.findWhere( party.invitedUsers, {userId: Meteor.userId()} ) != null ;
        return isInvited;
    };

    $rootScope.setPrivacity = function (partyId, isPublic) {
        if(isPublic){
            // Making public a party implies it has no ivited users. Everybody can assist
            Parties.update({_id: partyId}, {$set: {public: isPublic, invitedUsers: []}})
        }
        if(!isPublic){
            Parties.update({_id: partyId}, {$set: {public: isPublic}})

        }
    };

});


