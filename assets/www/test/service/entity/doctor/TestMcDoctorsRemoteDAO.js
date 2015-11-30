com.swaas.hidoctor.edetailing.dao.TestMcDoctorsRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.McDoctorsRemoteDAO.get("1", "COM00000068", "USC00000045", "REC00000043");
			alert(JSON.stringify(result));
		}
};