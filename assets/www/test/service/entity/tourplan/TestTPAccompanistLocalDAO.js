com.swaas.hidoctor.edetailing.dao.TestTPAccompanistLocalDAO = {
		
		testInsert: function(){
			var tpAccompanist = {
					tpId: "TP001",
					accompnistName: "Test Accompanist",
					accompnistRegionCode: "CH001"
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.insert(tpAccompanist);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var tpAccompanist = {
					tpId: "TP001",
					accompnistName: "Test Accompanist",
					accompnistRegionCode: "CH111"
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.update(tpAccompanist);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var tpAccompanistOut = com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.get("TP001", "Test Accompanist");
			alert(JSON.stringify(tpAccompanistOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.remove("TP001", "Test Accompanist");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.remove(null, null);
			alert(JSON.stringify(result));
		}
		
};