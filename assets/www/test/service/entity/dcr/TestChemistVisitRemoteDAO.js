com.swaas.hidoctor.edetailing.dao.TestChemistVisitRemoteDAO = {
		
		testSyncPut : function() {
		
			var columns = [
					 {name: "chemistVisitCode", columnName:"Chemist_Visit_Code",pk:true},
                     {name: "doctorVisitCode", columnName:"Doctor_Visit_Code"},
                     {name: "dcrCode", columnName:"DCR_Code"},
                     {name: "chemistCode", columnName:"Chemist_Code"},
                     {name: "chemistName", columnName:"Chemist_Name"},
                     {name: "poAmount", columnName:"PO_Amount"},					
                     {name: "isAccChemist", columnName:"Is_Acc_Chemist"}		               
			               ];
			var values = [{chemistVisitCode :"CVCGanesh3150920131",doctorVisitCode :"DVCGanesh3150920131",dcrCode:"DCR00000001",chemistCode:"CHM0001",chemistName :"CTM",
				poAmount:"01",isAccChemist:"1"}];
		
			var chemistVisit = ED.formatDataForSyncTwo(values,columns);
			var chemist = {
					corrlId:"2",
					subDomainName: "hdqaed.demo.hidoctor.in",
					companyCode: "HVM00000011",
					userCode: "USC00000010",
					checkSumId :"1",
					chemistVisitString: chemistVisit
				};
			var result = com.swaas.hidoctor.edetailing.dao.ChemistVisitRemoteDAO.syncPut(chemist);
			alert(JSON.stringify(result));
		}
		
};
