com.swaas.hidoctor.edetailing.dao.DATagAnalyticRemoteDAO = {
		metadata: {
			"service" : "HDTagService"
		},
		
		syncPut: function(params){
			var daTagAnalyicRecord = {
					correlationId: params.correlationId,
					companyCode: params.companyCode,
					userCode: params.userCode,
					tagDetails: params.tagDetails
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "PutTag", daTagAnalyicRecord);
			return result;
		}
};