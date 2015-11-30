com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_TP_Header",
			"columns": [
						{name: "tpId", columnName: "TP_Id", pk:true},
						{name: "callObjective", columnName: "Call_Objective"},
						{name: "tpDate", columnName: "TP_Date", isDate: true},
						{name: "cpName", columnName:"CP_Name"},
						{name: "workCategoryName", columnName:"Work_Category_Name"},
						{name: "workPlace", columnName:"Work_Place"}
			            ]
		},
		
		insert: function(tpHeader){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, tpHeader);
		},
		
		update: function(tpHeader){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, tpHeader);
		},
		
		remove: function(tpId){
			var criteria = {};
			criteria.tpId = tpId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(tpId){
			var criteria = {};
			criteria.tpId = tpId;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		syncPut: function(params){
			if (params.tpHeaders != null){
				var tpHeaders = params.tpHeaders;
				var counter = 0;
				var _this = this;
				$.each(tpHeaders, function(index, tpHeader){
					_this.insert(tpHeader);
					counter++;
				});
			}
			
			if (params.tpAccompanists != null){
				var tpAccompanists  = params.tpAccompanists;
				var counter = 0;
				$.each(tpAccompanists, function(index, tpAccompanist){
					com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.syncPut(tpAccompanist);
					counter++;
				});
			}
		},
		
		clean: function(){
			this.remove(null, null);
			com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.clean();
		},
		getByDate: function(firstDay, lastDay){
			var criteria = {};
			criteria.columnName = "tpDate";
			criteria.start = firstDay;
			criteria.end = lastDay;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getBetween(this, criteria);	
			return result;
		},
		getByTPDate: function(tpDate){
			var criteria = {};
			criteria.tpDate = tpDate;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		}
};
