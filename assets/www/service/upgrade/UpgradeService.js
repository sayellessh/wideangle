com.swaas.hidoctor.edetailing.service.UpgradeService = {
		
		index : 0,
		intervalId : null,
		entities : null,
		startProgress: 0,
		context:null,
		setProgressBarVaue:null,
		onSycnComplete:null,
		batchId:null,
		progressPercentage: 0,
		correlationId: null,
		pause: false,
		batchCompleteIndex: 0,

		isUpgradeRequired : function() {
			var differentVersion = false;
			var currentVersion = com.swaas.hidoctor.edetailing.dao.UpgradeLocalDAO.get();
			var newVersion = {
					version : com.swaas.hidoctor.edetailing.ui.view.Resource.application.version,
					release : com.swaas.hidoctor.edetailing.ui.view.Resource.application.release
			};
			if(currentVersion == null){
				differentVersion =  true;
			}else {
				if(newVersion.version != currentVersion.version	|| newVersion.release != currentVersion.release){
					differentVersion =  true;
				}
			}
			return differentVersion;
		},
		
		updateTables : function(setProgressBarVaue, onSycnComplete) {
			var _this = com.swaas.hidoctor.edetailing.service.UpgradeService;
			var entities = _this._getAllEntities();
			updateTable(entities, setProgressBarVaue, onSycnComplete);
			function updateTable(entities, setProgressBarVaue, onSycnComplete, index){
				if (index == null){
					index = 0;
				}
				if (index < entities.length){
					var entity = entities[index];
					var localDAO = eval("com.swaas.hidoctor.edetailing.dao." + entity.name + "LocalDAO");	
					com.swaas.hidoctor.edetailing.dao.CoreDAO.updateTable(localDAO);
					setProgressBarVaue({progress : entity.progressPercentage});
					setTimeout(function(){
						index++;
						updateTable(entities, setProgressBarVaue, onSycnComplete, index);
					}, 100);
				} else {
					setTimeout(onSycnComplete);
				}
			}
		},
		
		completeUpgrade: function(){
			var newVersion = {
					version : com.swaas.hidoctor.edetailing.ui.view.Resource.application.version,
					release : com.swaas.hidoctor.edetailing.ui.view.Resource.application.release
			};
			com.swaas.hidoctor.edetailing.dao.UpgradeLocalDAO.remove();
			com.swaas.hidoctor.edetailing.dao.UpgradeLocalDAO.insert(newVersion);
			var userService = com.swaas.hidoctor.edetailing.service.UserService;
			if(userService.isUserLoggedIn()){
				var user =  userService.getCurrentUser();
				var sendVersion = newVersion.version + '.' + newVersion.release;
				com.swaas.hidoctor.edetailing.dao.UpgradeRemoteDAO.sendVersion('1', user.url, user.companyCode, user.userCode ,user.userName, 
						sendVersion, user.regionName);
			}
		},
		
		_getAllEntities: function(onSyncBatchComplete){
			var entities = [
				{name: "User", progressPercentage : 1},
				{name: "UserDivision", progressPercentage : 1},
				{name: "Configuration", progressPercentage: 1},
				{name: "DCRMaster",  progressPercentage: 2},
				{name: "DCRConfigSettings", progressPercentage: 2},
				{name: "DCRPrivilege", progressPercentage: 1},
				{name: "DivisionEntityMapping", progressPercentage: 1},
				{name: "ActivityMaster", progressPercentage: 1},
				{name: "ExpenseEntityMaster", progressPercentage: 2},
				{name: "Accompanist", progressPercentage: 2},
				{name: "TPHeader", progressPercentage: 2},
			    {name: "TPDoctor", progressPercentage: 2},
			    {name: "TPProduct", progressPercentage: 2},
				{name: "TPSFC", progressPercentage: 2},
				{name: "Brand", progressPercentage: 2},
			    {name: "DoctorCategory", progressPercentage: 2},
			    {name: "Speciality", progressPercentage: 2},
			    {name: "Product", progressPercentage: 2},
			    {name: "SaleProductMapping", progressPercentage: 2},
			    {name: "UserProductMapping", progressPercentage: 2},
				{name: "Customer", progressPercentage: 2},
			    {name: "McDoctors", progressPercentage: 2},
			    {name: "DoctorProductMapping", progressPercentage: 2},
			    {name: "DenormAssetQueryInputs", progressPercentage: 2},
			    {name: "DoctorTagMaster", progressPercentage: 2},
			    {name: "DigitalAsset", progressPercentage: 2},
			    {name: "DAAnalyticHistory", progressPercentage: 2},
			    {name: "DATagMaster", progressPercentage: 2},
			    {name: "Upgrade", progressPercentage: 2},
				{name: "UniqueProductCode", progressPercentage: 2},
				{name: "TPAccompanist", progressPercentage: 2},
				{name: "TimeSheetEntry", progressPercentage: 2},
				{name: "SelectedAccompanist", progressPercentage: 2},
				{name: "RcpaDetails", progressPercentage: 2},
				{name: "ExpenseEntityMaster", progressPercentage: 2},
				{name: "DoctorVisit", progressPercentage: 2},
			    {name: "DoctorTagMaster", progressPercentage: 2},
			    {name: "DoctorTag", progressPercentage: 2},
				{name: "DigitalAssetResult", progressPercentage: 2},
				{name: "DigitalAssetBilling", progressPercentage: 2},
			    {name: "DCRProductDetails", progressPercentage: 2},
			    {name: "DCRDetailedProducts", progressPercentage: 2},
				{name: "DATagAnalytic", progressPercentage: 2},
			    {name: "AssetResult", progressPercentage: 2},
			    {name: "AssetMarketingAnalysis", progressPercentage: 2},
				{name: "AnalyticsDoctorVisit", progressPercentage: 2},
			    {name: "Synchronize", progressPercentage: 2},
			    {name: "ErrorLogs", progressPercentage: 2},
			    {name: "DCRHeader", progressPercentage: 1},
			    {name: "DCRHeaderAccompanist", progressPercentage: 1},
			    {name: "ChemistVisit", progressPercentage: 1},
			    {name: "AnalyticsDetailedProducts", progressPercentage: 1},
			    {name: "DCRDoctorAccompanist", progressPercentage: 1},
			    
			    {name: "ZipAsset", progressPercentage: 1},
			    {name: "SiteAnalytics", progressPercentage: 1},
			    {name: "SiteAssetMaster", progressPercentage: 1},
			    {name: "story", progressPercentage: 1},
			    {name: "storyAsset", progressPercentage: 1}
			];	
			return entities;
		}
};