com.swaas.hidoctor.edetailing.dao.TestBrandLocalDAO = {
		
		testInsert: function(){
			var branndIn = {
					brandCode: "P001",
					brandName: "MyBrand"
					};
			
			var result = com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.insert(branndIn);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var branndIn = {
					brandCode: "P001",
					brandName: "MyBrandUpdated"
			};
			var result = com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.update(branndIn);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var branndOut = com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.get("P001");
			alert(JSON.stringify(branndOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.remove("P001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};