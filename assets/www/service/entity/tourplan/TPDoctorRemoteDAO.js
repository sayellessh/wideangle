com.swaas.hidoctor.edetailing.dao.TPDoctorRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "tpId", inProperty: "TP_Id", outProperty: "TP_Id"},
						{name: "tpDoctorId", inProperty: "TP_Doctor_Id", outProperty: "TP_Doctor_Id"},
						{name: "doctorCode", inProperty: "Doctor_Code", outProperty: "Doctor_Code"},
						{name: "doctorRegionCode", inProperty: "Doctor_Region_Code", outProperty: "Doctor_Region_Code"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetTPDoctors", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};