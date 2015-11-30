com.swaas.hidoctor.edetailing.dao.ActivityMasterLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Activity_Master",
			"columns": [	
						{name:"activityCode",columnName:"Activity_Code",pk:true},
						{name:"projectCode", columnName:"Project_Code",pk:true},	
						{name:"activityName",columnName:"Activity_Name"}
			            ]
		},
		
		insert: function(activity){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, activity);
		},
		
		update: function(activity){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, activity);
		},
		
		remove: function(activityCode,projectCode){
			var criteria = {};
			criteria.activityCode = activityCode;
			criteria.projectCode = projectCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(activityCode,projectCode){
			var criteria = {};
			criteria.activityCode = activityCode;
			criteria.projectCode = projectCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null);
		}
};
