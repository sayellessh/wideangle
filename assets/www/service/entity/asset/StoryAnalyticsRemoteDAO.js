com.swaas.hidoctor.edetailing.dao.storyAnalyticsRemoteDAO = {
    metadata : {
		"service" : "HDStoryService"
	},

	syncPut : function(params) {
		var assets = {
			corrlId : params.correlationId,
			companyCode : params.companyCode,
			userCode : params.userCode,
			regionCode : params.regionCode,
			storyAnalyticsData : params.storyAnalyticsData,
			appSuiteId : params.appSuiteId,
			appId :params.appId ,
			appVersion : params.appVersion
		};
		
		var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this,
				"InsertStoryAnalytics", assets);
		return result;
	}
};