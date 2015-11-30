com.swaas.hidoctor.edetailing.dao.TestRcpaDetailsRemoteDAO = {
		
		testSyncPut : function() {
		
			var columns = [
					   {name: "dcrRcpaCode", columnName:"DCR_RCPA_Code",pk:true},
                             {name: "chemistVisitCode", columnName:"Chemist_Visit_Code"},
                             {name: "doctorVisitCode", columnName:"Doctor_Visit_Code"},
                             {name: "dcrCode", columnName:"DCR_Code"},
                             {name: "salesProductCode", columnName:"Sales_Product_Code"},
                             {name: "productCode", columnName:"Product_Code"},
                             {name: "competitorProductCode", columnName:"Competitor_Product_Code"},
                             {name: "competitorProductName", columnName:"Competitor_Product_Name"},
                             {name: "supportQty", columnName:"Support_Qty"}		               
			               ];
			var values = [{dcrRcpaCode:"DRCGanesh3150920131",chemistVisitCode:"CVCGanesh3150920131",doctorVisitCode :"DVCGanesh3150920131",dcrCode:"DCR00000001",salesProductCode:"PDC0000008",
				productCode :"PDC002",competitorProductCode:"CPD0000001",competitorProductName:"Iodex",supportQty:"2"}];
		
			var rcpaValue = ED.formatDataForSyncTwo(values,columns);
			var rcpa = {
					corrlId:"1",
					subDomainName: "hdqaed.demo.hidoctor.in",
					companyCode: "HVM00000011",
					userCode: "USC00000010",
					checkSumId :"1",
					rcpaString: rcpaValue
				};
			var result = com.swaas.hidoctor.edetailing.dao.RcpaDetailsRemoteDAO.syncPut(rcpa);
			alert(JSON.stringify(result));
		}
		
};
