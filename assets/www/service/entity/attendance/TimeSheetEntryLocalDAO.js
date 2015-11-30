com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Timesheet_Entry",
			"columns": [
						
						{name: "timeSheetCode", columnName: "Timesheet_Code", pk:true},
						{name: "dcrCode", columnName: "DCR_Code"},						
						{name: "projectCode", columnName: "Project_Code"},						
						{name: "activityCode", columnName: "Activity_Code"},						
						{name: "startTime", columnName: "Start_Time"},						
						{name: "endTime", columnName: "End_Time"},						
						{name: "remarks", columnName: "Remarks"},						
						{name: "enteredDateTime", columnName: "Entered_DateTime",isDate:true},
						{name: "dcrCodeFormatted", columnName:"DCR_Code_Formatted"},
						{name: "timeSheetCodeFormatted", columnName:"Timesheet_Code_Formatted"}					
			            ]
		},
		
		insert: function(timeSheet){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, timeSheet);
		},
		
		update: function(timeSheet){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, timeSheet);
		},
		
		remove: function(timeSheetCode){
			var criteria = {};
			criteria.timeSheetCode = timeSheetCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(timeSheetCode){
			var criteria = {};
			criteria.timeSheetCode =timeSheetCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getByDCRCode: function(dcrCode){
			var criteria = {};
			criteria.dcrCode = dcrCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		syncGet: function(params){
			var columns = [
							{name: "timeSheetCodeFormatted", columnName: "Timesheet_Code", pk:true},
							{name: "dcrCodeFormatted", columnName: "DCR_Code"},						
							{name: "projectCode", columnName: "Project_Code"},						
							{name: "activityCode", columnName: "Activity_Code"},						
							{name: "startTime", columnName: "Start_Time"},						
							{name: "endTime", columnName: "End_Time"},						
							{name: "remarks", columnName: "Remarks"},						
							{name: "enteredDateTime", columnName: "Entered_DateTime",isDate:true, isTime:true}		
			                ];
			
			var timesheetEntries = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			if (timesheetEntries.length == 0){
				return [];
			}
			var outRecords = new Array();
			var nullCounts = 0;
			if(timesheetEntries != null && timesheetEntries.length > 0) {
				for(var i=0;i<=timesheetEntries.length-1;i++) {
					if(timesheetEntries[i].timeSheetCodeFormatted != null
							&& timesheetEntries[i].timeSheetCodeFormatted != '') {
						outRecords.push(timesheetEntries[i]);
					} else {
						nullCounts++;
					}
				}
			}
			var timesheetString = ED.formatDataForSyncTwo(outRecords, columns);
			return [{
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					timesheetString: timesheetString
				}];
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
			com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.clean(params);
		}
};
