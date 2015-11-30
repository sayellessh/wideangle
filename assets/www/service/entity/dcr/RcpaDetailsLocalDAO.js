com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_RCPA_Details",
			"columns": [
						{name: "dcrRcpaCode", columnName:"DCR_RCPA_Code",pk:true},
						{name: "chemistVisitCode", columnName:"Chemist_Visit_Code"},
						{name: "doctorVisitCode", columnName:"Doctor_Visit_Code"},
						{name: "dcrCode", columnName:"DCR_Code"},
						{name: "salesProductCode", columnName:"Sales_Product_Code"},
						{name: "productCode", columnName:"Product_Code"},
						{name: "competitorProductCode", columnName:"Competitor_Product_Code"},
						{name: "competitorProductName", columnName:"Competitor_Product_Name"},
						{name: "supportQty", columnName:"Support_Qty"},
						{name: "dcrCodeFormatted", columnName:"DCR_Code_Formatted"},
						{name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code_Formatted"},
						{name: "chemistVisitCodeFormatted", columnName:"Chemist_Visit_Code_Formatted"},
						{name: "dcrRcpaCodeFormatted", columnName:"DCR_RCPA_Code_Formatted"}

						]
		},
		
		insert: function(rcpaDetails){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,rcpaDetails);
		},
		
		update: function(rcpaDetails){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,rcpaDetails);
		},
		
		remove: function(dcrRcpaCode){
			var criteria = {};
			criteria.dcrRcpaCode = dcrRcpaCode;
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
		
		getByDocVisitCode : function(doctorVisitCode) {
			
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		getByChemistVisitCode : function(chemistVisitCode) {
			
			var criteria = {};
			criteria.chemistVisitCode = chemistVisitCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		get: function(dcrRcpaCode){
			var criteria = {};
			criteria.dcrRcpaCode =dcrRcpaCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		syncGet: function(params){
			var columns = [
							 {name: "dcrRcpaCodeFormatted", columnName:"DCR_RCPA_Code",pk:true},
                             {name: "chemistVisitCodeFormatted", columnName:"Chemist_Visit_Code"},
                             {name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code"},
                             {name: "dcrCodeFormatted", columnName:"DCR_Code"},
                             {name: "salesProductCode", columnName:"Sales_Product_Code"},
                             {name: "productCode", columnName:"Product_Code"},
                             {name: "competitorProductCode", columnName:"Competitor_Product_Code"},
                             {name: "competitorProductName", columnName:"Competitor_Product_Name"},
                             {name: "supportQty", columnName:"Support_Qty"}
			               ];
			var rcpaRecords = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			if (rcpaRecords.length == 0){
				return [];
			}
			var outRecords = new Array();
			var nullCounts = 0;
			if(rcpaRecords != null && rcpaRecords.length > 0) {
				for(var i=0;i<=rcpaRecords.length-1;i++) {
					if(rcpaRecords[i].dcrRcpaCodeFormatted != null
							&& rcpaRecords[i].dcrRcpaCodeFormatted != '') {
						outRecords.push(rcpaRecords[i]);
					} else {
						nullCounts++;
					}
				}
			}
			var rcpaString = ED.formatDataForSyncTwo(outRecords, columns);
			return [{
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					rcpaString: rcpaString
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
			com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.clean(params);
		}

};
