com.swaas.hidoctor.edetailing.service.AssetService = {
	getAssetByProductCode: function(productCode){		
		var assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getByProduct(productCode);
		return this.getAssetAnalytics(assets);
	},
	
	getOfflineAssetsByProductCode: function(productCode){		
		var assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getOfflineAssetsByProductCode(productCode);
		return this.getAssetAnalytics(assets);
	},
	
	getDownloadableAssetsByProductCode: function(productCode){		
		var assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getDownloadableAssetsByProductCode(productCode);
		return this.getAssetAnalytics(assets);
	},
	
	getAllAssetsForDoctorProfile: function(doctor, excludeMCAssets){
		var assets;
		if (doctor == null){
			assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAllAssetsForDoctorProfile(null,  null, excludeMCAssets);
		} else {
			assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAllAssetsForDoctorProfile(doctor.categoryCode,  doctor.specialityCode, excludeMCAssets);
		}
		
		return this.getAssetAnalytics(assets);
	},
	
	getAllAssets: function(excludeMCAssets){
		var assets = null;
		if (excludeMCAssets == true){
			assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAllAssetsForDoctorProfile(null,  null, excludeMCAssets);
		} else {
			assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAll();
		}
		return this.getAssetAnalytics(assets);
	},
	
	getAssetAnalytics : function(assets) {
		var extendexAssets = [];
		$.each(assets, function(index, asset){			
			if (asset.daCode != ''){
			var analyticsOut = com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO.getByAsset(asset.daCode);
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
			}
		});
		return extendexAssets;
	},
	
	getAllTags : function() {
		var tags = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.getAll();
		return tags;
	},
	
	getAssetBilling : function(daCode, productCode) {
		var assetBilling = com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO.get(daCode, productCode);
		return assetBilling;
	},
	
	insertAssetBilling : function(assetBilling) {
		assetBilling.daBillingId = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO.insert(assetBilling);	
		return assetBilling;
	},
	
	updateAssetBilling : function(daBillingId,documentViewTime) {
		com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO.update(daBillingId, documentViewTime);	
		return documentViewTime;
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
	getAnalyticsForAsset : function(daCode) {
		var analyticsOut = null;
			if (daCode != ''){
			analyticsOut = com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO.getByAsset(daCode);
			if(analyticsOut == null){
				analyticsOut = {
						daCode: daCode,
						totalViewsCount: "0",
						totalLikesCount: "0",
						totalDislikesCount: "0",
						starValue: "0"
						
				};
			}
			}
		return analyticsOut;
	},
	
	persistAnalytics : function(analytics) {
		analytics.daTagAnalyticId = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.insert(analytics);
		if(analytics.tag != null && analytics.tag != ''){
			var tagMaster = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.getByDescription(analytics.tag);
			if(tagMaster != null){
				tagMaster.tagUsedCount = parseInt(tagMaster.tagUsedCount) + 1;
				tagMaster = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.update(tagMaster);
			}
		}
		return analytics.daTagAnalyticId;
	},

	deleteAnalytics : function(daTagAnalyticId) {
		com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.remove(daTagAnalyticId);
	},
	persistNewTag : function(tag) {
		var tagMaster = {
				tagId : com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID(),
				tagDescription : tag,
				tagUsedCount : '1' 
			};
		var tagOut = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.insert(tagMaster);
	},
	
	getSpotliteAssets : function(doctor) {
		var mcDoctors = null;
		if(doctor != null){
			mcDoctors = com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO.getByDoctor(doctor.customerCode, doctor.regionCode);
		}
		var  assetCodes = {};
		$.each(mcDoctors , function(i, mcDoctor) {
			var results = com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.getLike(mcDoctor.mcCode);
			$.each(results , function(i, result) {
				assetCodes[result.daCode] = result.daCode;
			});
		});
		var assetResult = [];
		
		for (var assetCode in assetCodes) {
		  if (assetCodes.hasOwnProperty(assetCode)) {
			  var asset = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getByCode(assetCode);
				if(asset != null && asset.length > 0){
					assetResult.push(asset[0]);
				}
		  }
		}
		return this.getAssetAnalytics(assetResult);
		
	},
	
	getSpotliteAssetsWithProducts : function(doctor) {
		var mcDoctors = null;
		if(doctor != null){
			mcDoctors = com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO.getByDoctor(doctor.customerCode, doctor.regionCode);
		}
		var  digitalAssetResult = [];
		$.each(mcDoctors , function(i, mcDoctor) {
			var results = com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO.getLike(mcDoctor.mcCode);
			digitalAssetResult = digitalAssetResult.concat(results);
		});
		var assetResult = [];
		
		$.each(digitalAssetResult, function(index, digitalAsset){
			var asset = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.get(digitalAsset.daCode, digitalAsset.productCode);
			if(asset != null){
				assetResult.push(asset);
			}
		});
		
		return this.getAssetAnalytics(assetResult);
		
	},
	
	getAssetsForProductCodes : function(productCodes, excludeMCAssets) {
		  return com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAssetsForProductCodes(productCodes, excludeMCAssets);
	}
};