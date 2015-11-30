com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingRemoteDAO = {
		metadata: {
			"service" : "HDBillingService"
		},
		
		syncPut: function(params){
			var daBillingRecord = {
					correlationId: params.correlationId,
					companyCode: params.companyCode,
					userCode: params.userCode,
					daItemizedDetails: params.daItemizedDetails
				};
			console.log(JSON.stringify(daBillingRecord));
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "InsertDAItemizedBilling", daBillingRecord);
			return result;
		}
};