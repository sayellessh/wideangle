com.swaas.hidoctor.edetailing.dao.UpgradeRemoteDAO = {
		metadata: {
			"service" : "HDInfrastructureService"
		},
		
		get: function(currentAppDetilals, user){
			var data = {
					correlationId : currentAppDetilals.correlationId,
					companyCode : user.companyCode,
					userCode : user.userCode,
					subDomainName : user.url,
					appSuiteId :currentAppDetilals.appSuiteId,
					appId :currentAppDetilals.appId,
					platform :currentAppDetilals.platform,
					currentVersionNumber :currentAppDetilals.currentVersionNumber
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "CheckAutoUpgrade", data);
			return result;
		},
		
		sendVersion : function(correlationId, subDomain, companyCode, userCode, userName, waVersion, regionName){
			var data = {
					correlationId:correlationId,
					subdomainName : subDomain,
					companyCode: companyCode,
					userCode: userCode,
					userName: userName,
					waVersion : waVersion,
					regionName: regionName
					};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "InstallBack_31", data, 'text');
		}
};