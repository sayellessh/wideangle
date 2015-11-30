com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Config_Settings",
			"columns": [
						{name: "dcrDocVisitTimeEntryMode", columnName:"DCR_DOCTOR_VISIT_TIME_ENTRY_MODE"},
						{name: "dcrEntryTimeGap", columnName:"DCR_ENTRY_TIME_GAP"},
						{name: "leaveEntryMode", columnName:"LEAVE_ENTRY_MODE"},
						{name: "geoLocationSupport", columnName:"GEO_LOCATION_SUPPORT"},
						{name: "dateDisplayFormat", columnName:"DATE_DISPLAY_FORMAT"},
						{name: "maxAccompanistForADay", columnName: "MAX_ACCOMPANIST_FOR_A_DAY"},
						{name: "restrictedSpecialCharacters" , columnName :"SPECIAL_CHARACTERS_TO_BE_RESTRICTED"}
			           ]
		},
		
		insert: function(config){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, config);
		},
		
		update: function(config){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, config);
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