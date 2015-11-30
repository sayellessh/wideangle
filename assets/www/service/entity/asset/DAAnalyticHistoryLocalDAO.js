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
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, daAnalyticsHistory);
		},
				
		remove: function(daCode){
			var criteria = {};
			criteria.daCode = daCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},

		getByAsset : function(daCode) {
			var criteria = {};
			criteria.daCode = daCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
	    },
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null);
		}
};
