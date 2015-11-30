com.swaas.hidoctor.edetailing.service.AttendanceService = {

	getConfigSettings : function() {
		return com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO.get();
	},
	
	getAllActivity : function() {
		var activities = com.swaas.hidoctor.edetailing.dao.ActivityMasterLocalDAO.getAll();
		return activities;
	},	
		
	getAllExpense : function() {
		var expenses = com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterLocalDAO.getAll();
		return expenses;
	},	
	
	getDCRHeader: function(date, flag, user){
		date = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(date);
		var dcrHeader = com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.getByDateAndFlag(date, flag);
		if (dcrHeader == null) {
			dcrHeader = {
					dcrEnteredDate : new Date(),
					dcrActualDate: date,
					userCode: user.userCode,
					regionCode: user.regionCode,
					flag: flag,
					sourceOfEntry: "Tablet"
			};
		}
		return dcrHeader;
	},
	
	getTimeSheets: function(dcrCode){
		if (dcrCode != null && dcrCode != ""){
			return com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.getByDCRCode(dcrCode);
		} else {
			return [];
		}
	},
		
	saveDCR : function(dcrHeader, timesheetEntries) {
		dcrHeader.flag ="A";
		if (dcrHeader.dcrCode == null || dcrHeader.dcrCode == ""){
			//Save DCR Header
			this._insertDCRHeader(dcrHeader);
		} else {
			this._updateDCRHeader(dcrHeader);
		}
		com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.remove(null);
		
		$.each(timesheetEntries, function(i, timesheetEntry){
			timesheetEntry.timeSheetCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
			timesheetEntry.dcrCode = dcrHeader.dcrCode;
			timesheetEntry.enteredDateTime = new Date();
			com.swaas.hidoctor.edetailing.dao.TimeSheetEntryLocalDAO.insert(timesheetEntry);
		});
		
		
	},
	
	_insertDCRHeader: function(dcrHeader){
		dcrHeader.dcrCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.insert(dcrHeader);
		return dcrHeader.dcrCode;
	},
	
	_updateDCRHeader: function(dcrHeader){
		com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.update(dcrHeader);
		return dcrHeader.dcrCode;
	}
		
};