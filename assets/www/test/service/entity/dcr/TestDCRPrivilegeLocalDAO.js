com.swaas.hidoctor.edetailing.dao.TestDCRPrivilegeLocalDAO ={
		
		testInsert : function() {
			
			var privilege = {
					
					rigidDoctorEntry : "YES",
					sfcValidation : "OS,HQ",
					dcrProductBringType: "Sales",
					dcrDoctorVisitMode:"Manual",
					dcrDoctorPobAmount:"100",
					dcrInputMandatoryNumber:"2",
					showAccompanistData:"Yes",
					dcrChemistMandatoryNumber:"3",
					rcpaMandatoryDoctorCategory:"No"
			};
			
			var result = com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO.insert(privilege);
			alert(JSON.stringify(result));
			
		},
		
      testUpdate : function() {
	
	     var privilege = {
			
			rigidDoctorEntry : "NO",
			sfcValidation : "IS,IQ",
			dcrProductBringType: "Gift",
			dcrDoctorVisitMode:"Auto",
			dcrDoctorPobAmount:"200",
			dcrInputMandatoryNumber:"8",
			showAccompanistData:"No",
			dcrChemistMandatoryNumber:"6",
			rcpaMandatoryDoctorCategory:"Yes"		
	          };
	
         	var result = com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO.update(privilege);
	        alert(JSON.stringify(result));
	
       },
       
       testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO.get();
			alert(JSON.stringify(result));
		},
		
		testGetAll : function() {
			var doctorVisitOut = com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO.getAll();
			alert(JSON.stringify(doctorVisitOut));
		},
		
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO.remove();
			alert(JSON.stringify(result));
		}
	

		
};