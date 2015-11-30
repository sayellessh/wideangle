com.swaas.hidoctor.edetailing.dao.TestSpecialityRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SpecialityRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};