com.swaas.hidoctor.edetailing.ui.view._Upgrade = {
		 progressBarALL: null,
		 progress : 0,
		 context: null,
		 initIntervalID : null,
		 
		 init: function(){
			var _this = com.swaas.hidoctor.edetailing.ui.view.Upgrade;
			ED.pageContext.pageName = com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeDatabase;
			ED.setValue($("#updateDatabase"),com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeDatabase);
			_this.progressBarALL = TolitoProgressBar('progressbarALL').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();

			_this.resetProgress();
			$("#progressDiv").width($("#pageDiv").width()-40);
			
			com.swaas.hidoctor.edetailing.ui.view.Upgrade.initIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.Upgrade.updateTables, 100);
		 },
		 
		 updateTables: function(){
			 clearInterval(com.swaas.hidoctor.edetailing.ui.view.Upgrade.initIntervalID);
			 var _this = com.swaas.hidoctor.edetailing.ui.view.Upgrade;
			 com.swaas.hidoctor.edetailing.service.UpgradeService.updateTables(_this.setProgress, _this.onSyncComplete);
		 },
		 
		 onSyncComplete: function(){
			 com.swaas.hidoctor.edetailing.service.UpgradeService.completeUpgrade();
			 $("#buttonDiv").show();
			 ED.setValue($("#progressStatusALL"), com.swaas.hidoctor.edetailing.ui.view.Resource.application.tablesUpdated);
		 },
		 
		 resetProgress: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.Upgrade;
			 _this.progress = 0;
			 _this.progressBarALL.setValue(0);
			 ED.setValue($("#progressStatusALL"), com.swaas.hidoctor.edetailing.ui.view.Resource.application.updateTables);

			 $("#progressDiv").show();
			 $("#buttonDiv").hide();
		 },
		 
		 setProgress: function(status){
			var _this = com.swaas.hidoctor.edetailing.ui.view.Upgrade;
			_this.progress += status.progress;
			_this.progressBarALL.setValue(_this.progress);	
		 },
		 

	goNext : function() {
		ED.redirect("index.html", {
			noBack : true
		});
		/*var userService = com.swaas.hidoctor.edetailing.service.UserService;
		if (userService.isUserLoggedIn()) {
			ED.context.currentUser = userService.getCurrentUser();
			if(com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()) {
				com.swaas.hidoctor.edetailing.service.UpgradeService.completeUpgrade();
				var isUpSynchRequired = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getUpSyncRequired();
				if(isUpSynchRequired == true){
					ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "prepareMyTable", "nonDCRSync" : true, "dcrSync": false});
				} else {
					ED.redirect("view/synchronize/prepareMyTablet.html");	
				}	
			} else {
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeMessage);
			}
		} else {
			ED.redirect("index.html", {
				noBack : true
			});
		}*/
	}
};

com.swaas.hidoctor.edetailing.ui.view.Upgrade = createProxy(com.swaas.hidoctor.edetailing.ui.view._Upgrade, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);