com.swaas.hidoctor.edetailing.dao.TestExpenseEntityMasterRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterRemoteDAO.get("1","hdqaed.demo.hidoctor.in","HVM00000011", "USC00000010");
			alert(JSON.stringify(result));
		}
		
};