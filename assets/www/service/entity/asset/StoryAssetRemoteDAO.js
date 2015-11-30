com.swaas.hidoctor.edetailing.dao.storyAssetRemoteDAO = {
		metadata: {
			"service" : "HDStoryService",
			"properties": [
							{name: "storyId", columnName: "Story_Id"},
							{name: "productCode", columnName: "Product_Code"},
							{name: "DACode", columnName:"DA_Code"},
	                        {name: "playOrder", columnName:"Play_Order"},
	                        {name: "is_Synced_With_HiDoctor", columnName:"Is_Synced_With_HiDoctor"}
							]
		},
		
		get: function(params){
			var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version;
			var data = {
					correlationId: params.correlationId,
					companyCode: params.companyCode,
					userCode: params.userCode,
					appSuiteId : com.swaas.hidoctor.edetailing.ui.view.Resource.application.appSuiteId,
					appId :com.swaas.hidoctor.edetailing.ui.view.Resource.application.appId ,
					appVersion : version
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetEditedStories", data);
			
			return result;
		},

		/*getRetired: function(correlationId, companyCode, userCode, outPutIds){
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
		},	*/
		
		syncGet: function(params){
			var digitalAssets = com.swaas.hidoctor.edetailing.dao.storyAssetRemoteDAO.get(params);
			return digitalAssets;
		},
		
		syncPut : function(params) {
			/*var assets = {
					storyId : params.storyId,
					productCode : params.productCode,
					DACode : params.DACode,
					playOrder : params.playOrder,
					is_Synced_With_HiDoctor : params.is_Synced_With_HiDoctor
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this,
					"InsertHTMLSiteAnalytics", assets);
			return result;*/
			return true;
		}
};