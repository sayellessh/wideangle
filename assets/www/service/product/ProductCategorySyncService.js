com.swaas.hidoctor.edetailing.service.ProductCategorySyncService = {
		metadata: {
			"service" : "HDInfrastructureService"
		},
		
		getRemoteImageUrls: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetImagePath", data);
			return result.Tables[0].Rows;
		},
		
		syncGet: function(params){
			var _this = com.swaas.hidoctor.edetailing.service.ProductCategorySyncService;
			return _this.getRemoteImageUrls(params.correlationId, params.companyCode, params.userCode);
		},
		
		dowloader: null,
		
		storeImage: function(url){
			var _this = com.swaas.hidoctor.edetailing.service.ProductCategorySyncService;
			if (_this.dowloader == null){
				_this.dowloader = new Downloader();
			}
			_this.dowloader.downloadFile(url, com.swaas.hidoctor.edetailing.ui.view.Resource.download.productCategoryFolder);
		},
		
		syncPut: function(params){
			var _this = com.swaas.hidoctor.edetailing.service.ProductCategorySyncService;
			return _this.storeImage(params.PathInfo);
			
		},
		
		clean: function(){
			com.swaas.hidoctor.edetailing.util.FileUtil.deleteDirectory(com.swaas.hidoctor.edetailing.ui.view.Resource.download.productCategoryFolder);
		}
		
};
