com.swaas.hidoctor.edetailing.dao.TestUniqueProductCodeLocalDAO = {
		
		testInsert: function(){
			var product = {
					productCode: "PRD001",
					productName: "Product1"
						
			};
			var productOut = com.swaas.hidoctor.edetailing.dao.UniqueProductCodeLocalDAO.insert(product);
			alert(JSON.stringify(productOut));
		},
		
		testGet: function(){
			var productOut = com.swaas.hidoctor.edetailing.dao.UniqueProductCodeLocalDAO.get("PRD001","Product1");
			alert(JSON.stringify(productOut));
		},
		
		testRemove: function(){
			var productOut = com.swaas.hidoctor.edetailing.dao.UniqueProductCodeLocalDAO.remove("PRD001","Product1");
			alert(JSON.stringify(productOut));
		},
		
		testRemoveAll: function(){
			var productOut = com.swaas.hidoctor.edetailing.dao.UniqueProductCodeLocalDAO.remove(null, null);
			alert(JSON.stringify(productOut));
		}
		
};