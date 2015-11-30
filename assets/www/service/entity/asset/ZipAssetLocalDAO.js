com.swaas.hidoctor.edetailing.dao.ZipAssetLocalDAO = {
		
		paramsCnt: 0,
		pendingDownload: 0,
		metadata: {
			"tableName" : "tbl_DIGASSETS_MASTER",
			"columns": [
						{name: "productCode", columnName: "Product_Code", pk:true},
						{name: "daCode", columnName: "DA_Code", pk:true},
						{name: "fileUploadDateTime", columnName: "DA_FileUploadDateTime"},
						{name: "downloadDateTime", columnName:"DA_DownloadDateTime"},
						{name: "mode", columnName:"Mode"},
						{name: "name", columnName:"DAName"},
						{name: "offLineOutPutId", columnName: "OfflineOutPutId"},
						{name: "onLineOutPutId",  columnName: "OnlineOutPutId"},
						{name: "onlineURL", columnName:"OnlineURL"},
						{name: "offLineURL", columnName:"OffLineURL"},
						{name: "lastFileUpdatedTimeStamp", columnName:"LastFileUpdatedTimeStamp", isDate:true},
						{name: "lastTagUpdatedTimeStamp", columnName:"LastTagUpdatedTimeStamp", isDate:true},
						{name: "downloaded", columnName: "Downloaded" },
						{name: "downloadedFileName", columnName: "DownloadedFileName" },
						{name: "downloadedThumbnail", columnName: "DownloadedThumbnail" },
						{name: "documentType", columnName: "DocumentType" },
						{name: "downloadable", columnName: "IsDownloadable" },
						{name: "thumbnailURL", columnName: "ThumnailURL" },
						{name: "marketingCampaign", columnName: "IsMarketingCampaign"}
						]
		},
		
		insert: function(asset){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, asset);
		},
		
		update: function(asset){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, asset);
		},
		
		remove: function(daCode, productCode){
			var criteria = {};
			criteria.daCode = daCode;
			criteria.productCode = productCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(daCode, productCode){
			var criteria = {};
			criteria.daCode = daCode;
			criteria.productCode = productCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getAll: function(success, failure){
			var results = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, []);
			if(results != undefined && results != null && results.length >= 0) {
				if(success) {
					success(results);
				}
			} else {
				if(failure) {
					failure('Error occured');
				}
			}
		},
		
		getByCode: function(daCode){
			var criteria = {};
			criteria.daCode = daCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);		
			return result;
		},
		getByProduct: function(productCode){
			var criteria = {};
			criteria.productCode = productCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		getByOutputId: function(onLineOutPutId){
			var criteria = {};
			criteria.onLineOutPutId = onLineOutPutId;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		getOfflineAssetsByProductCode: function(productCode){
			var criteria = {};
			criteria.productCode = productCode;
			criteria.downloaded = 'Y';
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		getAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			return result;
		},
		
		getDownloadableAssetsByProductCode: function(productCode){
			var criteria = {};
			criteria.productCode = productCode;
			criteria.downloadable = 'Y';
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
				
		_insertForProduct: function(productCode, params){
			
			var product = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(productCode);
			
			if( product != null){
				var digitalAsset = {
						productCode:productCode,
						daCode: params.daCode,
						mode: params.mode,
						name: params.name,
						offLineOutPutId: params.offLineOutPutId,
						onLineOutPutId: params.onLineOutPutId,
						onlineURL: params.onlineURL,
						offLineURL: params.offLineURL,
						downloaded: 'N',
						documentType: params.documentType,
						downloadable: params.downloadable,
						thumbnailURL: params.thumbnailURL,
						marketingCampaign: params.marketingCampaign
				};
				this.insert(digitalAsset);
				if (product.hasDigitalAssets != true){
					com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.update({
						productCode: productCode,
						hasDigitalAssets: true
						});
				}
			} else {
				console.log("Invalid Product Code : " + productCode);
			}
		},
		
		syncPutResults: function(result){
			com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.syncPut(result);
		},
		
		syncPut: function(params){
			//alert('Sync put ' + params);
			var _this = this;
			var offlineURL = params.offLineURL;
			_this.paramsCnt++;
			ED.showLoading('Downloading and extracting zip files, this may take few minutes. Please wait...');	
			if(offlineURL.endsWith('.zip') || params.documentType == "ZIP") {
				var zip = new ZipUtil();
				_this.pendingDownload++;
				zip.downloadFile(params, function(indexPath, thumbFile) {
					_this.pendingDownload--;
					ED.showLoading('Downloading and extracting zip files, this may take few minutes. Please wait...');
					params.documentType = "ZIP";
					//params.onlineURL = 'file://' + indexPath;
					params.offLineURL = 'file://' + indexPath;
					params.downloadedThumbnail = thumbFile;
					params.downloadedFileName = params.offLineURL;
					params.downloaded = 'Y';
					
					_this.update(params);
					
					if(_this.pendingDownload <= 0) {
						//com.swaas.hidoctor.edetailing.service.DownSynchronizeService.syncBatchComplete();
						ED.hideLoading();
					}
					//ED.hideLoading();
				}, function(e) {
					if(_this.pendingDownload <= 0) {
						//com.swaas.hidoctor.edetailing.service.DownSynchronizeService.syncBatchComplete();
						ED.hideLoading();
					}
					//ED.hideLoading();
				});	
			} else {
				if(_this.pendingDownload <= 0) {
					//com.swaas.hidoctor.edetailing.service.DownSynchronizeService.syncBatchComplete();
					ED.hideLoading();
				}
				//ED.hideLoading();
			}
			//ED.hideLoading();
			//alert(FileUnzip);
		},
		
		autoSyncZip: function(params, success, failure){
			var _this = this;
			var offlineURL = params.offLineURL;
			if(offlineURL.endsWith('.zip') || params.documentType == "ZIP") {
				var zip = new ZipUtil();
				zip.downloadFile(params, function(indexPath, thumbFile) {
					_this.pendingDownload--;
					params.documentType = "ZIP";
					//params.onlineURL = 'file://' + indexPath;
					params.offLineURL = 'file://' + indexPath;
					params.downloadedThumbnail = thumbFile;
					params.downloadedFileName = params.offLineURL;
					params.downloaded = 'Y';
					
					_this.update(params);
				}, function(e) {
					if(failure) failure(e);
				});	
			} else {
				if(failure) failure(e);
			}
		},
		
		clean: function(isEraseAndClean, context) {
			
		},
		
		getAllAssetsForDoctorProfile: function(categoryCode, specialityCode, excludeMCAssets){
			
			var query ="Select * from tbl_DIGASSETS_MASTER where DA_Code IN(select distinct DA_Code from tbl_DIGASSETS_RESULTS ";
			if (categoryCode != null && specialityCode != null){
				query += "where DA_Metadata LIKE '%" + categoryCode + "%' AND DA_Metadata LIKE '%" + specialityCode + "%' ";
				if (excludeMCAssets == true){
					query += " AND IsMarketingCampaign = 'false' ";
				}
			} else {
				if (excludeMCAssets == true){
					query += " where IsMarketingCampaign = 'false' ";
				}
			}
			query += "Order By Product_Code)";
			var response = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this, query);
			return response;
		},
		
		removeAllNonDownloadedAssets: function(){
			var criteria = {};
			criteria.downloaded = 'Y';
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.removeNotEquals(this, criteria);
			return result;
		},
		getAssetsForProductCodes: function(productCodes, excludeMCAssets) {
			var assetQuery = 'Select * from tbl_DIGASSETS_MASTER where Product_Code IN (';
			$.each(productCodes, function(index, productCode) {
				assetQuery+= '"'+productCode+'"';
				if(index+1 <productCodes.length){
					assetQuery+= ',';
				}
			});
			assetQuery+= ") ";
			if (excludeMCAssets == true){
				assetQuery += " AND IsMarketingCampaign = 'false' ";
			}
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO
					.executeCustomQuery(this, assetQuery);
			return result;
		}
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
    ED.hideLoading();
    console.log(msg);
};