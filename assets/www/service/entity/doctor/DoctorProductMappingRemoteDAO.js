com.swaas.hidoctor.edetailing.dao.DoctorProductMappingRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "customerCode",  inProperty: "Customer_Code", outProperty: "Customer_Code"},
						{name: "productCode",  inProperty: "Product_Code", outProperty: "Product_Code"},
						{name: "regionCode", inProperty:"Region_Code", outProperty:"Region_Code"},
						{name: "productPriority",inProperty:"Product_Priority_No", outProperty:"Product_Priority_No"}
			            ]
		},
		
		get: function(correlationId, subDomainName, companyCode, userCode, regionCode){
			var data = {
					correlationId:correlationId,
					subDomainName:subDomainName,
					companyCode:companyCode,
					userCode: userCode,
					regionCode:regionCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetDoctorProductMapping", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.subDomainName, params.companyCode, params.userCode, params.regionCode);
		}
};