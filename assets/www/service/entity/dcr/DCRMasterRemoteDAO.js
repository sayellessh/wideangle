com.swaas.hidoctor.edetailing.dao.DCRMasterRemoteDAO = {
		metadata: {
			"service" : "HDCoreService",
			"properties": [
						{name: "dcrDate", inProperty: "DCR_Actual_Date", outProperty: "DCR_Actual_Date", isDate: true},
						{name: "flag", inProperty: "Flag", outProperty: "Flag"},
						{name: "status", inProperty: "Status", outProperty: "Status"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetDCRDetails", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};