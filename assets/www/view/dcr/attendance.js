com.swaas.hidoctor.edetailing.ui.view._Attendance = {

	
	init : function() {
		
		var _this = com.swaas.hidoctor.edetailing.ui.view.Attendance;
		document.addEventListener('backbutton', function(){
			if (ED.context.previousPage != null){
				if (ED.context.previousPage == "view/eDetailing/eDetailing.html"){
					ED.redirect(ED.context.previousPage, {selectedDoctor: ED.context.previousDoctor});
				} else {
					ED.redirect(ED.context.previousPage);
				}
			} else {
				ED.redirectToHome();
			}
		}, false);
		ED.initializeGeoLocation();
		
		_this.dcrActualDate = ED.context.selectedDate;
		if (_this.dcrActualDate == null){
			_this.dcrActualDate = new Date();
		}
		_this.dcrActualDate = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(_this.dcrActualDate);
	
		var div = $("<div id='loading' style='background-color:white;color:black;width:100px;text-align:center;z-index:9990;display:none'>Loading...</div>");
		$(document.body).append(div);
		div.screenCenter();
		div.show();
		ED.setFooter();
		com.swaas.hidoctor.edetailing.ui.view.Attendance.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Attendance._init, 100);
	},

	_init : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Attendance;
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Attendance.intervalID);
		_this.expenses = com.swaas.hidoctor.edetailing.service.AttendanceService.getAllExpense();
		_this.dcrHeader = com.swaas.hidoctor.edetailing.service.AttendanceService.getDCRHeader(_this.dcrActualDate, "A", ED.context.currentUser);
		_this.dcrHeader.lattitude = ED.latitude;
		_this.dcrHeader.longitude = ED.longitude;
		_this.configDCR = com.swaas.hidoctor.edetailing.service.AttendanceService.getConfigSettings();
		var dateFormat = _this.configDCR.dateDisplayFormat;
		var formatedDate = _this.dcrHeader.dcrActualDate.format(dateFormat);
		$("#dcrDate").text(formatedDate);
	
		_this.activities = com.swaas.hidoctor.edetailing.service.AttendanceService.getAllActivity();
		
		_this.timesheetEntries = com.swaas.hidoctor.edetailing.service.AttendanceService.getTimeSheets(_this.dcrHeader.dcrCode);
		$.each(_this.timesheetEntries,  function(index, timesheet){
			_this.displayTimesheet(timesheet);
		});
		
		ED.setValue($("#startTime"), _this.dcrHeader.startTime);
		$("#startTime").change(function(e){
			_this.dcrHeader.startTime = this.value;
		});
		
		
		ED.setValue($("#endTime"), _this.dcrHeader.endTime);
		$("#endTime").change(function(e){
			_this.dcrHeader.endTime = this.value;
		});
		_this.addNew();
		$("#loading").hide();
	},
	
	displayTimesheet : function(timesheet){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Attendance;
		var tr = $("<tr style='background-color: #333233;' id='" + com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID() + "'/>");
		$("#timesheetTable").append(tr);
		tr.data("timesheet", timesheet);
		var td1 = $("<td >");
		tr.append(td1);
		var selectActivity = $("<select data-corners='false'   data-theme='b'></select>");
		td1.append(selectActivity);
		var option = $("<option value=''></option>");
		selectActivity.append(option);
		option.data("activity", {});
	
		$.each(_this.activities, function(index, activity) {
			var selected = "";
			if (timesheet.activityCode ==  activity.activityCode){
				selected = "selected";
			}
			option = $("<option " + selected + " value='" + activity.activityCode + "'>"
					+ activity.activityName
					+ "</option>");
			selectActivity.append(option);
			option.data("activity", activity);
		});
		
		selectActivity.selectmenu();
		selectActivity.change(function (){
			var selectedActivity = $(selectActivity.find('option')[this.selectedIndex]).data('activity');
			timesheet.activityCode = selectedActivity.activityCode;
			timesheet.projectCode = selectedActivity.projectCode;
			timesheet.activityName = selectedActivity.activityName;
			_this.addNew(tr);
		});
		
		var td2 = $("<td />");
		tr.append(td2);
		var div1 = $('<div class="ui-input-datebox ui-corner-all ui-body-b" style="border: none;"></div>');
		var div = $('<div class="ui-input-datebox ui-corner-all ui-body-b" style="border: none;background-color:#F3F3F3"/>');
		div1.append(div);
		var startTime = $('<input type="text" data-role="datebox" style="display:none" data-options=\'{"mode": "timebox"}\' data-theme="b"/>');
		td2.append(div);
		div.append(startTime);
		startTime.datebox();
		ED.setValue(startTime, timesheet.startTime);
		startTime.change(function (){
			timesheet.startTime = this.value;
			_this.addNew(tr);
		});
		
		var td3 = $("<td />");
		tr.append(td3);
		var div1 = $('<div class="ui-input-datebox ui-corner-all ui-body-b" style="border: none;"></div>');
		var div = $('<div class="ui-input-datebox ui-corner-all ui-body-b" style="border: none;background-color:#F3F3F3"/>');
		div1.append(div);
		var endTime = $('<input type="text" data-role="datebox" style="display:none" data-options=\'{"mode": "timebox"}\' data-theme="b"/>');
		td3.append(div);
		div.append(endTime);
		endTime.datebox();
		ED.setValue(endTime, timesheet.endTime);
		endTime.change(function (){
			timesheet.endTime = this.value;
			_this.addNew(tr);
		});
	
		
		var td4 = $("<td >");
		tr.append(td4);
		var remark = $("<input type='text' style='width:95%;height:36px'/>");
		td4.append(remark);
		ED.setValue(remark, timesheet.remarks);
		remark.change(function (){
			timesheet.remarks = this.value;
			_this.addNew(tr);
		});
		
		var td5 = $("<td >");
		tr.append(td5);
		var deleteButton = $('<button data-mini="true" data-theme="a" ><span style="color:black">X</span></button>');
		deleteButton.click(function(e){
			if (confirm("Do you want to delete the Attendance details?") == true){
				var currentIndex = 0;
				var trs = $("#timesheetTable").find('tr');
				$.each(trs, function(index, currentTr){
					if ($(currentTr).attr('id') == tr.attr('id')){
						currentIndex = index;
					}
				});	
				if (currentIndex > 0 && currentIndex < (trs.length -1)) {
					$(trs[currentIndex]).remove();
					_this.timesheetEntries.splice(currentIndex-1, 1);
				}
			}	
			return false;
			
		});
		td5.append(deleteButton);
	},
	
	addNew: function(tr){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Attendance;

		var currentIndex = 0;
		var trs = $("#timesheetTable").find('tr');
		if (tr != null){
			$.each(trs, function(index, currentTr){
				if ($(currentTr).attr('id') == tr.attr('id')){
					currentIndex = index;
				}
			});			
		} else {
			currentIndex = trs.length-1;
		}
		currentIndex++;
		if(currentIndex == trs.length){
			var timeSheetEntry = {};
			_this.timesheetEntries.push(timeSheetEntry);
			timeSheetEntry.dcrCode = _this.dcrHeader.dcrCode;			
			_this.displayTimesheet(timeSheetEntry);
		}		
	},
	
	onSave : function() {	
		var _this = com.swaas.hidoctor.edetailing.ui.view.Attendance;
		var startTimeEntered = false;
		if ((_this.dcrHeader.startTime != null && _this.dcrHeader.startTime != "")){
			startTimeEntered = true;
		} else {
			alert("Please enter start time");
			return false;
		}
		
		var endTimeEntered = false;
		
		if ((_this.dcrHeader.endTime != null && _this.dcrHeader.endTime != "")){
			endTimeEntered = true;
		} else {
			alert("Please enter end time");
			return false;
		}

		if (startTimeEntered != endTimeEntered){
			alert("Enter both start and end time");
			return false;
		}
		
		if (startTimeEntered  == true && endTimeEntered == true){
			var today = new Date();
			var hour = _this.dcrHeader.startTime.split(':')[0];
			var minute = _this.dcrHeader.startTime.split(':')[1].split(" ")[0];
			var meridian = _this.dcrHeader.startTime.split(':')[1].split(" ")[1];
			var date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (hour%12) + (meridian == 'PM' ? 12 : 0), minute, 0);
			var startDate = date.getTime() + "";
			
			hour = _this.dcrHeader.endTime.split(':')[0];
			minute = _this.dcrHeader.endTime.split(':')[1].split(" ")[0];
			meridian = _this.dcrHeader.endTime.split(':')[1].split(" ")[1];
			date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (hour%12) + (meridian == 'PM' ? 12 : 0), minute, 0);
			var endDate = date.getTime() + "";
			
			if ((startDate >= endDate)){
				alert("Start time should be less than the End time");
				return false;
			}
		}
		var timeSheetEntries = [];
		var valid = true;
		var overlap = false;
		$.each(_this.timesheetEntries, function(index, timesheetEntry){
			if (timesheetEntry.activityCode != null && timesheetEntry.activityCode != ""){
				if (timesheetEntry.startTime == null || timesheetEntry.startTime == ""){
					alert("Please enter the start time");
					valid = false;
					return false;
				}
				if (timesheetEntry.endTime == null || timesheetEntry.endTime == ""){
					alert("Please enter the end time");
					valid = false;
					return false;
				}
				if((timesheetEntry.startTime != null || timesheetEntry.startTime != "") && (timesheetEntry.endTime != null || timesheetEntry.endTime != "")){					
					var today = new Date();
					var hour = timesheetEntry.startTime.split(':')[0];
					var minute = timesheetEntry.startTime.split(':')[1].split(" ")[0];
					var meridian = timesheetEntry.startTime.split(':')[1].split(" ")[1];
					var date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (hour%12) + (meridian == 'PM' ? 12 : 0), minute, 0);
					var startDate = date.getTime() + "";
					
					hour = timesheetEntry.endTime.split(':')[0];
					minute = timesheetEntry.endTime.split(':')[1].split(" ")[0];
					meridian = timesheetEntry.endTime.split(':')[1].split(" ")[1];
					date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (hour%12) + (meridian == 'PM' ? 12 : 0), minute, 0);
					var endDate = date.getTime() + "";
					
					if (startDate >= endDate){
						var activityName = (typeof timesheetEntry.activityName == "undefined" || timesheetEntry.activityName == null) ? "" : ": "+timesheetEntry.activityName;
						alert("End time should be greater than start time for the activity "+activityName);
						valid = false;
						return;
					}
				}
				var remarkByUser = timesheetEntry.remarks;
				if(remarkByUser != null && remarkByUser != "" && (typeof remarkByUser != undefined) 
						&& _this.configDCR.restrictedSpecialCharacters != null && _this.configDCR.restrictedSpecialCharacters != ""){
					var length = _this.configDCR.restrictedSpecialCharacters.length - 1;
					while (length >= 0) {
						var specialChar = _this.configDCR.restrictedSpecialCharacters.charAt(length);
						if(remarkByUser.indexOf(specialChar) >= 0){
							alert("Special character "+ specialChar +" is not allowed in Remark. Please remove the special character");
							valid = false;
							return;
						}
						length--;
					}
				}

				timeSheetEntries.push(timesheetEntry);
			}
		});
		
		if (valid == false){
			return;
		}
		
		for ( var i = 0; i < timeSheetEntries.length; i++) {
			for ( var j = 0; j < i; j++) {
				var today = new Date();
				var hour = timeSheetEntries[i].startTime.split(':')[0];
				var minute = timeSheetEntries[i].startTime.split(':')[1].split(" ")[0];
				var meridian = timeSheetEntries[i].startTime.split(':')[1].split(" ")[1];
				var startTime1 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (hour%12) + (meridian == 'PM' ? 12 : 0), minute, 0).getTime() + "";

				hour = timeSheetEntries[j].startTime.split(':')[0];
				minute = timeSheetEntries[j].startTime.split(':')[1].split(" ")[0];
				meridian = timeSheetEntries[j].startTime.split(':')[1].split(" ")[1];
				var startTime2 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (hour%12) + (meridian == 'PM' ? 12 : 0), minute, 0).getTime() + "";
				
				hour = timeSheetEntries[i].endTime.split(':')[0];
				minute = timeSheetEntries[i].endTime.split(':')[1].split(" ")[0];
				meridian = timeSheetEntries[i].endTime.split(':')[1].split(" ")[1];
				var endTime1 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (hour%12) + (meridian == 'PM' ? 12 : 0), minute, 0).getTime() + "";

				hour = timeSheetEntries[j].endTime.split(':')[0];
				minute = timeSheetEntries[j].endTime.split(':')[1].split(" ")[0];
				meridian = timeSheetEntries[j].endTime.split(':')[1].split(" ")[1];
				var endTime2 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (hour%12) + (meridian == 'PM' ? 12 : 0), minute, 0).getTime() + "";
				
				if((startTime1 < endTime2) && (startTime2 < endTime1)) {
					overlap = true;
				}
			}
		}
		if (overlap) {
			alert("Start time and End time of activities should not overlap");
			valid = false;
			return false;
		}

		if (valid == false){
			return;
		}
		
		if (timeSheetEntries.length == 0){
			alert("Please enter atleast one activity");
			return;
		}
		_this.timeSheetEntries = timeSheetEntries;
		var div = $("<div id='saving' style='background-color:white;color:black;width:100px;text-align:center;z-index:9990;display:none'>Saving...</div>");
		$(document.body).append(div);
		div.screenCenter();
		div.show();
		setTimeout(_this.saveDCR, 100);
	},
	
	saveDCR: function(){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Attendance;
		_this.dcrHeader.lattitude = ED.latitude;
		_this.dcrHeader.longitude = ED.longitude;
		com.swaas.hidoctor.edetailing.service.AttendanceService.saveDCR(_this.dcrHeader, _this.timeSheetEntries);
		ED.redirect("view/dcr/attendance.html");
	},
	getTimePickerDate : function(timePicker) {
		if(timePicker == null || typeof timePicker == "undefined") {
			return "";
		}else {
			var today = new Date();
			var hour = timePicker.split(':')[0];
			var minute = timePicker.split(':')[1].split(" ")[0];
			var meridian = timePicker.split(':')[1].split(" ")[1];
			hour = (hour%12) + (meridian == 'PM' ? 12 : 0);
			var date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, 0);
			return date.getTime() + "";
		}
	}

	
	
};


com.swaas.hidoctor.edetailing.ui.view.Attendance = createProxy(
		com.swaas.hidoctor.edetailing.ui.view._Attendance,
		com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);


//com.swaas.hidoctor.edetailing.ui.view.Attendance = com.swaas.hidoctor.edetailing.ui.view._Attendance;