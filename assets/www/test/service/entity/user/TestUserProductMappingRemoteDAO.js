com.swaas.hidoctor.edetailing.dao.TestUserProductMappingRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.UserProductMappingRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};