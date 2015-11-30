com.swaas.hidoctor.edetailing.dao.ConfigurationRemoteDAO = {
		metadata: {
			"service" : "HDInfrastructureService",
			"properties": [
						{name: "allocatedDbSizeInGb", inProperty: "ALLOCATED_DB_SIZE_IN_GB", outProperty: "ALLOCATED_DB_SIZE_IN_GB"},
						{name: "canAddOwnTags", inProperty: "CAN_ADD_OWN_TAGS", outProperty: "CAN_ADD_OWN_TAGS"},
						{name: "downloadBitrate", inProperty: "DOWNLOAD_BITRATE", outProperty: "DOWNLOAD_BITRATE"},
						{name: "streamingBitrate", inProperty: "STREAMING_BITRATE", outProperty: "STREAMING_BITRATE"},
						{name: "syncNoOfDays", inProperty: "SYNC_NO_OF_DAYS", outProperty: "SYNC_NO_OF_DAYS"},
						{name: "dateSettings", inProperty: "DATE_SETTINGS", outProperty: "DATE_SETTINGS"},
						{name: "totalFieldsToQuery", inProperty: "TOTAL_FIELDS_TO_QUERY", outProperty: "TOTAL_FIELDS_TO_QUERY"},
						{name: "queryParamSpotlight", inProperty: "QUERY_PARAM_SPOTLIGHT", outProperty: "QUERY_PARAM_SPOTLIGHT"},
						{name: "queryParamAllVideosVariable", inProperty: "QUERY_PARAM_ALL_VIDEOS_VARIABLE", outProperty: "QUERY_PARAM_ALL_VIDEOS_VARIABLE"},
						{name: "queryParamAllVideosConstantTblName", inProperty: "QUERY_PARAM_ALL_VIDEOS_CONSTANT_TBLNAME", outProperty: "QUERY_PARAM_ALL_VIDEOS_CONSTANT_TBLNAME"},
						{name: "tblNameSqlliteFtsMetadata", inProperty: "TBL_NAME_SQLLITE_FTS_METADATA", outProperty: "TBL_NAME_SQLLITE_FTS_METADATA"},
						{name: "htmlSiteEdatanalysisJsURL", inProperty: "HTML_SITE_EDTANALYSIS_JS_URL", outProperty: "HTML_SITE_EDTANALYSIS_JS_URL"},
						{name: "col1", inProperty: "COL1", outProperty: "COL1"},
						{name: "col2", inProperty: "COL2", outProperty: "COL2"},
						{name: "col3", inProperty: "COL3", outProperty: "COL3"},
						{name: "col4", inProperty: "COL4", outProperty: "COL4"},
						{name: "col5", inProperty: "COL5", outProperty: "COL5"},
						{name: "col6", inProperty: "COL6", outProperty: "COL6"},
						{name: "col7", inProperty: "COL7", outProperty: "COL7"},
						{name: "col8", inProperty: "COL8", outProperty: "COL8"},
						{name: "extendedMemoryUptoInGB", inProperty: "EXTENDED_MEMORY_UPTO_IN_GB", outProperty: "EXTENDED_MEMORY_UPTO_IN_GB"},
						{name: "estSizeBitRateStream", inProperty: "EST_SIZE_BIT_RATE_STREAM", outProperty: "EST_SIZE_BIT_RATE_STREAM"},
						{name: "estSizeBitRateOffline", inProperty: "EST_SIZE_BIT_RATE_OFFLINE", outProperty: "EST_SIZE_BIT_RATE_OFFLINE"},
						
						{name: "assetCheckInterval", inProperty: "WA_ASSET_CHECK_INTERVAL_IN_HOURS", outProperty: "WA_ASSET_CHECK_INTERVAL_IN_HOURS"},
						{name: "syncCheckInterval", inProperty: "WA_SYNC_CHECK_INTERVAL_IN_HOURS", outProperty: "WA_SYNC_CHECK_INTERVAL_IN_HOURS"},
						
						{name: "debugSwitch", inProperty: "WA_DEBUG_SWITCH", outProperty: "WA_DEBUG_SWITCH"}

			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetConfiguration", data);
			var configurationArray = result.Tables[0].Rows;
			var configurationRemote = {};
			for (var i=0; i<configurationArray.length; i++){
				configurationRemote[configurationArray[i].Action] = configurationArray[i].Intent;
			}
			var configuration = {};
			var noOfColumns = this.metadata.properties.length;
			for (var i = 0; i < noOfColumns; i++){
				var paramName = this.metadata.properties[i].outProperty;
				if (paramName != null && configurationRemote[paramName] != null){
					configuration[this.metadata.properties[i].name] = configurationRemote[paramName];
				}
			}
			return configuration;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};