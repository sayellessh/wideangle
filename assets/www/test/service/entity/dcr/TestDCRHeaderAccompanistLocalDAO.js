com.swaas.hidoctor.edetailing.dao.TestDCRHeaderAccompanistLocalDAO ={
		
		testInsert : function() {
			
			var accompanist =  {
				
					dcrCode : "DCR001",
					accUserName : "Satish",
					accUserTypeName: "Sales Personel",
					accRegionCode:"REG001",
					startTime:"10:40",
					endTime:"10:40",
					onlyForDoctor:"Yes",
					modeOfEntry:"Manual"
			};	
				var result = com.swaas.hidoctor.edetailing.dao.DCRHeaderAccompanistLocalDAO.insert(accompanist);
			alert(JSON.stringify(result));
		
		},
		
		testUpdate : function() {
			
		 var accompanist ={
		
		    dcrCode : "DCR001",
			accUserName : "Jagadish",
			accUserTypeName: "Sales Manager",
			accRegionCode:"REG002",
			startTime:"10:30",
			endTime:"10:40",
			onlyForDoctor:"No",
			modeOfEntry:"Automatic"
			
		};
		 var result = com.swaas.hidoctor.edetailing.dao.DCRHeaderAccompanistLocalDAO.update(accompanist); 
			alert(JSON.stringify(result));
		 
		},
		
		 testGet: function(){
				var result = com.swaas.hidoctor.edetailing.dao.DCRHeaderAccompanistLocalDAO.get("DCR001");
				alert(JSON.stringify(result));
			},
			
			testRemove: function(){
				var result = com.swaas.hidoctor.edetailing.dao.DCRHeaderAccompanistLocalDAO.remove("DCR001");
				alert(JSON.stringify(result));
			}
		
		
		
};
			