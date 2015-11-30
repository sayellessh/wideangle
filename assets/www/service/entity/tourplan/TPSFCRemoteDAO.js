com.swaas.hidoctor.edetailing.dao.TPSFCRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "tpId", inProperty: "TP_Id", outProperty: "TP_Id"},
						{name: "fromPlace", inProperty: "From_Place", outProperty: "From_Place"},
						{name: "toPlace", inProperty: "To_Place", outProperty: "To_Place"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetTPSFC", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};