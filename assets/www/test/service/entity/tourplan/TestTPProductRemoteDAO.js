com.swaas.hidoctor.edetailing.dao.TestTPProductRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPProductRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};