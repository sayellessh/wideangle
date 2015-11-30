com.swaas.hidoctor.edetailing.dao.TestAnalyticsDetailedProductsLocalDAO = {
		
		testInsert: function(){
			var doctorVisitIn = {
					
					dcrActualDate: "27/9/2013",
					doctorCode : "DOC001",
					doctorRegionCode : "REG001",
					productCode :"PR001"
					
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.insert(doctorVisitIn);
			alert(JSON.stringify(result));
			
		},	
		
		testGet: function(){
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.get("27/9/2013","DOC001","REG001","PR001");
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.remove("27/9/2013","DOC001","REG001","PR001");
			alert(JSON.stringify(doctorVisitOut));
		},
		
		
};		