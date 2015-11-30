com.swaas.hidoctor.edetailing.dao.TestDCRProductDetailsRemoteDAO = {
		
		testSyncPut : function() {
		
			var columns = [
{name: "dcrProductCode", columnName:"DCR_Product_Code",pk:true},
{name: "doctorVisitCode", columnName:"Doctor_Visit_Code"},
{name: "dcrCode", columnName:"DCR_Code"},
{name: "productCode", columnName:"Product_Code"},
{name: "specialityCode", columnName:"Speciality_Code"},
{name: "qtyGiven", columnName:"Qty_Given"} 		               
			               ];
			var values = [{dcrProductCode: "PDC0000008",doctorVisitCode :"DVCGanesh3150920131",dcrCode:"DCR00000001",productCode:"PDC0000008",
				specialityCode:"SPC0000001",qtyGiven:"2"}];
		
			var productDetails = ED.formatDataForSyncTwo(values,columns);
			var product = {
					corrlId:"1",
					subDomainName: "hdqaed.demo.hidoctor.in",
					companyCode: "HVM00000011",
					userCode: "USC00000010",
					checkSumId :"1",
					productDetailsString: productDetails
				};
			var result = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsRemoteDAO.syncPut(product);
			alert(JSON.stringify(result));
		}
		
};
