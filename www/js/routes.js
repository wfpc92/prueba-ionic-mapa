app.config(function($stateProvider,
					$urlRouterProvider,
					$logProvider,
					$provide,
					$compileProvider,
					$ionicConfigProvider,
					$httpProvider){


	//forzar a ionic que tenga las tabs arriba para todas las plataformas
	$ionicConfigProvider.tabs.position('top');
  	$ionicConfigProvider.views.swipeBackEnabled(false);

	$compileProvider.debugInfoEnabled(false);
	//$ionicConfigProvider.scrolling.jsScrolling(false);
	
	$ionicConfigProvider.backButton.text("");
	$ionicConfigProvider.backButton.previousTitleText("")
	$ionicConfigProvider.views.forwardCache(true);
	$ionicConfigProvider.views.maxCache(5);

	$httpProvider.interceptors.push("Interceptor");

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider


	.state('mapa', {
		url: '/mapa',
		abstract: true,
		templateUrl: 'templates/mapa/template.html',
	})	

	.state('mapa.inicio', {
		url: '/inicio',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/mapa/inicio.html',
				controller: 'MapaCtrl'
			}
		}
	})
	
	//$urlRouterProvider.otherwise('/autenticacion/inicio');
	$urlRouterProvider.otherwise( function($injector, $location) {
    	var $state = $injector.get("$state");
    	$state.go("mapa.inicio");
    });

});