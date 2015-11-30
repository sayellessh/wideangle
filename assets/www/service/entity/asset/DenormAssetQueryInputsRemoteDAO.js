com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsRemoteDAO = {
		metadata: {
			"service" : "HDProductservice"
		},
		
		get: function(correlationId, companyCode, userCode, regionCodes){
			var regionCodesArray = [];
			if (regionCodes instanceof Array){
				regionCodesArray = regionCodes;
			} else {
				regionCodesArray.push(regionCodes);
			}
			
			var regionCodesString = "'" + regionCodesArray[0] + "'";
			for(var i=1; i < regionCodesArray.length; i++){
				regionCodesString += (", '" + regionCodesArray[i] + "'" );
			}
					
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode,
					regionCodes:regionCodesString,
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetDoctorDetailsForQuery", data);
			result = result.Tables[0].Rows;
			var convertedResult = [];
			if (result.length > 0 ){
				var configData = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
				var keyColumnMapping = {};
				for (var index=1; index<9; index++){
					var col = "col" + index;
					keyColumnMapping[configData[col]] = col;
				}
				$.each(result, function(index, queryInput){
					var convertedQueryInput = {};
					queryInput.Tags.replace(/([^_#]+)_([^#]*)/gi, function(m, key, value) {
						if(value != null && value != ''){
							convertedQueryInput[keyColumnMapping[key]] = key + "_" + value;
						}
					});
					convertedResult.push(convertedQueryInput);
				});
			}
			return convertedResult;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode, params.regionCodes);
		}
};