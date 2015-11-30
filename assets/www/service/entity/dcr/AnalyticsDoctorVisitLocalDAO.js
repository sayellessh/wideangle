com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Analytics_Doctor_Visit",
			"columns": [
						{name: "dcrActualDate", columnName:"DCR_Actual_Date",pk:true, isDate:true},
						{name: "doctorCode", columnName:"Doctor_Code",pk:true},
						{name: "doctorRegionCode", columnName:"Doctor_Region_Code",pk:true},
						{name: "accompanistName", columnName:"Accompanist_Name"},
						{name: "doctorVisitTime", columnName:"Doctor_Visit_Time",  isDate:true},
						{name: "lattitude", columnName:"Lattitude"},
						{name: "longitude", columnName:"Longitude"},
						{name: "doctorName", columnName:"Doctor_Name"},
						{name: "geoAddress", columnName:"GEO_Address"}
	                   ]
		},
		
		insert: function(analytics){
			com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true);
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,analytics);
		},
		
		update: function(analytics){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,analytics);
		},
		
		remove: function(dcrActualDate,doctorCode,doctorRegionCode){
			var criteria = {};
			criteria.dcrActualDate = dcrActualDate;
			criteria.doctorCode = doctorCode;
			criteria.doctorRegionCode = doctorRegionCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		get: function(dcrActualDate,doctorCode,doctorRegionCode){
			var criteria = {};
			criteria.dcrActualDate = dcrActualDate;
			criteria.doctorCode = doctorCode;
			criteria.doctorRegionCode = doctorRegionCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result;
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
		
		syncGet: function(params){
			var columns = [
                 {name: "dcrActualDate", columnName:"DCR_Actual_Date",pk:true,isDate:true},
                 {name: "doctorCode", columnName:"Doctor_Code",pk:true},
                 {name: "doctorRegionCode", columnName:"Doctor_Region_Code",pk:true},
                 {name: "accompanistName", columnName:"Accompanist_Name"},
                 {name: "doctorVisitTime", columnName:"Doctor_Visit_Time", isDate:true, isTime:true},
                 {name: "lattitude", columnName:"Lattitude"},
                 {name: "longitude", columnName:"Longitude"}, 
				 {name: "doctorName", columnName:"Doctor_Name"},
				 {name: "geoAddress", columnName:"GEO_Address"}
			                ];
			
			var analyticRecords = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			var doctorVisitString = ED.formatDataForSyncTwo(analyticRecords, columns);
			return {
					correlationId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					doctorVisitString: doctorVisitString
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
			com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.clean(params);
		},
		
		dcrClean: function(params){
			var _this = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO;
			var query = "delete from tbl_Analytics_Doctor_Visit where DCR_Actual_Date NOT IN (select DCR_Actual_Date from tbl_DCR_Header)";
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this,query);
		}
		
};		