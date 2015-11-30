com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO = {
		
		entityclass: {metadata: {columns : [ {name: "count", columnName: "count"}]}},
		
		_getCount: function(table){
			var _this = com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO;
			var select = "Select count(*) AS count From " +table;
			if(table == 'tbl_DCR_Header') {
				select += " Where DCR_Code_Formatted IS NOT NULL AND DCR_Code_Formatted != ''";
			
			} else if(table == 'tbl_DCR_Doctor_Visit') {	
				select += " Where Doctor_Visit_Code_Formatted IS NOT NULL AND Doctor_Visit_Code_Formatted != ''";
			
			} else if(table == 'tbl_DCR_Doctor_Accompanist') {
				select += " Where Doctor_Visit_Code_Formatted IS NOT NULL AND Doctor_Visit_Code_Formatted != ''";
			
			} else if(table == 'tbl_DCR_Detailed_Products') {
				select += " Where Doctor_Visit_Code_Formatted IS NOT NULL AND Doctor_Visit_Code_Formatted != ''";
			
			} else if(table == 'tbl_DCR_Product_Details') {
				select += " Where DCR_Product_Code_Formatted IS NOT NULL AND DCR_Product_Code_Formatted != ''";
			
			} else if(table == 'tbl_DCR_Chemist_Visit') {
				select += " Where Chemist_Visit_Code_Formatted IS NOT NULL AND Chemist_Visit_Code_Formatted != ''";
			
			} else if(table == 'tbl_DCR_RCPA_Details') {
				select += " Where DCR_RCPA_Code_Formatted IS NOT NULL AND DCR_RCPA_Code_Formatted != ''";
			
			} else if(table == 'tbl_Timesheet_Entry') {
				select += " Where Timesheet_Code_Formatted IS NOT NULL AND Timesheet_Code_Formatted != ''";
			}
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this.entityclass, select);
			var count = 0;
			if (result != null && result.length > 0){
				count = result[0].count;
			}
			return count;
		},
		
		_getFromAndToDate: function(){
			var select = "Select min(DCR_Actual_Date) from_date, max(DCR_Actual_Date) to_date  From tbl_DCR_Header";
			var entityclass = {metadata: {columns : [ {name: "fromDate", columnName: "from_date"},
			                                         {name: "toDate", columnName: "to_date"}]}};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, select);
			if (result != null && result.length > 0){
				return {
					fromDate: new Date(result[0].fromDate),
					toDate:  new Date(result[0].toDate)
				};
			} else {
				return {
					fromDate: com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(new Date()),
					toDate: com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(new Date())
				};
			}
			
		},
		
		_getDCRString: function(){
			var dcrHeaders = com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.getAll();
			var columns = [
							{name: "dcrActualDate", columnName:"DCR_Actual_Date",isDate:true},
							{name: "flag", columnName:"Flag",pk:true}               
				               ];
			
			var dcrString = ED.formatDataForSyncTwo(dcrHeaders, columns);
			return  dcrString;
			
		},
		
		syncGet: function(params){
			var _this = com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO;
			_this.updateIds(params);
			var values = {
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					dcrString: _this._getDCRString(),
					headerCount: _this._getCount("tbl_DCR_Header"),
					doctorCount: _this._getCount("tbl_DCR_Doctor_Visit"),
					doctorAccCount: _this._getCount("tbl_DCR_Doctor_Accompanist"),
					detailedProdCount: _this._getCount("tbl_DCR_Detailed_Products"),
					prodDetailCount: _this._getCount("tbl_DCR_Product_Details"),
					chemistCount: _this._getCount("tbl_DCR_Chemist_Visit"),
					rcpaCount: _this._getCount("tbl_DCR_RCPA_Details"),
					timesheetCount: _this._getCount("tbl_Timesheet_Entry")
			};
			
			if ((values.headerCount + values.doctorCount + values.doctorAccCount + 
					values.detailedProdCount + values.prodDetailCount + values.chemistCount + 
					values.rcpaCount) > 0 ){
				var fromAndToDate = _this._getFromAndToDate();
				var dateFormat = "yyyy-mm-dd";
				values.startDate = fromAndToDate.fromDate.format(dateFormat);
				values.endDate = fromAndToDate.toDate.format(dateFormat);
				values.syncDateTime = (new Date()).format("yyyy-mm-dd HH:MM:ss");
				return [values];
			} else {
				return [];
			}
		},
		
		clean: function(params){
			com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.clean(); 
			//added in AnalyticsDetailedProductsLocalDAO clean for DCRUpsync and called before checksum clean for all Upsync 
			com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.clean();
			com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.clean();
			com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.clean();
			com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.clean();
			com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.clean();
			com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.clean();	
			com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.clean();
		},
		eraseAndClean : function(isEraseAndClean){
			var _this = com.swaas.hidoctor.edetailing.dao.CheckSumLocalDAO;
			_this.clean();
		},
		
		syncGetVerify: function (params){
			if (params.checkSumId != null && params.checkSumId > 0){
				return [{
					corrlId: params.correlationId,
					subDomainName: params.subDomainName,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					checkSumId: params.checkSumId
				}];
			} else {
				return [];
			}
			
		},
		
		updateIds: function(params){
			var dcrHeaders = com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.getAll();
			var counters = {};
			$.each(dcrHeaders, function(i1, header){
				var dcrCode = header.dcrCode;
				var formatedDCRDate = header.dcrActualDate.format("ddmmyyyy");
				var counter = counters[formatedDCRDate];
				if (counter == null){
					counter = {
						doctorCounter: 1,
						inputProductCounter: 1,
						chemitCounter: 1,
						rcpaCounter: 1,
						timesheetCount: 1
					};
					counters[formatedDCRDate] = counter;
				}
				var dcrCodeFormatted = "DCR" + params.userName +  formatedDCRDate;
				com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.update({
					dcrCode: dcrCode,
					dcrCodeFormatted: dcrCodeFormatted
				});
				
				var doctorVisits = com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.getByDcrCode(dcrCode);
				$.each(doctorVisits, function(i2, doctorVisit){
						var doctorVisitCode = doctorVisit.doctorVisitCode;
						var doctorVisitCodeFormatted = "DVC" +(params.userName + formatedDCRDate) + (counter.doctorCounter++);
						com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.update({
							doctorVisitCode: doctorVisitCode,
							dcrCodeFormatted: dcrCodeFormatted,
							doctorVisitCodeFormatted: doctorVisitCodeFormatted
						});
						
						var inputProducts = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.getByVistCode(doctorVisitCode);
						$.each(inputProducts, function(i3, inputProduct){
							var dcrProductCode = inputProduct.dcrProductCode;
							var dcrProductCodeFormatted = "DPC" + (params.userName + formatedDCRDate) + (counter.inputProductCounter++);
							com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.update({
								dcrProductCode: dcrProductCode,
								dcrCodeFormatted: dcrCodeFormatted,
								doctorVisitCodeFormatted: doctorVisitCodeFormatted,
								dcrProductCodeFormatted: dcrProductCodeFormatted
							});
						});
						
						var chemists = com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.getByDocVisitCode(doctorVisitCode);
						$.each(chemists, function(i4, chemist){
							var chemistVisitCode = chemist.chemistVisitCode;
							var chemistVisitCodeFormatted = "CVC" + (params.userName + formatedDCRDate) + (counter.chemitCounter++);
							com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.update({
								chemistVisitCode: chemistVisitCode,
								dcrCodeFormatted: dcrCodeFormatted,
								doctorVisitCodeFormatted: doctorVisitCodeFormatted,
								chemistVisitCodeFormatted: chemistVisitCodeFormatted
							});
							var rcpas = com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.getByChemistVisitCode(chemistVisitCode);
							$.each(rcpas, function(i5, rcpa){
								var dcrRcpaCode = rcpa.dcrRcpaCode;
								var dcrRcpaCodeFormatted = "DRC" + (params.userName + formatedDCRDate) + (counter.rcpaCounter++);
								com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.update({
									dcrRcpaCode: dcrRcpaCode,
									dcrCodeFormatted: dcrCodeFormatted,
									doctorVisitCodeFormatted: doctorVisitCodeFormatted,
									chemistVisitCodeFormatted: chemistVisitCodeFormatted,
									dcrRcpaCodeFormatted: dcrRcpaCodeFormatted
								});
							});
						});
						
						var detailedProducts = com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.getByDoctorVisitCode(doctorVisitCode);
						$.each(detailedProducts, function(i6, detailedProduct){
							com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.update({
								doctorVisitCode: detailedProduct.doctorVisitCode,
								salesProductCode: detailedProduct.salesProductCode,
								dcrCodeFormatted: dcrCodeFormatted,
								doctorVisitCodeFormatted: doctorVisitCodeFormatted
							});
						});
						
						var accompanists = com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.getByVistCode(doctorVisitCode);
						$.each(accompanists, function(i7, accompanist){
							com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.update({
								doctorVisitCode: accompanist.doctorVisitCode,
								accUserName: accompanist.accUserName,
								dcrCodeFormatted: dcrCodeFormatted,
								doctorVisitCodeFormatted: doctorVisitCodeFormatted
							});
						});
				});
				
				var timesheetEntries = com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.getByDCRCode(dcrCode);
				$.each(timesheetEntries, function(i8, timesheetEntry){
					var timeSheetCodeFormatted = "TSC" +(params.userName + formatedDCRDate) + "_" + (counter.timesheetCount++);
					com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.update({
						timeSheetCode: timesheetEntry.timeSheetCode,
						timeSheetCodeFormatted: timeSheetCodeFormatted,
						dcrCodeFormatted: dcrCodeFormatted
					});
				});
			});
		}
};
