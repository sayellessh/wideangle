function RemoveActivity(selectedActivity, activityManager) {
	this.assetActivity = selectedActivity;
	this.activityManager = activityManager;
}

RemoveActivity.prototype.run = function() {

	if (this.assetActivity.status == "NEW") {
		this.assetActivity.status = "STARTED";
		return;
	}

	if (this.assetActivity.status == "STARTED") {
		this.clearInSDCard();
		this.assetActivity.status = "SD_CARD_DONE";
		return;
	}

	if (this.assetActivity.status == "SD_CARD_DONE") {
		this.clearThumbnail();
		this.assetActivity.status = "THUMBNAIL_DONE";
		return;
	}

	if (this.assetActivity.status == "THUMBNAIL_DONE") {
		this.makeAssetAsOnline();
		this.assetActivity.status = "DONE";
		return;
	}

};

RemoveActivity.prototype.clearInSDCard = function() {
	var asset = this.assetActivity.asset;
	var filePath = asset.downloadedFileName;

	var dirPath = com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder + '/' + asset.daCode;
	com.swaas.hidoctor.edetailing.util.FileUtil.deleteDirectory(dirPath);
	if(asset.documentType == 'ZIP') {
		var zipPath = com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder + '/' + asset.daCode + '.zip';
		com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(zipPath);	
	}
	com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(filePath);
};

RemoveActivity.prototype.clearThumbnail = function() {
	var asset = this.assetActivity.asset;
	var filePath = asset.downloadedThumbnail;

	com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(filePath);

};

RemoveActivity.prototype.makeAssetAsOnline = function() {	
	com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.update({
		daCode: this.assetActivity.asset.daCode,
		downloaded: 'N',
		downloadedFileName: null,
		downloadedThumbnail: null
	});
};