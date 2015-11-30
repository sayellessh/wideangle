com.swaas.hidoctor.edetailing.dao.SiteAssetMasterLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_HTML_Site_Asset_Master",
			"columns": [
                {name: "originalAssetId", columnName:"Original_Asset_Id"},
                {name: "assetId", columnName:"Asset_Id", pk:true},
                {name: "assetName", columnName:"Asset_Name"},
                {name: "assetPosition", columnName: "Asset_Position"}
            ]
		},
		
		insert: function(asset, success, failure){
			if (asset.hasDigitalAssets == null){
				asset.hasDigitalAssets = false;
			}
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, asset, function(data){ console.log('the product isnerted');  if(success) success(data); }, failure);
		},
		
		update: function(asset){
            com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, asset);
		},
		
		remove: function(assetCode, onRemove){
			var criteria = {};
			criteria.assetCode = assetCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove, null);
		},
		clean: function(onRemove){
			var criteria = {};
			alert('clean');
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);
		},
		get: function(success,failure){
			var results = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, []);
			return results;
		},
		
		syncGet: function(params) {  
			var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version;
			var columns = [
	                {name: "originalAssetId", columnName:"Original_Asset_Id"},
	                {name: "assetId", columnName:"Asset_Id", pk:true},
	                {name: "assetName", columnName:"Asset_Name"},
	                {name: "assetPosition", columnName: "Asset_Position"}
	            ];
			var assetanalytics = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			/*var assetanalytics =  [{originalAssetId: 55, assetId: 3, assetName : "RED",
            assetPosition : 3}, {originalAssetId: 56, assetId: 4, assetName : "RED",
                assetPosition : 4}];
			*/
			var assetString = ED.formatDataForSyncTwo(assetanalytics, columns);
			return {
				corrlId : params.correlationId,
				companyCode : params.companyCode,
				userCode : params.userCode,
				regionCode : ED.context.currentUser.regionCode,
				assetString : assetString,
				appSuiteId : com.swaas.hidoctor.edetailing.ui.view.Resource.application.appSuiteId,
				appId :com.swaas.hidoctor.edetailing.ui.view.Resource.application.appId ,
				appVersion : version
			};
		}
		
};
