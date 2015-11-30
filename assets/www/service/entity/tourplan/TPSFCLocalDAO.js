com.swaas.hidoctor.edetailing.dao.TPSFCLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_TP_SFC",
			"columns": [
						{name: "tpId", columnName: "TP_Id"},
						{name: "fromPlace", columnName: "From_Place"},
						{name: "toPlace", columnName:"To_Place"}
			            ]
		},
		
		insert: function(tpSFC){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, tpSFC);
		},
		
		remove: function(tpId){
			var criteria = {};
			criteria.tpId = tpId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		getByTPId: function(tpId){
			var criteria = {};
			criteria.tpId = tpId;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null);
		}
};
