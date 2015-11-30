com.swaas.hidoctor.edetailing.dao.TestAnalyticsDoctorVisitLocalDAO = {
		
		testInsert: function(){
			var doctorVisitIn = {
					
					dcrActualDate: "7/10/2013",
					doctorCode : "DOC001",
					doctorRegionCode : "REG001",
					accompanistName :"Sunil",
					doctorVisitTime : "10:30",
					lattitude :"7 deg",
					longitude :"8 deg"
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.insert(doctorVisitIn);
			alert(JSON.stringify(result));
			
		},	
		testUpdate : function() {
			
             var doctorVisitIn = {
					
					dcrActualDate: "4/10/2013",
					doctorCode : "DOC001",
					doctorRegionCode : "REG001",
					accompanistName :"Abhijeet",
					doctorVisitTime : "11:30",
					lattitude :"5 deg",
					longitude :"9 deg"
			};
			
             var result = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.update(doctorVisitIn);
 			alert(JSON.stringify(result));
		
		},
		
		testGet: function(){
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.get("7/10/2013","DOC001","REG001");
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.remove("4/10/2013","DOC001","REG001");
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemoveAll: function(){
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.remove(null);
			alert(JSON.stringify(doctorVisitOut));
		}
};			