com.swaas.hidoctor.edetailing.dao.DCRPrivilegeRemoteDAO ={
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "sfcValidation", inProperty: "SFC_VALIDATION", outProperty: "SFC_VALIDATION"},
						{name: "rigidDoctorEntry", inProperty: "RIGID_DOCTOR_ENTRY", outProperty: "RIGID_DOCTOR_ENTRY"},
						{name: "dcrProductBringType", inProperty:"DCR_PRODUCTS_BRING_TYPE",outProperty: "DCR_PRODUCTS_BRING_TYPE"},
						{name: "dcrDoctorVisitMode", inProperty:"DCR_DOCTOR_VISIT_MODE",outProperty: "DCR_DOCTOR_VISIT_MODE"},
						{name: "dcrDoctorPobAmount", inProperty:"DCR_DOCTOR_POB_AMOUNT",outProperty: "DCR_DOCTOR_POB_AMOUNT"},
						{name: "dcrInputMandatoryNumber", inProperty:"DCR_INPUT_MANDATORY_NUMBER",outProperty: "DCR_INPUT_MANDATORY_NUMBER"},
						{name: "showAccompanistData", inProperty:"SHOW_ACCOMPANIST_DATA",outProperty: "SHOW_ACCOMPANISTS_DATA"},
						{name: "dcrChemistMandatoryNumber", inProperty:"DCR_CHEMIST_MANDATORY_NUMBER",outProperty: "DCR_CHEMIST_MANDATORY_NUMBER"},
						{name: "rcpaMandatoryDoctorCategory", inProperty:"RCPA_MANDATORY_DOCTOR_CATEGORY",outProperty: "RCPA_MANDATORY_DOCTOR_CATEGORY"}
						  ]
		},
		
		get: function(correlationId,subDomainName, companyCode, userTypeCode,userCode){
			var isEmpty = true;
			var configuration = {};
			try {
				var data = {
						correlationId:correlationId,
						subDomainName : subDomainName,
						companyCode:companyCode,
						userTypeCode : userTypeCode,
						userCode : userCode
				};
				var configurationArray = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetPrivilegeMapping", data);
				var configurationRemote = {};
				for (var i=0; i<configurationArray.length; i++){
					configurationRemote[configurationArray[i].PrivilegeName] = configurationArray[i].PrivilegeValue;
				}
				var noOfColumns = this.metadata.properties.length;
				for (var i = 0; i < noOfColumns; i++){
					var paramName = this.metadata.properties[i].outProperty;
					if (paramName != null && configurationRemote[paramName] != null){
						configuration[this.metadata.properties[i].name] = configurationRemote[paramName];
						isEmpty = false;
					}
				}
			} catch(e) {}
			if(isEmpty) {
				return {
						rigidDoctorEntry: "YES",
						dcrDoctorVisitMode: "AM_PM"
				};
			} else {
				if(configuration.rigidDoctorEntry == null || configuration.rigidDoctorEntry == '')
					configuration.rigidDoctorEntry = "YES";
				if(configuration.dcrDoctorVisitMode == null || configuration.dcrDoctorVisitMode == '')
					configuration.dcrDoctorVisitMode = "AM_PM";
				return configuration;
			} 
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.subDomainName, params.companyCode, params.userTypeCode , params.userCode);
		}

};