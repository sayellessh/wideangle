com.swaas.hidoctor.edetailing.dao.TestDCRConfigSettingsLocalDAO ={
		
		testInsert : function() {
			
			var config ={
					dcrDocVisitTimeEntryMode : "Visit time Mode",
					dcrEntryTimeGap : "5",
					leaveEntryMode :"FullDay",
					geoLocationSupport : "TRUE"	
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO.insert(config);
			alert(JSON.stringify(result));
			
		},
		
		testUpdate : function() {
			
			var config ={
					dcrDocVisitTimeEntryMode : "Visit time Mode Update",
					dcrEntryTimeGap : "6",
					leaveEntryMode :"Half Day",
					geoLocationSupport : "False"	
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO.update(config);
			alert(JSON.stringify(result));
			
		},
		
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO.get();
			alert(JSON.stringify(result));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO.remove();
			alert(JSON.stringify(result));
		}
	
		
		
		
		
		
		
		
		
		
		
};