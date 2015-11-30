com.swaas.hidoctor.edetailing.dao.UserLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_User_Info",
			"columns": [
						{name: "companyCode", columnName: "Company_Code"},
						{name: "userName", columnName: "User_Name"},
						{name: "password", columnName: "Password"},
						{name: "url", columnName:"URL"},
						{name: "userCode", columnName:"User_Code", pk:true},
						{name: "regionCode", columnName:"Region_Code"},
						{name: "regionName", columnName:"Region_Name"},
						{name: "userTypeCode", columnName:"User_Type_Code"},
						{name: "userTypeName", columnName:"User_Type_Name"},
						{name: "regionHierarchy", columnName:"Region_Hierarchy"},
						{name: "lastSyncDate", columnName:"Last_Sync_Date"}
			            ]
		},
		
		insert: function(user){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, user);
		},
		
		update: function(user){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, user);
		},
		
		remove: function(userCode){
			var criteria = {};
			criteria.userCode = userCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(userCode){
			var criteria = {};
			criteria.userCode = userCode;
			var users = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (users.length > 0){
				return users[0];
			} else {
				return null;
			}
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null);
		}
};
