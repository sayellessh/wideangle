com.swaas.hidoctor.edetailing.dao.TestDoctorCategoryLocalDAO = {
		
		testInsert: function(){
			var category = {
					categoryCode: "Category One",
					categoryName: "Test Category"
			};
			var result = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.insert(category);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var category = {
					categoryCode: "CAT001",
					categoryName: "Updated Test Category"
			};
			var result = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.update(category);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var categoryOut = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get("Category One");
			alert(JSON.stringify(categoryOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.remove("Category One");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};