com.swaas.hidoctor.edetailing.dao.TestAnalyticsDetailedProductsRemoteDAO = {
		
		testSyncPut : function() {
		
			var columns = [
							{name: "dcrActualDate", columnName:"DCR_Actual_Date",pk:true,isDate:true},
                            {name: "doctorCode", columnName:"Doctor_Code",pk:true},
			               {name: "doctorRegionCode", columnName:"Doctor_Region_Code",pk:true},
			               {name: "productCode", columnName:"Product_Code",pk:true}			               
			               ];
			var values = [{dcrActualDate :new Date(),doctorCode:"DOC0000000D1",doctorRegionCode:"REC00000001",productCode :"PDC0000008"}];
		
			var detailedProducts = ED.formatDataForSyncTwo(values,columns);
			var products = {
					corrlId:"1",
					subDomainName: "hdqaed.demo.hidoctor.in",
					companyCode: "HVM00000011",
					userCode: "USC00000010",
					detailedProductsString: detailedProducts
				};
			var result = com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsRemoteDAO.syncPut(products);
			alert(JSON.stringify(result));
		}
		
};
