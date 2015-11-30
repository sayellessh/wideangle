com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Speciality_Master",
			"columns": [
						{name: "specialityCode", columnName:"Speciality_Code", pk:true},
						{name: "specialityName", columnName:"Speciality_Name"},
			            ]
		},
		
		insert: function(speciality){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, speciality);
		},
		
		update: function(speciality){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, speciality);
		},
		
		remove: function(specialityCode){
			var criteria = {};
			criteria.specialityCode = specialityCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(specialityCode){
			var criteria = {};
			criteria.specialityCode =specialityCode;
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
