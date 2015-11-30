com.swaas.hidoctor.edetailing.ui.view.WeeklyTourPlanner = {
		
		dateUtil: com.swaas.hidoctor.edetailing.util.DateUtil,
		tpDetailsOfweek: null,
		tpTable: null,
		tpDate: null,
		tpWeekStartDate: null,
		tpWeekEndDate: null,
		syncNoOfDays: null,
		
		init : function(tpTable, tpDate) {
			this.showTPOfweek(tpTable, tpDate);
		},
		
		showTPOfweek : function(tpTable, tpDate){
			ED.clearTable(tpTable);
			this.syncNoOfDays = 7; //TODO get SYNC_NO_OF_DAYS from configuration
			this.tpWeekStartDate = this.dateUtil.scrapTime(tpDate);
			this.tpWeekEndDate = com.swaas.hidoctor.edetailing.util.DateUtil.addDays(this.tpWeekStartDate, this.syncNoOfDays); 
			this.tpDetailsOfweek = com.swaas.hidoctor.edetailing.service.TourPlanServices.getTPDetailsByDates(this.tpWeekStartDate, this.tpWeekEndDate);
			var selectedRowString = ED.parameters.selectedRow;
			var selectedRow = 0;
			if (selectedRowString != null && selectedRowString != ""){
				selectedRow = parseInt(selectedRowString);
			}
			this.tpTable = tpTable;
			this.tpDate = tpDate;
			this.pupulateWeeklyTourPlan(selectedRow);
		},
		
		pupulateWeeklyTourPlan: function(selectedRow){
			ED.clearTable(this.tpTable);
			var dateCounter = this.dateUtil.scrapTime(this.tpDate);
			var rows='';
			for(var i=0; i<this.syncNoOfDays; i++){
				var row=null;
				if(i==selectedRow){
					backgroundColor='bgcolor="#306EFF"';
					tpTableClass='class="topRowTable"';
					TPDayClass='class="weeklytpFirstDay"';
					TPDateClass='class="weeklytpFirstDate"';
					TPMonthYearClass='class="weeklyTPFirstMonthYear"';
					TPTopMainTableClass=' class="tpRowTable"';
				}else{
					backgroundColor='bgcolor="#5589CA"';
					tpTableClass='class="tpCommonRowTable"';
					TPDayClass='class="weeklyTPDay"';
					TPDateClass='class="weeklyTPDate"';
					TPMonthYearClass='class="weeklyTPMonthYear"';
					TPTopMainTableClass=' class="tpCommonTable"';
				}
		
				var tpFromTo='';
				var tpDayStatus='';
				var tpCPName='';
				var numberOfDoctors='';
				var trOnClick = '';
			
				var key = "DATE_" + dateCounter.getDate();
				var tpDetailsOfDay = this.tpDetailsOfweek[key];
				
				if (tpDetailsOfDay != null && tpDetailsOfDay["tpheader"] != null){
					var tpHeaderOfDay = tpDetailsOfDay["tpheader"];
					if (tpHeaderOfDay != null){
						if (tpHeaderOfDay.callObjective != null){
							tpDayStatus = "TP - " + tpHeaderOfDay.callObjective;
						}
						if(tpHeaderOfDay.cpName != null && tpHeaderOfDay.cpName != ''){
							tpCPName = 'CP: ' + tpHeaderOfDay.cpName;
						}
						if(tpHeaderOfDay.workPlace != null && tpHeaderOfDay.workCategoryName != null && tpHeaderOfDay.workPlace !='' && tpHeaderOfDay.workCategoryName !=''){
							tpFromTo = tpHeaderOfDay.workPlace + " | " + tpHeaderOfDay.workCategoryName + "<br/>";
						}
					}
					
					var places = tpDetailsOfDay["tpPlaces"];
					if(places != null){
						$.each(places, function(i, place){
							tpFromTo += (place.fromPlace + ' - ' + place.toPlace + '<br/>');
						});
					}
					
					var doctors=tpDetailsOfDay["tpDoctors"];
					if (doctors != null &&  doctors.length > 0){
						var resource = com.swaas.hidoctor.edetailing.ui.view.Resource;
						numberOfDoctors = resource.tpDeails.doctorCovered + doctors.length + ' ' + resource.tpDeails.covered;
						trOnClick = "onclick='com.swaas.hidoctor.edetailing.ui.view.WeeklyTourPlanner.weeklyTourPlanClicked(\"" + tpHeaderOfDay.tpId + "\", " + i + ");'";
					}
		
				} else {
					tpDayStatus=com.swaas.hidoctor.edetailing.ui.view.Resource.tpDeails.noTPAvailabe;
				}
	
				row += '<tr ' + trOnClick + '><td width="100%" >';
				row +='<table width="100%" cellspacing="0" cellpadding="0" '+tpTableClass+'> ';
				row +='<tr><td width="40%"  >';
				row +='<table cellspacing="0" cellpadding="0" width="100%" ><tr><td ><div '+TPDayClass+'>'+dateCounter.format('dddd')+'</div></td></tr><tr><td><div '+TPDateClass+'>'+dateCounter.getDate()+'</div></td></tr><tr><td><div '+TPMonthYearClass+'>'+dateCounter.format('mmm - yyyy')+'</div></td></tr></table>';
				row +='</td><td bgcolor="#000000" >';
				row += '<table cellspacing="0" cellpadding="0"  width="100%" class="tpRightCell" ><tr><td><div class="weeklyTPDateStatus"> '+tpDayStatus+'</div></td></tr><tr><td><div class="weeklyTPFromPlace">'+tpFromTo+'</div></td></tr><tr><td><div class="weeklyTP_CPName">'+tpCPName+' </div></td></tr><tr><td><div class="weeklyTPDoctorCoverd">'+numberOfDoctors+' </div></td></tr></table>';
				row +='</td></tr>';
				row +='</table>';
				row +='</td></tr>';
				rows +=row;
				
				dateCounter.setDate(dateCounter.getDate()+1);
			}
			this.tpTable.append(rows);			
		},
		
		weeklyTourPlanClicked: function(tpId, selectedRow){
			this.pupulateWeeklyTourPlan(selectedRow);
			weeklyTourPlanClicked(tpId, selectedRow);
		},
		
		populateTourPlanComponent : function(){
			var allTPDetailsOfWeek = this.tpDetailsOfweek;
			   var tpTable = new TourPlanTable({
		        	containerId : "#tourPlanTable",
		        	startDate : new Date(),
		    		syncNoOfDays : 7,
		    		tpDetailsOfweek : allTPDetailsOfWeek,
		    		onDateSelected : function(selecteddate){
		    			alert('mainPage date : '+selecteddate.getDate());
		    		}
		        });
		}
};