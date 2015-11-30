com.swaas.hidoctor.edetailing.dao.ActivityMasterRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [                                  
						{name: "activityCode",  inProperty: "ActivityCode", outProperty: "ActivityCode"},
						{name: "projectCode",  inProperty: "ProjectCode", outProperty: "ProjectCode"},
						{name: "activityName",  inProperty: "ActivityName", outProperty: "ActivityName"}
			            ]                                   
		},
		
		get: function(correlationId,subDomainName, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					subDomainName : subDomainName,
					companyCode:companyCode,
					userCode: userCode,
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetActivity", data);
			result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.unmarshallJSON(this, result);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId,params.subDomainName, params.companyCode, params.userCode);
		}
};