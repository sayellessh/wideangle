com.swaas.hidoctor.edetailing.dao.SiteAnalyticsRemoteDAO = {
	metadata : {
		"service" : "HDHTMLSiteService"
	},

	syncPut : function(params) {
		var assets = {
			corrlId : params.corrlId,
			companyCode : params.companyCode,
			userCode : params.userCode,
			regionCode : params.regionCode,
			htmlSiteAnalyticsString : params.htmlSiteAnalyticsString,
			appSuiteId : params.appSuiteId,
			appId :params.appId ,
			appVersion : params.appVersion
		};
		
		var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this,
				"InsertHTMLSiteAnalytics", assets);
		return result;
	}
};