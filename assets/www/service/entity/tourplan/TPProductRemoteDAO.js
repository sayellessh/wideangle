com.swaas.hidoctor.edetailing.dao.TPProductRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "tpDoctorId", inProperty: "TP_Doctor_Id", outProperty: "TP_Doctor_Id"},
						{name: "productCode", inProperty: "Product_Code", outProperty: "Product_Code"},
						{name: "quantity", inProperty: "Quantity", outProperty: "Quantity"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetTPProducts", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};