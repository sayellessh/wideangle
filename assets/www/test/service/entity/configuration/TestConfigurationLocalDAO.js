com.swaas.hidoctor.edetailing.dao.TestConfigurationLocalDAO = {
		
		testInsert: function(){
			var configurationIn = {
					allocatedDbSizeInGb: "20",
					canAddOwnTags: "Y",
					downloadBitrate: "300",	
					streamingBitrate: "800",	
					syncNoOfDays: "7",	
					dateSettings: "dd/mm/yyyy",
					totalFieldsToQuery: "2",
					queryParamSpotlight: "COL3",
					queryParamAllVideosVariable: "COL1,COL2,COL3,COL4,COL5,COL6,COL7,COL8",
					queryParamAllVideosConstantTblName: "TBL_USER_INFO",
					tblNameSqlliteFtsMetadata: "TBL_FTS_EDET",
					col1: "DOCSPE",
					col2: "DOCCAT",
					col3: "DOCMKT",
					col4: "USRROL",
					col5: "USRHIE",
					col6: "USRDIV",
					col7: "PDTCDE",
					col8: "DOCCDE",
					extendedMemoryUptoInGB: "30",
					estSizeBitRateStream: "1.1",
					estSizeBitRateOffline: "2.5"
					};
			
			var result = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.insert(configurationIn);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var configurationIn = {
					allocatedDbSizeInGb: "30",
					canAddOwnTags: "N",
					downloadBitrate: "400",	
					streamingBitrate: "700",	
					syncNoOfDays: "7",	
					dateSettings: "dd/mm/yyyy",
					totalFieldsToQuery: "2",
					queryParamSpotlight: "COL3",
					queryParamAllVideosVariable: "COL1,COL2,COL3,COL4,COL5,COL6,COL7,COL8",
					queryParamAllVideosConstantTblName: "TBL_USER_INFO",
					tblNameSqlliteFtsMetadata: "TBL_FTS_EDET",
					col1: "DOCSPE",
					col2: "DOCCAT",
					col3: "DOCMKT",
					col4: "USRROL",
					col5: "USRHIE",
					col6: "USRDIV",
					col7: "PDTCDE",
					col8: "DOCCDE",
					extendedMemoryUptoInGB: "40",
					estSizeBitRateStream: "1.1",
					estSizeBitRateOffline: "2.5"
					};
			var result = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.update(configurationIn);

			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
			alert(JSON.stringify(result));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.remove();
			alert(JSON.stringify(result));
		}
		
};