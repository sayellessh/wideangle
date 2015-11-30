com.swaas.hidoctor.edetailing.dao.AssetMarketingAnalysisLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DA_Marketing_Analysis",
			"columns": [
						{name: "companyCode", columnName: "Company_Code", pk:true},
						{name: "daId", columnName: "DA_Id", pk:true},
						{name: "dcrActualDate", columnName: "DCR_Actual_Date"},
						{name: "userCode", columnName:"User_Code", pk:true},
						{name: "productCode", columnName:"Product_Code"},
						{name: "productName", columnName:"Product_Name"},
						{name: "doctorCode", columnName:"Doctor_Code"},
						{name: "doctorRegionCode", columnName:"Doctor_Region_Code"},
						{name: "mode", columnName:"Mode"},
						{name: "playTime", columnName:"Play_Time"}
						]
		},
		
		insert: function(assetMarketingAnalysis){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, assetMarketingAnalysis);
		},
		
		update: function(assetMarketingAnalysis){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, assetMarketingAnalysis);
		},
		
		remove: function(companyCode,daId,userCode){
			var criteria = {};
			criteria.companyCode = companyCode;
			criteria.daId = daId;
			criteria.userCode = userCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(companyCode,daId,userCode){
			var criteria = {};
			criteria.companyCode = companyCode;
			criteria.daId = daId;
			criteria.userCode = userCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		}
};
