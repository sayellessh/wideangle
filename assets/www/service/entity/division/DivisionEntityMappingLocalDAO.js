com.swaas.hidoctor.edetailing.dao.DivisionEntityMappingLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Division_Entity_Mapping",
			"columns": [
                        {name : "divisionCode", columnName : "DivisionCode", pk:true},
						{name : "entityCode", columnName : "EntityCode",pk:true},
						{name : "entityType", columnName : "EntityType"}
			           ]
		},
			
		insert: function(division){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, division);
		},
		
		update: function(division){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, division);
		},
		
		remove: function(divisionCode,entityCode){
			var criteria = {};
			criteria.divisionCode = divisionCode;
			criteria.entityCode = entityCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(divisionCode,entityCode){
			var criteria = {};
			criteria.divisionCode = divisionCode;
			criteria.entityCode = entityCode;
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
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null, null);
		}
};