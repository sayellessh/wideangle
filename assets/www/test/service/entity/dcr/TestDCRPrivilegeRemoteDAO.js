com.swaas.hidoctor.edetailing.dao.TestDCRPrivilegeRemoteDAO = {
		
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DCRPrivilegeRemoteDAO.get("1","hdqaapi.hidoctor.in", "HVM00000011","UTC00000008" ,"USC00000010");
			alert(JSON.stringify(result));
		}
			
};