com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Expense_Entity_Master",
			"columns": [
						{name: "expenseEntityCode", columnName: "ExpenseEntityCode", pk:true},
						{name: "expenseEntityName", columnName: "ExpenseEntityName",pk:true}						
			            ]
		},
		
		insert: function(expense){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, expense);
		},
		
		update: function(expense){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, expense);
		},
		
		remove: function(expenseEntityCode){
			var criteria = {};
			criteria.expenseEntityCode = expenseEntityCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(expenseEntityCode){
			var criteria = {};
			criteria.expenseEntityCode =expenseEntityCode;
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
			this.remove(null);
		}
};
