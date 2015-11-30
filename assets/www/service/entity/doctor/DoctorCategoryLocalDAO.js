com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Doctor_Category_Master",
			"columns": [
						
						{name: "categoryCode", columnName: "Category_Code", pk:true},
						{name: "categoryName", columnName: "Category_Name"}						
			            ]
		},
		
		insert: function(doctorCategory){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, doctorCategory);
		},
		
		update: function(doctorCategory){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, doctorCategory);
		},
		
		remove: function(categoryCode){
			var criteria = {};
			criteria.categoryCode = categoryCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(categoryCode){
			var criteria = {};
			criteria.categoryCode =categoryCode;
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
