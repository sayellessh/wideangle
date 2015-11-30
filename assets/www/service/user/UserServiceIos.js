com.swaas.hidoctor.edetailing.service.UserService = {
		currentUser: null,
		accompanists: null,
		login: function(userName, password, url, onLoginSuccess){
			var logedIn = com.swaas.hidoctor.edetailing.dao.UserRemoteDAO.login(userName, password, url);
			if (logedIn){
				var user = com.swaas.hidoctor.edetailing.dao.UserRemoteDAO.get(userName, url);
				user.userName = userName;
				user.password = password;
				user.url = url;
				//com.swaas.hidoctor.edetailing.dao.UserLocalDAO.remove(null);
				//com.swaas.hidoctor.edetailing.dao.UserLocalDAO.insert(user);
                com.swaas.hidoctor.edetailing.dao.UserLocalDAO.remove(null, function(){
                    com.swaas.hidoctor.edetailing.dao.UserLocalDAO.insert(user, onLoginSuccess, null);
                }, function(){});
                
			}
			return logedIn;
		},
		
		getCurrentUser: function(onUserReceive, onFail){            
			var _this = com.swaas.hidoctor.edetailing.service.UserService;
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.UserLocalDAO, null,
			function(response){
				_this.currentUser = response[0];
				onUserReceive(response[0]);
			}, onFail);
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
		
		isUserLoggedIn: function(onLoginCheck, onFail){
			//var user = this.getCurrentUser();
			//return (user != null);
            console.log('userService: isUserLoggedin');
            this.getCurrentUser(onLoginCheck, onFail);
		},
		
		isUserSynchroizedData: function(onSyncCheck){
            /*return false;
			var syncStatus = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getStatus();
			return syncStatus;*/
            com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getStatus(onSyncCheck, null);
		},
		
		isNetworkAvailable: function(){
			var networkStatus = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
			return networkStatus;
		},
		
		getAccompanists: function(onGetList, failure){
			/*if (this.accompanists == null){
				this.accompanists = com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO.getAll();
			}
             return this.accompanists;*/ 
            com.swaas.hidoctor.edetailing.dao.AccompanistLocalDAO.getAll(onGetList, failure);
		},
		
		getSelectedAccompanists: function(onGetList, failure){
			com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.getAll(onGetList, failure);
		},
		
		getUserDivision: function(userCode, onSuccess, onFailure){
			com.swaas.hidoctor.edetailing.dao.UserDivisionLocalDAO.getByUser(userCode, onSuccess, onFailure);
		}
};