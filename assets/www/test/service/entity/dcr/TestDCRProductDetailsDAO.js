com.swaas.hidoctor.edetailing.dao.TestDCRProductDetailsDAO = {
		
		testInsert: function(){
			var detailIn = {
					
					dcrProductCode: "PD001",
					doctorVisitCode: "DV001",
					dcrCode: "DCR001",
					productCode: "PR001",	
					specialityCode : "SPC01",
					qtyGiven: "1 box"	
										
					};
			
			var detailOut = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.insert(detailIn);
			alert(JSON.stringify(detailOut));
		},
		
		testUpdate: function(){
			var detailIn = {

					dcrProductCode: "PD001",
					doctorVisitCode: "DV002",
					dcrCode: "DCR002",
					productCode: "PR002",	
					specialityCode : "SPC02",
					qtyGiven: "2 box"
						
			};
			var detailOut = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.update(detailIn);
			alert(JSON.stringify(detailOut));
		},
		
		testGet: function(){
			var detailOut = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.get("PD001");
			alert(JSON.stringify(detailOut));
		},
		
		testRemove: function(){
			var detailOut = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.remove("PD001");
			alert(JSON.stringify(detailOut));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemoveAll: function(){
			var detailOut = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.remove(null);
			alert(JSON.stringify(detailOut));
		}
		
};