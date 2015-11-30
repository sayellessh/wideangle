com.swaas.hidoctor.edetailing.dao.UniqueProductCodeLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DIGASSETS_UNIQUE_PDTCODES",
			"columns": [
						{name: "productCode", columnName: "ProductCode", pk:true},
						{name: "productName", columnName:"ProductName", pk:true}
						
						]
		},
		

				insert : function(queryInput) {
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, queryInput);
		},
	
		update : function(queryInput) {
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, queryInput);
		},
	
		remove : function(productCode, productName) {
			var criteria = {};
			criteria.productCode = productCode;
			criteria.productName = productName;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);
		},
	
		get : function(productCode, productName) {
			var criteria = {};
			criteria.productCode = productCode;
			criteria.productName = productName;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this,criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		}
};
