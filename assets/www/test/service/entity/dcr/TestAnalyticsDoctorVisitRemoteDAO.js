com.swaas.hidoctor.edetailing.dao.TestAnalyticsDoctorVisitRemoteDAO = {
		
		testSyncPut : function() {
		
			var columns = [
			     {name: "dcrActualDate", columnName:"DCR_Actual_Date",pk:true,isDate:true},
                 {name: "doctorCode", columnName:"Doctor_Code",pk:true},
                 {name: "doctorRegionCode", columnName:"Doctor_Region_Code",pk:true},
                 {name: "accompanistName", columnName:"Accompanist_Name"},
                 {name: "doctorVisitTime", columnName:"Doctor_Visit_Time"},
                 {name: "lattitude", columnName:"Lattitude"},
                 {name: "longitude", columnName:"Longitude"}			               
			               ];
			var values = [{dcrActualDate:new Date(),doctorCode:"DOC0000000D1",doctorRegionCode:"REC00000001",accompanistName :"Sarva",doctorVisitTime:"5.30",
				lattitude:"7degrees",longitude:"8Degress"}];
		
			var doctorString = ED.formatDataForSyncTwo(values,columns);
			var doctor = {
					corrlId:"1",
					subDomainName: "hdqaed.demo.hidoctor.in",
					companyCode: "HVM00000011",
					userCode: "USC00000010",
					checkSumId :"1",
					doctorVisitString: doctorString
				};
			var result = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitRemoteDAO.syncPut(doctor);
			alert(JSON.stringify(result));
		}
		
};
