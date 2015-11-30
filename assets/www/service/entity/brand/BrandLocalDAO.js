com.swaas.hidoctor.edetailing.dao.BrandLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Brand_Master",
			"columns": [
						
						{name: "brandCode", columnName:"Brand_Code", pk:true},
						{name: "brandName", columnName:"Brand_Name"},
						
			            ]
		},
		
		insert: function(brand){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,brand);
		},
		
		update: function(brand){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,brand);
		},
		
		remove: function(brandCode){
			var criteria = {};
			criteria.brandCode = brandCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(brandCode){
			var criteria = {};
			criteria.brandCode =brandCode;
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
