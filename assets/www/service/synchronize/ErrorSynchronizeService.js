com.swaas.hidoctor.edetailing.service.ErrorSynchronizeService = {
		
		syncError : function() {
			if (com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()){
				var userService = com.swaas.hidoctor.edetailing.service.UserService;
				var user = userService.getCurrentUser();
				var context = {
						companyCode: user.companyCode,
						userCode: user.userCode,	
						regionCodes: [],
						error: null
				};
				context.regionCodes.push(user.regionCode);				
				if (user != null){
					if (userService.login(user.userName, user.password, user.url)){
						var synchronizeRemoteDAO = com.swaas.hidoctor.edetailing.dao.SynchronizeRemoteDAO;
						var correlationId = synchronizeRemoteDAO.startSync(user.companyCode, user.userCode);
						if (correlationId != null){							
							context.correlationId = correlationId;
							var errorRecords = com.swaas.hidoctor.edetailing.dao.ErrorLogsLocalDAO.syncGet(context);
							var success = true;
							$.each(errorRecords, function(i, errorLog) {
								var result = com.swaas.hidoctor.edetailing.dao.ErrorLogsRemoteDAO.syncPut(errorLog);
								if (eval(result) == true){
									com.swaas.hidoctor.edetailing.dao.ErrorLogsLocalDAO.clean(errorLog);
								} else {
									success = false;
								}
							});
							if (success == true){
								com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateErrorPushRequired(false);								
								return "SUCCESS";
							} else {
								return "STILL_HAVE_SOMEMORE";
							}
							
						} else {
							return "START_SYNC_FAILED";
						}
					} else {
						return "INVALID_USER";
					}
				} else {
					return "NO_USER_LOGGED_IN";
				}
				
			} else {
				return "NETWORK_ERROR";
			}
		}
		
};