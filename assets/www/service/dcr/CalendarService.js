com.swaas.hidoctor.edetailing.service.CalendarService = {
	getDCRDetails: function(calendarDate){
		var firstDay = com.swaas.hidoctor.edetailing.util.DateUtil.getFirstDayOfMonth(calendarDate);
		var lastDay = com.swaas.hidoctor.edetailing.util.DateUtil.getLastDayOfMonth(calendarDate);
		var dcrMasters = com.swaas.hidoctor.edetailing.dao.DCRMasterLocalDAO.getByDate(firstDay, lastDay);
		
		
		var dcrDetails = {};
		
		$.each(dcrMasters,  function(index, dcrMaster){
			var key = "DATE_" + dcrMaster.dcrDate.getDate();
			if (dcrDetails[key] == null){
				dcrDetails[key] = [];
			}
			dcrDetails[key].push(dcrMaster);
		});
		return dcrDetails;
	},
getweeklyTPDCRDetails: function(tpCalendarDate){
	var firstDayOfTPWeek = new Date(tpCalendarDate);
 	var lastDayOfTPWeek = com.swaas.hidoctor.edetailing.util.DateUtil.getLastDateOfWeek(firstDayOfTPWeek);
 	var dcrMastersTP = com.swaas.hidoctor.edetailing.dao.DCRMasterLocalDAO.getByDate(firstDayOfTPWeek, lastDayOfTPWeek);
	var dcrDetails = {};
	$.each(dcrMastersTP,  function(index, dcrMaster){
		var key = "DATE_" + dcrMaster.dcrDate.getDate();
		if (dcrDetails[key] == null){
			dcrDetails[key] = [];
		}
		dcrDetails[key].push(dcrMaster);
	});
	return dcrDetails;
}
};