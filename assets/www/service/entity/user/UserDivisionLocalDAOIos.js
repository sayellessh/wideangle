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
		
		remove: function(userCode, divisionCode, onRemove){
			var criteria = {};
			criteria.userCode = userCode;
			criteria.divisionCode = divisionCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove);
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
		
		getByUser: function(userCode, onSuccess, onFailure){
			var criteria = {};
			criteria.userCode = userCode; 
			com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, function(results){
                if (results.length > 0){
                    if(onSuccess != null)
                        onSuccess(results[0]);
                } else {
                    if(onSuccess != null)
                        onSuccess(null);
                }
            }, onFailure);
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(isEraseAndClean, context, onRemove){
			this.remove(null, null, onRemove);
		}
};
