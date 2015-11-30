com.swaas.hidoctor.edetailing.dao.ErrorLogsLocalDAO = {
		metadata: {
			"tableName" : "tbl_Error_Logs",
			"columns": [
						{name: "errorID", columnName: "Error_Id", pk:true},
						{name: "deviceID", columnName:"Device_Id"},
						{name: "userName", columnName:"User_Name"},
						{name: "errorTime", columnName:"Error_Time", isDate:true},
						{name: "error", columnName:"Error"}
			            ]
		},
		
		insert: function(error){
			console.log("Logging Error: " + JSON.stringify(error));
			com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateErrorPushRequired(true);
			var res = com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, error);
			return res;
		},
		
		getBy: function(deviceID){
			var criteria = {};
			criteria.uUid = deviceID;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result;
			} 
		},
		getAll: function(){
			var criteria = null;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		remove: function(errorID){
			var criteria ={};
			criteria.errorID = errorID;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);	
		},
		
		syncGet: function(params){
			var errorLogRecords = [];
			var errorLogs = this.getAll();
			$.each(errorLogs, function (index, errorLog){
				var errorLogRecord = {
						errorID: errorLog.errorID,
						correlationId: params.correlationId,
						companyCode: params.companyCode,
						userCode: params.userCode,
						deviceID: errorLog.deviceID,
						errorTime: errorLog.errorTime,
						error: errorLog.error
					};
				//errorLogRecord = ED.formatDataForSync(errorLogRecord, columns);
				errorLogRecords.push(errorLogRecord);
			});		
			return errorLogRecords;
		},
		
		clean: function(params){
			if (params == null){
				params = {};
			}
			com.swaas.hidoctor.edetailing.dao.ErrorLogsLocalDAO.remove(params.errorID);
		}
};