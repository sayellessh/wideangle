com.swaas.hidoctor.edetailing.service.UpSynchronizeService = {
		
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
		batchCompleteIndex: 0,
		requestContext : "",

		_alert: function(object){
			alert(JSON.stringify(object));
		},
		_intervalSync:function(){
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			_this.context.retry = false;
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
			var localObjects = _this._getLocalObjects(entity, _this.context);
			if (_this.pause == true){
				return;
			}
			if (localObjects.length > 0){
				if (_this.pause == true){
					return;
				}
				$.each(localObjects, function(index, localObject){
					var result = _this._putRemoteObjects(entity, localObject);
					if (entity.evalMethod != null){
						result = entity.evalMethod(_this.context, result);
					}
					if (eval(result) == true){	
						_this._cleanLocalObjects(entity, localObject);
					}
				}); 
				if (_this.pause == true){
					return;
				}
			} 
			if (_this.context.retry == true){
				this.intervalId = setInterval(_this._intervalSync, 500);
			} else {
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
			}
			
			
		},
		_syncBatchComplete: function(){
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			_this.entities[_this.batchCompleteIndex].onSyncBatchComplete(_this.entities[_this.batchCompleteIndex].batchId, _this.context);
		},
		_syncComplete : function(){
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			var syncEnded = com.swaas.hidoctor.edetailing.dao.SynchronizeRemoteDAO.endSync(_this.correlationId, _this.context.companyCode, _this.context.userCode);
			var status = "END_SYNC_FAILED";
			if (syncEnded){
				com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(false);
				status = "SYNC_SUCCESS";
			}
			_this.onSycnComplete(status);
		},
		sync: function(entities, context, setProgressBarVaue, onSycnComplete){
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
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
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			_this.pause = true;
			if(_this.intervalId != null){
				clearInterval(_this.intervalId);
			}
		},
		resumeSync: function(){
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			_this.pause = false;
			_this.intervalId = setInterval(_this._intervalSync, 100);
		},
		syncData: function(setProgressBarVaue, onSycnComplete, onSyncBatchComplete, requestContext){			
			/*
			 * 0. Ensure the Network is available
			 * 1. Get the Current User & Get it validated.
			 * 2. Take the userCode and companyCode  
			 * 3. HDInfrastructureService.StartSync and get the correlationId
			 * 4. Use this correlationId for the all the entity Sync.
			 * 4. End Sync
			 */
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			_this.requestContext = requestContext;
			if (com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()){
				var userService = com.swaas.hidoctor.edetailing.service.UserService;
				var user = userService.getCurrentUser();
				var context = {
						companyCode: user.companyCode,
						userCode: user.userCode,
						userName: user.userName,
						subDomainName: user.url,
						regionCodes: []
				};
				context.regionCodes.push(user.regionCode);				
				if (user != null){
					if (userService.login(user.userName, user.password, user.url)){
						var synchronizeRemoteDAO = com.swaas.hidoctor.edetailing.dao.SynchronizeRemoteDAO;
						var correlationId = synchronizeRemoteDAO.startSync(user.companyCode, user.userCode);
						if (correlationId != null){							
							_this.correlationId = correlationId;
							context.correlationId = correlationId;
							com.swaas.hidoctor.edetailing.dao.CoreSOAP.errorHandler = _this.handleError;
							var entities = _this._getSyncEntities(onSyncBatchComplete);
							setProgressBarVaue({batchId: entities[0].batchId, value: 0, label: entities[0].name});
							_this.sync(entities, context, setProgressBarVaue, onSycnComplete);
						} else {
							alert(com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.networkErrorMessage);
		                	ED.logError(com.swaas.hidoctor.edetailing.service.UpSynchronizeService, {error : 'START_SYNC_FAILED', context : context}, requestContext, "syncData");
							return "START_SYNC_FAILED";
						}
					} else {
						alert(com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.invalidUserErrorMessage);
	                	ED.logError(com.swaas.hidoctor.edetailing.service.UpSynchronizeService, {error : 'INVALID_USER', context : context}, requestContext, "syncData");
						ED.redirect("view/login/login.html");
						//return "INVALID_USER";
					}
				} else {
					alert(com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.networkErrorMessage);
                	ED.logError(com.swaas.hidoctor.edetailing.service.UpSynchronizeService, {error : 'NO_USER_LOGGED_IN', context : context}, requestContext, "syncData");
					return "NO_USER_LOGGED_IN";
				}
			} else {
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.networkError);
            	ED.logError(com.swaas.hidoctor.edetailing.service.UpSynchronizeService, {error : 'NETWORK_ERROR'}, requestContext, "syncData");
				return "NETWORK_ERROR";
			}
		},
		
		handleError: function(error){
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
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
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			$("#error").hide();
			if(value == true)
				{
				_this.resumeSync();
				}
			else{
				ED.redirectToHome();
			}
		},
		
		_getLocalObjects: function(entity, context){
			var objects = null;
			if (entity.localSyncMethod != null){
				objects = entity.localSyncMethod(context);
			} else {
				var localSyncMethod = "com.swaas.hidoctor.edetailing.dao." + entity.name + "LocalDAO.syncGet(context)";
				objects = eval(localSyncMethod);
			}
			var localObjects = [];
			if(objects instanceof Array){
				localObjects = objects;
			}else {
				localObjects.push(objects);
			}
			return localObjects;
		},
		
		_cleanLocalObjects: function(entity, context){
			var result = null;
			if (entity.localCleanMethod != null){
				result = entity.localCleanMethod(false);
			} else {
				var localCleanMethod = "com.swaas.hidoctor.edetailing.dao." + entity.name + "LocalDAO.clean(false)";
				result = eval(localCleanMethod);
			}
			return result;
		},
		
		_putRemoteObjects: function(entity, entityObject){
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			var result = null;
			if (entity.remoteSyncMethod != null){
				result = entity.remoteSyncMethod(entityObject);
			} else {
				var remoteSyncMethod = "com.swaas.hidoctor.edetailing.dao." + entity.name + "RemoteDAO.syncPut(entityObject)";
				result = eval(remoteSyncMethod);
			}
			
			if (_this.pause == true){
				return;
			}
			return result;
		},
		
		_getSyncEntities: function(onSyncBatchComplete){
			var _this = com.swaas.hidoctor.edetailing.service.UpSynchronizeService;
			var entities = [];
			var dcrSync = (_this.requestContext.dcrSync == null || typeof _this.requestContext.dcrSync == "undefined") ? false : _this.requestContext.dcrSync;
			var nonDCRSync = (_this.requestContext.nonDCRSync == null || typeof _this.requestContext.nonDCRSync == "undefined") ? false : _this.requestContext.nonDCRSync;
			//prepare my tablet
			if(eval(dcrSync) == false && eval(nonDCRSync) == true){
				entities = [
					{name: "ErrorLogs", progressPercentage: 5, overallProgressPercentage: 5, batchId: "MAIN", onSyncBatchComplete:null},
					{name: "DATagAnalytic",  progressPercentage: 25, overallProgressPercentage: 25, batchId: "MAIN", onSyncBatchComplete:null},
					{name: "DoctorTag",  progressPercentage: 20, overallProgressPercentage: 20, batchId: "MAIN", onSyncBatchComplete:null},
					{name: "DigitalAssetBilling", progressPercentage: 25, overallProgressPercentage: 25, batchId: "MAIN", onSyncBatchComplete:onSyncBatchComplete},
					
					{name: "story",  progressPercentage: 5, overallProgressPercentage: 5, batchId: "MAIN", onSyncBatchComplete:null, localCleanMethod: function(){
						com.swaas.hidoctor.edetailing.dao.storyLocalDAO.updateFlag();
						com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.updateFlag();
					}},
					{name: "storyAsset",  progressPercentage: 5, overallProgressPercentage: 5,  batchId: "MAIN", onSyncBatchComplete:null, localCleanMethod: function(){
						/*alert('Local clean');
						com.swaas.hidoctor.edetailing.dao.storyLocalDAO.updateFlag();*/
					}},
					
					{name: "storyAnalytics",  progressPercentage: 5, overallProgressPercentage: 5, batchId: "MAIN", onSyncBatchComplete:null, localCleanMethod: null},
					
					{name: "SiteAnalytics",  progressPercentage: 5, overallProgressPercentage: 5, batchId: "MAIN", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "SiteAssetMaster",  progressPercentage: 5, overallProgressPercentage: 5, batchId: "MAIN", onSyncBatchComplete:onSyncBatchComplete, localCleanMethod: function(){}}
				];	
			}
			//up sync DCR
			if(eval(dcrSync) == true && eval(nonDCRSync) == false){
				entities = [
							{name: "ErrorLogs",  progressPercentage: 15, overallProgressPercentage: 2, batchId: "MAIN", onSyncBatchComplete:null},
							{name: "DATagAnalytic",  progressPercentage: 25, overallProgressPercentage: 4, batchId: "MAIN", onSyncBatchComplete:null},
							{name: "DoctorTag",  progressPercentage: 25, overallProgressPercentage: 4, batchId: "MAIN", onSyncBatchComplete:null},
							{name: "DigitalAssetBilling", progressPercentage: 35, overallProgressPercentage: 8, batchId: "MAIN", onSyncBatchComplete:onSyncBatchComplete},

							{name: "CheckSum", progressPercentage: 3, overallProgressPercentage: 2, batchId: "DCR", onSyncBatchComplete:null, 
								evalMethod: function(context, result){
									context.checkSumId = result;
									result = (eval(result) == 0);
									if (result == true){
										_this.index = 13;
										_this.startProgress = 85;
										_this.overallProgressPercentage = 88;
									}
									return result;
								}},
							{name: "DCRHeader", progressPercentage: 6, overallProgressPercentage: 4, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
							{name: "DoctorVisit", progressPercentage: 8, overallProgressPercentage: 5, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
							{name: "DCRDoctorAccompanist", progressPercentage: 10, overallProgressPercentage: 7, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
							{name: "DCRDetailedProducts", progressPercentage: 15, overallProgressPercentage: 10, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
							{name: "DCRProductDetails", progressPercentage: 15, overallProgressPercentage: 12, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
							{name: "ChemistVisit", progressPercentage: 5, overallProgressPercentage: 10, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
							{name: "RcpaDetails", progressPercentage: 15, overallProgressPercentage: 12, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
							{name: "TimeSheetEntry", progressPercentage: 5, overallProgressPercentage: 6, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
							{name: "CheckSumVerify", progressPercentage: 3, overallProgressPercentage: 2, batchId: "DCR", 
								localSyncMethod: com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO.syncGetVerify, 
								localCleanMethod: com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO.clean,
								remoteSyncMethod: com.swaas.hidoctor.edetailing.dao.CheckSumRemoteDAO.syncPutVerify,
								onSyncBatchComplete:null,
								evalMethod: function(context, response){
									if (response == null){
										response = {
												result: true
										};
									}
									if (eval(response.result) == false){
										var outputMsg = response.outputMsg;
										if (response != null){
											if (confirm(outputMsg) == true){
												_this.index = 6;
												_this.startProgress = 0;
												_this.overallProgressPercentage = 18;
												context.retry = true;
											}
										}
									}
									return response.result;
								}
							},
							/*{name: "AnalyticsDoctorVisit",  progressPercentage: 5, overallProgressPercentage: 4, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.dcrClean }, 
							{name: "AnalyticsDetailedProducts",  progressPercentage: 4, overallProgressPercentage: 4, batchId: "DCR", onSyncBatchComplete:onSyncBatchComplete, localCleanMethod: com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO.dcrClean},*/
							
							{name: "story",  progressPercentage: 6, overallProgressPercentage: 5, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){
								com.swaas.hidoctor.edetailing.dao.storyLocalDAO.updateFlag();
								com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.updateFlag();
							}},
							{name: "storyAsset",  progressPercentage: 5, overallProgressPercentage: 5,  batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){
								
							}},
							
							{name: "storyAnalytics",  progressPercentage: 1, overallProgressPercentage: 1, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: null},
							
							{name: "SiteAnalytics",  progressPercentage: 2, overallProgressPercentage: 1, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){
							}},
							{name: "SiteAssetMaster",  progressPercentage: 2, overallProgressPercentage: 1, batchId: "DCR", onSyncBatchComplete:onSyncBatchComplete, localCleanMethod: function(){}}
							
						];	
			}
			// erase and clean
			if(eval(dcrSync) == true && eval(nonDCRSync) == true){
				entities = [
					{name: "ErrorLogs",  progressPercentage: 15, overallProgressPercentage: 2, batchId: "MAIN", onSyncBatchComplete:null},
					{name: "DATagAnalytic",  progressPercentage: 25, overallProgressPercentage: 4, batchId: "MAIN", onSyncBatchComplete:null},
					{name: "DoctorTag",  progressPercentage: 25, overallProgressPercentage: 4, batchId: "MAIN", onSyncBatchComplete:null},
					{name: "DigitalAssetBilling", progressPercentage: 35, overallProgressPercentage: 8, batchId: "MAIN", onSyncBatchComplete:onSyncBatchComplete},

					{name: "CheckSum", progressPercentage: 3, overallProgressPercentage: 2, batchId: "DCR", onSyncBatchComplete:null, 
						evalMethod: function(context, result){
							context.checkSumId = result;
							result = (eval(result) == 0);
							if (result == true){
								_this.index = 13;
								_this.startProgress = 85;
								_this.overallProgressPercentage = 88;
							}
							return result;
						}},
					{name: "DCRHeader", progressPercentage: 6, overallProgressPercentage: 4, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "DoctorVisit", progressPercentage: 8, overallProgressPercentage: 5, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "DCRDoctorAccompanist", progressPercentage: 10, overallProgressPercentage: 7, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "DCRDetailedProducts", progressPercentage: 15, overallProgressPercentage: 10, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "DCRProductDetails", progressPercentage: 15, overallProgressPercentage: 12, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "ChemistVisit", progressPercentage: 5, overallProgressPercentage: 10, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "RcpaDetails", progressPercentage: 15, overallProgressPercentage: 12, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "TimeSheetEntry", progressPercentage: 5, overallProgressPercentage: 6, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){}},
					{name: "CheckSumVerify", progressPercentage: 3, overallProgressPercentage: 2, batchId: "DCR", 
						localSyncMethod: com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO.syncGetVerify, 
						localCleanMethod: function() {
							com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.clean();
							com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO.clean();
						} , 
						remoteSyncMethod: com.swaas.hidoctor.edetailing.dao.CheckSumRemoteDAO.syncPutVerify,
						onSyncBatchComplete:onSyncBatchComplete,
						evalMethod: function(context, response){
							if (response == null){
								response = {
										result: true
								};
							}
							if (eval(response.result) == false){
								var outputMsg = response.outputMsg;
								if (response != null){
									if (confirm(outputMsg) == true){
										_this.index = 6;
										_this.startProgress = 0;
										_this.overallProgressPercentage = 18;
										context.retry = true;
									}
								}
							}
							return response.result;
						}
					},
					/*{name: "AnalyticsDoctorVisit",  progressPercentage: 5, overallProgressPercentage: 4, batchId: "DCR", onSyncBatchComplete:null }, 
					{name: "AnalyticsDetailedProducts",  progressPercentage: 4, overallProgressPercentage: 4, batchId: "DCR", onSyncBatchComplete:null},*/
					
					{name: "story",  progressPercentage: 6, overallProgressPercentage: 5, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){
						com.swaas.hidoctor.edetailing.dao.storyLocalDAO.updateFlag();
						com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.updateFlag();
					}},
					{name: "storyAsset",  progressPercentage: 5, overallProgressPercentage: 5,  batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: function(){
						/*alert('Local clean');
						com.swaas.hidoctor.edetailing.dao.storyLocalDAO.updateFlag();*/
					}},
					{name: "storyAnalytics",  progressPercentage: 1, overallProgressPercentage: 1, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: null},
					
					{name: "SiteAnalytics",  progressPercentage: 2, overallProgressPercentage: 1, batchId: "DCR", onSyncBatchComplete:null, localCleanMethod: null},
					{name: "SiteAssetMaster",  progressPercentage: 3, overallProgressPercentage: 2, batchId: "DCR", onSyncBatchComplete:onSyncBatchComplete, localCleanMethod: function(){}}
					];	
			}
			return entities;
		}
};