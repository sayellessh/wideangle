com.swaas.hidoctor.edetailing.dao.TestUserProductMappingLocalDAO = {
		
		testInsert: function(){
			var userProductMapping = {
					userCode: "U001",
					productCode: "P001"
					};
			
			var result = com.swaas.hidoctor.edetailing.dao.UserProductMappingLocalDAO.insert(userProductMapping);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var userProductMapping = com.swaas.hidoctor.edetailing.dao.UserProductMappingLocalDAO.get("U001", "P001");
			alert(JSON.stringify(userProductMapping));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.UserProductMappingLocalDAO.remove("U001", "P001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.UserProductMappingLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};