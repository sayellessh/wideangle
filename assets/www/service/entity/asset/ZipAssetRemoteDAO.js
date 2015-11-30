com.swaas.hidoctor.edetailing.dao.ZipAssetRemoteDAO = {
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
			if (result.Tables != null && result.Tables.length >0 &&  result.Tables[0].Rows != null && result.Tables[0].Rows.length > 0) {
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
		syncGet: function(params){
			//var _this = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO;
			var localAssetsService = com.swaas.hidoctor.edetailing.service.AssetService;
			var assets = localAssetsService.getAllAssets(false);
			com.swaas.hidoctor.edetailing.service.DownSynchronizeService.zipAssetsLength = assets.length;
			return assets;
		}
};