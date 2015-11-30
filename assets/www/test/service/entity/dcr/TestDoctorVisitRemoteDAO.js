com.swaas.hidoctor.edetailing.dao.TestDoctorVisitRemoteDAO = {
		
		testSyncPut : function() {
		
			var columns = [
{name: "doctorVisitCode", columnName:"Doctor_Visit_Code",pk:true},
{name: "dcrCode", columnName:"DCR_Code"},
{name: "doctorCode", columnName:"Doctor_Code"},
{name: "doctorName", columnName:"Doctor_Name"},
{name: "categoryCode", columnName:"Category_Code"},
{name: "specialityName", columnName:"Speciality_Name"},
{name: "doctorRegionCode", columnName:"Doctor_Region_Code"},
{name: "enteredDateTime", columnName:"Entered_DateTime", isDate:true},
{name: "doctorVisitTime", columnName:"Doctor_Visit_Time"},
{name: "visitMode", columnName:"Visit_Mode"},
{name: "remarksByUser", columnName:"Remarks_By_User"},
{name: "poAmount", columnName:"PO_Amount"},
{name: "lattitude", columnName:"Lattitude"},
{name: "longitude", columnName:"Longitude"},					
{name: "sourceOfEntry", columnName:"Source_Of_Entry"},					
{name: "isAccDoctor", columnName: "Is_Acc_Doctor"},
{name: "modeOfEntry", columnName: "Mode_Of_Entry"}	 
     ];
		var values = [{doctorVisitCode :"DVC001",dcrCode:"DCR001",doctorCode:"DOC0000000D1",doctorName:"Sunil",
			categoryCode:"CAT001",specialityName:"ENT",doctorRegionCode:"REC00000001",enteredDateTime :new Date(),
			doctorVisitTime:"12.30",visitMode:"F",remarksByUser:"Good",poAmount:"100",lattitude:"6deg east",
			longitude :"6deg west",sourceOfEntry:"Tablet",isAccDoctor:"0",modeOfEntry:"A"}];
		
			var doctors = ED.formatDataForSyncTwo(values,columns);
			var check = "1";
			var docs = {
					corrlId:"1",
					subDomainName: "hdqaed.demo.hidoctor.in",
					companyCode: "HVM00000011",
					userCode: "USC00000010",
					checkSumId : "1",
					doctorVisitString: doctors
				};
			var result = com.swaas.hidoctor.edetailing.dao.DoctorVisitRemoteDAO.syncPut(docs);
			alert(JSON.stringify(result));
		}
		
};
