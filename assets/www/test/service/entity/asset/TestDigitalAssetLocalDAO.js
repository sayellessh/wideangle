com.swaas.hidoctor.edetailing.dao.TestDigitalAssetLocalDAO = {
		
		testInsert: function(){
			var userIn = {
					productCode: "P0001",
					daCode: "DA001",
					fileUploadDateTime: new Date(),
					downloadDateTime: new Date(),
					mode: "Insert",
					onlineURL: "http://localhost",
					offLineURL: "http://remotehost",
					lastFileUpdatedTimeStamp: new Date(),
					lastTagUpdatedTimeStamp: new Date()
					
			};
			var userOut = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.insert(userIn);
			alert(JSON.stringify(userOut));
		},
		
		testUpdate: function(){
			var userIn = {
					productCode: "P0002",
					daCode: "DA001",
					fileUploadDateTime: new Date(),
					downloadDateTime: new Date(),
					mode: "Update",
					onlineURL: "http://localhost",
					offLineURL: "http://remotehost",
					lastFileUpdatedTimeStamp: new Date(),
					lastTagUpdatedTimeStamp: new Date()
			};
			var userOut = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.update(userIn);
			alert(JSON.stringify(userOut));
		},
		
		testGet: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.get("DA001");
			alert(JSON.stringify(userOut));
		},
		
		testRemove: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.remove("DA001");
			alert(JSON.stringify(userOut));
		},
		
		testRemoveAll: function(){
			var userOut = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.remove(null);
			alert(JSON.stringify(userOut));
		}
		
};
