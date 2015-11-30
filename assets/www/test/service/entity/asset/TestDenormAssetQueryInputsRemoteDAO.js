com.swaas.hidoctor.edetailing.dao.TestDenormAssetQueryInputsRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsRemoteDAO.get("1", "COM00000068", "USC00000045", "REC00000043");
			alert(JSON.stringify(result));
			
			//var result = com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsRemoteDAO.get("1", "COM00000068", "USC00000045", ["REC00000043", "REC00000044"]);
			//alert(JSON.stringify(result));
		}
		
};