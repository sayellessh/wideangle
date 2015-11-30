com.swaas.hidoctor.edetailing.dao.UserDivisionLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_User_Division",
			"columns": [
						
                        {name: "userCode", columnName:"User_Code", pk:true},
						{name: "divisionCode", columnName:"Division_Code", pk:true},
						{name: "divisionName", columnName:"Division_Name"},
						
			            ]
		},
		
		insert: function(userDivision){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, userDivision);
		},
		
		update: function(userDivision){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, userDivision);
		},
		
		remove: function(userCode, divisionCode){
			var criteria = {};
			criteria.userCode = userCode;
			criteria.divisionCode = divisionCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(userCode, divisionCode){
			var criteria = {};
			criteria.userCode = userCode;
			criteria.divisionCode =divisionCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getByUser: function(userCode){
			var criteria = {};
			criteria.userCode = userCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
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
