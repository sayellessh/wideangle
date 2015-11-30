com.swaas.hidoctor.edetailing.dao.TestCustomerLocalDAO = {
		
		testInsert: function(){
			var userIn = {
					customerCode: "DOC001",
					regionCode: "R0001",
					customerName: " Customer Name",
					mdl: " Mdl 1",
					categoryCode:"Category One",
					specialityCode:"Speciality One",
					customerEntityType:"DOCTOR",
					lastVisitedDate:new Date()
			};
			var result = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.insert(userIn);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var userIn = {
					customerCode: "DOC001",
					regionCode: "R0001",
					customerName: " Customer Name Updated",
					mdl: " Mdl 1",
					categoryCode:"Category One",
					specialityCode:" Speciality One",
					customerEntityType:"DOCTOR",
					lastVisitedDate:new Date()
			};
			var userOut = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.update(userIn);
			alert(JSON.stringify(userOut));
		},
		
		testGet: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.get("DOC001","R0001");
			alert(JSON.stringify(userOut));
		},
		
		testRemove: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.remove("DOC001","R0001");
			alert(JSON.stringify(userOut));
		},
		
		testRemoveAll: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.remove(null,null);
			alert(JSON.stringify(userOut));
		}
		
};
