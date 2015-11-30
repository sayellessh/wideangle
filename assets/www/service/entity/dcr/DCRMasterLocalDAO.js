com.swaas.hidoctor.edetailing.dao.DCRMasterLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Master",
			"columns": [
						
						{name: "dcrDate", columnName:"DCR_Date",pk:true, isDate:true},
						{name: "flag", columnName:"Flag",pk:true},
						{name: "status", columnName:"Status",pk:true}
						
			            ]
		},
		
		insert: function(master){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,master);
		},
			
		remove: function(dcrDate, flag, status){
			var criteria = {};
			criteria.dcrDate = dcrDate;
			criteria.flag = flag;
			criteria.status = status;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(dcrDate, flag, status){
			var criteria = {};
			criteria.dcrDate = dcrDate;
			criteria.flag = flag;
			criteria.status = status;
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
			this.remove(null, null, null);
		},
		
		getByDate: function(firstDay, lastDay){
			var criteria = {};
			criteria.columnName = "dcrDate";
			criteria.start = firstDay;
			criteria.end = lastDay;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getBetween(this, criteria);	
			return result;
		}
};
