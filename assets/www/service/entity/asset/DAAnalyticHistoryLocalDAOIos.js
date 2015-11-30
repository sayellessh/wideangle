com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO = {
		metadata: {
			"tableName" : "tbl_DA_Analytics_History",
			"columns": [
						{name: "daCode", columnName: "DA_ID", pk:true},
						{name: "companyCode", columnName: "Company_Code"},
						{name: "totalViewsCount", columnName: "TotalViewsCount"},
						{name: "totalLikesCount", columnName: "TotalLikesCount"},
						{name: "totalDislikesCount", columnName:"TotalDislikesCount"},
						{name: "starValue", columnName:"StarValue"}
						]
		},
		
		insert: function(daAnalyticsHistory){
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, daAnalyticsHistory);
		},
				
		remove: function(daCode, onRemove){
			var criteria = {};
			criteria.daCode = daCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove);
		},

		getByAsset : function(daCode, onSuccess) {
			var criteria = {};
			criteria.daCode = daCode;
			//var result =
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, function(result){
                if (result.length > 0){
                    if(onSuccess) onSuccess(result[0]);
                } else {
                    if(onSuccess) onSuccess(null);
                }
            });
	    },
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(isEraseAndClean, context, onRemove){
			this.remove(null, onRemove);
		}
};