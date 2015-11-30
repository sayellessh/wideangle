com.swaas.hidoctor.edetailing.dao.TestTPDoctorRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPDoctorRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};