com.swaas.hidoctor.edetailing.dao.CheckSumRemoteDAO = {
		metadata: {
			"service" : "HDEDDCRUpSyncService"
		},
		
		syncPut: function(params){
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "PushCheckSumData_32", params);
			var outputMsg = com.swaas.hidoctor.edetailing.dao.CoreSOAP.outputMsg;
			if (outputMsg != null && outputMsg != ""){
				alert(outputMsg);
			}
			return result;
		},
		
		syncPutVerify: function(params){
			var checkSum = {
					corrlId: params.corrlId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId: params.checkSumId
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(com.swaas.hidoctor.edetailing.dao.CheckSumRemoteDAO, "VerifyCheckSum_32", checkSum);
			var response = {
					result: result,
					outputMsg: com.swaas.hidoctor.edetailing.dao.CoreSOAP.outputMsg
			};
			return response;
		}
};