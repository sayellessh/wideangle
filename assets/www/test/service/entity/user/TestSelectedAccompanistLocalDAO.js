com.swaas.hidoctor.edetailing.dao.TestSelectedAccompanistLocalDAO = {
		
		testInsert: function(){
			var accompanistIn = {
					accompnistName: "test",
					accompnistRegionCode: "CH001"
					};
			
			var accompanistOut = com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.insert(accompanistIn);
			alert(JSON.stringify(accompanistOut));
		},
		
		testGet: function(){
			var accompanistOut = com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.get("test");
			alert(JSON.stringify(accompanistOut));
		},
		
		testRemove: function(){
			var accompanistOut = com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.remove("test");
			alert(JSON.stringify(accompanistOut));
		},
		
		testRemoveAll: function(){
			var accompanistOut = com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.remove(null, null);
			alert(JSON.stringify(accompanistOut));
		}
		
};