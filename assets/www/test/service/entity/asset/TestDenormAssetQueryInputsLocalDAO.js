com.swaas.hidoctor.edetailing.dao.TestDenormAssetQueryInputsLocalDAO = {
		
		testInsert: function(){
			var assetInputIn = {
					col1: "Test User",
					col2: "Test User",
					col3: "Test User",
					col4: "Test User",
					col5: "Test User",
					col6: "Test User",
					col7: "Test User",
					col8: "Test User",
					col9: "Test User",
					col10: "Test User"
					
			};
			var assetInputOut = com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsLocalDAO.insert(assetInputIn);
			alert(JSON.stringify(assetInputOut));
		},
		
		testGetAll: function(){
			var assetInputOut = com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsLocalDAO.getAll();
			if (assetInputOut.length > 0){
				alert("length: " + assetInputOut.length + ", " + JSON.stringify(assetInputOut[0]));
			} else {
				alert("No data found");
			}
		},

		testRemoveAll: function(){
			var assetInputOut = com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsLocalDAO.removeAll();
			alert(JSON.stringify(assetInputOut));
		}
		
};
