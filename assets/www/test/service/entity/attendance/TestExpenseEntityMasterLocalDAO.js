com.swaas.hidoctor.edetailing.dao.TestExpenseEntityMasterLocalDAO = {
		
		testInsert: function(){
			var expense = {
					expenseEntityCode: "E1",
					expenseEntityName: "Expense Name"
			};
			var result = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO.insert(expense);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var expense = {
					expenseEntityCode: "E1",
					expenseEntityName: "Expense Name"
			};
			var result = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO.update(expense);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var expenseOut = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO.get("E1");
			alert(JSON.stringify(expenseOut));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO.remove("E1");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};