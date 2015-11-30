com.swaas.hidoctor.edetailing.dao.SaleProductMappingRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "saleProductCode", inProperty: "Sales_Product_Code", outProperty: "Sales_Product_Code"},
						{name: "mappingProductCode", inProperty: "Mapping_Product_Code", outProperty: "Mapping_Product_Code"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetSaleProductMapping", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};