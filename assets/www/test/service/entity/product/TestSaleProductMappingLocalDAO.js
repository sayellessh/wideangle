com.swaas.hidoctor.edetailing.dao.TestSaleProductMappingLocalDAO = {
		
		testInsert: function(){
			var product = {
					saleProductCode: "PDC00000001",
					mappingProductCode: "PDC00000001",
											
			};
			var result = com.swaas.hidoctor.edetailing.dao.SaleProductMappingLocalDAO.insert(product);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var productOut = com.swaas.hidoctor.edetailing.dao.SaleProductMappingLocalDAO.get("PRD001","MAP001");
			alert(JSON.stringify(productOut));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.SaleProductMappingLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SaleProductMappingLocalDAO.remove("PRD001","MAP001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SaleProductMappingLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};


