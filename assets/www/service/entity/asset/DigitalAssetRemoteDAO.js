com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO = {
		metadata: {
			"service" : "HDEncodingService",
			"properties": [
						{name: "daCode", inProperty: "DAID", outProperty: "DAID"},
						{name: "mode", inProperty: "daMode", outProperty: "daMode"},
						{name: "name", inProperty: "DAName", outProperty:"DAName"},
						{name: "offLineOutPutId", inProperty: "OfflineOutPutId", outProperty: "OfflineOutPutId"},
						{name: "onLineOutPutId", inProperty: "OnlineOutPutId", outProperty: "OnlineOutPutId"},
						{name: "tags", inProperty: "Tags", outProperty: "Tags"},
						{name: "offLineURL", inProperty: "offlineURL", outProperty: "offlineURL"},
						{name: "onlineURL", inProperty: "onlineURL", outProperty: "onlineURL"},
						{name: "documentType", inProperty: "DocumentType", outProperty: "DocumentType"},
						{name: "downloadable", inProperty: "IsDownloadable", outProperty: "IsDownloadable"},
						{name: "fileSize", inProperty: "FileSize", outProperty: "FileSize"},
						{name: "thumbnailURL", inProperty: "ThumnailURL", outProperty: "ThumnailURL"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode, tagToSearch){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode,
					TagsToSearch: tagToSearch
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "SearchDigitalAsset", data, "xml", "SearchMediaDetailsResponse");
			return result;
		},

		getRetired: function(correlationId, companyCode, userCode, outPutIds){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,						
					userCode: userCode,
					outPutIds: outPutIds
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "RetireDigitalAsset", data, "json");
			var outputIds = [];
			if (result != null && result.Tables != null && result.Tables.length >0 &&  result.Tables[0].Rows != null && result.Tables[0].Rows.length > 0) {
				for (var i = 0; i < result.Tables[0].Rows.length; i++){
					if (result.Tables[0].Rows[i].Output_Id != null){
						outputIds.push(result.Tables[0].Rows[i].Output_Id);
					}
				}
			}
			return outputIds;
		},

		getAssetURL: function(correlationId, companyCode, userCode, onlineURL, networkType){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode,
					url: onlineURL,
					networkType: networkType
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "SecreatAuth", data, "text");
			return result;
		},
		
		getAssetVideoURL: function(correlationId, companyCode, userCode, onlineURL, networkType, onSuccess){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode,
					url: onlineURL,
					networkType: networkType
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "SecreatAuth", data, "text");
			onSuccess(result);
			return result;
		},
		
		updateSyncGet: function(params, progressChange) {
			var _this = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO;
			var queryInputLocalDAO = com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsLocalDAO;
			var uniqueQuerys = queryInputLocalDAO.getUniqueQuerys();
			var digitalAssets = [];
			$.each(uniqueQuerys, function(index, uniqueQuery){
				var result = _this.get(params.correlationId, params.companyCode, params.userCode, uniqueQuery);
				$.each(result, function(jndex, element){
					digitalAssets.push(element);
				});
			});
			
			// Spotlite assets
			uniqueQuerys = queryInputLocalDAO.getUniqueForSpotLight();
			$.each(uniqueQuerys, function(index, uniqueQuery){
				var result = _this.get(params.correlationId, params.companyCode, params.userCode, uniqueQuery);
				$.each(result, function(jndex, element){
					digitalAssets.push(element);
				});
			});
			
			return digitalAssets;
		},
		
		syncGet: function(params){
			var _this = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO;
			var queryInputLocalDAO = com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsLocalDAO;
			var uniqueQuerys = queryInputLocalDAO.getUniqueQuerys();
			var digitalAssets = [];
			$.each(uniqueQuerys, function(index, uniqueQuery){
				var result = _this.get(params.correlationId, params.companyCode, params.userCode, uniqueQuery);
				$.each(result, function(jndex, element){
					digitalAssets.push(element);
				});
			});

			// Spotlite assets
			uniqueQuerys = queryInputLocalDAO.getUniqueForSpotLight();
			$.each(uniqueQuerys, function(index, uniqueQuery){
				var result = _this.get(params.correlationId, params.companyCode, params.userCode, uniqueQuery);
				$.each(result, function(jndex, element){
					digitalAssets.push(element);
				});
				
			});
			return digitalAssets;
		}
};