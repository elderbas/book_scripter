angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      template: '<app></app>'
    })
    .state('scripting', {
      url: '/scripting',
      template: '<scripting></scripting>'
    })
    .state('bookupload', {
      url: '/bookupload',
      templateUrl: 'app/bookupload/main.html'
    })

  ;
}
