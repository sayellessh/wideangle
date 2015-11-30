com.swaas.hidoctor.edetailing.dao.DoctorProductMappingLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Doctor_Product_Mapping",
			"columns": [
						
						{name: "customerCode", columnName:"Customer_Code", pk:true},
						{name: "productCode",columnName:"Product_Code",pk:true},
						{name: "regionCode",columnName:"Region_Code"},
						{name: "productPriority",columnName:"Product_Priority_No"}
						
			            ]
		},
		
		insert: function(product){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,product);
		},
		
		remove: function(customerCode, productCode){
			var criteria = {};
			criteria.customerCode = customerCode;
			criteria.productCode = productCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(customerCode, productCode){
			var criteria = {};
			criteria.customerCode = customerCode;
			criteria.productCode = productCode;
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
			this.remove(null, null);
		}
};
