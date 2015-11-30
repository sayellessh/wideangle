com.swaas.hidoctor.edetailing.dao.ProductsByUserProductRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "productCode", inProperty: "Product_Code", outProperty: "Product_Code"},
						{name: "productName", inProperty: "Product_Name", outProperty: "Product_Name"},
						{name: "productTypeName", inProperty: "Product_Type_Name", outProperty: "Product_Type_Name"},
						{name: "brandCode", inProperty: "Brand_Code", outProperty: "Brand_Code"},
						{name: "specialityCode", inProperty: "Speciality_Code", outProperty: "Speciality_Code"},
						{name: "productCategoryCode", inProperty: "Category_Code", outProperty: "Category_Code"},
						{name: "productCategoryName", inProperty: "Category_Name", outProperty: "Category_Name"}
			            ]
		},
		
		get: function(correlationId, subDomainName, companyCode, userCode,productTypeName){
			var data = {
					correlationId:correlationId,
					subDomainName : subDomainName,
					companyCode:companyCode,
					userCode: userCode,
					productTypeName : productTypeName
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetProductsByUserProduct", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.subDomainName, params.companyCode, params.userCode,params.productTypeName);
		}
};