com.swaas.hidoctor.edetailing.dao.UserRemoteDAO = {
		metadata: {
			"service" : "HDUserService",
			"properties": [
						{name: "companyCode", inProperty: "companyCode", outProperty: "Company_Code"},
						{name: "userName",  inProperty: "userName", outProperty: null},
						{name: "password",  inProperty: "password", outProperty: null},
						{name: "url",  inProperty: "url", outProperty: null},
						{name: "userCode",  inProperty: "userCode", outProperty: "User_Code"},
						{name: "regionCode",  inProperty: "regionCode", outProperty: "Region_Code"},
						{name: "regionName",  inProperty: "regionName", outProperty: "Region_Name"},
						{name: "userTypeCode",  inProperty: "userTypeCode", outProperty: "User_Type_Code"},
						{name: "regionHierarchy",  inProperty: "regionHierarchy", outProperty: "User_Hierarchy"},
						{name: "userTypeName",  inProperty: "userTypeName", outProperty: "User_Type_Name"},
						{name: "lastSyncDate",  inProperty: "lastSyncDate", outProperty: null}
			            ]
		},
		
		login: function(userName, password, url){
			//TODO make the rest call
			var data = {
					correlationId:1,
					userName: userName,
					password: password,
					subDomainName: url
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "CheckUserAuthentication", data);
			return (result);
		},
		
		get: function(userName, url){
			var data = {
					correlationId:1,
					userName:userName,
					subDomainName: url
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGetSingle(this, "GetUserInfo", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.userName, params.url);
		}
};