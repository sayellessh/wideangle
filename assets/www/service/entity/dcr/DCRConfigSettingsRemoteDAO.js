com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsRemoteDAO ={
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "dcrDocVisitTimeEntryMode", inProperty: "DCR_DOCTOR_VISIT_TIME_ENTRY_MODE", outProperty: "DCR_DOCTOR_VISIT_TIME_ENTRY_MODE"},
						{name: "dcrEntryTimeGap", inProperty: "DCR_ENTRY_TIME_GAP", outProperty: "DCR_ENTRY_TIME_GAP"},
						{name: "leaveEntryMode", inProperty: "LEAVE_ENTRY_MODE", outProperty: "LEAVE_ENTRY_MODE"},
						{name: "geoLocationSupport", inProperty: "GEO_LOCATION_SUPPORT", outProperty: "GEO_LOCATION_SUPPORT"},
						{name: "dateDisplayFormat", inProperty:"DATE_DISPLAY_FORMAT",outProperty: "DATE_DISPLAY_FORMAT"},
						{name: "maxAccompanistForADay", inProperty:"MAX_ACCOMPANIST_FOR_A_DAY",outProperty: "MAX_ACCOMPANIST_FOR_A_DAY"},
						{name: "restrictedSpecialCharacters" , inProperty :"SPECIAL_CHARACTERS_TO_BE_RESTRICTED", outProperty :"SPECIAL_CHARACTERS_TO_BE_RESTRICTED"}
						]
		},
		
		get: function(correlationId,subDomainName, companyCode, userCode){
			var data = {
					correlationId: correlationId,
					subDomainName : subDomainName,
					companyCode: companyCode,
					userCode : userCode
			};
			var configurationArray = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetConfigSettings", data);
			var configurationRemote = {};
			for (var i=0; i<configurationArray.length; i++){
				configurationRemote[configurationArray[i].ConfigKey] = configurationArray[i].ConfigValue;
			}
			var configuration = {};
			var noOfColumns = this.metadata.properties.length;
			for (var i = 0; i < noOfColumns; i++){
				var paramName = this.metadata.properties[i].outProperty;
				if (paramName != null && configurationRemote[paramName] != null){
					configuration[this.metadata.properties[i].name] = configurationRemote[paramName];
				}
			}
			
			return configuration;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId,params.subDomainName,params.companyCode, params.userCode);
		}
		
		
		
		
		
		
		
		
		
		
};