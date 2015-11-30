function DownloadActivity(selectedActivity, activityManager) {
	this.assetActivity = selectedActivity;
	this.activityManager = activityManager;
	this.downloadedFileName = null;
	this.downloadedThumbnail = null;
	this.progress = 0;
	this.downloadStatus = 0;
	this.error = null;
}

DownloadActivity.prototype.run = function() {
	var _this = this;
	if (this.assetActivity.status == "NEW") {
		this.assetActivity.status = "ASSET_DOWNLOADING";
		this.progress = 0;
		this.downloadStatus = 0;
		return;
	}
	
	if (this.assetActivity.status == "ASSET_DOWNLOADING") {
		this.downloadFile();
		this.assetActivity.status = "ASSET_DOWNLOADING_"  + this.progress;
		return;
	}	
	
	if (this.assetActivity.status.indexOf("ASSET_DOWNLOADING_") == 0){
		if (this.progress == 100){
			this.assetActivity.status = "ASSET_DOWNLOADED";
			this.progress = 0;
			this.downloadStatus = 0;
		} else {
			if (this.downloadStatus == -1){
				this.assetActivity.status = "FAILED"+this.error;
			} else {
				this.assetActivity.status = "ASSET_DOWNLOADING_" + this.progress;
			}
		}
		return;
	}
		
	if (this.assetActivity.status == "ASSET_DOWNLOADED") {
		this.downloadThumbnail();
		this.assetActivity.status = "THUMBNAIL_DOWNLOADING_"  + this.progress;
		return;
	}
	
	if (this.assetActivity.status.indexOf("THUMBNAIL_DOWNLOADING_") == 0){
		if (this.progress == 100){
			this.assetActivity.status = "THUMBNAIL_DOWNLOADED";
			this.progress = 0;
			this.downloadStatus = 0;
		} else {
			if (this.downloadStatus == -1){
				this.assetActivity.status = "FAILED";
			} else {
				this.assetActivity.status = "THUMBNAIL_DOWNLOADING_" + this.progress;
			}
		}
		return;
	}

	if (this.assetActivity.status == "THUMBNAIL_DOWNLOADED") {
		this.makeAssetAsOffline();
		_this.assetActivity.status = "DONE";
		return;
	}
};

DownloadActivity.prototype.downloadFile = function() {
	var asset = this.assetActivity.asset;
	var ext = "mp4";
	var assetURLSplit = asset.offLineURL.split(".");
	if (assetURLSplit != null && assetURLSplit.length > 0){
		ext = assetURLSplit.pop();
	}
	var fileName = asset.daCode + "." + ext;
	var assetFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder;
	this.downloadedFileName = assetFolder + "/" + fileName;
	if(asset.downloaded == 'Y' && this.downloadedFileName == asset.downloadedFileName && com.swaas.hidoctor.edetailing.util.FileUtil.checkIfFileExists(asset.downloadedFileName)){
		alert(com.swaas.hidoctor.edetailing.ui.view.Resource.download.alreadyDownloaded+fileName);
		return;
	}else{
		var downloaderUtil = new Downloader();
		var _this = this;
		downloaderUtil.downloadFile(asset.offLineURL, assetFolder, fileName, {}, function(progressStatus){
			if (progressStatus.status == -1){
            	ED.logError(this, progressStatus, asset, "downloadFile");
			}
			_this.progress = progressStatus.progress;
			_this.downloadStatus = progressStatus.status;
			if((typeof progressStatus.dirName != 'undefined') && progressStatus.dirName != null){
				_this.downloadedFileName = progressStatus.dirName + "/" + fileName;
			}
		});	
	}
};

DownloadActivity.prototype.downloadThumbnail = function() {
	
	var asset = this.assetActivity.asset;
	
	var ext = "jpg";
	var thumbnailURLSplit = asset.thumbnailURL.split(".");
	if (thumbnailURLSplit != null && thumbnailURLSplit.length > 0){
		ext = asset.thumbnailURL.split(".").pop();
	}	
	var fileName = asset.daCode + "." + ext;
	
	var assetFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder;
	this.downloadedThumbnail = assetFolder + "/" + fileName;
	if(this.downloadedThumbnail == asset.downloadedThumbnail && com.swaas.hidoctor.edetailing.util.FileUtil.checkIfFileExists(this.downloadedThumbnail)){
		return;
	} else {
		var downloaderUtil = new Downloader();
		var _this = this;
		downloaderUtil.downloadFile(asset.thumbnailURL, assetFolder, 'TN_' + fileName, {}, function(progressStatus){
			if (progressStatus.status == -1){
            	ED.logError(this, progressStatus, asset, "downloadFile");
			}	
			_this.progress = progressStatus.progress;
			_this.downloadStatus = progressStatus.status;
			if((typeof progressStatus.dirName != 'undefined') && progressStatus.dirName != null){
				_this.downloadedThumbnail = progressStatus.dirName + "/TN_" + fileName;
			}
			if(_this.downloadStatus == -1){
				_this.error = progressStatus.error;
			}
		});
	}
	};

DownloadActivity.prototype.makeAssetAsOffline = function(success, fail) {
	var asset = this.assetActivity.asset;
	if(asset.downloaded != 'Y') {
		
		asset.downloaded = 'Y';
		asset.downloadedFileName = this.downloadedFileName; 
		asset.downloadedThumbnail = this.downloadedThumbnail;
		
		var offlineURL = asset.offLineURL;
		
		if(offlineURL.endsWith('.zip') || asset.documentType == "ZIP") {
			com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.update(asset);
			asset.documentType = "ZIP";
			
			var zip = new ZipUtil();
			ED.showLoading('Extracting Zip file, this may take few minutes. Please wait...');
			zip.extract(asset, function(indexPath) {
				asset.downloadedFileName = indexPath;
				com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.update(asset);
				
				var product = com.swaas.hidoctor.edetailing.service.ProductService.getProduct(asset.productCode);
				if(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument)
					com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.populateAsset(product);
				
				ED.hideLoading();
				if(success) success();
			}, function(e) {
				if(fail) fail();
				ED.hideLoading();
			});	
		} else {
			com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.update({
				daCode: asset.daCode,
				downloaded: 'Y',
				downloadedFileName: this.downloadedFileName,
				downloadedThumbnail: this.downloadedThumbnail
			});
			if(success) success();
			ED.hideLoading();
		}
	} else {
		if(success) success();
	}
};