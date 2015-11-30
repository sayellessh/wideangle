com.swaas.hidoctor.edetailing.dao.TestChemistVisitDAO = {
		
		testInsert: function(){
			var chemistVisitIn = {
					
					chemistVisitCode :"CHV001",
					doctorVisitCode: "DCV002",	
					dcrCode : "CDR001",
					chemistCode: "CH001",	
					chemistName: "Chemist One",	
					poAmount: "200",
					isAccChemist : "Y"	
					
					};
			
			var chemistVisitOut = com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.insert(chemistVisitIn);
			alert(JSON.stringify(chemistVisitOut));
		},
		
		testUpdate: function(){
			var chemistVisitIn = {
					
					chemistVisitCode :"CHV001",
					doctorVisitCode: "DCV003",	
					dcrCode : "CDR002",
					chemistCode: "CH002",	
					chemistName: "Chemist Two",	
					poAmount: "300",
					isAccChemist : "N"	
						
			};
			var chemistVisitOut = com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.update(chemistVisitIn);
			alert(JSON.stringify(chemistVisitOut));
		},
		
		testGet: function(){
			var chemistVisitOut = com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.get("CHV001");
			alert(JSON.stringify(chemistVisitOut));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var chemistVisitOut = com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.remove("CHV001");
			alert(JSON.stringify(chemistVisitOut));
		},
		
		testRemoveAll: function(){
			var chemistVisitOut = com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.remove(null);
			alert(JSON.stringify(chemistVisitOut));
		}
		
};