com.swaas.hidoctor.edetailing.ui.view.Index = {
		
		startupIntervalID : null,
		
		startup: function(){			
			com.swaas.hidoctor.edetailing.ui.view.Index.startupIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.Index._startup, 100);
		},
		_startup: function(){
			clearInterval(com.swaas.hidoctor.edetailing.ui.view.Index.startupIntervalID);
			// New Code for checking Version
			var upgradeRequired = com.swaas.hidoctor.edetailing.service.UpgradeService.isUpgradeRequired();
			if(upgradeRequired){
				ED.redirect('view/upgrade/upgrade.html');
			}else{
				var userService = com.swaas.hidoctor.edetailing.service.UserService;
				var coreNET = com.swaas.hidoctor.edetailing.net.CoreNET;
				if (userService.isUserLoggedIn()){
					ED.context.currentUser = userService.getCurrentUser();
					if (userService.isUserSynchroizedData()){
						ED.redirectToHome();
					} else {
						if (coreNET.isConnected()){
							ED.redirect('view/synchronize/prepareMyTablet.html');
						} else {
							ED.redirect('view/error/networkUnavailable.html');
						}
					}
				} else {
					if (coreNET.isConnected()){
						ED.redirect("view/login/login.html");
					} else {
						ED.redirect('view/error/networkUnavailable.html');
					}
				}

			}
		}
};