com.swaas.hidoctor.edetailing.dao.McDoctorsRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "mcCode", inProperty: "MC_Code", outProperty: "MC_Code"},
						{name: "doctorCode", inProperty: "Doctor_Code", outProperty: "Doctor_Code"},
						{name: "regionCode", inProperty: "Region_Code", outProperty: "Region_Code"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode, regionCodes){
			
			var regionCodesArray = [];
			if (regionCodes instanceof Array){
				regionCodesArray = regionCodes;
			} else {
				regionCodesArray.push(regionCodes);
			}
			//take only the user's regionCode (that is the first one)
			//var regionCodesString = "'" + regionCodesArray[0] + "'";
			var regionCodesString = "";
			$.each(regionCodesArray, function(index, regionCode) {
				if(regionCodesString == ""){
					regionCodesString += ("'" + regionCode + "'" );
				}else {
					regionCodesString += (", '" + regionCode + "'" );
				}			
			});
			
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode,
					regionCodes:regionCodesString
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetMCDoctorDetails", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode, params.regionCodes);
		}
};