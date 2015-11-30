com.swaas.hidoctor.edetailing.dao.TestTPSFCRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPSFCRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};