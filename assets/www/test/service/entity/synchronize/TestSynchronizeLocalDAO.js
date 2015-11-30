com.swaas.hidoctor.edetailing.dao.TestSynchronizeLocalDAO = {
		
		testUpdateStatusTrue: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateStatus(true);
			alert(JSON.stringify(result));
		},
		
		testUpdateStatusFalse: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateStatus(false);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var status = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getStatus();
			alert(status);
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.remove();
			alert(JSON.stringify(result));
		}
};