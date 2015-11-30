com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Chemist_Visit",
			"columns": [
						{name: "chemistVisitCode", columnName:"Chemist_Visit_Code",pk:true},
						{name: "doctorVisitCode", columnName:"Doctor_Visit_Code"},
						{name: "dcrCode", columnName:"DCR_Code"},
						{name: "chemistCode", columnName:"Chemist_Code"},
						{name: "chemistName", columnName:"Chemist_Name"},
						{name: "poAmount", columnName:"PO_Amount"},					
						{name: "isAccChemist", columnName:"Is_Acc_Chemist"},
						{name: "dcrCodeFormatted", columnName:"DCR_Code_Formatted"},
						{name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code_Formatted"},
						{name: "chemistVisitCodeFormatted", columnName:"Chemist_Visit_Code_Formatted"}
			           ]
		},
		
		insert: function(chemist){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,chemist);
		},
		
		update: function(chemist){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,chemist);
		},
		
		remove: function(chemistVisitCode){
			var criteria = {};
			criteria.chemistVisitCode = chemistVisitCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		removeByDoctorVisitCode: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);
		},
		
		getByDocVisitCode : function(doctorVisitCode) {
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		get: function(chemistVisitCode){
			var criteria = {};
			criteria.chemistVisitCode =chemistVisitCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		syncGet: function(params){
			var columns = [
					 {name: "chemistVisitCodeFormatted", columnName:"Chemist_Visit_Code",pk:true},
                     {name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code"},
                     {name: "dcrCodeFormatted", columnName:"DCR_Code"},
                     {name: "chemistCode", columnName:"Chemist_Code"},
                     {name: "chemistName", columnName:"Chemist_Name"},
                     {name: "poAmount", columnName:"PO_Amount"},					
                     {name: "isAccChemist", columnName:"Is_Acc_Chemist"}
			                ];
			
			var chemistRecords = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			if (chemistRecords.length == 0){
				return [];
			}
			$.each(chemistRecords, function(i, chemist){
				chemist.isAccChemist = (chemist.isAccChemist == "Y"?"1":"0");
			});
			var outRecords = new Array();
			var nullCounts = 0;
			if(chemistRecords != null && chemistRecords.length > 0) {
				for(var i=0;i<=chemistRecords.length-1;i++) {
					if(chemistRecords[i].chemistVisitCodeFormatted != null
							&& chemistRecords[i].chemistVisitCodeFormatted != '') {
						outRecords.push(chemistRecords[i]);
					} else {
						nullCounts++;
					}
				}
			}
			var chemistVisitString = ED.formatDataForSyncTwo(outRecords, columns);
			return [{
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					chemistVisitString: chemistVisitString
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
			com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.clean(params);
		}
};
