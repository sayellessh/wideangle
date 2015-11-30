com.swaas.hidoctor.edetailing.dao.TestBrandRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.BrandRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};