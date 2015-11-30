com.swaas.hidoctor.edetailing.dao.AccompanistRemoteDAO = {
		metadata: {
			"service" : "HDUserService",
			"properties": [
						{name: "userName",  inProperty: "User_Name", outProperty: "User_Name"},
						{name: "regionCode",  inProperty: "Region_Code", outProperty: "Region_Code"},
						{name: "userCode",  inProperty: "User_Code", outProperty: "User_Code"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode,
					lastModifiedDate: ''
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetAccompanistDetails", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};