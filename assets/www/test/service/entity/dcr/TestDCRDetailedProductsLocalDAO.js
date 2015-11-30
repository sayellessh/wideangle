com.swaas.hidoctor.edetailing.dao.TestDCRDetailedProductsLocalDAO ={
		
		testInsert : function() {
			
			var product = {
					
					doctorVisitCode : "DCV001",
					dcrCode : "DOC001",
					salesProductCode: "SA001",
					modeOfEntry : "Manual"
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.insert(product);
			alert(JSON.stringify(result));
		},
		

		testUpdate : function() {
			
			var product = {
					
					doctorVisitCode : "DCV001",
					dcrCode : "DOC001",
					salesProductCode: "SA001",
					modeOfEntry : "Auto"
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.update(product);
			alert(JSON.stringify(result));
		},
		
		 testGet: function(){
				var result = com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.get("DCV001","DOC001","SA001");
				alert(JSON.stringify(result));
			},
			
			testRemove: function(){
				var result = com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.remove("DCV001","DOC001","SA001");
				alert(JSON.stringify(result));
			}
		
};		