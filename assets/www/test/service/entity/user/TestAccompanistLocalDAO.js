com.swaas.hidoctor.edetailing.dao.TestAccompanistLocalDAO = {
		
		testInsert: function(){
			var accompanist = {
					userName: "accompanist",
					regionCode: "CH001"
					};
			
			var result = com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO.insert(accompanist);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var accompanist = {
					userName: "accompanist",
					regionCode: "CH00111"
			};
			var result = com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO.update(accompanist);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var accompanistOut = com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO.get("accompanist");
			alert(JSON.stringify(accompanistOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO.remove("accompanist");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};