com.swaas.hidoctor.edetailing.dao.TestMcDoctorsLocalDAO = {
		
		testInsert: function(){
			var mcDoctor = {
					mcCode: "MC001",
					doctorCode: "DOC001",
					regionCode: "Chennai001"
						
			};
			var mcDoctorOut = com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO.insert(mcDoctor);
			alert(JSON.stringify(mcDoctorOut));
		},
		
		testGet: function(){
			var mcDoctorOut = com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO.get( "MC001", "DOC001","Chennai001");
			alert(JSON.stringify(mcDoctorOut));
		},
		
		testRemove: function(){
			var mcDoctorOut = com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO.remove( "MC001", "DOC001","Chennai001");
			alert(JSON.stringify(mcDoctorOut));
		},
		
		testRemoveAll: function(){
			var mcDoctorOut = com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO.remove(null, null, null);
			alert(JSON.stringify(mcDoctorOut));
		}
		
};