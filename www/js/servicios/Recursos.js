var RecursosFactory = function($log, $http, API_ENDPOINT, $rootScope) {
	var self = this;
	this.$log = $log;
	this.$http = $http;
	this._apiUrl = API_ENDPOINT.url;	
	
	$log.debug("Contructor de RecursosApi");

	this.solicitud = function(metodo, recurso, getParams, postParams) {
		
		$log.debug("solicitud para consumir servicio de api");

		var requestConfig = {
			url: self._apiUrl + recurso, 
			method: metodo,
			params: getParams,
			data: postParams
		};

		console.log(JSON.stringify(requestConfig))
		return self.solicitudHttp(requestConfig);
	}

	this.solicitudHttp = function(requestConfig, callback) {
		var self = this;
		this.respuesta = {
			data : null,
			error : null
		};

		$log.debug("RecursosFactory.requestConfig: ", JSON.stringify(requestConfig))
		return $http(requestConfig);
	};

	return {
		get: function(recursos, params) {
			return self.solicitud("GET", recursos, params, {});	
		},
		post: function(recursos, params) {
			return self.solicitud("POST", recursos, {}, params);	
		}
	};
};


app.factory("RecursosFactory", RecursosFactory);
