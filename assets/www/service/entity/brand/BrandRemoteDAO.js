com.swaas.hidoctor.edetailing.dao.BrandRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "brandCode", inProperty: "Brand_Code", outProperty: "Brand_Code"},
						{name: "brandName", inProperty: "Brand_Name", outProperty: "Brand_Name"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetBrandDetails", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};