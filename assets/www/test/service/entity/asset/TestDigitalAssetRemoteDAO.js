com.swaas.hidoctor.edetailing.dao.TestDigitalAssetRemoteDAO = {
		testGet: function(){
			var tagToSearch = [];
			tagToSearch.push("DOCSPE_SPC00000024");
			tagToSearch.push("DOCCAT_DCT00000002");
			var result = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO.get("1", "COM00000068", "USC00000045", tagToSearch);
			alert(JSON.stringify(result));
		},
		
		testGetSync: function(){
			var tagToSearch = [];
			tagToSearch.push("DOCSPE_SPC00000024");
			tagToSearch.push("DOCCAT_DCT00000002");
			var params = {
					correlationId: "1",
					companyCode: "COM00000068",
					userCode: "USC00000045",
					tagToSearch: tagToSearch
			};
			var result = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO.syncGet(params);
			alert("No. Of Assets:" + result.length);
			alert(JSON.stringify(result[0]));
		}
};