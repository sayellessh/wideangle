com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Detailed_Products",
			"columns": [
						{name: "doctorVisitCode", columnName:"Doctor_Visit_Code",pk:true},
						{name: "dcrCode", columnName:"DCR_Code"},
						{name: "salesProductCode", columnName:"Sales_Product_Code",pk:true},
						{name: "modeOfEntry", columnName:"Mode_Of_Entry"},
						{name: "dcrCodeFormatted", columnName:"DCR_Code_Formatted"},
						{name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code_Formatted"}
					]	
		},
		
		insert: function(detailed){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, detailed);
		},
		
		update: function(detailed){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, detailed);
		},
		
		get: function(doctorVisitCode,dcrCode,salesProductCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			criteria.dcrCode = dcrCode;
			criteria.salesProductCode = salesProductCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);		
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		remove: function(doctorVisitCode,dcrCode,salesProductCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			criteria.dcrCode = dcrCode;
			criteria.salesProductCode = salesProductCode;
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
		
		getByDoctorVisitCode: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		syncGet: function(params){
			var columns = [
                 {name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code"},
                 {name: "dcrCodeFormatted", columnName:"DCR_Code"},
				 {name: "salesProductCode", columnName:"Sales_Product_Code"},
				 {name: "modeOfEntry", columnName:"Mode_Of_Entry"}
			                ];
			
			var detailedRecords = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			if (detailedRecords.length == 0){
				return [];
			}
			var outRecords = new Array();
			var nullCounts = 0;
			if(detailedRecords != null && detailedRecords.length > 0) {
				for(var i=0;i<=detailedRecords.length-1;i++) {
					if(detailedRecords[i].doctorVisitCodeFormatted != null
							&& detailedRecords[i].doctorVisitCodeFormatted != '') {
						outRecords.push(detailedRecords[i]);
					} else {
						nullCounts++;
					}
				}
			}
			var detailedProductsString = ED.formatDataForSyncTwo(outRecords, columns);
			return [{
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					detailedProductsString: detailedProductsString
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
			com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.clean(params);
		}
};