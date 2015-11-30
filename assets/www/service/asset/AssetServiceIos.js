com.swaas.hidoctor.edetailing.service.AssetService = {
	getAssetByProductCode: function(productCode, onProductGet, onFailure){
		/*var assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getByProduct(productCode);
		return this.getAssetAnalytics(assets);*/
        com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getByProduct(productCode, onProductGet, onFailure);
	},
	
	getOfflineAssetsByProductCode: function(productCode){		
		var assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getOfflineAssetsByProductCode(productCode);
		return this.getAssetAnalytics(assets);
	},
	
	getDownloadableAssetsByProductCode: function(productCode){		
		var assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getDownloadableAssetsByProductCode(productCode);
		return this.getAssetAnalytics(assets);
	},
	
	getAllAssetsForDoctorProfile: function(doctor, excludeMCAssets, onSuccess){
		var assets, _this = com.swaas.hidoctor.edetailing.service.AssetService;
		/*if (doctor == null){
			assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAllAssetsForDoctorProfile(null,  null, excludeMCAssets);
		} else {
			assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAllAssetsForDoctorProfile(doctor.categoryCode,  doctor.specialityCode, excludeMCAssets);
		}
		
		return this.getAssetAnalytics(assets);*/
        if(doctor == null) {
            com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAllAssetsForDoctorProfile(null,  null, excludeMCAssets, function(assets){
                _this.getAssetAnalytics(assets, onSuccess);
            });
        } else {
        com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAllAssetsForDoctorProfile(doctor.categoryCode,  doctor.specialityCode, excludeMCAssets, function(assets){
                _this.getAssetAnalytics(assets, onSuccess);
            });
        }
	},
	
	getAllAssets: function(excludeMCAssets, onSuccess){
		var assets = null;
        var _this = com.swaas.hidoctor.edetailing.service.AssetService;
		if (excludeMCAssets == true){
			//assets =
            com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAllAssetsForDoctorProfile(null, 
            		null, excludeMCAssets, function(assets){
                //alert('AssetService - GetAllAssets');
                //alert(JSON.stringify(assets));
                _this.getAssetAnalytics(assets, onSuccess);
            });
		} else {
			//assets =
            com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAll(function(assets){
                _this.getAssetAnalytics(assets, onSuccess);
            });
		}
	},
	
	getAssetAnalytics : function(assets, onGetAnalaytics) {
		//alert('AssetService - getAssetAnalytics');
        var extendexAssets = new Array();
        if(assets && assets.length > 0){ 
        	//alert('AssetService - getAssetAnalytics length');
            $.each(assets, function(index, asset){
            	console.log(JSON.stringify(asset));
                if (asset.daCode != ''){
                    com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO.getByAsset(asset.daCode, function(analyticsOut){
                        if(analyticsOut == null){
                            analyticsOut = {
                                    daCode: asset.daCode,
                                    totalViewsCount: "0",
                                    totalLikesCount: "0",
                                    totalDislikesCount: "0",
                                    starValue: "0"
                                    
                            };
                        }
                        $.extend(true, asset, analyticsOut); 				 
                        extendexAssets.push(asset);
                                                                                           
                        if(index == (assets.length - 1)) { //alert('getAssetAnalytics');
                        	//alert(JSON.stringify(extendexAssets));
                           onGetAnalaytics(extendexAssets);
                        }
                    });
               } else {
                   if(index == (assets.length - 1)) {
                       onGetAnalaytics(extendexAssets);
                   }
               }
                
            });
        } else {
            console.log('AssetService - getAssetAnalytics length 0');
            onGetAnalaytics(extendexAssets);
        }
		
	},
	
	getAllTags : function(onSuccess, onFailure) {
		//var tags =
        com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.getAll(onSuccess, onFailure);
		//return tags;
	}, 
	
	getAssetBilling : function(daCode, productCode) {
		var assetBilling = com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO.get(daCode, productCode);
		return assetBilling;
	},
	
	insertAssetBilling : function(assetBilling, onSuccess, onFailure) {
		assetBilling.daBillingId = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO.insert(assetBilling, function(results){
            onSuccess(assetBilling);
        }, onFailure);
	},
	
	updateAssetBilling : function(daBillingId,documentViewTime,onSuccess,onFailure) {
		com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO.update(daBillingId, documentViewTime,onSuccess,onFailure);
		//return documentViewTime;
	},

	getTagByAsset : function(assets) {
		var tagByAssets = [];
		
		$.each(assets, function(index, asset){			
			if (asset.daCode != ''){
			var tag = com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.getByAsset(asset.daCode);						 
			tagByAssets.push(tag);
			}
		});
		return tagByAssets;
	},
	getAnalyticsForAsset : function(daCode, onSuccess, onFailure) {
		var analyticsOut = null;
        if (daCode != ''){
            //analyticsOut =
            com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO.getByAsset(daCode, function(analyticsOut){
               if(analyticsOut == null){
                    analyticsOut = {
                            daCode: daCode,
                            totalViewsCount: "0",
                            totalLikesCount: "0",
                            totalDislikesCount: "0",
                            starValue: "0"
                            
                    };
                    
                }
                   if(onSuccess) onSuccess(analyticsOut);
            });
        } else {
            if(onSuccess) onSuccess(analyticsOut);
        }
		//return analyticsOut;
	},
	
	persistAnalytics : function(analytics, onSuccess) {
		analytics.daTagAnalyticId = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.insert(analytics, function(){
            if(analytics.tag != null && analytics.tag != ''){
                //var tagMaster =
                com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.getByDescription(analytics.tag, function(tagMaster){
                    if(tagMaster != null){
                        tagMaster.tagUsedCount = parseInt(tagMaster.tagUsedCount) + 1;
                        //tagMaster =
                        com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.update(tagMaster, null);
                    }
                    if(onSuccess) onSuccess(analytics.daTagAnalyticId);
                });
            } else {
                if(onSuccess) onSuccess(analytics.daTagAnalyticId);
            }
        });
	},

	deleteAnalytics : function(daTagAnalyticId,onSuccess,onFailure) {
		com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.remove(daTagAnalyticId,onSuccess,onFailure);
	},
	persistNewTag : function(tag,onSuccess,onFailure) {
		var tagMaster = {
				tagId : com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID(),
				tagDescription : tag,
				tagUsedCount : '1' 
			};
		com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.insert(tagMaster,onSuccess,onFailure);
    },
	
	getSpotliteAssets : function(doctor, onSuccess, onFailure) {
		var mcDoctors = null;
        var _this = com.swaas.hidoctor.edetailing.service.AssetService;
		if(doctor != null){
			//mcDoctors =
            com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO.getByDoctor(doctor.customerCode, doctor.regionCode, function(mcDoctors){
                _this.getSpotliteAssetsAfter(mcDoctors, onSuccess, onFailure);
            });
		} else {
            _this.getSpotliteAssetsAfter(mcDoctors, onSuccess, onFailure);
        }
		//return this.getAssetAnalytics(assetResult);
	},
    getSpotliteAssetsAfter: function(mcDoctors, onSuccess, onFailure){
        var  assetCodes = {};
        var _this = com.swaas.hidoctor.edetailing.service.AssetService;
        if(mcDoctors && mcDoctors.length > 0) {
            
            $.each(mcDoctors , function(i, mcDoctor) {
                
               //var results =
                com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.getLike(mcDoctor.mcCode, function(results){
                    if(results && results.length > 0) {
                        $.each(results , function(i, result) {
                            assetCodes[result.daCode] = result.daCode;
                        });
                                                                                         
                        var assetResult = [], resultCount = 0, assetCodeLength = ED.objectCount(assetCodes);
                        for (var assetCode in assetCodes) {
                            console.log('acb');
                            if (assetCodes.hasOwnProperty(assetCode)) { console.log('acbd');
                              //var asset =
                                com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getByCode(assetCode, function(asset){
                                    console.log('abcde');
                                    if(asset != null && asset.length > 0){
                                        assetResult.push(asset[0]);
                                    }
                                    resultCount++;
                                   if(resultCount == assetCodeLength && i == (mcDoctors.length - 1)) {
                                        _this.getAssetAnalytics(assetResult, onSuccess);
                                     }
                                });
                            }
                        }
                    } else {
                        var assetResult = [];
                        _this.getAssetAnalytics(assetResult, onSuccess);
                    }
                });
            });
        } else {
            var assetResult = [];
            _this.getAnalyticsForAsset(assetResult, onSuccess);
        }
    },
	getSpotliteAssetsWithProducts : function(doctor, onSuccess) {
		var _this = com.swaas.hidoctor.edetailing.service.AssetService;
        var mcDoctors = null;
        
		if(doctor != null){
			com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO.getByDoctor(doctor.customerCode, doctor.regionCode, function(mcDoctor){
                mcDoctors = mcDoctor;
                console.log('mcproducts ' + mcDoctors.length);
                _this._spotliteAssetsDoctors(mcDoctors, onSuccess);
            });
		} else {
            _this._spotliteAssetsDoctors(mcDoctors, onSuccess);
        }
	},
    _spotliteAssetsDoctors: function(mcDoctors, onSuccess){
        var _this = com.swaas.hidoctor.edetailing.service.AssetService;
        var digitalAssetResult = [];
        var assetResult = [];
        if(mcDoctors.length > 0) {
            $.each(mcDoctors , function(i, mcDoctor) {
                //var results =
                com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.getLike(mcDoctor.mcCode, function(results){
                	console.log('_spotliteAssetsDoctors ' + results.length);
                    digitalAssetResult = digitalAssetResult.concat(results);
                    if(i == (mcDoctors.length - 1)) {
                        if(digitalAssetResult && digitalAssetResult.result > 0) {
	                        $.each(digitalAssetResult, function(index, digitalAsset){
	                            com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.get(digitalAsset.daCode, digitalAsset.productCode, function(asset){
	                            	console.log('_spotliteAssetsDoctors 2' + asset);
	                            	if(asset != null){
	                                   assetResult.push(asset);
	                               }
	                               if(index == (digitalAssetResult.length - 1)) {
	                                   _this.getAssetAnalytics(assetResult, onSuccess);
	                               }
	                            });
	                        });
                        } else {
                        	_this.getAssetAnalytics(assetResult, onSuccess);
                        }
                    }
                }, null);
            });
        } else {
            _this.getAssetAnalytics(assetResult, onSuccess);
        }
    },
	getAssetsForProductCodes : function(productCodes, excludeMCAssets, onSuccess) {
		  com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAssetsForProductCodes(productCodes, excludeMCAssets, onSuccess);
	}
};