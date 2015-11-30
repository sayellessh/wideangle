com.swaas.hidoctor.edetailing.dao.TestSalesProductRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SalesProductRemoteDAO.get("1","hdqaapi.hidoctor.in", "HVM00000011", "USC00000010");
			alert(JSON.stringify(result));
		}
		
};