com.swaas.hidoctor.edetailing.dao.TestRcpaDetailsDAO = {
		
		testInsert: function(){
			var rcpaIn = {
					
					dcrRcpaCode: "RCPA001",	
					chemistVisitCode: "CHV001",
					doctorVisitCode: "DCV001",	
					dcrCode: "DCR01",
					salesProductCode: "PRD001",	
					productCode: "PR001",
					competitorProductName: "Ciplax",
					competitorProductCode: "Cp01",					
					supportQty: "200mg"
					
					};
			
			var rcpaOut = com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.insert(rcpaIn);
			alert(JSON.stringify(rcpaOut));
		},
		
		testUpdate: function(){
			var rcpaIn = {
					
					dcrRcpaCode: "RCPA001",	
					chemistVisitCode: "CHV002",
					doctorVisitCode: "DCV002",	
					dcrCode: "DCR02",
					salesProductCode: "PRD002",	
					productCode: "PR002",
					competitorProductName: "IODEX",
					competitorProductCode: "io01",					
					supportQty: "800mg"
						
			};
			var rcpaOut = com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.update(rcpaIn);
			alert(JSON.stringify(rcpaOut));
		},
		
		testGet: function(){
			var rcpaOut = com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.get("RCPA001");
			alert(JSON.stringify(rcpaOut));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var rcpaOut = com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.remove("RCPA001");
			alert(JSON.stringify(rcpaOut));
		},
		
		testRemoveAll: function(){
			var rcpaOut = com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.remove(null);
			alert(JSON.stringify(rcpaOut));
		}
		
};