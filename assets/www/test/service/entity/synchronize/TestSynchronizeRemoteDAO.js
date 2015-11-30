com.swaas.hidoctor.edetailing.dao.TestSynchronizeRemoteDAO = {
		testStartAndEndSync: function(){
			var correlationId = com.swaas.hidoctor.edetailing.dao.SynchronizeRemoteDAO.startSync("COM00000068", "USC00000045");
			alert ("correlationId: " + correlationId);
			var result = com.swaas.hidoctor.edetailing.dao.SynchronizeRemoteDAO.endSync(correlationId, "COM00000068", "USC00000045");
			if (result == true){
				alert(true);
			} else {
				alert(false);
			}
		}
};