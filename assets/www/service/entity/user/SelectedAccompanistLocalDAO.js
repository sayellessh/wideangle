com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Selected_Accompanist",
			"columns": [
						{name: "accompnistName", columnName: "Acc_Name", pk:true},
						{name: "accompnistRegionCode", columnName:"Acc_Region_Code"}
						
						]
		},
		

		insert : function(accompanist) {
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, accompanist);
		},
		
		remove : function(accompnistName, accompnistRegionCode) {
			var criteria = {};
			criteria.accompnistName = accompnistName;
			criteria.accompnistRegionCode = accompnistRegionCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);
		},
	
		get : function(accompnistName) {
			var criteria = {};
			criteria.accompnistName = accompnistName;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this,criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this,criteria);
			return result;
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null);
		}
};
