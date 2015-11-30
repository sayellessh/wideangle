com.swaas.hidoctor.edetailing.dao.TPProductLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_TP_Products",
			"columns": [
						{name: "tpDoctorId", columnName: "TP_Doctor_Id", pk:true},
						{name: "productCode", columnName: "Product_Code", pk:true},
						{name: "quantity", columnName:"Quantity"}
			            ]
		},
		

		insert : function(tpProduct) {
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, tpProduct);
		},

		update : function(tpProduct) {
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, tpProduct);
		},

		remove : function(tpDoctorId, productCode) {
			var criteria = {};
			criteria.productCode = productCode;
			criteria.tpDoctorId = tpDoctorId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);
		},
	
		get : function(tpDoctorId, productCode) {
			var criteria = {};
			criteria.tpDoctorId = tpDoctorId;
			criteria.productCode = productCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this,
					criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getByDoctor : function(tpDoctorId) {
			var criteria = {};
			criteria.tpDoctorId = tpDoctorId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this,criteria);
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null, null);
		}
};
