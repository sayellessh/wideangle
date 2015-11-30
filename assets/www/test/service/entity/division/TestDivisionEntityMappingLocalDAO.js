com.swaas.hidoctor.edetailing.dao.TestDivisionEntityMappingLocalDAO = {
		
		testInsert: function(){
			var userIn = {
					divisionCode: "DIV00000001",
					entityCode: "PDC00000001",
					entityType: "PRODUCT",
			};
			var result = com.swaas.hidoctor.edetailing.dao.DivisionEntityMappingLocalDAO.insert(userIn);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var userIn = {
					divisionCode: "DIV00000001",
					entityCode: "PDC00000001",
					entityType: "PRODUCT-2",
			};
			var userOut = com.swaas.hidoctor.edetailing.dao.DivisionEntityMappingLocalDAO.update(userIn);
			alert(JSON.stringify(userOut));
		},
		
		testGet: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.DivisionEntityMappingLocalDAO.get("DIV00000001","PDC00000001");
			alert(JSON.stringify(userOut));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DivisionEntityMappingLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.DivisionEntityMappingLocalDAO.remove("DIV00000001","PDC00000001");
			alert(JSON.stringify(userOut));
		},
		
		testRemoveAll: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.DivisionEntityMappingLocalDAO.remove(null,null);
			alert(JSON.stringify(userOut));
		}
		
};
