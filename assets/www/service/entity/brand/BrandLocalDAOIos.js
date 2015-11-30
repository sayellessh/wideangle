com.swaas.hidoctor.edetailing.dao.BrandLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Brand_Master",
			"columns": [
						
						{name: "brandCode", columnName:"Brand_Code", pk:true},
						{name: "brandName", columnName:"Brand_Name"},
						
			            ]
		},
		
		insert: function(brand){
			
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,brand);
		},
		
		update: function(brand){
			com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,brand);
		},
		
		remove: function(brandCode, onRemove, onFailure){
			var criteria = {};
			criteria.brandCode = brandCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove, onFailure);
		},
		
		get: function(brandCode, onSuccess, onFailure){
			var criteria = {};
			criteria.brandCode =brandCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, function(results){
                if(results.length > 0)
                    onSuccess(results[0]);
                else
                    onSuccess(null);
            }, onFailure);
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(isEraseAndClean, context, onClean){
			this.remove(null, onClean);
		}
};
