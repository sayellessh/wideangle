com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO = {
		// my commit test
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
						{name: "fileSize", columnName: "FileSize"},
						{name: "marketingCampaign", columnName: "IsMarketingCampaign"}
						]
		},
		
		insert: function(asset){
			var result = this.get(asset.daCode, asset.productCode);
			if(result != null) {
				result.downloadable = asset.downloadable;
				result.name = asset.name;
				if(asset.downloadable == 'N')
					result.downloaded = 'N';
				return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, result);
			} else {
				return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, asset);	
			}
			/*var criteria = {};
			criteria.daCode = asset.daCode;
			criteria.productCode = asset.productCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);*/			
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
						fileSize: params.fileSize,
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
			var tags = params.tags;
			
			params.marketingCampaign = (tags != null && tags.indexOf("#DOCMKT_") >= 0);
			if (tags != null){
				var tagElements = tags.split("#");
				var daMetaData = '';
				var productCodes = [];
				for (var index = 0; index < tagElements.length; index++){
					if (tagElements[index].indexOf("PDTCDE_") == 0){
						productCodes.push(tagElements[index].split("_")[1]);
						this._insertForProduct(tagElements[index].split("_")[1], params);						
					} else {
						daMetaData += tagElements[index];
						daMetaData += "#";
					}
				}
				daMetaData = daMetaData.substring(0, daMetaData.length-1);
				for(var index=0; index <productCodes.length; index++){
					this.syncPutResults({
						daCode: params.daCode,
						productCode: productCodes[index],
						daMetaData: daMetaData
					});
				}
			}
		},
		
		clean: function(isEraseAndClean, context) {
			if (isEraseAndClean == null){
				isEraseAndClean = false;
			}
			if (isEraseAndClean == true){
				com.swaas.hidoctor.edetailing.util.FileUtil.deleteDirectory(com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder);
				this.remove(null, null);
			} else {
				if(context != null && context.correlationId != null){
						com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.removeAllNonDownloadedAssets();
						
						var downloadAssets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAll();
						var outPutIds = [];
						$.each(downloadAssets, function(id, asset) {
							if ($.inArray(asset.onLineOutPutId, outPutIds) == -1){
								outPutIds.push(asset.onLineOutPutId);
							}
						});
						if (outPutIds.length > 0){
							var retiredoutPutIds = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO.getRetired(context.correlationId, context.companyCode, context.userCode, outPutIds);
							var retiredAssetNames = [];
							$.each(retiredoutPutIds, function(id, outPutId) {
								var assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getByOutputId(outPutId);
								$.each(assets, function(id, asset) {
									com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(asset.downloadedFileName);
									com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(asset.downloadedThumbnail);
									com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.remove(asset.daCode, asset.productCode);
									retiredAssetNames.push(asset.name);
								});
								
							});
							context.retiredAssetNames = retiredAssetNames;
						}else{
							context.retiredAssetNames = null;
						}
				}else{
					this.remove(null, null);
				}
			}
			com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.clean();
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
