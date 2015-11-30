com.swaas.hidoctor.edetailing.dao.TestProductsByUserProductRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ProductsByUserProductRemoteDAO.get("1","hdqaapi.hidoctor.in", "HVM00000011", "USC00000010","Sales");
			alert(JSON.stringify(result));
		}
		
};