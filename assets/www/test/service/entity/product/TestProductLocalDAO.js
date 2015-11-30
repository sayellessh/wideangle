com.swaas.hidoctor.edetailing.dao.TestProductLocalDAO = {
		
		testInsert: function(){
			var product = {
					productCode: "PRD001",
					productName: "Test product",
					productTypeName: "Core",
					brandCode: "Brand 1",
					specialityCode: "EYE001",
					productCategoryCode: "PRCAT01",
					productCategoryName: "Opthalmologist"
						
			};
			var result = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.insert(product);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var product = {
					productCode: "PRD001",
					productName: "Test Updated product",
					productTypeName: "Core Updated",
					brandCode: "Brand 1",
					specialityCode: "EYE001",
					productCategoryCode: "PRCAT01",
					productCategoryName: "Opthalmologist"
			};
			var result = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.update(product);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var productOut = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get("PRD001");
			alert(JSON.stringify(productOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.remove("PRD001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.remove(null);
			alert(JSON.stringify(result));
		},
		
		testGetHasAssets: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getAllProductsHasAssets();
			alert(JSON.stringify(result));
		}
		
};