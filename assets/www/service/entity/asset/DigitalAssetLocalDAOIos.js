com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO = {
		
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
        onInserted: null,
		
		insert: function(asset, onInserted){
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, asset, onInserted, null);
		},
		
        update: function(asset, onUpdated){ //alert(JSON.stringify(asset));
			com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, asset, function(){ //alert('updated');
                if(onUpdated) onUpdated();
            });
		},
		
		remove: function(daCode, productCode, onSuccess, onError){
			var criteria = {};
			criteria.daCode = daCode;
			criteria.productCode = productCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onSuccess, onError);
		},
		
		get: function(daCode, productCode, onSuccess, onFailure){
			var criteria = {};
			criteria.daCode = daCode;
			criteria.productCode = productCode;
			//var result =
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, function(result){
                if (result.length > 0){
                    if(onSuccess) onSuccess(result[0]);
                } else {
                    if(onSuccess) onSuccess(null);
                }
            }, null);
		},
		
		getByCode: function(daCode, onSuccess, onFailure){
			var criteria = {};
			criteria.daCode = daCode;
			//var result =
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, onSuccess, onFailure);
		},
		getByProduct: function(productCode, onProductGet, onFailure){
			var criteria = {};
			criteria.productCode = productCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, function(product){
                //alert(JSON.stringify(product));
                onProductGet(product);
            }, onFailure);
		},
		getByOutputId: function(onLineOutPutId, onSuccess, onError){
			var criteria = {};
			criteria.onLineOutPutId = onLineOutPutId;
			/*var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;*/
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, onSuccess, onError);
		},
		
		getOfflineAssetsByProductCode: function(productCode){
			var criteria = {};
			criteria.productCode = productCode;
			criteria.downloaded = 'Y';
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		getAll: function(onSuccess, onError){
			com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {}, onSuccess, onError);
		},
		
		getDownloadableAssetsByProductCode: function(productCode){
			var criteria = {};
			criteria.productCode = productCode;
			criteria.downloadable = 'Y';
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
				
		_insertForProduct: function(productCode, params){
			var _this = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO;
			com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(productCode, function(product){
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
                    _this.insert(digitalAsset, function(){
                        if (product.hasDigitalAssets != true){
                            com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.update({
                                productCode: productCode,
                                hasDigitalAssets: true
                            });
                        }
                        if(_this.onInserted)
                            _this.onInserted();
                    }, null);
                } else {
                    console.log("Invalid Product Code : " + productCode);
                    if(_this.onInserted)
                        _this.onInserted();
                }
            });
			
			
		},
		
		syncPutResults: function(result, onSuccess){
			com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.syncPut(result, onSuccess);
		},
		
		syncPut: function(params, onInserted){
            //this.onInserted = onInserted;
			var tags = params.tags;
			params.marketingCampaign = (tags != null && tags.indexOf("#DOCMKT_") >= 0);
			if (tags != null){
				var tagElements = tags.split("#");
				var daMetaData = '';
				var productCodes = [];
				for (var index = 0; index < tagElements.length; index++){
					if (tagElements[index].indexOf("PDTCDE_") == 0){
						productCodes.push(tagElements[index].split("_")[1]);
						this._insertForProduct(tagElements[index].split("_")[1], params, function(){
                            if(index == (tagElements.length - 1)) {
                                daMetaData = daMetaData.substring(0, daMetaData.length-1);
                                for(var ind=0; ind <productCodes.length; ind++){
                                    this.syncPutResults({
                                        daCode: params.daCode,
                                        productCode: productCodes[ind],
                                        daMetaData: daMetaData
                                    });
                                }
                                if(onInserted) onInserted();
                            }
                        });
					} else {
						daMetaData += tagElements[index];
						daMetaData += "#";
                        if(index == (tagElements.length - 1)) {
                            daMetaData = daMetaData.substring(0, daMetaData.length-1);
                            for(var ind=0; ind <productCodes.length; ind++){
                                this.syncPutResults({
                                    daCode: params.daCode,
                                    productCode: productCodes[ind],
                                    daMetaData: daMetaData
                                }, onInserted);
                            }
                            if(onInserted) onInserted();
                        }
					}
				}
				
			}
		},
		
		clean: function(isEraseAndClean, context, onSuccess, onFailure) {
			if (isEraseAndClean == null){
				isEraseAndClean = false;
                com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.clean();
                if(typeof onSuccess == 'function')
                    onSuccess();
			}
			if (isEraseAndClean == true){
				com.swaas.hidoctor.edetailing.util.FileUtil.deleteDirectory(com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder);
				this.remove(null, null);
                com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.clean();
                if(typeof onSuccess == 'function')
                    onSuccess();
			} else {
				if(context != null && context.correlationId != null){ alert('context null');
                    com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.removeAllNonDownloadedAssets(function(){
                        com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAll(function(downloadAssets){
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
                                   com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getByOutputId(outPutId, function(assets){
                                        $.each(assets, function(id, asset) {
                                            com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(asset.downloadedFileName);
                                            com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(asset.downloadedThumbnail);
                                            com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.remove(asset.daCode, asset.productCode);
                                            retiredAssetNames.push(asset.name);
                                            if(id == (retiredoutPutIds.length - 1)) {
                                               context.retiredAssetNames = retiredAssetNames;
                                               com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.clean();
                                               if(typeof onSuccess == 'function')
                                                   onSuccess();
                                            }
                                        });
                                    }, null);
                                });
                                
                            } else {
                                context.retiredAssetNames = null;
                                com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.clean();
                                if(typeof onSuccess == 'function')
                                    onSuccess();
                            }
                            
                        }, null);
                    }, null);
				}else{ alert('context found');
					this.remove(null, null);
                    com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.clean();
                    if(typeof onSuccess == 'function')
                        onSuccess();
				}
			}
			
		},
		
		getAllAssetsForDoctorProfile: function(categoryCode, specialityCode, excludeMCAssets, onSuccess){
			var query ="Select * from tbl_DIGASSETS_MASTER where DA_Code IN(select distinct DA_Code from tbl_DIGASSETS_RESULTS ";
			if (categoryCode != null && specialityCode != null){
				query += "where DA_Metadata LIKE '%" + categoryCode + "%' AND DA_Metadata LIKE '%" + specialityCode + "%' ";
				if (excludeMCAssets == true){
					query += " AND IsMarketingCampaign = \"false\" ";
				}
			} else {
				if (excludeMCAssets == true){
					query += " where IsMarketingCampaign = \"false\" ";
				}
			}
			query += "Order By Product_Code)";
            com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQueryAlt(this, query, null, function(result){
                console.log('digital asset - get doctor profile assets');
                console.log(JSON.stringify(result));
                if(onSuccess) onSuccess(result);
            }, null);
		},
		
		removeAllNonDownloadedAssets: function(onSuccess, onFailure){
			var criteria = {};
			criteria.downloaded = 'Y';
			com.swaas.hidoctor.edetailing.dao.CoreDAO.removeNotEquals(this, criteria, onSuccess, onFailure);
		},
		getAssetsForProductCodes: function(productCodes, excludeMCAssets, onSuccess) {
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
			com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this, assetQuery, null, function(result){
                if(onSuccess) onSuccess(result);                        
            });
		}
};
