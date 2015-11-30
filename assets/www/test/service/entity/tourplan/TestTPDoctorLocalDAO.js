com.swaas.hidoctor.edetailing.dao.TestTPDoctorLocalDAO = {
		
		testInsert: function(){
			var tpDoctor = {
					tpId: "TP001",
					tpDoctorId: "D001",
					doctorCode: "Test Doctor",
					doctorRegionCode: "CH001"
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO.insert(tpDoctor);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var tpDoctor = {
					tpId: "TP001",
					tpDoctorId: "D001",
					doctorCode: "Test Doctor",
					doctorRegionCode: "CH111"
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO.update(tpDoctor);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var tpDoctorOut = com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO.get("D001");
			alert(JSON.stringify(tpDoctorOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO.remove("D001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
};