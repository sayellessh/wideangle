com.swaas.hidoctor.edetailing.dao.TestDCRHeaderLocalDAO = {
		
		testInsert: function(){
			
			var dcrIn = {
					
					dcrCode :"DCR 001",
					userCode: "USR 001",
				    dcrEnteredDate: "26/8/2013",
					regionCode : "REG001",
					dcrActualDate :"10/10/2013",
					flag :"f",
				    categoryCode:"CG001",
				    categoryName:"Super Core",
					approvedBy:"Sunil",
					approvedDate:"none",
					unapprovalReason:"Dont know",
				    sourceOfEntry : "Tablet",
				    lattitude :"7 deg east",
				    longitude:"9 deg west",
			
			};
			
			var result= com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.insert(dcrIn);
			alert(JSON.stringify(result));
			
			
			
			},
       
			testUpdate : function() {
				
				var dcrIn = {
						
						dcrCode :"DCR 001",
						userCode: "USR 002",
					    dcrEnteredDate: "27/8/2013",
						regionCode : "REG002",
						dcrActualDate :"27/8/2013",
						flag :"f",
					    categoryCode:"CG002",
					    categoryName:"Non- Core",
						approvedBy:"Sarva",
						approvedDate:"30/8/2013",
						unapprovalReason:"I know",
					    sourceOfEntry : "Mobile",
					    lattitude :"10 deg east",
					    longitude:"2 deg west",
				
				};
				var result= com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.update(dcrIn);
				alert(JSON.stringify(result));
			},


			testGet: function(){
				var userOut = com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.get("DCR 001","f");
				alert(JSON.stringify(userOut));
			},
			
			testRemove: function(){
				var userOut = com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.remove("DCR 001","f");
				alert(JSON.stringify(userOut));
			},
			
			testRemoveAll: function(){
				var userOut = com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.remove(null,null);
				alert(JSON.stringify(userOut));
			}
}