com.swaas.hidoctor.edetailing.dao.ProductRemoteDAO = {
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
		
		get: function(correlationId,subDomainName, companyCode, userCode, regionCode){
			
			//var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetProductDetails", data);
			var resultProducts = [];
			var configuration = com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO.get();
			if(configuration != null) {
				var productsByBringType = configuration.dcrProductBringType;
				if (productsByBringType != null){
					var products =  productsByBringType.split(",");
					if (products.length>0)
					{
						for(var i = 0; i<products.length;i++)
						{
							var productsByType= com.swaas.hidoctor.edetailing.dao.ProductsByUserProductRemoteDAO.get(
									correlationId, subDomainName, companyCode, userCode, products[i]);
							resultProducts = resultProducts.concat(productsByType);
						}
					}
		
				}
			}
			var salesProduct = com.swaas.hidoctor.edetailing.dao.SalesProductRemoteDAO.get(correlationId,subDomainName, companyCode, userCode, regionCode);
			resultProducts = resultProducts.concat(salesProduct);
			
			var competitorProduct = com.swaas.hidoctor.edetailing.dao.CompetitorProductRemoteDAO.get(correlationId, subDomainName, companyCode, userCode);
			resultProducts = resultProducts.concat(competitorProduct);
			
			return resultProducts;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId,params.subDomainName, params.companyCode, params.userCode, params.regionCode);
		}
};