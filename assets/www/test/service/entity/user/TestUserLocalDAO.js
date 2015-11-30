com.swaas.hidoctor.edetailing.dao.TestUserLocalDAO = {
		
		testInsert: function(){
			var userIn = {
					companyCode: "C0001",
					userName: "Test User",
					password: "test123",
					url: "abc.com",
					userCode: "test",
					regionCode: "R0001",
					regionName: "Chennai",
					userTypeCode: "MR",
					regionHierarchy: "Chennai~Thambaram",
					userTypeName: "Medical Rep",
					lastSyncDate: new Date()
			};
			var result = com.swaas.hidoctor.edetailing.dao.UserLocalDAO.insert(userIn);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var userIn = {
					companyCode: "C0001",
					userName: "Test Update User",
					password: "test123",
					url: "abc.com",
					userCode: "test",
					regionCode: "R0001",
					regionName: "Chennai",
					userTypeCode: "MR",
					regionHierarchy: "Chennai~Thambaram",
					userTypeName: "Medical Rep",
					lastSyncDate: new Date()
			};
			var result = com.swaas.hidoctor.edetailing.dao.UserLocalDAO.update(userIn);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.UserLocalDAO.get("test");
			alert(JSON.stringify(userOut));
		},
		
		testRemove: function(){
			com.swaas.hidoctor.edetailing.dao.UserLocalDAO.remove("test");
			var userOut = com.swaas.hidoctor.edetailing.dao.UserLocalDAO.get("test");
			alert(JSON.stringify(userOut));
		},
		
		testRemoveAll: function(){
			com.swaas.hidoctor.edetailing.dao.UserLocalDAO.remove(null);
			var userOut = com.swaas.hidoctor.edetailing.dao.UserLocalDAO.get("test");
			alert(userOut);
		}
		
};