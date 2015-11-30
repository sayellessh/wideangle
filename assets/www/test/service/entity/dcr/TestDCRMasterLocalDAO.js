com.swaas.hidoctor.edetailing.dao.TestDCRMasterLocalDAO = {
		
		testInsert: function(){
			var masterIn = {					
					dcrDate: new Date(2013,01,01),
					flag: "true",
					status: "Active"					
					};
			var masterOut = com.swaas.hidoctor.edetailing.dao.DCRMasterLocalDAO.insert(masterIn);
			alert(JSON.stringify(masterOut));
		},
		
		testGet: function(){
			var masterOut = com.swaas.hidoctor.edetailing.dao.DCRMasterLocalDAO.get(new Date(2013,01,01),"true","Active");
			alert(JSON.stringify(masterOut));
		},
		
		testRemove: function(){
			var masterOut = com.swaas.hidoctor.edetailing.dao.DCRMasterLocalDAO.remove(new Date(2013,01,01),"true","Active");
			alert(JSON.stringify(masterOut));
		},
		
		testRemoveAll: function(){
			var masterOut = com.swaas.hidoctor.edetailing.dao.DCRMasterLocalDAO.remove(null);
			alert(JSON.stringify(masterOut));
		}
		
};