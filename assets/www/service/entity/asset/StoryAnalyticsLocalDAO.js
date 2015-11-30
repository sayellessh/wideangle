com.swaas.hidoctor.edetailing.dao.storyAnalyticsLocalDAO = {
    metadata: {
        "tableName" : "tbl_Story_Analytics",
        "columns": [
            {name: "storyAnalyticsId", columnName: "Story_anaytics_Id", pk: true},
            {name: "storyId", columnName: "Story_Id"},
            {name: "storyName", columnName: "Story_Name"},
            {name: "DACode", columnName:"DA_Code"},
            {name: "DAName", columnName:"DA_Name"},
            {name: "doctorCode", columnName: "Doctor_Code"},
            {name: "doctorRegionCode", columnName: "Doctor_Region_Code"},
            {name: "productCode", columnName: "Product_Code"},
            {name: "onlinePlay", columnName: "Online_Play"},
            {name: "offlinePlay", columnName: "Offline_Play"},
            {name: "playTime", columnName: "Play_Time"},
            {name: "transactionTime", columnName: "Transaction_Time"}
        ]
    },
    
    insert: function(analytics, onSuccess, onFailure) {
        var storyAnalyticsId = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
        analytics.storyAnalyticsId = storyAnalyticsId;
        
        var time = analytics.transactionTime;
        var zone = -time.getTimezoneOffset(), dif = zone >= 0 ? '+' : '-';
        var pad = function(num) {
            norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
        var timeString = time.getFullYear() + '-' + pad(time.getMonth()+1) + '-' + pad(time.getDate())
            + 'T' + pad(time.getHours()) + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds());
        analytics.transactionTime = timeString;
        
        var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, analytics, function(){
            if(onSuccess) onSuccess(storyAnalyticsId);
        }, function(error){ alert(JSON.stringify(error)); });
        return result;
    },
    update : function(storyAnalyticsId, documentViewTime, onSuccess, onFailure){
        var criteria = {
            storyAnalyticsId : storyAnalyticsId,
            playTime : documentViewTime
        };
        com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, criteria);
    },
    getAll: function(onSuccess, onFailure){
        var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, null, function(result){
            if(onSuccess) onSuccess(result);
        }, onFailure);
        return result;
    },
    
    syncGet: function(params, onSuccess, onFailure){
        //var result = this.getAll();
        var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version;
        
        var columns = [
	           {name: "storyId", columnName: "Story_Id"},
	           {name: "storyName", columnName: "Story_Name"},
	           {name: "DACode", columnName:"DA_Code"},
	           {name: "DAName", columnName:"DA_Name"},
	           {name: "doctorCode", columnName: "Doctor_Code"},
	           {name: "doctorRegionCode", columnName: "Doctor_Region_Code"},
	           {name: "onlinePlay", columnName: "Online_Play"},
	           {name: "offlinePlay", columnName: "Offline_Play"},
	           {name: "playTime", columnName: "Play_Time"},
	           {name: "transactionTime", columnName: "Transaction_Time"}
	       ];
        var storyAnalytics = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
        if(storyAnalytics == null) 
        	storyAnalytics = new Array();
        var newStoryAnalytics = new Array();
        for(var i=0;i<=storyAnalytics.length-1;i++) {
        	if(storyAnalytics[i].DACode != null && storyAnalytics[i].DACode != null) {
        		newStoryAnalytics.push(storyAnalytics[i]);
        	}
        }
        var storyAnalyticsData = ED.formatDataForSyncTwo(newStoryAnalytics, columns);
        
        var assets = {
			corrlId : params.correlationId,
			companyCode : params.companyCode,
			userCode : params.userCode,
			regionCode : params.regionCodes[0],
			storyAnalyticsData : storyAnalyticsData,
			appSuiteId : com.swaas.hidoctor.edetailing.ui.view.Resource.application.appSuiteId,
			appId :com.swaas.hidoctor.edetailing.ui.view.Resource.application.appId ,
			appVersion : version
		};
        return assets;
    },
    
    clean: function() {
    	com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, null);
    }
    
};