var CargarScriptsFactory = function(angularLoad,
									$log) {
	var recursos = {
		googleMaps: false
	};

	return { 
		cargarGoogleMaps : function(callback, error) {
			var self = this;
			if(!recursos.googleMaps) {
				$log.debug("cargando Script google maps...")
				angularLoad.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCVPhOauVRv4bIukVrmP4Dx-R3LDJjpN7s').then(function () {
					$log.debug("exito script google maps.")
					recursos.googleMaps = true;
					if(callback) {
						callback();
					}	
				}).catch(function () {
					$log.debug("error script google maps.");
					recursos.googleMaps = false;
					if(error) {
						error();
					}
				});
			}
			else {
				$log.debug("Script google maps ya ha sido cargado.")
			}
		}
	};
};

app.factory("CargarScriptsFactory", CargarScriptsFactory);
