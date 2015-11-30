com.swaas.hidoctor.edetailing.ui.view.CoreViewIos = {
	getAssetURL : function(asset, onGetAssetURL) {
		var assetURL = '';
		if (asset.downloaded == 'Y'){
			//var fileEntry =
			com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(asset.downloadedThumbnail, function(fileEntry){
				if (fileEntry != null){
					assetURL = fileEntry.fullPath;
				} else {
					asset.downloaded = 'N';
				}
				if(onGetAssetURL) onGetAssetURL(assetURL);
			});
		} else {
			var networkType = com.swaas.hidoctor.edetailing.net.CoreNET.getNetworkType();
			var user = com.swaas.hidoctor.edetailing.ui.view.CoreView.context.currentUser;
			if(networkType != null && networkType != '' && user != null && asset.documentType == 'VIDEO'){
				//assetURL =
				com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO.getAssetURL('1', user.companyCode, user.userCode, asset.onlineURL, networkType, function(assetURL){
					if(onGetAssetURL) onGetAssetURL(assetURL);
				});
			}else{
				assetURL = asset.onlineURL;
				if(onGetAssetURL) onGetAssetURL(assetURL);
			}
		}
		//return assetURL;
	},
					  
	getAssetVideoURL : function(asset, onGetAssetURL) {
		var assetURL = '';
		if (asset.downloaded == 'Y'){
			//var fileEntry =
			var downloadedFileName = asset.downloadedFileName;
			com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(downloadedFileName, function(fileEntry){
				if (fileEntry != null){
					assetURL = fileEntry.fullPath;
				} else {
					asset.downloaded = 'N';
				}
				if(onGetAssetURL) onGetAssetURL(assetURL);
			}, function(e) {
			});
		} else {
			var networkType = com.swaas.hidoctor.edetailing.net.CoreNET.getNetworkType();
			var user = com.swaas.hidoctor.edetailing.ui.view.CoreView.context.currentUser;
			if(networkType != null && networkType != '' && user != null && asset.documentType == 'VIDEO'){
				//assetURL =
				com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO.getAssetVideoURL('1', user.companyCode, user.userCode, asset.onlineURL, networkType, function(assetURL){
					if(onGetAssetURL) onGetAssetURL(assetURL);
				});
			}else{
				assetURL = asset.onlineURL;
				if(onGetAssetURL) onGetAssetURL(assetURL);
			}
		}
		//return assetURL;
	},

	getThumbnailURL : function(asset, onGetThumbnailURL) {
		var thumbnailURL = '';
		if (asset.downloaded == 'Y'){
			if(asset.documentType == 'ZIP') {
				//var thumbnailURL = asset.downloadedThumbnail.replace('file:///storage/sdcard0/', '');
				if(onGetThumbnailURL) onGetThumbnailURL(asset.downloadedThumbnail);
			} else {
				com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(asset.downloadedThumbnail, function(fileEntry){
					console.log(JSON.stringify(fileEntry));
					if (fileEntry != null){
						thumbnailURL = fileEntry.fullPath;
					} else {
						asset.downloaded = 'N';
					}
					if(onGetThumbnailURL) onGetThumbnailURL(thumbnailURL);
				}, function(e) {
					fail(e);
				});
			}
		}
		if (asset.downloaded != 'Y'){
			if (com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()){
				thumbnailURL = asset.thumbnailURL;
				if(onGetThumbnailURL) onGetThumbnailURL(thumbnailURL);
			} else {
				if (asset.documentType == 'VIDEO'){
					thumbnailURL = "../../hidoctor/images/offlineThumnailVideo.png";
				} else {
					thumbnailURL = "../../hidoctor/images/offlineThumnail.png";
				}
				if(onGetThumbnailURL) onGetThumbnailURL(thumbnailURL);
			}
		
		}
		//return thumbnailURL;
	}
};

var objToString = function(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
};
var fail = function(e) {
	var msg = '';
    switch ( e.code ) {
        case FileError.ENCODING_ERR:
            msg = 'ENCODING_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        case FileError.NO_MODIFICATION_ALLOWED_ERR:
            msg = 'NO_MODIFICATION_ALLOWED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.NOT_READABLE_ERR:
            msg = 'NOT_READABLE_ERR';
            break;
        case FileError.PATH_EXISTS_ERR:
            msg = 'PATH_EXISTS_ERR';
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.TYPE_MISMATCH_ERR:
            msg = 'TYPE_MISMATCH_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };
    alert( 'Error: ' + msg );
};
