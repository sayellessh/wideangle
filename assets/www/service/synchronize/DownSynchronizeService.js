com.swaas.hidoctor.edetailing.service.DownSynchronizeService = {
		
		index : 0,
		intervalId : null,
		entities : null,
		startProgress: 0,
		context:null,
		setProgressBarVaue:null,
		onSycnComplete:null,
		batchId:null,
		overallProgressPercentage: 0,
		correlationId: null,
		pause: false,
		
		zipAssetsLength: 0,
		paramsCnt: 0,
		
		batchCompleteIndex: 0,

		_alert: function(object){
			//alert(JSON.stringify(object));
		},
		_intervalSync:function(){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			
			if (_this.pause == true){
				return;
			}
			if(_this.index >= _this.entities.length){
				return;
			}
			if(_this.intervalId != null){
				clearInterval(_this.intervalId);
			}
			
			var entity = _this.entities[_this.index];
			var remoteObjects = _this._getRemoteObjects(entity, _this.context);
			if (_this.pause == true){
				return;
			}
			if (remoteObjects.length > 0){
				_this._cleanLocalObjects(entity, _this.context);
				if (_this.pause == true){
					return;
				}
				$.each(remoteObjects, function(index, remoteObject){
					_this._putLocalObjects(entity, remoteObject);
				}); 
				if (_this.pause == true){
					return;
				}
			} 
			_this.startProgress += entity.progressPercentage;
			_this.overallProgressPercentage += entity.overallProgressPercentage;
			if (_this.startProgress < 100){
				_this.setProgressBarVaue({batchId: _this.entities[_this.index+1].batchId, value:_this.startProgress, grandValue: _this.overallProgressPercentage, label:_this.entities[_this.index+1].name});
			} else {
				_this.setProgressBarVaue({batchId: _this.entities[_this.index].batchId, value: 100, grandValue: _this.overallProgressPercentage, label:"Done"});
				if (_this.entities[_this.index].onSyncBatchComplete != null){
					_this.batchCompleteIndex = _this.index;
					_this.pauseSync();
					setTimeout(_this._syncBatchComplete, 100);
				}
				_this.startProgress = 0;
				if (_this.index < (_this.entities.length-1)){
					_this.setProgressBarVaue({batchId: _this.entities[_this.index+1].batchId, value: _this.startProgress, grandValue: _this.overallProgressPercentage, label:_this.entities[_this.index+1].name});
				} else {
					setTimeout(_this._syncComplete, 100);
				}
			}
			_this.index++;
			if (_this.pause != true){
				_this.intervalId = setInterval(_this._intervalSync, 500);
			} else {
				return;
			}
			
		},
		_syncBatchComplete: function(){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			_this.entities[_this.batchCompleteIndex].onSyncBatchComplete(_this.entities[_this.batchCompleteIndex].batchId, _this.context);
		},
		_syncComplete : function(){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			var syncEnded = com.swaas.hidoctor.edetailing.dao.SynchronizeRemoteDAO.endSync(_this.correlationId, _this.context.companyCode, _this.context.userCode);
			var status = "END_SYNC_FAILED";
			if (syncEnded){
				com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateStatus(true);
				status = "SYNC_SUCCESS";
			}
			_this.onSycnComplete(status);
		},
		sync: function(entities, context, setProgressBarVaue, onSycnComplete){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			_this.index = 0;
			_this.intervalId = null;
			_this.entities = entities;
			_this.startProgress = 0;
			_this.context = context;
			_this.setProgressBarVaue = setProgressBarVaue;
			_this.onSycnComplete = onSycnComplete;
			_this.intervalId = setInterval(_this._intervalSync, 100);
		},
		pauseSync: function(){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			_this.pause = true;
			if(_this.intervalId != null){
				clearInterval(_this.intervalId);
			}
		},
		resumeSync: function(){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			_this.pause = false;
			_this.intervalId = setInterval(_this._intervalSync, 100);
		},
		syncData: function(setProgressBarVaue, onSycnComplete, onSyncBatchComplete){
			
			/*
			 * 0. Ensure the Network is available
			 * 1. Get the Current User & Get it validated.
			 * 2. Take the userCode and companyCode  
			 * 3. HDInfrastructureService.StartSync and get the correlationId
			 * 4. Use this correlationId for the all the entity Sync.
			 * 4. End Sync
			 */
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			if (com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()){
				var userService = com.swaas.hidoctor.edetailing.service.UserService;
				var user = userService.getCurrentUser();
				var context = {
						companyCode: user.companyCode,
						userCode: user.userCode,
						userTypeCode: user.userTypeCode,
						subDomainName: user.url,
						regionCode : user.regionCode,
						regionCodes: []
				};
				context.regionCodes.push(user.regionCode);				
				if (user != null){
					if (userService.login(user.userName, user.password, user.url)){
						var synchronizeRemoteDAO = com.swaas.hidoctor.edetailing.dao.SynchronizeRemoteDAO;
						var correlationId = synchronizeRemoteDAO.startSync(user.companyCode, user.userCode);
						if (correlationId != null){
							var synchronizeLocalDAO = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO;
							
							synchronizeLocalDAO.updateStatus(false);
							_this.correlationId = correlationId;
							context.correlationId = correlationId;
							com.swaas.hidoctor.edetailing.dao.CoreSOAP.errorHandler = _this.handleError;
							var entities = _this._getSyncEntities(onSyncBatchComplete);
							setProgressBarVaue({batchId: entities[0].batchId, value: 0, label: entities[0].name});
							_this.sync(entities, context, setProgressBarVaue, onSycnComplete);
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
		},
		
		handleError: function(error){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			_this.pauseSync();
			if("NETWORK_ERR" == error.name){
					$("#error").show();
					ED.setValue($("#errorMessageCaption"), 
							 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.errorMessageCaption);
					ED.setValue($("#errormessage"), 
							com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.networkError);
					$("#error").screenCenter();
				}else{
					$("#error").show();
					ED.setValue($("#errorMessageCaption"), 
							 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.errorMessageCaption);
					ED.setValue($("#errormessage"), 
							com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.otherError);
					$("#error").screenCenter();
				}
			
		},
		
		setPopUpValue : function(value){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			$("#error").hide();
			if(value == true)
				{
				_this.resumeSync();
				}
			else{
				ED.quit();
			}
		},
		
		_getRemoteObjects: function(entity, context){
			var _this = com.swaas.hidoctor.edetailing.service.DownSynchronizeService;
			var objects = null;
			if (entity.remoteSyncMethod != null){
				objects = entity.remoteSyncMethod(context);
			} else {
				var remoteSyncMethod = "com.swaas.hidoctor.edetailing.dao." + entity.name + "RemoteDAO.syncGet(context)";
				objects = eval(remoteSyncMethod);
				if (_this.pause == true){
					return;
				}
			}
			
			var remoteObjects = [];
			if(objects instanceof Array){
				remoteObjects = objects;
			}else {
				remoteObjects.push(objects);
			}
			return remoteObjects;
		},
		
		_cleanLocalObjects: function(entity, context){
			var result = null;
			if (entity.localCleanMethod != null){
				result = entity.localCleanMethod(false, context);
			} else {
				var localCleanMethod = "com.swaas.hidoctor.edetailing.dao." + entity.name + "LocalDAO.clean(false, context)";
				result = eval(localCleanMethod);
			}
			return result;
		},
		
		_putLocalObjects: function(entity, entityObject){
			var result = null;
			if (entity.localSyncMethod != null){
				result = entity.localSyncMethod(entityObject);
			} else {
				var localSyncMethod = "com.swaas.hidoctor.edetailing.dao." + entity.name + "LocalDAO.syncPut(entityObject)";
				result = eval(localSyncMethod);
			}
			return result;
		},
		
		_getSyncEntities: function(onSyncBatchComplete){
			var entities = [
				{name: "UserDivision", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:null},
				{name: "Configuration", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:null},
				{name: "DCRMaster", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 15, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:null},
				{name: "DCRConfigSettings", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:null},
				{name: "DCRPrivilege", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:null},
				{name: "DivisionEntityMapping", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 15, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:null},
				{name: "ActivityMaster", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:null},
				{name: "ExpenseEntityMaster", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:null},
				{name: "Accompanist", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "USER", onSyncBatchComplete:onSyncBatchComplete},
			    
				{name: "TPHeader", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 30, overallProgressPercentage: 3, batchId: "TP", onSyncBatchComplete:null},
			    {name: "TPDoctor", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 20, overallProgressPercentage: 2, batchId: "TP", onSyncBatchComplete:null},
			    {name: "TPProduct", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 30, overallProgressPercentage: 3, batchId: "TP", onSyncBatchComplete:null},
				{name: "TPSFC", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 20, overallProgressPercentage: 2, batchId: "TP", onSyncBatchComplete:onSyncBatchComplete},
			                
				{name: "Brand", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "MASTER", onSyncBatchComplete:null},
			    {name: "DoctorCategory", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "MASTER", onSyncBatchComplete:null},
			    {name: "Speciality", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "MASTER", onSyncBatchComplete:null},
				{name: "ProductCategory", localSyncMethod: com.swaas.hidoctor.edetailing.service.ProductCategorySyncService.syncPut, localCleanMethod: com.swaas.hidoctor.edetailing.service.ProductCategorySyncService.clean, remoteSyncMethod: com.swaas.hidoctor.edetailing.service.ProductCategorySyncService.syncGet, progressPercentage: 15, overallProgressPercentage: 2, batchId: "MASTER", onSyncBatchComplete:null},
			    {name: "Product", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 25, overallProgressPercentage: 5, batchId: "MASTER", onSyncBatchComplete:null},
			    {name: "SaleProductMapping", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 20, overallProgressPercentage: 3, batchId: "MASTER", onSyncBatchComplete:null},
			    {name: "UserProductMapping", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 15, overallProgressPercentage: 2, batchId: "MASTER", onSyncBatchComplete:onSyncBatchComplete},
			    
				{name: "Customer", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 30, overallProgressPercentage: 8, batchId: "DOCTOR", onSyncBatchComplete:null},
			    {name: "McDoctors", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 20, overallProgressPercentage: 7, batchId: "DOCTOR", onSyncBatchComplete:null},
			    {name: "DoctorProductMapping", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 10, overallProgressPercentage: 4, batchId: "DOCTOR", onSyncBatchComplete:null},
			    {name: "DenormAssetQueryInputs", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 25, overallProgressPercentage: 8, batchId: "DOCTOR", onSyncBatchComplete:null},
			    {name: "DoctorTagMaster", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 15, overallProgressPercentage: 4, batchId: "DOCTOR", onSyncBatchComplete:onSyncBatchComplete},
			    
			    {name: "DAAnalyticHistory", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 15, overallProgressPercentage: 5, batchId: "DOCUMENT", onSyncBatchComplete:null},
			    {name: "DATagMaster", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 15, overallProgressPercentage: 5, batchId: "DOCUMENT", onSyncBatchComplete:null},
			    
			    {name: "story", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 5, overallProgressPercentage: 2, batchId: "DOCUMENT", onSyncBatchComplete:null},
			    {name: "storyAsset", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 5, overallProgressPercentage: 3, batchId: "DOCUMENT", onSyncBatchComplete:null},
			    
			    {name: "DigitalAsset", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 70, overallProgressPercentage: 25, batchId: "DOCUMENT", onSyncBatchComplete:onSyncBatchComplete}
			    /*{name: "DigitalAsset", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 40, overallProgressPercentage: 5, batchId: "DOCUMENT", onSyncBatchComplete:null},
			    {name: "ZipAsset", localSyncMethod: null, localCleanMethod: null, remoteSyncMethod: null, progressPercentage: 20, overallProgressPercentage: 15, batchId: "DOCUMENT", onSyncBatchComplete:onSyncBatchComplete}*/
			];
			return entities;
		}
};


com.swaas.hidoctor.edetailing.service.DownloadLogoService = {
		metadata: { 
			"service" : "HDInfrastructureService"
		},
		
		getRemoteLogoUrl: function(correlationId, companyCode, userCode, subDomainName){
			
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode,
					subdomainName : subDomainName
			};
			
			return com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetClientLogo", data, 'text');
		}
		
				
};
