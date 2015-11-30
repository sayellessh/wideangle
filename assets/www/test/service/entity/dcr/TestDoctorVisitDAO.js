com.swaas.hidoctor.edetailing.dao.TestDoctorVisitDAO = {
		
		testInsert: function(){
			var doctorVisitIn = {
					
					doctorVisitCode: "DCV 001",
					dcrCode : "DCR 001",
					doctorCode : "Dc001",
					doctorName :"Sunil",
					categoryCode : "CG001",
					specialityName :"SY001",
					doctorRegionCode :"Reg001",
					enteredDateTime : "new Date()",
					doctorVisitTime :"1:01",
					visitMode :"Manual",
					remarksByUser :"Good",
					poAmount :"800",
					lattitude :"12 deg",
					longitude :"23 deg",
					sourceOfEntry :"Tablet",
					isAccDoctor :"yes",
					modeOfEntry :"Auto"
					};
			
		var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.insert(doctorVisitIn);
		alert(JSON.stringify(doctorVisitOut));
		},
		
		testUpdate: function(){
			var doctorVisitIn = {
					
					doctorVisitCode : "DCV 001",
					dcrCode:"DCR002",
					doctorCode : "Dc003",
					doctorName :"Abhijeet",
					categoryCode : "CG002",
					specialityName :"SY002",
					doctorRegionCode :"Reg002",
					enteredDateTime : "new Date()",
					doctorVisitTime :"1:02",
					visitMode :"Auto",
					remarksByUser :" Bad ",
					poAmount :"900",
					lattitude :"12.5 deg",
					longitude :"23.5 deg",
					location :"Mangalore",
					sourceOfEntry :"Tablet Device",
					isAccDoctor :"No",
					modeOfEntry :"Manual"

						
			};
	var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.update(doctorVisitIn);
		alert(JSON.stringify(doctorVisitOut));
		},
		
		testGet: function(){
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.get("DCV 001");
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.remove("DCV 001");
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemoveAll: function(){
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.remove(null);
			alert(JSON.stringify(doctorVisitOut));
		}
		
};