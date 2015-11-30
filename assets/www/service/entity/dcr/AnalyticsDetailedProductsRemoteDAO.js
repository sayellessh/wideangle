com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsRemoteDAO = {
		metadata: {
			"service" : "HDEDDCRUpSyncService"
		},
		
		syncPut: function(params){
			var products = {
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					detailedProductsString: params.detailedProductsString
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "InsertDetailedProductsAnalytics", products);
			return result;
		}
};