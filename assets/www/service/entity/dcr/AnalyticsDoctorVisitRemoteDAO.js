com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitRemoteDAO = {
		metadata: {
			"service" : "HDEDDCRUpSyncService"
		},
		
		syncPut: function(params){
			var analytics = {
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					doctorVisitString: params.doctorVisitString
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "InsertDoctorVisitAnalytics_31", analytics);
			return result;
		}
};