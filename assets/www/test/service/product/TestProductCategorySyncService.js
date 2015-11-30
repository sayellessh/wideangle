com.swaas.hidoctor.edetailing.service.TestProductCategorySyncService = {
		testGetRemote: function(){
			var result = com.swaas.hidoctor.edetailing.service.ProductCategorySyncService.getRemoteImageUrls("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
};