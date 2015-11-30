com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Customer_Master",
			"columns": [
						{name: "customerCode", columnName: "Customer_Code", pk:true},
						{name: "regionCode", columnName: "Region_Code", pk:true},
						{name: "customerName", columnName: "Customer_Name"},
						{name: "mdl", columnName:"MDL"},
						{name: "categoryCode", columnName:"Category_Code"},
						{name: "specialityCode", columnName:"Speciality_Code"},
						{name: "customerEntityType", columnName:"Customer_Entity_Type"},
						{name: "regionName", columnName: "Region_Name"}
						]
		},
		
		insert: function(customerMaster){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, customerMaster);
		},
		
		update: function(customerMaster){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, customerMaster);
		},
		
		remove: function(customerCode,regionCode){
			var criteria = {};
			criteria.customerCode = customerCode;
			criteria.regionCode = regionCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(customerCode,regionCode){
			var criteria = {};
			criteria.customerCode = customerCode;
			criteria.regionCode = regionCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getDoctor: function(customerCode,regionCode){
			var criteria = {};
			criteria.customerCode = customerCode;
			criteria.regionCode = regionCode;
			criteria.customerEntityType = "DOCTOR";
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getDoctorsMdl: function(customerCode){
			var criteria = {};
			criteria.customerCode = customerCode;
			criteria.customerEntityType = "DOCTOR";
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
		    return result;
		},
		
		getDoctors: function(regionCode){
			var criteria = {};
			criteria.regionCode = regionCode;
			criteria.customerEntityType = "DOCTOR";
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
		    return result;
		},
		
		getOthersDoctors: function(regionCode){
			var query ="Select * from tbl_Customer_Master where Customer_Entity_Type = 'DOCTOR' AND Region_Code != '" + regionCode + "'";
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this, query);
		    return result;
		},
		
		getChemist: function(customerCode, regionCode){
			var criteria = {};
			criteria.customerCode = customerCode;
			criteria.regionCode = regionCode;
			criteria.customerEntityType = "CHEMIST";
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);	
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getChemists: function(regionCode){
			var criteria = {};
			criteria.regionCode = regionCode;
			criteria.customerEntityType = "CHEMIST";
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
