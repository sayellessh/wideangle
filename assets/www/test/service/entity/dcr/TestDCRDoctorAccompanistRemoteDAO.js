com.swaas.hidoctor.edetailing.dao.TestDCRDoctorAccompanistRemoteDAO = {
		
		testSyncPut : function() {
		
			var columns = [
					   {name: "doctorVisitCode", columnName:"Doctor_Visit_Code"},
                       {name: "dcrCode", columnName:"DCR_Code"},
                       {name: "accUserName", columnName:"Acc_User_Name"},
                       {name: "accUserTypeName", columnName:"Acc_User_Type_Name"},
                       {name: "accUserCode", columnName:"Acc_User_Code"},
                       {name: "accRegionCode", columnName:"Acc_Region_Code"},
                       {name: "isOnlyForDoctor", columnName:"Is_Only_For_Doctor"},
                       {name: "modeOfEntry", columnName:"Mode_Of_Entry"}		               
			               ];
			var values = [{doctorVisitCode :"DVCGanesh3150920131",dcrCode:"DCR00000001",accUserName:"Raju123",accUserTypeName :"CTM",
				accUserCode:"USC0000001",accRegionCode:"REC00000002",isOnlyForDoctor:"Y",modeOfEntry:"A"}];
		
			var dcrAccompanist = ED.formatDataForSyncTwo(values,columns);
			var accompanist = {
					corrlId:"1",
					subDomainName: "hdqaed.demo.hidoctor.in",
					companyCode: "HVM00000011",
					userCode: "USC00000010",
					checkSumId :"1",
					doctorAccompanistString: dcrAccompanist
				};
			var result = com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistRemoteDAO.syncPut(accompanist);
			alert(JSON.stringify(result));
		}
		
};
