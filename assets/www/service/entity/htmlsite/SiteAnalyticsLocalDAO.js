com.swaas.hidoctor.edetailing.dao.SiteAnalyticsLocalDAO = {
		metadata: {
			"tableName" : "tbl_HTML_Site_Analytics",
			"columns": [
			    {name: "originalAssetId", columnName:"Original_Asset_Id"},
			    {name: "assetId", columnName:"Asset_Id"},
			    {name: "productCode", columnName:"Product_Code"},
                {name: "categoryValue", columnName: "Category_Value"},
                {name: "actionValue", columnName: "Action_Value"},
                {name: "labelValue", columnName: "Label_Value"},
                {name: "eventDate", columnName:"Event_Date"},
                {name: "doctorCode", columnName:"Doctor_Code"},
                {name: "doctorRegionCode",columnName:"Doctor_Region_Code"}
            ]
		},
		
		insert: function(asset){
			if (asset.hasDigitalAssets == null){
				asset.hasDigitalAssets = false;
			}
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, asset, function(){ console.log('the product isnerted'); }, null);
		},
		
		update: function(asset){
            com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, asset);
		},
		
		remove: function(assetCode, onRemove){
			var criteria = {};
			criteria.assetCode = assetCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove, null);
		},
		
		get : function(success, failure){
			var results = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, []);
			return results;
		},
		
		syncGet: function(params) {
			var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version;
			var columns = [
						   {name: "originalAssetId", columnName:"Original_Asset_Id"},
                           {name: "assetId", columnName:"Asset_Id",pk:true},
                           {name: "productCode", columnName:"Product_Code"},
			               {name: "categoryValue", columnName: "Category_Value"},
			               {name: "actionValue", columnName: "Action_Value"},
			               {name: "labelValue", columnName: "Label_Value"},
			               {name: "eventDate", columnName:"Event_Date"},
			               {name: "doctorCode", columnName:"Doctor_Code"}, 
			               {name: "doctorRegionCode", columnName:"Doctor_Region_Code"},
			               ];
			
			var assetanalytics = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			/*var assetanalytics =  [{originalAssetId: 55, assetId: 3, productCode : 'PDC00000001',
				categoryValue: 'VIEW', actionValue :'HOW VICKS WORKS',labelValue :'GRAPH WITH DATA',
				eventDate :'2014-08-30 16:20:10',doctorCode : 'DOC000000D20',doctorRegionCode : 'REC00000020'}];
			*/
				
			var htmlSiteAnalyticsString= ED.formatDataForSyncTwo(assetanalytics, columns);
			
			return {
				corrlId: params.correlationId,
				companyCode: params.companyCode ,
				userCode: params.userCode ,
				regionCode : ED.context.currentUser.regionCode,
				htmlSiteAnalyticsString : htmlSiteAnalyticsString,
				appSuiteId : com.swaas.hidoctor.edetailing.ui.view.Resource.application.appSuiteId,
				appId :com.swaas.hidoctor.edetailing.ui.view.Resource.application.appId ,
				appVersion : version	
			};
		},
		
		clean: function(params){
			if (params == null){
				params = {};
			}
			var criteria = {};
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);	
		},
		eraseAndClean : function(isEraseAndClean){
			var params = {};
			com.swaas.hidoctor.edetailing.dao.SiteAnalyticsLocalDAO.clean(params);
		}
};
