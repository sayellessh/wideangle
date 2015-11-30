com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO = {
		
		defaults: {
			assetCheckInterval: 24,
			//assetCheckInterval: 120000,
			syncCheckInterval: 6
		},
		metadata: {
			"tableName" : "tbl_Config_Settings",
			"columns": [				
						{name: "allocatedDbSizeInGb", columnName:"ALLOCATED_DB_SIZE_IN_GB"},
						{name: "canAddOwnTags", columnName:"CAN_ADD_OWN_TAGS"},
						{name: "downloadBitrate", columnName:"DOWNLOAD_BITRATE"},
						{name: "streamingBitrate", columnName:"STREAMING_BITRATE"},
						{name: "syncNoOfDays", columnName:"SYNC_NO_OF_DAYS"},
						{name: "dateSettings", columnName:"DATE_SETTINGS"},
						{name: "totalFieldsToQuery", columnName:"TOTAL_FIELDS_TO_QUERY"},
						{name: "queryParamSpotlight", columnName:"QUERY_PARAM_SPOTLIGHT"},
						{name: "queryParamAllVideosVariable", columnName:"QUERY_PARAM_ALL_VIDEOS_VARIABLE"},
						{name: "queryParamAllVideosConstantTblName", columnName:"QUERY_PARAM_ALL_VIDEOS_CONSTANT_TBLNAME"},
						{name: "tblNameSqlliteFtsMetadata", columnName:"TBL_NAME_SQLLITE_FTS_METADATA"},
						{name: "htmlSiteEdatanalysisJsURL", columnName:"HTML_SITE_EDTANALYSIS_JS_URL"},
						{name: "col1", columnName:"COL1"},
						{name: "col2", columnName:"COL2"},
						{name: "col3", columnName:"COL3"},
						{name: "col4", columnName:"COL4"},
						{name: "col5", columnName:"COL5"},
						{name: "col6", columnName:"COL6"},
						{name: "col7", columnName:"COL7"},
						{name: "col8", columnName:"COL8"},
						{name: "extendedMemoryUptoInGB", columnName:"EXTENDED_MEMORY_UPTO_IN_GB"},
						{name: "estSizeBitRateStream", columnName:"EST_SIZE_BIT_RATE_STREAM"},
						{name: "estSizeBitRateOffline", columnName:"EST_SIZE_BIT_RATE_OFFLINE"},
						{name: "debugSwitch", columnName: "WA_DEBUG_SWITCH"},
						{name: "assetCheckInterval", columnName: "WA_ASSET_CHECK_INTERVAL_IN_HOURS"},
						{name: "lastAssetCheck", columnName: "WA_LAST_ASSET_CHECK"},
						{name: "toDownloadCnt", columnName: "WA_TO_DOWNLOAD_CNT"},
						{name: "syncCheckInterval", columnName: "WA_SYNC_CHECK_INTERVAL_IN_HOURS"},
						{name: "lastSyncCheck", columnName: "WA_LAST_SYNC_CHECK"}
			            ]
		},
		
		insert: function(config){
			if(config.assetCheckInterval == null)
				config.assetCheckInterval = this.defaults.assetCheckInterval;
			if(config.syncCheckInterval == null)
				config.syncCheckInterval = this.defaults.syncCheckInterval;
			
			config.lastAssetCheck = (new Date()).getTime();
			config.lastSyncCheck = (new Date()).getTime();
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,config);
		},
		
		update: function(config){
			if(config.assetCheckInterval == null)
				config.assetCheckInterval = this.defaults.assetCheckInterval;
			if(config.syncCheckInterval == null)
				config.syncCheckInterval = this.defaults.syncCheckInterval;
			
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,config);
		},
		
		remove: function(){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, null);			
		},
		
		get: function(){
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, null);		
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getAsync: function(success, failure){
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, null);		
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		isAutoAssetCheckRequired: function() {
			var result = this.get();
			if(result != null) {
				var lastAssetCheck = (result.lastAssetCheck != null ? result.lastAssetCheck : 0);
				var interval = (result.assetCheckInterval * 60 * 60 * 1000);
				if(interval > 0) {
					if(lastAssetCheck == 0 || ((new Date()).getTime() - lastAssetCheck) > interval) {
						return true;
					}	
				}	
			}
			return false;
		},
		
		isAutoSyncRequired: function() {
			var result = this.get();
			if(result != null) {
				var lastSyncCheck = (result.lastSyncCheck != null ? result.lastSyncCheck : 0);
				var interval = (result.syncCheckInterval * 60 * 60 * 1000);
				if(interval > 0) {
					if(lastSyncCheck == 0 || ((new Date()).getTime() - lastSyncCheck) > interval) {
						return true;
					}
				}
			}
			return false;
		},
		
		clean: function(){
			this.remove(null);
		}
};
