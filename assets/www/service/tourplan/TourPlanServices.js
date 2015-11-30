com.swaas.hidoctor.edetailing.service.TourPlanServices = {
		
		_getTPDetails: function(tpHeader){
			var _tpDetails = {};
			_tpDetails["tpheader"] = tpHeader;
			_tpDetails["tpPlaces"] = com.swaas.hidoctor.edetailing.dao.TPSFCLocalDAO.getByTPId(tpHeader.tpId);
			_tpDetails["tpDoctors"] = com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO.getAllByTP(tpHeader.tpId);
			$.each(_tpDetails["tpDoctors"], function(index, tpDoctor){
				var doctor = com.swaas.hidoctor.edetailing.service.DoctorService.getDoctor(tpDoctor.doctorCode,  tpDoctor.doctorRegionCode);
				tpDoctor.doctor = doctor;
			});
			
			return _tpDetails;
		},
		
		getTPDetailsByDates : function(firstDate, lastDate){
			var tpHeader = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.getByDate(firstDate, lastDate);
			var _this = com.swaas.hidoctor.edetailing.service.TourPlanServices;
			var tpDetails = {};
			if(tpHeader != null){
				$.each(tpHeader,  function(i, tpHeaderItem){
					var key='DATE_' + tpHeaderItem.tpDate.getDate();
					tpDetails[key] = _this._getTPDetails(tpHeaderItem);
				});
			}
			return tpDetails;
		},
		getTPHeadersByDates : function(firstDate, lastDate){
			var tpHeadersForCalendar = {};
			var tpHeaderOfMonth = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.getByDate(firstDate, lastDate);
		    if(tpHeaderOfMonth != null){
		    	$.each(tpHeaderOfMonth,  function(i, tpHeaderItem){
					var key='DATE_' + tpHeaderItem.tpDate.getDate();
					tpHeadersForCalendar[key] = tpHeaderItem;
				});
		    	
		    }
			return tpHeadersForCalendar;
		}
	
};