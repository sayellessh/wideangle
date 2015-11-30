com.swaas.hidoctor.edetailing.dao.DoctorTagLocalDAO = {
		metadata: {
			"tableName" : "tbl_Doctor_Tag",
			"columns": [
						{name: "tagId", columnName: "Tag_ID", pk:true},
						{name: "companyCode", columnName: "Company_Code"},
						{name: "userCode", columnName: "User_Code"},
						{name: "customerCode", columnName: "Customer_Code"},
						{name: "userRegionCode", columnName: "User_Region_Code"},
						{name: "tagDate", columnName: "TagDate", isDate:true},
						{name: "tagDescription", columnName: "Tag_Description"}
						]
		},
		
		insert: function(tagDoctor){
			com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true);
			console.log(tagDoctor);
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, tagDoctor);
		},
				
		remove: function(tagId){
			var criteria = {};
			criteria.tagId = tagId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		removeAll: function(){
			this.remove(null);
		},
		
		syncGet: function(params){
			var tagDoctor = [];
			var columns = [
							{name: "companyCode", columnName: "Company_Code"},
							{name: "userCode", columnName: "User_Code"},
							{name: "customerCode", columnName: "Customer_Code"},
							{name: "userRegionCode", columnName: "User_Region_Code"},
							{name: "tagDate", columnName: "TagDate", isDate:true},
							{name: "tagDescription", columnName: "Tag_Description"}
							];
			
			var tags = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			$.each(tags, function (index, tag){
				var tagDetails = ED.formatDataForSync(tag, columns);
				var tagRecord = {
						daTagAnalyticId: tag.daTagAnalyticId,
						correlationId: params.correlationId,
						companyCode: params.companyCode,
						userCode: params.userCode,
						tagDetails: tagDetails
					};
				tagDoctor.push(tagRecord);
			});
			
			return tagDoctor;
		},
		
		clean: function(params){
			if (params == null){
				params = {};
			}
			var criteria = {
					tagId: params.tagId
				};
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);	
		},
		eraseAndClean : function(isEraseAndClean){
			var params = {};
			com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.clean(params);
			
		}
};
