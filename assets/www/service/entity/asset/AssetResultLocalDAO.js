com.swaas.hidoctor.edetailing.dao.AssetResultLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DIGASSETS_RESULTS",
			"columns": [
						{name: "daCode", columnName: "DA_Code", pk:true},
						{name: "productCode", columnName: "Prd_Code", pk:true},
						{name: "daMetaData", columnName:"DAMetaData"}
						]
		},
		
		insert: function(assetMaster){
			if (assetMaster.productCode == null){
				assetMaster.productCode = assetMaster.prdCode;
			}
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, assetMaster);
		},
		
		update: function(assetMaster){
			if (assetMaster.productCode == null){
				assetMaster.productCode = assetMaster.prdCode;
			}
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, assetMaster);
		},
		
		remove: function(daCode, prdCode){
			var criteria = {};
			criteria.daCode = daCode;
			criteria.productCode=prdCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(daCode, prdCode){
			var criteria = {};
			criteria.daCode = daCode;
			criteria.productCode=prdCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		}
};
