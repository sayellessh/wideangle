com.swaas.hidoctor.edetailing.dao.TestDCRDoctorAccompanistLocalDAO ={
		
		testInsert : function() {
			
			var doctor = {
					
					doctorVisitCode : "DCV001",
					dcrCode : "DCR001",
					accUserName : "Senthil",
					accUserTypeName: "Sales",
					accUserCode:"USC001",
					accRegionCode:"REG001",
					isOnlyForDoctor:"Y",
					modeOfEntry:"Web"
				
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.insert(doctor);
			alert(JSON.stringify(result));
			
		},
		
		
		testUpdate : function() {
			
            var doctor = {
					
            		doctorVisitCode : "DCV001",
					dcrCode : "DCR001",
					accUserName : "Sunil",
					accUserTypeName: "Sales Manager",
					accUserCode:"USC002",
					accRegionCode:"REG002",
					isOnlyForDoctor:"N",
					modeOfEntry:"Tablet"
				
			};
			
            var result = com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.update(doctor);
			alert(JSON.stringify(result));
		},
		
		  testGet: function(){
				var result = com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.get("DCV001");
				alert(JSON.stringify(result));
			},
			
			testRemove: function(){
				var result = com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.remove("DCV001");
				alert(JSON.stringify(result));
			}
		

};			