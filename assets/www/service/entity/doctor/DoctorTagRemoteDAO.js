com.swaas.hidoctor.edetailing.dao.DoctorTagRemoteDAO = {
		metadata: {
			"service" : "HDTagService"
		},
		
		syncPut: function(params){
			var doctorTagRecord = {
					correlationId: params.correlationId,
					companyCode: params.companyCode,
					userCode: params.userCode,
					tagDetails: params.tagDetails
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "PushDoctorTag", doctorTagRecord);
			return result;
		}
};