com.swaas.hidoctor.edetailing.dao.TestActivityMasterRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ActivityMasterRemoteDAO.get("1","hdqaed.demo.hidoctor.in","HVM00000011", "USC00000010");
			alert(JSON.stringify(result));
		}
		
};