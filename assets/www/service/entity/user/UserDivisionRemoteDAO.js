com.swaas.hidoctor.edetailing.dao.UserDivisionRemoteDAO = {
		metadata: {
			"service" : "HDUserService",
			"properties": [
						{name: "userCode",  inProperty: "User_Code", outProperty: "User_Code"},
						{name: "divisionCode",  inProperty: "Division_Code", outProperty: "Division_Code"},
						{name: "divisionName",  inProperty: "Division_Name", outProperty: "Division_Name"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetUserDivision", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};