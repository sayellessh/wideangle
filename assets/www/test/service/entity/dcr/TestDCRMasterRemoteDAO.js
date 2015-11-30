com.swaas.hidoctor.edetailing.dao.TestDCRMasterRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DCRMasterRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};