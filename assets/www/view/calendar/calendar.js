com.swaas.hidoctor.edetailing.ui.view._Calendar = {
		
		initIntervalID : null,
		autoCheckIntervalID: null,
		tourPlanInternalID : null,
		calendarInternalId : null,
		
		dateUtil: com.swaas.hidoctor.edetailing.util.DateUtil,
		
		init: function() {
			var _this = this;
			ED.pageContext.pageName = com.swaas.hidoctor.edetailing.ui.view.Resource.calendar.calendarCaption;
			
			ED.includeNewHeader($("#header"), com.swaas.hidoctor.edetailing.ui.view.Resource.calendar.calendarCaption, true, true, false, true, true, true, true);
			
			var windowHeight = $(document).height();
			var windowNoHeadHeight = windowHeight - $('#header').height();
			$('#content').height(windowNoHeadHeight - 100);
			$('#content').css('padding-top', '100px');
			$('#settingsList').height(windowHeight);
			
			com.swaas.hidoctor.edetailing.ui.view.Calendar.initIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.Calendar._initPage, 50);
			console.log("Init done..");
		},
		
		_initPage : function(){
			clearInterval(com.swaas.hidoctor.edetailing.ui.view.Calendar.initIntervalID);
			
			//ED.includeHeader($("#header"));
			/*$('#menuListTable').height($(document).height() - 75);
			$('#settingsList').height($(document).height() - 25);*/
			/*var headerHieght = $("#header").height();
			$("#calendarTable").css("height", ((window.innerHeight - headerHieght)*.9) +"px");
			ED.setValue($('#calendarCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);
			ED.setValue($('#tpForWeekCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);*/
			
			$('#tourPlanTd').click(function(e) {
				ED.redirect('view/doctor/myDoctorsView.html');
			});
			
			$('#dcrTd').click(function(e) {
				ED.redirect("view/dcr/dcrNew.html");
			});
			
			$('#calAssets').click(function(e) {
				ED.redirect("view/downloadedocument/downloadEDocument.html");
			});
			
			ED.context.request.noBack = true;
			
			var leftPanelElems = '<li id="prepareMyTableBtn">';
			leftPanelElems += '<table>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<img src="../../hidoctor/images/prepareMyTablet.png"/>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<div>' + com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.prapareMyTabletCaption + '</div>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '</table>';
			leftPanelElems += '</li>';
			
			leftPanelElems += '<li id="downloadBtn">';
			leftPanelElems += '<table>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<img src="../../hidoctor/images/download.png"/>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<div>' + com.swaas.hidoctor.edetailing.ui.view.Resource.download.header + '</div>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '</table>';
			leftPanelElems += '</li>';
			
			leftPanelElems += '<li id="makeSpaceBtn">';
			leftPanelElems += '<table>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<img src="../../hidoctor/images/makeSpace.png"/>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<div>' + com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.header + '</div>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '</table>';
			leftPanelElems += '</li>';
			
			leftPanelElems += '<li id="updateHiDoctorBtn">';
			leftPanelElems += '<table>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<img src="../../hidoctor/images/prepareMyTablet.png"/>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<div>' + com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.sendDataToHiDoctorCaption + '</div>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '</table>';
			leftPanelElems += '</li>';
			
			leftPanelElems += '<li id="eraseBtn">';
			leftPanelElems += '<table>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<img src="../../hidoctor/images/eraseAndClean.png"/>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<div>' + com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.eraseAndCleanCaption + '</div>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '</table>';
			leftPanelElems += '</li>';
			
			leftPanelElems += '<li id="upsyncDCRBtn">';
			leftPanelElems += '<table>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<img src="../../hidoctor/images/syncUp.png"/>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<div>' + com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.upSyncDCR + '</div>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '</table>';
			leftPanelElems += '</li>';
			
			leftPanelElems += '<li id="upgradeApkBtn">';
			leftPanelElems += '<table>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<img src="../../hidoctor/images/syncUp.png"/>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '<tr><td>';
			leftPanelElems += '<div>' + com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.upgradeApk + '</div>';
			leftPanelElems += '</td></tr>';
			leftPanelElems += '</table>';
			leftPanelElems += '</li>';
			
			var isErrorPushRequired = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getErrorPushRequired();
			if(isErrorPushRequired){
				leftPanelElems += '<li id="errorLogBtn">';
				leftPanelElems += '<table>';
				leftPanelElems += '<tr><td>';
				leftPanelElems += '<img src="../../hidoctor/images/error.png"/>';
				leftPanelElems += '</td></tr>';
				leftPanelElems += '<tr><td>';
				leftPanelElems += '<div>' + com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.errorLog + '</div>';
				leftPanelElems += '</td></tr>';
				leftPanelElems += '</table>';
				leftPanelElems += '</li>';
				//ED.submitErrors();
				
			}
			var settingsList = $('#settingsList');
			if(settingsList.length > 0) {
				settingsList.empty().append(leftPanelElems);
			}
			
			var user = ED.context.currentUser;
			var userInfo1 = user.userName + " | " + user.userTypeName;
			var userInfo2 = user.regionName;
			
			var footerObject = $('#footerBody');
			if(footerObject.length > 0) {
				footerObject.empty().append(userInfo1 + '<br />');
				footerObject.append(userInfo2);
			}
			
			footerObject.append('<span style="position: absolute; float: right; display: block; color: green; background-color: red; border: 1px solid white;">1</span>');
			//$('#left-panel').removeClass('ui-body-c');
			//$('#canledarPage').height($(document).height()*.8);
			$("#prepareMyTableBtn").click(function(){
				//$("#settingsPopupMenu").popup("close");
				//alert('hi');
				var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
				if(isConnected){
					var syncDiv = com.swaas.hidoctor.edetailing.ui.view.CoreView.getConfirmPrepareMyTablet($('#syncConfirmationDiv'));
				
				
				}else{
					alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
					return;
				}
			});
			$("#downloadBtn").click(function(){
				$("#settingsPopupMenu").popup("close");
				ED.redirect("view/downloadedocument/downloadEDocument.html");
			});

			$("#eraseBtn").click(function(){
				$("#settingsPopupMenu").popup("close");
				var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
				var eraseCleanDiv = com.swaas.hidoctor.edetailing.ui.view.CoreView.getConfirmEraseAndClean($('#eraseconfirmationDiv'), isConnected);
				
				$('#upSynchData').click(function(){
					eraseCleanDiv.hide();
					ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "eraseAndClean", "nonDCRSync" : true, "dcrSync": true});	
					
				});
				$('#yesToEraseClean').click(function(){
					eraseCleanDiv.hide();
					ED.redirect("view/eraseAndClean/eraseAndClean.html");
					
				});
				$('#noToEraseClean').click(function(){
					eraseCleanDiv.hide();
				});

			});
			
			$("#makeSpaceBtn").click(function(){
				$("#settingsPopupMenu").popup("close");
				ED.redirect("view/makespace/makespace.html");
			});
			
			$("#updateHiDoctorBtn").click(function(){
				$("#settingsPopupMenu").popup("close");
				var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
				if(isConnected){
					var availabeDetail = ED.isNewVersionAvailable();
						
					if(availabeDetail.isNewAvailabe == true){
						//alert(com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeMessage);
						var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
						if(isConnected){
							if(ED.upgradeAPK(true)){
								return;
							}
						}
						return;
					}
					ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "settingsSync", "nonDCRSync" : true, "dcrSync": false});
				} else {
					alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
					return;
				}
			});
			$("#upsyncDCRBtn").click(function(){
				$("#settingsPopupMenu").popup("close");
				var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
				if(!isConnected){
					alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
					return;
				}
				var availabeDetail = ED.isNewVersionAvailable();
				
				if(availabeDetail.isNewAvailabe == true){
					//alert(com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeMessage);
					var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
					if(isConnected){
						if(ED.upgradeAPK(true)){
							return;
						}
					}
					return;
				}
				var syncDataDiv = com.swaas.hidoctor.edetailing.ui.view.CoreView.getConfirmDCRUpsync($('#eraseconfirmationDiv'));
				$('#upSynchData').click(function(){
					syncDataDiv.hide();
					var result = ED.checkDCRData();
					if(result == true){
						ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "dcrUpSync", "nonDCRSync" : false, "dcrSync": true});
					} else {
						alert(com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.noDCR); 
					}
				});
				$('#yesToEraseClean').click(function(){
					syncDataDiv.hide();
					ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "dcrUpSync", "nonDCRSync" : false, "dcrSync": true});				
				});
				$('#noToEraseClean').click(function(){
					syncDataDiv.hide();
				});
			});
			
			$("#makeSpaceBtn").click(function(){
				$("#settingsPopupMenu").popup("close");
				ED.redirect("view/makespace/makespace.html");
			});
			
			$("#upgradeApkBtn").click(function(){
				ED.upgradeAPK(false);
			});
			
			$("#errorLogBtn").click(function(){
				ED.submitErrors();
			});
			
			setTimeout(function() {
				var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
				if(isConnected){
					if(ED.upgradeAPK(true)){
						return;
					}
				}
			}, 5000);
			//com.swaas.hidoctor.edetailing.ui.view.Calendar.calendarInternalId = setInterval(com.swaas.hidoctor.edetailing.ui.view.Calendar._populateCalender, 300);
		},
		
		/*_populateTourPlan : function(){
			clearInterval(com.swaas.hidoctor.edetailing.ui.view.Calendar.tourPlanInternalID);
			var today = new Date();
			
			new TourPlanTable({
	        	containerId : "#tpForWeekTable",
	        	startDate : today,
	        	doctorChartRequired: false,
	    		onDateSelected : function(tpDate, tpDetails) {
	    			com.swaas.hidoctor.edetailing.ui.view.Calendar.weeklyTourPlanClicked(tpDate, tpDetails);
	    		}
	        });	
			ED.setValue($('#tpForWeekCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.calendar.tpWeekCaption);			
		},
		
		_populateCalender : function(){
			clearInterval(com.swaas.hidoctor.edetailing.ui.view.Calendar.calendarInternalId);
			
			var today = new Date();
			com.swaas.hidoctor.edetailing.ui.view.Calendar.showCalendar($('#calendarTable'), today);
			com.swaas.hidoctor.edetailing.ui.view.Calendar.tourPlanInternalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.Calendar._populateTourPlan, 300);
		},

		showCalendar : function (calendarTable, calendarDate){
				
			 	var dcrDetails = com.swaas.hidoctor.edetailing.service.CalendarService.getDCRDetails(calendarDate);
			 	
			 	var firstDayOfMonth = com.swaas.hidoctor.edetailing.util.DateUtil.getFirstDayOfMonth(calendarDate);
				var lastDayOfMonth = com.swaas.hidoctor.edetailing.util.DateUtil.getLastDayOfMonth(calendarDate);
		        
				var tpDetailsOfMonth = com.swaas.hidoctor.edetailing.service.TourPlanServices.getTPHeadersByDates(firstDayOfMonth,lastDayOfMonth); 
				var firstWeekDayOfMonth = this.dateUtil.getFirstWeekday(calendarDate);
		        // Note Sunday is displayed in the end
		        if(firstWeekDayOfMonth==0){
		        	firstWeekDayOfMonth=7;
	        	}
		        var monthSize =  this.dateUtil.getMonthSize(calendarDate);
		        var dateCounter = this.dateUtil.getFirstDayOfMonth(calendarDate);
		        var rows = "";
		        
		        var numberOfCells = 35;
		        if ((firstWeekDayOfMonth + monthSize) > 35){
		        	numberOfCells = 42;
		        }
		        for(var index = 0; index < numberOfCells; index++){
		        	var row = "";
		        	if (index % 7 == 0) {
	    				if (index == 0) {
	    					row = '<tr>';
	    				} else {
	    					row = '</tr><tr>';
	    				}
		        	}
		        	if (index >= firstWeekDayOfMonth && index < firstWeekDayOfMonth + monthSize){
		        		// show calendar of the day and increament the date counter
		        		
		        		var backgroundColor = "";
		        		if (this.dateUtil.isToday(dateCounter)){
		        			backgroundColor = 'bgcolor="red"';
		        		} else {
		        			backgroundColor = 'bgcolor="white"';
		        		}
		        		
		        		
		        		var key = "DATE_" + dateCounter.getDate();
		        		var dcrDetail = dcrDetails[key];
		        		var dayStatus = "";
		        		if (dcrDetail != null && dcrDetail.length > 0){
		        			$.each(dcrDetail,  function(i, dcrDetailItem){
		        				dayStatus += dcrDetailItem.flag+'-'+dcrDetailItem.status + "<br/>";
		        			});
		        		}
		        		
		        		var tpHeaderDetail=tpDetailsOfMonth[key];
		        		var tpCallObjective='';
		        		if(tpHeaderDetail != null){
		        			tpCallObjective = '<br/>TP - '+tpHeaderDetail.callObjective;		        			
		        		}
		        		//var dayStatus = "TP-Field";
		        				        		
	        			 row += '<td ' + backgroundColor + ' width="' + (100/7) + '%" >';           
		                 row += '<table cellspacing="0" cellpadding="0" border="0" class="contentTable" style="background-color: white;" >';
		                 row += '<tr ><td class="leftCellPart" ' + backgroundColor + ' nowrap >';
                		 row += '<table cellspacing="0" cellpadding="0"  class="leftCellTable"> ';
                		 row += '<tr><td><div id="calendarDay">'+dateCounter.format('ddd')+'</div></td></tr><tr><td><div id="calendarDate">'+(dateCounter.getDate()<10?"0":"") + dateCounter.getDate()+'</div></td></tr><tr><td><div id="calendarMonthYear">'+dateCounter.format('mmm yyyy')+'</div></td></tr></table>';
                	     row += '</td><td valign="middle" align="right"><div class="dayStatus">'+dayStatus+tpCallObjective+'<div></td></tr>';
		                 row += '</table>';
		                 row +='</td>';
		        		
		        		dateCounter.setDate(dateCounter.getDate()+1);
		        	} else {
		        		// show empty
		        		row += '<td  bgcolor="#000000">&nbsp;';           
	    	            row += '</td>';
		        	}	
		        	rows += row;
		        }
		        rows += '</tr>';
		        calendarTable.append(rows);
		        
		        ED.setValue($('#calendarCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.calendar.calendarMonthCaption +
						calendarDate.format('mmmm - yyyy'));

		},
		weeklyTourPlanClicked: function(selectedDate, tpDetails){
			//var value = ED.context.dummay.value;//this was given for testing of error handling
			ED.context.selectedDate = selectedDate;
		
			if (tpDetails != null && typeof tpDetails != 'undefined' ){
				var params = {
							tpId: tpDetails["tpheader"].tpId
					         };
					ED.redirect('view/doctor/tpDoctorsView.html', params);
				}else {
				ED.redirect('view/doctor/myDoctorsView.html');
			}
		}*/
};
function weeklyTourPlanClicked(selectedDate, tpDetails){
	com.swaas.hidoctor.edetailing.ui.view.Calendar.weeklyTourPlanClicked(selectedDate, tpDetails);
}
com.swaas.hidoctor.edetailing.ui.view.Calendar = createProxy(com.swaas.hidoctor.edetailing.ui.view._Calendar, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);