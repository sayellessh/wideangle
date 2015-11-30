com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DA_Tag_Analytics",
			"columns": [
			            {name: "daTagAnalyticId", columnName: "DA_Tag_Analysic_Id", pk:true},
			            {name: "companyCode", columnName: "Company_Code"},
						{name: "daCode", columnName: "DA_ID"},
						{name: "doctorCode", columnName: "Doctor_Code"},
						{name: "doctorRegionCode", columnName: "Doctor_Region_Code"},
						{name: "userCode", columnName:"User_Code"},
						{name: "userRegionCode", columnName: "User_Region_Code"},
						{name: "like", columnName:"Like"},
						{name: "dislike", columnName:"Disike"},
						{name: "rating", columnName:"rating"},
						{name: "dateTime", columnName:"DateTime", isDate:true},
						{name: "tagDescription", columnName:"Tag_Description"},
						{name: "productCode", columnName:"Product_Code"},
						{name: "accompnistName", columnName: "Acc_Name"}
						]
		},
		
		insert: function(daAnalytics){
			com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true);
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, daAnalytics);
		},
				
		remove: function(daTagAnalyticId){
			var criteria = {};
			criteria.daTagAnalyticId = daTagAnalyticId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		removeById: function(daTagAnalyticId){
			var criteria = {};
			criteria.daTagAnalyticId = daTagAnalyticId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		removeByAnalytics: function(analytics){
			var query ="Select * from tbl_DA_Tag_Analytics where DA_Code =" + analytics.assetCode + " AND Company_Code =" + analytics.companyCode + 
			" AND Doctor_Code =" + analytics.doctorCode+" AND Doctor_Region_Code =" + analytics.doctorRegionCode+" AND Tag_Description"+analytics.tagDescription;
			" AND User_Code =" + analytics.userCode+" AND Like =" + analytics.like+" AND Disike =" + analytics.dislike+" AND rating =" + analytics.rating+
			" Order By DateTime";
			var response = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this, query);	
			if(response != null && response.length > 0){
				return this.removeById(response[0].daTagAnalyticId);
			}else{
				return null;
			}
		},
		
		getByAsset : function(daCode) {
			var criteria = {};
			criteria.daCode = daCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
	    },
		
		syncGet: function(params){
			var daTagAnalyicRecords = [];
			var columns = [{name: "companyCode", columnName: "Company_Code"},
			{name: "daCode", columnName: "DA_ID"},
			{name: "doctorCode", columnName: "Doctor_Code"},
			{name: "doctorRegionCode", columnName: "Doctor_Region_Code"},
			{name: "userCode", columnName:"User_Code"},
			{name: "like", columnName:"Like"},
			{name: "dislike", columnName:"Disike"},
			{name: "rating", columnName:"rating"},
			{name: "dateTime", columnName:"DateTime", isDate:true},
			{name: "tagDescription", columnName:"Tag_Description"},
			{name: "userRegionCode", columnName:"User_Region_Code"},
			{name: "productCode", columnName:"Product_Code"},
			{name: "accompnistName", columnName: "Acc_Name"}
			];
			
			var daTagAnalytics = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			$.each(daTagAnalytics, function (index, daTagAnalyic){
				var tagDetails = ED.formatDataForSync(daTagAnalyic, columns);
				var daTagAnalyicRecord = {
						daTagAnalyticId: daTagAnalyic.daTagAnalyticId,
						correlationId: params.correlationId,
						companyCode: params.companyCode,
						userCode: params.userCode,
						tagDetails: tagDetails
					};
				daTagAnalyicRecords.push(daTagAnalyicRecord);
			});
			
			return daTagAnalyicRecords;
		},
		
		clean: function(params){
			if (params == null){
				params = {};
			}
			var criteria = {
					daTagAnalyticId: params.daTagAnalyticId
				};
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);	
		},
		eraseAndClean : function(isEraseAndClean){
			var params = {};
			com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.clean(params);
			
		}
};
