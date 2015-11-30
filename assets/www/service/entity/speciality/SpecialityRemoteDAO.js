com.swaas.hidoctor.edetailing.dao.SpecialityRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "specialityCode", inProperty: "Speciality_Code", outProperty: "Speciality_Code"},
						{name: "specialityName", inProperty: "Speciality_Name", outProperty: "Speciality_Name"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetSpecialityDetails", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};