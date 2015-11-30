com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Header",
			"columns": [
						{name: "dcrCode", columnName:"DCR_Code",pk:true},
						{name: "userCode", columnName:"User_Code"},
						{name: "dcrEnteredDate", columnName:"DCR_Entered_Date",isDate:true},
						{name: "regionCode", columnName:"Region_Code"},
						{name: "dcrActualDate", columnName:"DCR_Actual_Date",isDate:true},
						{name: "flag", columnName:"Flag",pk:true},
						{name: "categoryCode", columnName:"Category_Code"},
						{name: "categoryName", columnName:"Category_Name"},
						{name: "approvedBy", columnName:"Approved_By"},
						{name: "approvedDate", columnName:"Approved_Date",isDate:true},
						{name: "unapprovalReason", columnName:"Unapproval_Reason"},
						{name: "sourceOfEntry", columnName:"Source_Of_Entry"},
						{name: "lattitude", columnName:"Lattitude"},
						{name: "longitude", columnName:"Longitude"},
						{name: "dcrCodeFormatted", columnName:"DCR_Code_Formatted"},
						{name: "startTime", columnName:"Start_Time"},
						{name: "endTime", columnName:"End_Time"},
						{name: "geoAddress", columnName:"GEO_Address"}
			           ]
		},
		
		insert: function(header){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, header);
		},
		
		update: function(header){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, header);
		},
		
		get: function(dcrCode,flag){
			var criteria = {};
			criteria.dcrCode = dcrCode;
			criteria.flag = flag;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}		
		},

		getByDate : function(dcrActualDate) {
			var criteria = {};
			criteria.dcrActualDate = dcrActualDate;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			} 
		},
		
		getByDateAndFlag : function(dcrActualDate, flag) {
			var criteria = {};
			criteria.dcrActualDate = dcrActualDate;
			criteria.flag = flag;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			} 
		},

		remove: function(dcrCode,flag){
			var criteria = {};
			criteria.dcrCode = dcrCode;
			criteria.flag = flag;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		syncGet: function(params) {
			var columns = [
						{name: "dcrCodeFormatted", columnName:"DCR_Code ",pk:true},
                        {name: "userCode", columnName:"User_Code"},
						{name: "dcrEnteredDate", columnName:"DCR_Entered_Date",isDate:true , isTime:true},
						{name: "regionCode", columnName:"Region_Code"},
						{name: "dcrActualDate", columnName:"DCR_Actual_Date",isDate:true},
						{name: "flag", columnName:"Flag",pk:true},
						{name: "categoryCode", columnName:"Category_Code"},
						{name: "categoryName", columnName:"Category_Name"},
						{name: "sourceOfEntry", columnName:"Source_Of_Entry"},
						{name: "lattitude", columnName:"Lattitude"},
						{name: "longitude", columnName:"Longitude"},
						{name: "startTime", columnName:"Start_Time"},
						{name: "endTime", columnName:"End_Time"},
						{name: "geoAddress", columnName:"GEO_Address"}
			               ];
			
			var headerDetails = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			if (headerDetails.length == 0){
				return [];
			}
			var outRecords = new Array();
			var nullCounts = 0;
			if(headerDetails != null && headerDetails.length > 0) {
				for(var i=0;i<=headerDetails.length-1;i++) {
					if(headerDetails[i].dcrCodeFormatted != null
							&& headerDetails[i].dcrCodeFormatted != '') {
						outRecords.push(headerDetails[i]);
					} else {
						nullCounts++;
					}
				}
			}
			var dcrHeaderString = ED.formatDataForSyncTwo(outRecords, columns);
			return [{
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					dcrHeaderAccompString: com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.syncGetHeader(params),
					dcrHeaderString: dcrHeaderString
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
			com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.clean(params);
		}
	
};