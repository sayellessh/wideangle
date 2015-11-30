com.swaas.hidoctor.edetailing.dao.DigitalAssetResultLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DIGASSETS_RESULTS",
			"columns": [
			            {name: "daCode", columnName: "DA_Code", pk: true},
						{name: "productCode", columnName: "Product_Code", pk: true},
						{name: "daMetaData", columnName:"DA_Metadata"}
						]
		},
		
		insert: function(digitalAssetResult){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, digitalAssetResult);
		},
		
		update: function(digitalAssetResult){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, digitalAssetResult);
		},
		
		remove: function(daCode){
			var criteria = {};
			criteria.daCode = daCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(daCode){
			var criteria = {};
			criteria.daCode = daCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getLike: function(daMetaData){
			var criteria = {};
			criteria.daMetaData = daMetaData;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getLike(this, criteria);
			return result;
		},

		getAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, null);
			return result;
		},
		
		syncPut: function(params){
			/*var asset = this.get(params.daCode);
			if(asset == null || asset.productCode != params.productCode) {
						
			}*/
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null);
		}
};
