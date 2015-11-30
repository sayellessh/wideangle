com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsRemoteDAO = {
		metadata: {
			"service" : "HDEDDCRUpSyncService"
		},
		
		syncPut: function(params){
			var detailed = {
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					detailedProductsString: params.detailedProductsString
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "InsertDetailedProducts", detailed);
			return result;
		}
};