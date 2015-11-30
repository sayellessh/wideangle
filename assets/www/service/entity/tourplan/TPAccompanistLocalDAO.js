com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_TP_Accompanist",
			"columns": [
						{name: "tpId", columnName: "TP_Id", pk: true},
						{name: "accompnistName", columnName: "Acc_Name", pk: true},
						{name: "accompnistRegionCode", columnName:"Acc_Region_Code"}
			            ]
		},
		
		insert: function(tpAccompanist){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, tpAccompanist);
		},
		
		update: function(tpAccompanist){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, tpAccompanist);
		},
		
		remove: function(tpId, accompnistName){
			var criteria = {};
			criteria.tpId = tpId;
			criteria.accompnistName = accompnistName;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(tpId, accompnistName){
			var criteria = {};
			criteria.tpId = tpId;
			criteria.accompnistName = accompnistName;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		getByTP: function(tpId, doctorRegionCode) {
			var criteria = {};
			criteria.tpId = tpId;
			criteria.accompnistRegionCode = doctorRegionCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
		},
		
		syncPut: function(params){
			this.insert(params);			
			com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.syncPut(params);
		},
		
		clean: function(){
			this.remove(null, null);
			com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.clean();
		}
};
