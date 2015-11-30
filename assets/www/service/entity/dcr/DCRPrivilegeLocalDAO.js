com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Privilege",
			"columns": [
						{name: "rigidDoctorEntry", columnName:"RIGID_DOCTOR_ENTRY"},
						{name: "sfcValidation", columnName:"SFC_VALIDATION"},
					    {name: "dcrProductBringType", columnName:"DCR_PRODUCTS_BRING_TYPE"},
					    {name: "dcrDoctorVisitMode", columnName:"DCR_DOCTOR_VISIT_MODE"},
					    {name: "dcrDoctorPobAmount", columnName:"DCR_DOCTOR_POB_AMOUNT"},
					    {name: "dcrInputMandatoryNumber", columnName:"DCR_INPUT_MANDATORY_NUMBER"},
					    {name: "showAccompanistData", columnName:"SHOW_ACCOMPANISTS_DATA"},
					    {name: "dcrChemistMandatoryNumber", columnName:"DCR_CHEMIST_MANDATORY_NUMBER"},
					    {name: "rcpaMandatoryDoctorCategory", columnName:"RCPA_MANDATORY_DOCTOR_CATEGORY"}
			           ]
		},
		
		insert: function(privilege){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, privilege);
		},
		
		update: function(privilege){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, privilege);
		},
		
		get: function(){
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, null);		
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		remove: function(){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, null);			
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null);
		}
		
};