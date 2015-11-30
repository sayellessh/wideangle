com.swaas.hidoctor.edetailing.dao.DoctorCategoryRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "categoryCode", inProperty: "Category_Code", outProperty: "Category_Code"},
						{name: "categoryName", inProperty: "Category_Name", outProperty: "Category_Name"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetDoctorCategoryDetails", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};