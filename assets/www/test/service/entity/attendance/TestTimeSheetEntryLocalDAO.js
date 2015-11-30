com.swaas.hidoctor.edetailing.dao.TestTimeSheetEntryLocalDAO = {
		
		testInsert: function(){
			var time = {
					
					timeSheetCode: "TMS 01",
					dcrCode: "Dcr 01",
					projectCode : "PR 01",
					activityCode : "AC 01",
					startTime : "12:30 AM",
					endTime : "2:30AM",
					remarks : "Work Finished",
					enteredDateTime : "12/10/2013"
						
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.insert(time);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var time = {
					
					timeSheetCode: "TMS 01",
					dcrCode: "Dcr 02",
					projectCode : "PR 02",
					activityCode : "AC 02",
					startTime : "12:34 AM",
					endTime : "2:34 AM",
					remarks : "Work Not Finished",
					enteredDateTime : "02/10/2013"
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.update(time);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var sheet = com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.get("TMS 01");
			alert(JSON.stringify(sheet));
		},
		
		testRemove: function(){
			var sheet = com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.remove("TMS 01");
			alert(JSON.stringify(sheet));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};