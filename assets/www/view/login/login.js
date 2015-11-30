com.swaas.hidoctor.edetailing.ui.view.Login = {
		init: function(){
			ED.bindSubmit($('#frmLogin'), com.swaas.hidoctor.edetailing.ui.view.Login.login);
			ED.setValue($('#lblWelcomeTo'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.welcome);
			ED.setValue($('#lblUserId'), com.swaas.hidoctor.edetailing.ui.view.Resource.login.userId);
			ED.setValue($('#lblPassword'), com.swaas.hidoctor.edetailing.ui.view.Resource.login.password);
			ED.setValue($('#lblURL'), com.swaas.hidoctor.edetailing.ui.view.Resource.login.url);
			ED.setValue($('#btnSignin'), com.swaas.hidoctor.edetailing.ui.view.Resource.login.signIn);
			ED.setValue($('#btnReset'), com.swaas.hidoctor.edetailing.ui.view.Resource.login.reset);
			ED.setValue($('#lblUserIdExample'), com.swaas.hidoctor.edetailing.ui.view.Resource.login.userIdExample);
			ED.setValue($('#lblURLExample'), com.swaas.hidoctor.edetailing.ui.view.Resource.login.urlExample);
			ED.setValue($('#versionText'),'Version '+com.swaas.hidoctor.edetailing.ui.view.Resource.application.version + "." 
					    + com.swaas.hidoctor.edetailing.ui.view.Resource.application.release);
			
			ED.setValue($('#userId'), "");
			ED.setValue($('#password'), "");
			ED.setValue($('#url'), "");	
			ED.setFooter();
			$("#content").show();
		},
		login: function(){
			var userService = com.swaas.hidoctor.edetailing.service.UserService;
			var coreNET = com.swaas.hidoctor.edetailing.net.CoreNET;
			if (coreNET.isConnected()){
				var userCode = ED.getValue($('#userId'));
				var password = ED.getValue($('#password'));
				var url = ED.getValue($('#url'));	
				if (userService.login(userCode, password, url)){
					ED.context.currentUser = userService.getCurrentUser();
					if (userService.isUserSynchroizedData()){
						ED.redirectToHome({noBack : true});
					} else {
						ED.redirect('view/synchronize/prepareMyTablet.html', {noBack : true});
					}
				} else {
					alert(com.swaas.hidoctor.edetailing.ui.view.Resource.login.failed);					
				}
			} else {
				ED.redirect('view/error/networkUnavailable.html', {noBack : true});
			}
			return false; //RETURN FALSE TO ENSURE THAT THE FORM IS NOT SUBMITING AND PAGE LOADED AGAIN.
		}
};