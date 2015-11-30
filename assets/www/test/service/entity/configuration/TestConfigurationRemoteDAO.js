com.swaas.hidoctor.edetailing.dao.TestConfigurationRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ConfigurationRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};