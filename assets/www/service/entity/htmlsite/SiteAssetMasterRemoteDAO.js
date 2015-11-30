com.swaas.hidoctor.edetailing.dao.SiteAssetMasterRemoteDAO = {
	metadata : {
		"service" : "HDHTMLSiteService"
	},

	syncPut : function(params) {
		var assets = {
			corrlId : params.corrlId,
			companyCode : params.companyCode,
			userCode : params.userCode,
			regionCode : params.regionCode,
			htmlSiteAssetMasterString : params.assetString,
			appSuiteId : params.appSuiteId,
			appId :params.appId ,
			appVersion : params.appVersion
		};
		
		var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this,
				"InsertHTMLSiteAssetMaster", assets);
		return result;
	}
};