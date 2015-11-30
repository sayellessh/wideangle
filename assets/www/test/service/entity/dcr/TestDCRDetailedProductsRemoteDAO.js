com.swaas.hidoctor.edetailing.dao.TestDCRDetailedProductsRemoteDAO = {
		
		testSyncPut : function() {
		
			var columns = [
{name: "doctorVisitCode", columnName:"Doctor_Visit_Code"},
{name: "dcrCode", columnName:"DCR_Code"},
{name: "salesProductCode", columnName:"Sales_Product_Code"},
{name: "modeOfEntry", columnName:"Mode_Of_Entry"}		               
			               ];
			var values = [{doctorVisitCode :"DVCGanesh3150920131",dcrCode:"DCR00000001",salesProductCode:"PDC0000008",
				modeOfEntry:"A"}];
		
			var detailedProducts = ED.formatDataForSyncTwo(values,columns);
			var product = {
					corrlId:"1",
					subDomainName: "hdqaed.demo.hidoctor.in",
					companyCode: "HVM00000011",
					userCode: "USC00000010",
					checkSumId :"1",
					detailedProductsString: detailedProducts
				};
			var result = com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsRemoteDAO.syncPut(product);
			alert(JSON.stringify(result));
		}
		
};
