com.swaas.hidoctor.edetailing.dao.SaleProductMappingLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Sale_Product_Mapping",
			"columns": [
						{name: "saleProductCode", columnName:"Sale_Product_Code", pk:true},
						{name: "mappingProductCode", columnName:"Mapping_Product_Code", pk:true}
			            ]
		},
		
		insert: function(saleMapping){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, saleMapping);
		},
		
		update: function(saleMapping){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, saleMapping);
		},
		
		remove: function(saleProductCode,mappingProductCode){
			var criteria = {};
			criteria.saleProductCode = saleProductCode;	
			criteria.mappingProductCode = mappingProductCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		

		get : function(saleProductCode, mappingProductCode) {
			var criteria = {};
			criteria.saleProductCode = saleProductCode;
			criteria.mappingProductCode = mappingProductCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this,criteria);
			if (result.length > 0) {
				return result[0];
			} else {
				return null;
			}
		},
		
		getCompetitorProducts : function(saleProductCode) {
			var criteria = {};
			criteria.saleProductCode = saleProductCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this,criteria);
			return result;
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
			this.remove(null, null);
		}
};
