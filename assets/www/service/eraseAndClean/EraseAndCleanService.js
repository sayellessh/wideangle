com.swaas.hidoctor.edetailing.service.EraseAndCleanService = {
		
		index : 0,
		intervalId : null,
		entities : null,
		startProgress: 0,
		context:null,
		setProgressBarVaue:null,
		onEraseAndCleanComplete:null,
		batchId:null,
		overallProgressPercentage: 0,
		correlationId: null,
		pause: false,
		batchCompleteIndex: 0,

		_alert: function(object){
			//alert(JSON.stringify(object));
		},
		_intervalEraseAndClean:function(){
			var _this = com.swaas.hidoctor.edetailing.service.EraseAndCleanService;
			
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
			_this._cleanLocalObjects(entity, _this.context);
			
			_this.startProgress += entity.progressPercentage;
			_this.overallProgressPercentage += entity.overallProgressPercentage;
			if (_this.startProgress < 100){
				_this.setProgressBarVaue({batchId: _this.entities[_this.index+1].batchId, value:_this.startProgress, grandValue: _this.overallProgressPercentage, label:_this.entities[_this.index+1].name});
			} else {
				_this.setProgressBarVaue({batchId: _this.entities[_this.index].batchId, value: 100, grandValue: _this.overallProgressPercentage, label:"Done"});
				if (_this.entities[_this.index].onEraseAndCleanBatchComplete != null){
					_this.batchCompleteIndex = _this.index;
					_this.pauseEraseAndClean();
					setTimeout(_this._eraseAndCleanBatchComplete, 100);
				}
				_this.startProgress = 0;
				if (_this.index < (_this.entities.length-1)){
					_this.setProgressBarVaue({batchId: _this.entities[_this.index+1].batchId, value: _this.startProgress, grandValue: _this.overallProgressPercentage, label:_this.entities[_this.index+1].name});
				} else {
					setTimeout(_this._eraseAndCleanComplete, 100);
				}
			}
			_this.index++;
			if (_this.pause != true){
				_this.intervalId = setInterval(_this._intervalEraseAndClean, 500);
			} else {
				return;
			}
		},
		_eraseAndCleanBatchComplete: function(){
			var _this = com.swaas.hidoctor.edetailing.service.EraseAndCleanService;
			_this.entities[_this.batchCompleteIndex].onEraseAndCleanBatchComplete(_this.entities[_this.batchCompleteIndex].batchId, _this.context);
		},
		_eraseAndCleanComplete : function(){
			var _this = com.swaas.hidoctor.edetailing.service.EraseAndCleanService;
			var status = "ERASE_AND_CLEAN_SUCCESS";
			com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateStatus(false);
			_this.onEraseAndCleanComplete(status);
		},
		eraseAndClean: function(entities, context, setProgressBarVaue, onEraseAndCleanComplete){
			var _this = com.swaas.hidoctor.edetailing.service.EraseAndCleanService;
			_this.index = 0;
			_this.intervalId = null;
			_this.entities = entities;
			_this.startProgress = 0;
			_this.context = context;
			_this.setProgressBarVaue = setProgressBarVaue;
			_this.onEraseAndCleanComplete = onEraseAndCleanComplete;
			_this.intervalId = setInterval(_this._intervalEraseAndClean, 100);
		},
		pauseEraseAndClean: function(){
			var _this = com.swaas.hidoctor.edetailing.service.EraseAndCleanService;
			_this.pause = true;
			if(_this.intervalId != null){
				clearInterval(_this.intervalId);
			}
		},
		resumeEraseAndClean: function(){
			var _this = com.swaas.hidoctor.edetailing.service.EraseAndCleanService;
			_this.pause = false;
			_this.intervalId = setInterval(_this._intervalEraseAndClean, 100);
		},
		
		eraseAndCleanData: function(setProgressBarVaue, onEraseAndCleanComplete, onEraseAndCleanBatchComplete){
			
			/*
			 * 1. Erase and clean
			 */
			var _this = com.swaas.hidoctor.edetailing.service.EraseAndCleanService;
			var entities = _this._getEraseAndCleanEntities(onEraseAndCleanBatchComplete);
			setProgressBarVaue({batchId: entities[0].batchId, value: 0, label: entities[0].name});
			var context = {};
			_this.eraseAndClean(entities, context, setProgressBarVaue, onEraseAndCleanComplete);
			return "ERASE_AND_CLEAN_SUCCESS";
			
		},
		
		_cleanLocalObjects: function(entity, context){
			var result = null;
			if (entity.localCleanMethod != null){
				result = entity.localCleanMethod(true);
			} else {
				var localCleanMethod = "com.swaas.hidoctor.edetailing.dao." + entity.name + "LocalDAO.clean(true)";
				result = eval(localCleanMethod);
			}
			return result;
		},
				

		_getEraseAndCleanEntities: function(onEraseAndCleanBatchComplete){
			var entities = [
			    {name: "DigitalAsset", localCleanMethod: null, progressPercentage: 70, overallProgressPercentage: 22, batchId: "DOCUMENT", onEraseAndCleanBatchComplete:onEraseAndCleanBatchComplete},
			    {name: "DAAnalyticHistory", localCleanMethod: null, progressPercentage: 15, overallProgressPercentage: 5, batchId: "DOCUMENT", onEraseAndCleanBatchComplete:onEraseAndCleanBatchComplete},
			    {name: "DATagMaster", localCleanMethod: null, progressPercentage: 15, overallProgressPercentage: 5, batchId: "DOCUMENT", onEraseAndCleanBatchComplete:onEraseAndCleanBatchComplete},

				{name: "Customer", localCleanMethod: null, progressPercentage: 40, overallProgressPercentage: 10, batchId: "DOCTOR", onEraseAndCleanBatchComplete:null},
			    {name: "McDoctors", localCleanMethod: null, progressPercentage: 20, overallProgressPercentage: 10, batchId: "DOCTOR", onEraseAndCleanBatchComplete:null},
			    {name: "DenormAssetQueryInputs", localCleanMethod: null, progressPercentage: 40, overallProgressPercentage: 11, batchId: "DOCTOR", onEraseAndCleanBatchComplete:onEraseAndCleanBatchComplete},

				{name: "Brand", localCleanMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "MASTER", onEraseAndCleanBatchComplete:null},
			    {name: "DoctorCategory", localCleanMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "MASTER", onEraseAndCleanBatchComplete:null},
			    {name: "Speciality", localCleanMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "MASTER", onEraseAndCleanBatchComplete:null},
				{name: "ProductCategory", localSyncMethod: com.swaas.hidoctor.edetailing.service.ProductCategorySyncService.syncPut, localCleanMethod: com.swaas.hidoctor.edetailing.service.ProductCategorySyncService.clean, remoteSyncMethod: com.swaas.hidoctor.edetailing.service.ProductCategorySyncService.syncGet, progressPercentage: 15, overallProgressPercentage: 2, batchId: "MASTER", onEraseAndCleanBatchComplete:null},
			    {name: "Product", localCleanMethod: null, progressPercentage: 25, overallProgressPercentage: 5, batchId: "MASTER", onEraseAndCleanBatchComplete:null},
			    {name: "SaleProductMapping", localCleanMethod: null, progressPercentage: 15, overallProgressPercentage: 1, batchId: "MASTER", onEraseAndCleanBatchComplete:null},
			    {name: "DoctorProductMapping", localCleanMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "MASTER", onEraseAndCleanBatchComplete:null},
			    {name: "UserProductMapping", localCleanMethod: null, progressPercentage: 10, overallProgressPercentage: 1, batchId: "MASTER", onEraseAndCleanBatchComplete:onEraseAndCleanBatchComplete},

				{name: "TPHeader", localCleanMethod: null, progressPercentage: 30, overallProgressPercentage: 2, batchId: "TP", onEraseAndCleanBatchComplete:null},
			    {name: "TPDoctor", localCleanMethod: null, progressPercentage: 20, overallProgressPercentage: 2, batchId: "TP", onEraseAndCleanBatchComplete:null},
			    {name: "TPProduct", localCleanMethod: null, progressPercentage: 30, overallProgressPercentage: 2, batchId: "TP", onEraseAndCleanBatchComplete:null},
				{name: "TPSFC", localCleanMethod: null, progressPercentage: 20, overallProgressPercentage: 2, batchId: "TP", onEraseAndCleanBatchComplete:onEraseAndCleanBatchComplete},
			    
			    {name: "User", localCleanMethod: null, progressPercentage: 20, overallProgressPercentage: 1, batchId: "USER", onEraseAndCleanBatchComplete:null},
			    {name: "UserDivision", localCleanMethod: null, progressPercentage: 20, overallProgressPercentage: 1, batchId: "USER", onEraseAndCleanBatchComplete:null},
				{name: "Configuration", localCleanMethod: null, progressPercentage: 20, overallProgressPercentage: 1, batchId: "USER", onEraseAndCleanBatchComplete:null},
				{name: "DCRMaster", localCleanMethod: null, progressPercentage: 20, overallProgressPercentage: 1, batchId: "USER", onEraseAndCleanBatchComplete:null},
				{name: "Accompanist", localCleanMethod: null, progressPercentage: 20, overallProgressPercentage: 1, batchId: "USER", onEraseAndCleanBatchComplete:onEraseAndCleanBatchComplete},
				
				{name: "DoctorVisit", localCleanMethod: com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "DATagAnalytic", localCleanMethod: com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "DigitalAssetBilling", localCleanMethod: com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "DCRHeader", localCleanMethod: com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "DCRDoctorAccompanist", localCleanMethod: com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "DCRDetailedProducts", localCleanMethod: com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "DCRProductDetails", localCleanMethod: com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "ChemistVisit", localCleanMethod: com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "RcpaDetails", localCleanMethod: com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.eraseAndClean, progressPercentage: 10, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "TimeSheetEntry", localCleanMethod: com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.eraseAndClean, progressPercentage: 5, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:null},
				{name: "CheckSum", localCleanMethod: com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO.eraseAndClean, progressPercentage: 5, overallProgressPercentage: 1, batchId: "DCR_ANALYTICAL", onEraseAndCleanBatchComplete:onEraseAndCleanBatchComplete},
				
			];	
			return entities;
		},
		removeTempFolder : function(folderName){
			 var folderName = com.swaas.hidoctor.edetailing.ui.view.Resource.download.tempFolder;
			com.swaas.hidoctor.edetailing.util.FileUtil.deleteDirectory(folderName);
		}
};