com.swaas.hidoctor.edetailing.dao.TestTPSFCLocalDAO = {
		
		testInsert: function(){
			var tpSFC = {
					tpId: "TP001",
					fromPlace: "Chennai-1",
					toPlace: "Chennai-5"
						
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPSFCLocalDAO.insert(tpSFC);
			alert(JSON.stringify(result));
		},
		
		testGetByTPId: function(){
			var tpSFCOut = com.swaas.hidoctor.edetailing.dao.TPSFCLocalDAO.getByTPId("TP001");
			alert(JSON.stringify(tpSFCOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPSFCLocalDAO.remove("TP001","Chennai-1","Chennai-5");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPSFCLocalDAO.remove(null, null, null);
			alert(JSON.stringify(result));
		}
		
};