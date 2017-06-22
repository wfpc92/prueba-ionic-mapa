var AppCtrl = function($rootScope,
					$log,
					$ionicPopup,
					APP_EVENTS) {

	$log.debug("AppCtrl");

	$rootScope.$on(APP_EVENTS.noAccesoServidor, function(event, args) {
		$log.debug("event:AppCtrl.noAccesoServidor");

		$ionicPopup.alert({
			title: 'No se puede acceder',
			template: "No se detecta una conexion a internet. Razon: " + JSON.stringify(args)
		});
	});

	$rootScope.$on(APP_EVENTS.servidorNoEncontrado, function(event, args) {
		$log.debug("event:AppCtrl.servidorNoEncontrado", args);

		$ionicPopup.alert({
			title: 'No se encuentra',
			template: "No es posible acceder a este recurso. Razon:" + JSON.stringify(args)
		});
	});		
};

app.controller('AppCtrl', AppCtrl);
