var DownloadUpdatedAssets = function(options) {
	this.asset = options.asset;
	this.progressCallback = options.progressCallback;
	this.successCallback = options.successCallback;
	this.failureCallback = options.failureCallback;
	this.downloadFile();
};

DownloadUpdatedAssets.prototype.downloadFile = function(asset, success) {
	var progressCallback = this.progressCallback;
	//var asset = this.assetActivity.asset;
	var ext = "mp4";
	var assetURLSplit = asset.offLineURL.split(".");
	if (assetURLSplit != null && assetURLSplit.length > 0) {
		ext = assetURLSplit.pop();
	}
	var fileName = asset.daCode + "." + ext;
	var assetFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder;
	this.downloadedFileName = assetFolder + "/" + fileName;
	if (asset.downloaded == 'Y'
			&& this.downloadedFileName == asset.downloadedFileName
			&& com.swaas.hidoctor.edetailing.util.FileUtil.checkIfFileExists(asset.downloadedFileName)) {
		alert(com.swaas.hidoctor.edetailing.ui.view.Resource.download.alreadyDownloaded + fileName);
		return;
	} else {
		var downloaderUtil = new Downloader();
		var _this = this;
		downloaderUtil.downloadFile(asset.offLineURL, assetFolder, fileName, {}, function(progressStatus) {
			if (progressStatus.status == -1) {
				ED.logError(this, progressStatus, asset, "downloadFile");
			}
			/*_this.progress = progressStatus.progress;
			_this.downloadStatus = progressStatus.status;*/
			if ((typeof progressStatus.dirName != 'undefined')
					&& progressStatus.dirName != null) {
				_this.downloadedFileName = progressStatus.dirName + "/" + fileName;
			}
			if(progressStatus.status >= 100) {
				_this.downloadThumbnail(asset, success);
			} else {
				progressCallback(progressStatus, 'file');
			}
		});
	}
};

DownloadUpdatedAssets.prototype.downloadThumbnail = function(asset, success) {
	var progressCallback = this.progressCallback;
	//var asset = this.assetActivity.asset;

	var ext = "jpg";
	var thumbnailURLSplit = asset.thumbnailURL.split(".");
	if (thumbnailURLSplit != null && thumbnailURLSplit.length > 0) {
		ext = asset.thumbnailURL.split(".").pop();
	}
	var fileName = asset.daCode + "." + ext;

	var assetFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder;
	this.downloadedThumbnail = assetFolder + "/" + fileName;
	if (this.downloadedThumbnail == asset.downloadedThumbnail
			&& com.swaas.hidoctor.edetailing.util.FileUtil
					.checkIfFileExists(this.downloadedThumbnail)) {
		return;
	} else {
		var downloaderUtil = new Downloader();
		var _this = this;
		downloaderUtil.downloadFile(asset.thumbnailURL, assetFolder, 'TN_' + fileName, {}, function(progressStatus) {
			if (progressStatus.status == -1) {
				ED.logError(this, progressStatus, asset, "downloadFile");
			}
			/*_this.progress = progressStatus.progress;
			_this.downloadStatus = progressStatus.status;*/
			if ((typeof progressStatus.dirName != 'undefined')
					&& progressStatus.dirName != null) {
				_this.downloadedThumbnail = progressStatus.dirName + "/TN_"
						+ fileName;
			}
			if (_this.downloadStatus == -1) {
				_this.error = progressStatus.error;
			}
			if(progressStatus.status == 100) {
				if(success) success();
			} else {
				progressCallback(progressStatus, 'thumb');
			}
		});
	}
};

DownloadUpdatedAssets.prototype.makeAssetAsOffline = function() {
	var asset = this.assetActivity.asset;
	if (asset.downloaded != 'Y') {
		this.assetActivity.asset.downloaded = 'Y';
		this.assetActivity.asset.downloadedFileName = this.downloadedFileName;
		com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.update({
			daCode : asset.daCode,
			downloaded : 'Y',
			downloadedFileName : this.downloadedFileName,
			downloadedThumbnail : this.downloadedThumbnail
		});
	}
};