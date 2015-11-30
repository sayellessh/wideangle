com.swaas.hidoctor.edetailing.dao.TestActivityMasterLocalDAO = {
		
		testInsert: function(){
			var activity = {
					
					activityCode: "A1",
					projectCode: "P1",
					activityName : "Activity One"	
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.ActivityMasterLocalDAO.insert(activity);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var activity = {
					
					activityCode: "A1",
					projectCode: "P1",
					activityName : "Activity Updated"
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.ActivityMasterLocalDAO.update(activity);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var activity = com.swaas.hidoctor.edetailing.dao.ActivityMasterLocalDAO.get("A1","P1");
			alert(JSON.stringify(activity));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.ActivityMasterLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		testRemove: function(){
			var activity = com.swaas.hidoctor.edetailing.dao.ActivityMasterLocalDAO.remove("A1","P1");
			alert(JSON.stringify(activity));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};