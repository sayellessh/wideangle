com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Synchronize_Status",
			"columns": [
						{name: "status", columnName:"Status"},
						{name: "upSyncRequired", columnName:"UpSyncRequired"},
						{name: "errorPushRequired", columnName: "ErrorPushRequired"}
			            ]
		},
		
		
		updateStatus: function(status){
			
			var synchronize = {
					status: status
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {}, function(result){
                 if (result.length > 0){
                     return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, synchronize);
                 } else {
                     return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, synchronize);
                 }
            }, null);
			
		},
		
		updateUpSyncRequired: function(upSyncRequired, onSuccess){
			var synchronize = {
					upSyncRequired: upSyncRequired
			};
			
			if (upSyncRequired == false){
				// When up sync is completed, the errors also done.
				synchronize.errorPushRequired = false;
			}
			//return
            com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, synchronize, onSuccess, null);
		},
		
		updateErrorPushRequired: function(errorPushRequired){
			var synchronize = {
					errorPushRequired: errorPushRequired
			};
			if (errorPushRequired == true){
				// If any new error added, then upsync also required.
				synchronize.upSyncRequired = true;
			}
			
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, synchronize);
			
		},
		
		remove: function(){
			var criteria = {};
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		getStatus: function(onCheckErrorPush, onFailure){
			/*var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return eval(result[0].status);
			} else {
				return false;
			}*/
            //alert('getStatus');
            var criteria = {};
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, onCheckErrorPush, onFailure);
		},
		
		getErrorPushRequired: function(onErrorStatusCheck, onFailure){
			/*var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return eval(result[0].errorPushRequired);
			} else {
				return false;
			}*/
            console.log('SyncLocalDao: getErrorPushRequired');
            var criteria = {};
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this,criteria, onErrorStatusCheck, onFailure);
		},
		
		getUpSyncRequired: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return eval(result[0].upSyncRequired);
			} else {
				return false;
			}
		},

		
		clean: function(){
			this.remove();
		}
};
