com.swaas.hidoctor.edetailing.dao.TestUserDivisionRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.UserDivisionRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};