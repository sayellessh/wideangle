com.swaas.hidoctor.edetailing.dao.ErrorLogsRemoteDAO = {
		
		dateFormat: null,
		metadata: {
			"service" : "HDInfrastructureService"
		},
		
		syncPut: function(params){
			var _this = com.swaas.hidoctor.edetailing.dao.ErrorLogsRemoteDAO;
			
			if (_this.dateFormat == null){
				var configuration =  com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
				if (configuration != null && configuration.dateSettings != null){
					_this.dateFormat = configuration.dateSettings;
				} else {
					_this.dateFormat = "dd/mm/yyyy hh:MM";
				}
			}
			
			var logDate = params.errorTime.format(_this.dateFormat);
			
			var log = {
					correlationId: params.correlationId,
					companyCode: params.companyCode,
					userCode: params.userCode,
					deviceId: params.deviceID,
					log: "<![CDATA[" + params.error + "]]>",
					logDate: logDate
				};
			
			
			console.log(log.log);
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "DeviceLog", log);
			return result;
		}
};