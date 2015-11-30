com.swaas.hidoctor.edetailing.service.UserService = {
		currentUser: null,
		accompanists: null,
		login: function(userName, password, url){
			var logedIn = com.swaas.hidoctor.edetailing.dao.UserRemoteDAO.login(userName, password, url);
			if (logedIn){
				var user = com.swaas.hidoctor.edetailing.dao.UserRemoteDAO.get(userName, url);
				user.userName = userName;
				user.password = password;
				user.url = url;
				com.swaas.hidoctor.edetailing.dao.UserLocalDAO.remove(null);
				com.swaas.hidoctor.edetailing.dao.UserLocalDAO.insert(user);
			}
			return logedIn;
		},
		
		getCurrentUser: function(){
			if (this.currentUser == null){
				this.currentUser = com.swaas.hidoctor.edetailing.dao.UserLocalDAO.get(null);
			}
			return this.currentUser;
		},
		
		isLocalUserValid : function(){
			var user = this.getCurrentUser();
			var valid = false;
			if (user != null){
				if (this.login(user.userName, user.password, user.url)){
					valid = true;
				}
			}
			return valid;
		},
		
		isUserLoggedIn: function(){
			var user = this.getCurrentUser();
			return (user != null);
		},
		
		isUserSynchroizedData: function(){
			var syncStatus = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getStatus();
			return syncStatus;
		},
		
		isNetworkAvailable: function(){
			var networkStatus = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
			return networkStatus;
		},
		
		getAccompanists: function(){
			if (this.accompanists == null){
				this.accompanists = com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO.getAll();
			}
			return this.accompanists;
		},
		
		getSelectedAccompanists: function(){
			return com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.getAll();
		},
		
		getUserDivision: function(userCode){
			return com.swaas.hidoctor.edetailing.dao.UserDivisionLocalDAO.getByUser(userCode);
		}
};