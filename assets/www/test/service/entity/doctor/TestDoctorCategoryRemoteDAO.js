com.swaas.hidoctor.edetailing.dao.TestDoctorCategoryRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DoctorCategoryRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
		
};