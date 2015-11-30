com.swaas.hidoctor.edetailing.dao.UpgradeLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Upgrade",
			"columns": [
						{name: "version", columnName:"Version"},
						{name: "release", columnName:"Release"}
			            ]
		},
		
		insert: function(version){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,version);
		},
		
		update: function(version){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,version);
		},
		
		remove: function(){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, null);			
		},
		
		get: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		}
};
