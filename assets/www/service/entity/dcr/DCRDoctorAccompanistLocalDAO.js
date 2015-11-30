com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Doctor_Accompanist",
			"columns": [
						{name: "doctorVisitCode", columnName:"Doctor_Visit_Code",pk:true},
						{name: "dcrCode", columnName:"DCR_Code"},
						{name: "accUserName", columnName:"Acc_User_Name",pk:true},
						{name: "accUserTypeName", columnName:"Acc_User_Type_Name"},
						{name: "accUserCode", columnName:"Acc_User_Code"},
						{name: "accRegionCode", columnName:"Acc_Region_Code"},
						{name: "isOnlyForDoctor", columnName:"Is_Only_For_Doctor"},
						{name: "modeOfEntry", columnName:"Mode_Of_Entry"},
						{name: "dcrCodeFormatted", columnName:"DCR_Code_Formatted"},
						{name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code_Formatted"}
					]	
		},
		
		insert: function(accompanistDoctor){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, accompanistDoctor);
		},
		
		update: function(accompanistDoctor){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, accompanistDoctor);
		},
		
		get: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);		
			return result;
		},
		
		getByVistCode: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);		
			return result;
		},
		
		getByDCRCode: function(dcrCode){
			var criteria = {};
			criteria.dcrCode = dcrCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);		
			return result;
		},
		
		remove: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		removeByDoctorVisitCode: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		syncGet : function(params) {
			var columns = [
					   {name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code"},
                       {name: "dcrCodeFormatted", columnName:"DCR_Code"},
                       {name: "accUserName", columnName:"Acc_User_Name"},
                       {name: "accUserTypeName", columnName:"Acc_User_Type_Name"},
                       {name: "accUserCode", columnName:"Acc_User_Code"},
                       {name: "accRegionCode", columnName:"Acc_Region_Code"},
                       {name: "isOnlyForDoctor", columnName:"Is_Only_For_Doctor"},
                       {name: "modeOfEntry", columnName:"Mode_Of_Entry"}
			               ];

			var accompanistRecords = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			
			$.each(accompanistRecords, function (index, accompanist){
				var accUserName = accompanist.accUserName;
				var name = "";
				var type = "";
				if (accUserName != null && accUserName != ""){
					var nameSplit = accUserName.split(",");
					if (nameSplit.length > 0){
						name = nameSplit[0];
						if (nameSplit.length > 1){
							var typeSplit = nameSplit[1].split("(");
							if (typeSplit.length > 0){
								type = typeSplit[0];
							} else {
								type = nameSplit[1];
							}
						}
					} else{
						name = accUserName;
					}
					accompanist.accUserName = name;
					accompanist.accUserTypeName = type;
				}
			});
			
			if (accompanistRecords.length == 0){
				return [];
			}
			var outRecords = new Array();
			var nullCounts = 0;
			if(accompanistRecords != null && accompanistRecords.length > 0) {
				for(var i=0;i<=accompanistRecords.length-1;i++) {
					if(accompanistRecords[i].doctorVisitCodeFormatted != null
							&& accompanistRecords[i].doctorVisitCodeFormatted != '') {
						outRecords.push(accompanistRecords[i]);
					} else {
						nullCounts++;
					}
				}
			}
			var doctorAccompanistString = ED.formatDataForSyncTwo(outRecords, columns);
			return [{
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					doctorAccompanistString: doctorAccompanistString
				}];
		},
		
		getDistinctAccompanist : function() {
			var query = "SELECT DCR_Code_Formatted, Acc_User_Name, Acc_User_Type_Name, Acc_User_Type_Name, Acc_Region_Code, MAX(Is_Only_For_Doctor) Is_Only_For_Doctor, MIN(Mode_Of_Entry) Mode_Of_Entry From tbl_DCR_Doctor_Accompanist Group By DCR_Code_Formatted, Acc_User_Name, Acc_User_Type_Name, Acc_User_Type_Name";
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this, query);
			if (result != null && result.length > 0){
				return result;
			} else {
				return [];
			}

		},
		
		
		syncGetHeader: function(params) {
			var columns = [
                       {name: "dcrCodeFormatted", columnName:"DCR_Code"},
                       {name: "accUserName", columnName:"Acc_User_Name"},
                       {name: "accUserTypeName", columnName:"Acc_User_Type_Name"},
                       {name: "accRegionCode", columnName:"Acc_Region_Code"},
                       {name: "startTime", columnName:"Start_Time"},
                       {name: "endTime", columnName:"End_Time"},
                       {name: "isOnlyForDoctor", columnName:"Is_Only_For_Doctor"},
                       {name: "modeOfEntry", columnName:"Mode_Of_Entry"}
			               ];

			var accompanistRecords = [];
			var distinctAccompanist = this.getDistinctAccompanist();
			$.each(distinctAccompanist, function(index, accompanist){
				var accUserName = accompanist.accUserName;
				var name = "";
				var type = "";
				if (accUserName != null && accUserName != ""){
					var nameSplit = accUserName.split(",");
					if (nameSplit.length > 0){
						name = nameSplit[0];
						if (nameSplit.length > 1){
							var typeSplit = nameSplit[1].split("(");
							if (typeSplit.length > 0){
								type = typeSplit[0];
							} else {
								type = nameSplit[1];
							}
						}
					} else{
						name = accUserName;
					}
					accompanist.accUserName = name;
					accompanist.accUserTypeName = type;
				}
				
				accompanist.startTime = "";
				accompanist.endTime = "";
				accompanistRecords.push(accompanist);
			});
				
			return ED.formatDataForSyncTwo(accompanistRecords, columns);
			
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
			com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.clean(params);
		}

};