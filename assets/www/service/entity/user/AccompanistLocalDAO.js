com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Accompanist",
			"columns": [
                        {name: "userName", columnName:"User_Name", pk:true},
						{name: "regionCode", columnName:"Region_Code"},
						{name: "userCode", columnName:"User_Code"}
			            ]
		},
		
		insert: function(accompanist){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, accompanist);
		},
		
		update: function(accompanist){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, accompanist);
		},
		
		remove: function(userName){
			var criteria = {};
			criteria.userName = userName;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);	

		},
		
		get: function(userName){
			var criteria = {};
			criteria.userName = userName;
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
