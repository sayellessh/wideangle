com.swaas.hidoctor.edetailing.dao.TestDCRConfigSettingsRemoteDAO = {
		
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsRemoteDAO.get("1","hdqaapi.hidoctor.in", "HVM00000011", "USC00000010");
			alert(JSON.stringify(result));
		}
			
};