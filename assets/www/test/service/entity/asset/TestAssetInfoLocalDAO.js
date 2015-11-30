com.swaas.hidoctor.edetailing.dao.TestDigitalAssetResultLocalDAO = {
		
		testInsert: function(){
			var digitalAsset = {
					daCode: "DA0001",
					productCodes: "PRD001#PRD002",
					daMetaData: "META001#META002"
										
			};
			var result = com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.insert(digitalAsset);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var digitalAsset = {
					daCode: "DA0001",
					productCodes: "PRD001#PRD002#PRD003",
					daMetaData: "META001#META005"
										
			};
			var result = com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.update(digitalAsset);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var digitalAsset = com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.get("DA0001");
			alert(JSON.stringify(digitalAsset));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.remove("DA0001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};
