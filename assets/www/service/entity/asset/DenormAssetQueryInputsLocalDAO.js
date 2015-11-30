com.swaas.hidoctor.edetailing.dao.DenormAssetQueryInputsLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DENORM_DIGASSETS_QUERY_INPUTS",
			"columns": [
						{name: "col1", columnName:"COL1", pk:true},
						{name: "col2", columnName:"COL2", pk:true},
						{name: "col3", columnName:"COL3", pk:true},
						{name: "col4", columnName:"COL4", pk:true},
						{name: "col5", columnName:"COL5", pk:true},
						{name: "col6", columnName:"COL6", pk:true},
						{name: "col7", columnName:"COL7", pk:true},
						{name: "col8", columnName:"COL8", pk:true},
						{name: "col9", columnName:"COL9", pk:true},
						{name: "col10",columnName:"COL10", pk:true},
						{name: "col11",columnName:"COL11", pk:true},
						{name: "col12",columnName:"COL12", pk:true},
						{name: "col13",columnName:"COL13", pk:true},
						{name: "col14",columnName:"COL14", pk:true},
						{name: "col15",columnName:"COL15", pk:true}
						]
		},
		
		insert: function(queryInput){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, queryInput);
		},

		removeAll: function(){
			var criteria = {};
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);		
			return result;
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.removeAll();
		},
		
		getUniqueQuerys: function(){
			var configurationLocalDAO = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO;
			var configuration = configurationLocalDAO.get();
			var query = "SELECT DISTINCT " + configuration.queryParamAllVideosVariable + " FROM " + this.metadata.tableName;
			var columns = configuration.queryParamAllVideosVariable.split(",");
			var uniqueQuerys = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeQuery(query, function(record){
				var convertedRecord = [];
				for (var index = 0; index < columns.length; index++){
					var columnData = record[columns[index]];
					if (columnData != null){
						if (columnData.indexOf("~") > 0){
							var columNameAndValue = columnData.split("_");
							var columnValues = columNameAndValue[1].split("~");
							for (var subIndex = 0; subIndex < columnValues.length; subIndex++){
								convertedRecord.push(columNameAndValue[0] + "_" + columnValues[subIndex]);
							}
						} else {
							convertedRecord.push(record[columns[index]]);
						}
					}
				}
				return convertedRecord;
			});
			return uniqueQuerys;
		},
		
		getUniqueQuerysAsync: function(success, failure){
			var configurationLocalDAO = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO;
			var configuration = configurationLocalDAO.get();
			var query = "SELECT DISTINCT " + configuration.queryParamAllVideosVariable + " FROM " + this.metadata.tableName;
			var columns = configuration.queryParamAllVideosVariable.split(",");
			com.swaas.hidoctor.edetailing.dao.CoreDAO.executeQuery(query, function(record){
				var convertedRecord = [];
				for (var index = 0; index < columns.length; index++){
					var columnData = record[columns[index]];
					if (columnData != null){
						if (columnData.indexOf("~") > 0){
							var columNameAndValue = columnData.split("_");
							var columnValues = columNameAndValue[1].split("~");
							for (var subIndex = 0; subIndex < columnValues.length; subIndex++){
								convertedRecord.push(columNameAndValue[0] + "_" + columnValues[subIndex]);
							}
						} else {
							convertedRecord.push(record[columns[index]]);
						}
					}
				}
				success(convertedRecord);
			}, function(e) {
				if(failure) failure(e);
			});
		},
		
		getUniqueForSpotLight: function(){
			var configurationLocalDAO = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO;
			var configuration = configurationLocalDAO.get();
			var query = "SELECT DISTINCT " + configuration.queryParamSpotlight + " FROM " + this.metadata.tableName;
			var columns = configuration.queryParamSpotlight.split(",");
			var uniqueQuerys = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeQuery(query, function(record){
				var convertedRecord = [];
				for (var index = 0; index < columns.length; index++){
					var columnData = record[columns[index]];
					if (columnData != null){
						if (columnData.indexOf("~") > 0){
							var columNameAndValue = columnData.split("_");
							var columnValues = columNameAndValue[1].split("~");
							for (var subIndex = 0; subIndex < columnValues.length; subIndex++){
								convertedRecord.push(columNameAndValue[0] + "_" + columnValues[subIndex]);
							}
						} else {
							convertedRecord.push(record[columns[index]]);
						}
					}
				}
				return convertedRecord;
			});
			return uniqueQuerys;
		}
};
