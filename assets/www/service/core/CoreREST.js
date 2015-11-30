com.swaas.hidoctor.edetailing.dao.CoreREST = {
		
		_defaultServer: "http://10.0.2.2:8080",
		
		_addParams: function(url, params){
			if (params != null){
				url += '?';
				for (var key in params) {
				  if (params.hasOwnProperty(key)) {
					url += '&' + key + '=' + params[key];
				  }
				}
			}
			return url;
		},
		
		_raw: function(url, method, params){
			$.mobile.allowCrossDomainPages = true;
			$.support.cors = true;
			var result = null;
			url = this._addParams(url, params);
			$.ajax({
				url: url,
				type: method,
				dataType: 'json',
				async: false,
				success: function(data){
					result = data;
				},
				error: function(a, b, c){
					//TODO handle error
					//alert(JSON.stringify(a) + " - " + JSON.stringify(b));
				}
			});
	
			return result;
		},
		
		rawGet: function(url, params){
			return this._raw(url, 'GET', params);
		},
		
		rawPost: function(url, params){
			return this._raw(url, 'POST', params);
		},
		
		rawPut: function(url, params){
			return this._raw(url, 'PUT', params);
		},
		
		rawDelete: function(url, params){
			return this._raw(url, 'DELETE', params);
		},
		
		_buildURL: function(restClass, additionalUri){
			var url = this._defaultServer;
			if (restClass.metadata['server'] != null && restClass.metadata.server != ''){
				url = restClass.metadata.server;
			}
			
			if (restClass.metadata['uri'] != null){
				url += restClass.metadata.uri;
			}
			
			if (additionalUri != null){
				url += "/" + additionalUri;
			}
			return url;
		},
		
		post : function(restClass, additionalUri, params){
			
			var url = this._buildURL(restClass, additionalUri);
			var inParams = {};
			
			var noOfColumns = restClass.metadata.properties.length;
			for (var i =0; i < noOfColumns; i++){
				var paramName = restClass.metadata.properties[i].name;
				if (params[paramName] != null){
					var inParamName = restClass.metadata.properties[i].inProperty;
					inParams[inParamName] = params[paramName];
				}
			}
			return this.rawPost(url, inParams);
		},
		
		put : function(restClass, additionalUri, params){
			
			var url = this._buildURL(restClass, additionalUri);
			var inParams = {};
			
			var noOfColumns = restClass.metadata.properties.length;
			for (var i =0; i < noOfColumns; i++){
				var paramName = restClass.metadata.properties[i].name;
				if (params[paramName] != null){
					var inParamName = restClass.metadata.properties[i].inProperty;
					inParams[inParamName] = params[paramName];
				}
			}
			return this.rawPut(url, inParams);
		},
		
		remove : function(restClass, additionalUri, params){
			
			var url = this._buildURL(restClass, additionalUri);
			var inParams = {};
			
			var noOfColumns = restClass.metadata.properties.length;
			for (var i =0; i < noOfColumns; i++){
				var paramName = restClass.metadata.properties[i].name;
				if (params[paramName] != null){
					var inParamName = restClass.metadata.properties[i].inProperty;
					inParams[inParamName] = params[paramName];
				}
			}
			return this.rawDelete(url, inParams);
		},
		
		get: function(restClass, additionalUri, params){
			var url = this._buildURL(restClass, additionalUri);
			var inParams = {};
			
			var noOfColumns = restClass.metadata.properties.length;
			for (var i =0; i < noOfColumns; i++){
				var paramName = restClass.metadata.properties[i].name;
				if (params[paramName] != null){
					var inParamName = restClass.metadata.properties[i].inProperty;
					inParams[inParamName] = params[paramName];
				}
			}
			
			var response = this.rawGet(url, inParams);
			if(response !=null){
				var result = response;
				if(restClass.metadata.resultProperty != null){
					result = result[restClass.metadata.resultProperty];
				}
				
				if(typeof result == 'object'){
					var records = [];
					if(result instanceof Array){
						records = result;
					}else {
						records.push(result);
					}
					var marshlledRecords = [];
					$.each(records, function(index, record){
						var marshallRecord = {};
						var noOfColumns = restClass.metadata.properties.length;
						for (var i = 0; i < noOfColumns; i++){
							var paramName = restClass.metadata.properties[i].outProperty;
							if (record[paramName] != null){
								marshallRecord[restClass.metadata.properties[i].name] = record[paramName];
							}
						}
						marshlledRecords.push(marshallRecord);
						
					});	
					return marshlledRecords;
				} else {
					return [];
				}
			}else{
				return [];
			}
			
			
		},
		
		
};