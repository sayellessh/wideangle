com.swaas.hidoctor.edetailing.dao.RcpaDetailsRemoteDAO = {
		metadata: {
			"service" : "HDEDDCRUpSyncService"
		},
		
		syncPut: function(params){
			var rcpa = {
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode,
					userCode: params.userCode,
					checkSumId : params.checkSumId,
					rcpaString: params.rcpaString
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "InsertRCPADetails", rcpa);
			return result;
		}
};