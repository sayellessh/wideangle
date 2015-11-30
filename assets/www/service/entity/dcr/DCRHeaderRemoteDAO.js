com.swaas.hidoctor.edetailing.dao.DCRHeaderRemoteDAO = {
		metadata: {
			"service" : "HDEDDCRUpSyncService"
		},
		
		syncPut: function(params){
			var header = {
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					dcrHeaderString : params.dcrHeaderString,
					dcrHeaderAccompString : params.dcrHeaderAccompString

			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "InsertDCRHeader_31", header);
			return result;
		}
};