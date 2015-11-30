com.swaas.hidoctor.edetailing.dao.TestAssetResultLocalDAO = {
		
		testInsert: function(){
			var userIn = {
					daCode: "D0001",
					prdCode: "P0001",
					daMetaData: "MetaData"
					
			};
			var userOut = com.swaas.hidoctor.edetailing.dao.AssetResultLocalDAO.insert(userIn);
			alert(JSON.stringify(userOut));
		},
		
		testUpdate: function(){
			var userIn = {
					daCode: "D0001",
					prdCode: "P0001",
					daMetaData: "MetaDataUpdated"
			};
			var userOut = com.swaas.hidoctor.edetailing.dao.AssetResultLocalDAO.update(userIn);
			alert(JSON.stringify(userOut));
		},
		
		testGet: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.AssetResultLocalDAO.get("D0001","P0001");
			alert(JSON.stringify(userOut));
		},
		
		testRemove: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.AssetResultLocalDAO.remove("D0001","P0001");
			alert(JSON.stringify(userOut));
		},
		
		testRemoveAll: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.AssetResultLocalDAO.remove(null, null);
			alert(JSON.stringify(userOut));
		}
		
};
