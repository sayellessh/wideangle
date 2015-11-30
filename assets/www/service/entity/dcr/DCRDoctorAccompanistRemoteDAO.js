com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistRemoteDAO = {
		metadata: {
			"service" : "HDEDDCRUpSyncService"
		},
		
		syncPut: function(params){
			var accompanist = {
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					doctorAccompanistString: params.doctorAccompanistString
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "InsertDoctorAccompanist", accompanist);
			return result;
		}
};