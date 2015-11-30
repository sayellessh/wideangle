com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Product_Details",
			"columns": [
						{name: "dcrProductCode", columnName:"DCR_Product_Code",pk:true},
						{name: "doctorVisitCode", columnName:"Doctor_Visit_Code"},
						{name: "dcrCode", columnName:"DCR_Code"},
						{name: "productCode", columnName:"Product_Code"},
						{name: "specialityCode", columnName:"Speciality_Code"},
						{name: "qtyGiven", columnName:"Qty_Given"},
						{name: "isDetailed", columnName: "Is_Detailed"},
						{name: "dcrCodeFormatted", columnName:"DCR_Code_Formatted"},
						{name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code_Formatted"},
						{name: "dcrProductCodeFormatted", columnName:"DCR_Product_Code_Formatted"}
			           ]
		},
		
		insert: function(product){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,product);
		},
		
		update: function(product){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,product);
		},
		
		remove: function(dcrProductCode){
			var criteria = {};
			criteria.dcrProductCode = dcrProductCode;
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
		
		get: function(dcrProductCode){
			var criteria = {};
			criteria.dcrProductCode =dcrProductCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getByDcrCode: function(dcrCode){
			var criteria = {};
			criteria.dcrCode = dcrCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		getByVistCode: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode =doctorVisitCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
		},
		
		syncGet: function(params){
			var columns = [
					{name: "dcrProductCodeFormatted", columnName:"DCR_Product_Code",pk:true},
                    {name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code"},
                    {name: "dcrCodeFormatted", columnName:"DCR_Code"},
                    {name: "productCode", columnName:"Product_Code"},
                    {name: "specialityCode", columnName:"Speciality_Code"},
                    {name: "qtyGiven", columnName:"Qty_Given"},
					{name: "isDetailed", columnName: "Is_Detailed"}
						   ];
						
			var productRecords = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			if (productRecords.length == 0){
				return [];
			}
			var outRecords = new Array();
			var nullCounts = 0;
			if(productRecords != null && productRecords.length > 0) {
				for(var i=0;i<=productRecords.length-1;i++) {
					if(productRecords[i].dcrProductCodeFormatted != null
							&& productRecords[i].dcrProductCodeFormatted != '') {
						outRecords.push(productRecords[i]);
					} else {
						nullCounts++;
					}
				}
			}
			var productDetailString = ED.formatDataForSyncTwo(outRecords, columns);
			return [{
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode,
					checkSumId : params.checkSumId,
					productDetailString: productDetailString
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
			com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.clean(params);
		}
};
