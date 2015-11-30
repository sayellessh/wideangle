com.swaas.hidoctor.edetailing.dao.TestUserRemoteDAO = {
		
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.UserRemoteDAO.get("anand163", "localhost");
			alert(JSON.stringify(result));
		},
		testLogin: function(){
			var result = com.swaas.hidoctor.edetailing.dao.UserRemoteDAO.login("anand163", "hidoctor", "localhost");
			alert(JSON.stringify(result));
		}
};