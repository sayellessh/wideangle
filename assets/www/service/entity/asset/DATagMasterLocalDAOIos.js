com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DA_Tag_Master",
			"columns": [
						{name: "tagId", columnName: "Tag_ID", pk:true},
						{name: "companyCode", columnName: "Company_Code"},
						{name: "tagDescription", columnName: "Tag_Description"},
						{name: "tagUsedCount", columnName: "Tag_Used_Count"}
						]
		},
		
		insert: function(tag,onSuccess,onFailure){
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, tag,onSuccess,onFailure);
		},
				
		update: function(tag, onSuccess){
			com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, tag, onSuccess);
		},
		
		remove: function(tagId, onRemove){
			var criteria = {};
			criteria.tagId = tagId;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove);
		},
		getByDescription : function(tagDescription, onSuccess, onFailure) {
			var criteria = {};
			criteria.tagDescription = tagDescription;
			//var result =
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, onSuccess, onFailure);
            //return result;
		},
		getAll : function(onSuccess, onFailure) {
			//var result =
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, null, onSuccess, onFailure);
            //return result;
		},	

		get : function(tagId) {
			var criteria = {};
			criteria.tagId = tagId;
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
		
		clean: function(IsEraseAndClean, context, onRemove){
			this.remove(null, onRemove);
		}
};