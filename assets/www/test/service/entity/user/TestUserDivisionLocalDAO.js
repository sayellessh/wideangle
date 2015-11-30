com.swaas.hidoctor.edetailing.dao.TestUserDivisionLocalDAO = {
		
		testInsert: function(){
			var userDivisionIn = {
					userCode: "test",
					divisionCode: "CH001",
					divisionName: "Chennai"
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.UserDivisionLocalDAO.insert(userDivisionIn);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var userDivisionIn = {
					userCode: "test",
					divisionCode: "CH001",
					divisionName: "Chennai Updated"
			};
			var result = com.swaas.hidoctor.edetailing.dao.UserDivisionLocalDAO.update(userDivisionIn);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var userDivisionOut = com.swaas.hidoctor.edetailing.dao.UserDivisionLocalDAO.get("test", "CH001");
			alert(JSON.stringify(userDivisionOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.UserDivisionLocalDAO.remove("test", "CH001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.UserDivisionLocalDAO.remove(null, null);
			alert(JSON.stringify(result));
		}
		
};