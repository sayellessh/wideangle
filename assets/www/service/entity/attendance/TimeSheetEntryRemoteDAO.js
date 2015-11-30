com.swaas.hidoctor.edetailing.dao.TimeSheetEntryRemoteDAO = {
		metadata: {
			"service" : "HDEDDCRUpSyncService"
		},
		
		syncPut: function(params){
			var timesheetEntiryString = {
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId : params.checkSumId,
					timesheetString: params.timesheetString
				};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "InsertTimeSheetDetails", timesheetEntiryString);
			return result;
		}
};