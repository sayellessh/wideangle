com.swaas.hidoctor.edetailing.dao.DoctorTagMasterLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Doctor_Tag_Master",
			"columns": [
			            {name: "tagId", columnName: "Tag_ID", pk:true},
						{name: "companyCode", columnName: "Company_Code"},
						{name: "tagDescription", columnName: "Tag_Description"},
						{name: "tagUsedCount", columnName: "Tag_Used_Count"}
						]
		},
		
		insert: function(tag){
			if(tag.tagId == null || (typeof tag.tagId == 'undefined')){
				tag.tagId = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
			}
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, tag);
		},
				
		update: function(tag){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, tag);
		},
		
		remove: function(tagId){
			var criteria = {};
			criteria.tagId = tagId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		getByDescription : function(tagDescription) {
			var criteria = {};
			criteria.tagDescription = tagDescription;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);			
				return result;
		},
		getAll : function() {
			
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, null);			
				return result;
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

		clean: function(){
			this.remove(null);
		}
};
