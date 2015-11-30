com.swaas.hidoctor.edetailing.ui.view._TPDoctorsView = {
	
	_doctorTable: null,
	
	initIntervalID : null,
	tourplanIntervalID : null,
	doctorIntervalID : null	,
	init : function() {		
		com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.initIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView._init, 100);
	},
	
	_init : function() {
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.initIntervalID);
		ED.context.previousPage = "view/doctor/tpDoctorsView.html";
		var _this = com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView ;
		ED.includeHeader($("#header"), false, false, true);
		ED.setValue($('#tpForWeekCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);
		
		ED.setValue($('#doctorTableCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);
	
		
		$('#searchInput').change(function() {
			_this._doctorTable.searchDoctors($("#searchInput").val());
         });
		$('#searchButton').click(function() {
			var searchInput = $("#searchInput").val();
			if(searchInput != null){
				_this._doctorTable.searchDoctors(searchInput);
			}
		});
		//var headerHieght = $("#header").height();
		//var clientHeigt = $(window).height();
		//$('#tpForWeekContainer').height(clientHeigt - headerHieght);
		$("#content").show();
		
		com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.tourplanIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView._populateTourPlan, 200);
		
	},
	_populateTourPlan : function () {
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.tourplanIntervalID);
		
		ED.setValue($('#tpForWeekCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.tpDoctorsView.tpWeekCaption);
		
		var today = new Date();
		new TourPlanTable({
        	containerId : "#tpForWeekTable",
        	startDate : today,
    		onDateSelected : function(tpDate, tpDetails){
    			weeklyTourPlanClicked(tpDate, tpDetails);
    		}
        });
		
		com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.doctorIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView._populateDoctors, 200);
	},
	
	_populateDoctors : function(){
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.doctorIntervalID);
		var _this = com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView ;
		
		_this.populateDoctorDetails(ED.context.request.tpId);
		ED.context.accompanistDoctor = "N";
		ED.context.selectedAccompanist = null;// Included for dcr screen getting Accompanist Detail
		_this.initializeUsers();
		
	},
	
	populateDoctorDetails: function(tpId){
		var _this = com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView;
		var doctors = com.swaas.hidoctor.edetailing.service.DoctorService.getDoctorByTP(tpId);
		if(doctors.length > 0){
			ED.setValue($('#doctorTableCaption'),com.swaas.hidoctor.edetailing.ui.view.Resource.tpDoctorsView.doctorTableCaption);
	
			if (_this._doctorTable == null){
				_this._doctorTable = new DoctorTable({
					containerId: "#doctorTable",
					doctors: doctors
				});
			} else {
				_this._doctorTable.display(doctors);
			}
		}else{
			ED.setValue($('#doctorTableCaption'),com.swaas.hidoctor.edetailing.ui.view.Resource.tpDoctorsView.doctorTableCaptionforNoDoctors);	
			ED.clearTable($("#doctorTable"));
		}
	},
	
	gotoMyDoctor: function(userName){
		ED.redirect('view/doctor/myDoctorsView.html', {selectedUser: userName});
	},
	
	initializeUsers: function(){
		var selectUserMenu = $("#selectUserMenu");
		selectUserMenu.empty();
		var btn = $("<a data-theme='a' data-inline='false' data-mini='false' data-corners='false' style='text-align:left;margin-left:0px!important;margin-right:0px!important;margin-top:0px!important;margin-bottom:0px!important;width:450px' " +
					"onclick=\"$('#selectUserMenu').popup('close');com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.gotoMyDoctor('" + 
								com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine + "');\"><span style='font-size:24px'>" + com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine + "</span></a>");
		selectUserMenu.append(btn);
		var accompanists = com.swaas.hidoctor.edetailing.service.UserService.getSelectedAccompanists();
		$.each(accompanists, function(index, accompanist){
			btn = $("<br/><a data-theme='a' data-inline='false' data-mini='false' data-corners='false' style='text-align:left;margin-left:0px!important;margin-right:0px!important;margin-top:0px!important;margin-bottom:0px!important;width:450px' " +
					"onclick=\"$('#selectUserMenu').popup('close');com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.gotoMyDoctor('" + 
					accompanist.accompnistName + "');\"><span style='font-size:24px'>" + accompanist.accompnistName + "</span></a>");
			selectUserMenu.append(btn);
		});
		selectUserMenu.navbar();
	},
	weeklyTourPlanClicked: function(selectedDate, tpDetails){
		//var value = ED.context.dummay.value;//this was given for testing error handling 
		ED.context.selectedDate = selectedDate;
		if (tpDetails != null && tpDetails["tpheader"] != null){
			com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.populateDoctorDetails(tpDetails.tpheader.tpId);
		} else {
			ED.redirect('view/doctor/myDoctorsView.html');
		}
	}
};

com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView = createProxy(com.swaas.hidoctor.edetailing.ui.view._TPDoctorsView, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);

function weeklyTourPlanClicked(selectedDate, tpDetails){
	com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView.weeklyTourPlanClicked(selectedDate, tpDetails);
}