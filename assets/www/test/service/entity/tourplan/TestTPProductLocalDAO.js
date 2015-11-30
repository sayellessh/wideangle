com.swaas.hidoctor.edetailing.dao.TestTPProductLocalDAO = {
		
		testInsert: function(){
			var tpProduct = {
					tpDoctorId: "DR001",
					productCode: "PRD001",
					quantity: "25"
						
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPProductLocalDAO.insert(tpProduct);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var tpProduct = {
					tpDoctorId: "DR001",
					productCode: "PRD001",
					quantity: "5"
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPProductLocalDAO.update(tpProduct);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var tpProductOut = com.swaas.hidoctor.edetailing.dao.TPProductLocalDAO.get("DR001", "PRD001");
			alert(JSON.stringify(tpProductOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPProductLocalDAO.remove("DR001", "PRD001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPProductLocalDAO.remove(null, null);
			alert(JSON.stringify(result));
		}
};