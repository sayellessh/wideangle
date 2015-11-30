com.swaas.hidoctor.edetailing.dao.UserProductMappingLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_User_Product_Mapping",
			"columns": [
						
						{name: "userCode", columnName:"User_Code", pk:true},
						{name: "productCode",columnName:"Product_Code",pk:true}
						
			            ]
		},
		
		insert: function(product){
            console.log('insert local mapping');
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,product);
		},
		
		remove: function(userCode, productCode, onRemove){
			var criteria = {};
			criteria.userCode = userCode;
			criteria.productCode = productCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove);
		},
		
		get: function(userCode, productCode){
			var criteria = {};
			criteria.userCode = userCode;
			criteria.productCode = productCode;
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
			return result;
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(IsEraseAndClean, context, onRemove){
			this.remove(null, null, onRemove);
		}
};