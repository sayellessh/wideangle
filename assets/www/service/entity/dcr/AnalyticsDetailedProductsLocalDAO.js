com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Anlytics_Detailed_Products",
			"columns": [
						{name: "dcrActualDate", columnName:"DCR_Actual_Date",pk:true,isDate:true},
						{name: "doctorCode", columnName:"Doctor_Code",pk:true},
						{name: "doctorRegionCode", columnName:"Doctor_Region_Code",pk:true},
						{name: "productCode", columnName:"Product_Code",pk:true}
	                   ]
		},
		
		insert: function(products){
			com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true);
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,products);
		},
		
		update: function(products){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,products);
		},
		
		remove: function(dcrActualDate,doctorCode,doctorRegionCode,productCode){
			var criteria = {};
			criteria.dcrActualDate = dcrActualDate;
			criteria.doctorCode = doctorCode;
			criteria.doctorRegionCode = doctorRegionCode;
			criteria.productCode = productCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		get: function(dcrActualDate,doctorCode,doctorRegionCode,productCode){
			var criteria = {};
			criteria.dcrActualDate = dcrActualDate;
			criteria.doctorCode = doctorCode;
			criteria.doctorRegionCode = doctorRegionCode;
			criteria.productCode = productCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getByDcrDate: function(dcrActualDate, doctorCode, doctorRegionCode){
			var criteria = {};
			criteria.dcrActualDate = dcrActualDate;
			criteria.doctorCode = doctorCode;
			criteria.doctorRegionCode = doctorRegionCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
				
		syncGet: function(params) {
			var columns = [
						   {name: "dcrActualDate", columnName:"DCR_Actual_Date",pk:true,isDate:true},
                           {name: "doctorCode", columnName:"Doctor_Code",pk:true},
			               {name: "doctorRegionCode", columnName:"Doctor_Region_Code",pk:true},
			               {name: "productCode", columnName:"Product_Code",pk:true}			               
			               ];
			
			var analyticProducts = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			var detailedProductsString = ED.formatDataForSyncTwo(analyticProducts, columns);
			return {
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					detailedProductsString: detailedProductsString
				};
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
			com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO.clean(params);
		},
		
		dcrClean: function(){
			var _this = com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO;
			var query = "delete from tbl_Anlytics_Detailed_Products where DCR_Actual_Date NOT IN (select DCR_Actual_Date from tbl_DCR_Header)";
			com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this , query);
			com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.clean();
		}
		
};		