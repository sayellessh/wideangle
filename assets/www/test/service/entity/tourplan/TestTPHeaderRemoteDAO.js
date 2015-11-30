com.swaas.hidoctor.edetailing.dao.TestTPHeaderRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPHeaderRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};