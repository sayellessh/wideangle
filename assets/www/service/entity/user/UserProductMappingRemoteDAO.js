com.swaas.hidoctor.edetailing.dao.UserProductMappingRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "userCode",  inProperty: "User_Code", outProperty: "User_Code"},
						{name: "productCode",  inProperty: "Product_Code", outProperty: "Product_Code"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetUserProductDetails", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};