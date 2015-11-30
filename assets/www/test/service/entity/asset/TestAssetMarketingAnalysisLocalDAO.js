com.swaas.hidoctor.edetailing.dao.TestAssetMarketingAnalysisLocalDAO = {
		
		testInsert: function(){
			var assetMarketing = {
					companyCode : "C001",
					daId : "DA001",
					dcrActualDate : new Date(),
					userCode : "USR001",
					productCode : "P0001",
					productName : "Product 1",
					doctorCode : "DOC001",
					doctorRegionCode : "Chenai 1",
					mode : "Offline",
					playTime : "5.00"					
					};
			var result = com.swaas.hidoctor.edetailing.dao.AssetMarketingAnalysisLocalDAO.insert(assetMarketing);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var assetMarketing = {
					companyCode : "C001",
					daId : "DA001",
					dcrActualDate : new Date(),
					userCode : "USR001",
					productCode : "P0001",
					productName : "Product Updated",
					doctorCode : "DOC001",
					doctorRegionCode : "Chenai Updated",
					mode : "Offline",
					playTime : "5.00"					
					};
			var result =com.swaas.hidoctor.edetailing.dao.AssetMarketingAnalysisLocalDAO.update(assetMarketing);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.AssetMarketingAnalysisLocalDAO.get("C001", "DA001","USR001");
			alert(JSON.stringify(result));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.AssetMarketingAnalysisLocalDAO.remove("C001", "DA001","USR001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.AssetMarketingAnalysisLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};
