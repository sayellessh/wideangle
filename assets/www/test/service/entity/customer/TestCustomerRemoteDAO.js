com.swaas.hidoctor.edetailing.dao.TestCustomerRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.CustomerRemoteDAO.get("1", "COM00000068", "USC00000045", "REC00000001");
			alert(JSON.stringify(result));
			console.log(JSON.stringify(result));
			//var result = com.swaas.hidoctor.edetailing.dao.CustomerRemoteDAO.get("1", "COM00000068", "USC00000045", ["REC00000043", "REC00000044"]);
			//alert(JSON.stringify(result));
			//console.log(JSON.stringify(result));
		}
		
};