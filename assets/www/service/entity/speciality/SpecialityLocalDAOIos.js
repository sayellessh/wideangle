com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Speciality_Master",
			"columns": [
						{name: "specialityCode", columnName:"Speciality_Code", pk:true},
						{name: "specialityName", columnName:"Speciality_Name"},
			            ]
		},
		
		insert: function(speciality){
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, speciality);
		},
		
		update: function(speciality){
			com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, speciality);
		},
		
		remove: function(specialityCode, onRemove, onFailure){
			var criteria = {};
			criteria.specialityCode = specialityCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove, onFailure);
		},
		
		get: function(specialityCode, onSuccess, onFailure){
			var criteria = {};
			criteria.specialityCode =specialityCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, function(results){
                 if(results.length > 0)
                    onSuccess(results[0]);
                 else
                    onSuccess(null);
            }, onFailure);
		},
		
		getAll: function(onSuccess,onFailure){
			var criteria = {};
			com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria,onSuccess,onFailure);
			
		},
		
		syncPut: function(params){
			this.insert(params);
			
		},
		
		clean: function(isEraseAndClean, context, onClean){
			this.remove(null, onClean);
		}
};