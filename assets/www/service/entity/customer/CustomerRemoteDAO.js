com.swaas.hidoctor.edetailing.dao.CustomerRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "customerCode", inProperty: "Customer_Code", outProperty: "Customer_Code"},
						{name: "customerName", inProperty: "Customer_Name", outProperty: "Customer_Name"},
						{name: "regionCode", inProperty: "Region_Code", outProperty: "Region_Code"},
						{name: "mdl", inProperty: "MDL_Number", outProperty: "MDL_Number"},
						{name: "categoryCode", inProperty: "Category", outProperty: "Category"},
						{name: "specialityCode", inProperty: "Speciality_Code", outProperty: "Speciality_Code"},
						{name: "customerEntityType", inProperty: "Customer_Entity_Type", outProperty: "Customer_Entity_Type"},
						{name: "regionName", inProperty: "Region_Name", outProperty: "Region_Name"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode, regionCodes){
			var regionCodesArray = [];
			if (regionCodes instanceof Array){
				regionCodesArray = regionCodes;
			} else {
				regionCodesArray.push(regionCodes);
			}
			
			var regionCodesString = "'" + regionCodesArray[0] + "'";
			for(var i=1; i < regionCodesArray.length; i++){
				regionCodesString += (", '" + regionCodesArray[i] + "'" );
			}
						
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode,
					regionCodes:regionCodesString,
					lastModifiedDate:''
			};
			var doctors = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetDoctorDetails", data);
			var chemists = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetChemistDetails", data);
			var result = doctors.concat(chemists);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode, params.regionCodes);
		}
};