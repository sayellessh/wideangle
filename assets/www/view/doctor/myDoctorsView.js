com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView = {
		pageScroller : null,
		loadPageScroller: function() {
			com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller = new iScroll('page-main');
		}
};

com.swaas.hidoctor.edetailing.ui.view._MyDoctorsView = {
		_doctorTable: null,
	
		initIntervalID : null,
		tourplanIntervalID : null,
		doctorIntervalID : null	,
		pageScroller: null,
		
		init:function(){	
			console.log("Starting loading theb My Doctors View");
			com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.initIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView._init, 100);
		},
		
		_init : function(){
			console.log("Starting loading theb My Doctors View.......");
			
			clearInterval(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.initIntervalID);
			ED.context.previousPage = "view/doctor/myDoctorsView.html";
			
			var _this = com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView;
			ED.includeNewHeader($("#header"), com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.header, true, false, true, true, false, false, true);
			
			ED.setValue($('#tpForWeekCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);

			ED.setValue($('#doctorTableCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);	
			$('#searchInput').change(function() {
				_this._doctorTable.searchDoctors($("#searchInput").val());
				/*var searchInput = $("#searchInput").val();
				if(searchInput != null){
					_this._doctorTable.searchDoctors($(this).val());
				}*/
	         });
			/*$('#searchButton').click(function() {
				var searchInput = $("#searchInput").val();
				if(searchInput != null){
					_this._doctorTable.searchDoctors(searchInput);
				}
			});*/
			$('#searchForm').on('submit', function(e) {
				var searchInput = $("#searchInput").val();
				if(searchInput != null){
					_this._doctorTable.searchDoctors(searchInput);
				}
				return false;
			});
			$("#singleUserDiv").show();
			$("#multiUserDiv").hide();
			$("#content").show();	
			
			/*$('#home').click(function(e) {
				ED.redirect('view/calendar/calendar.html');
			});*/
			
			var windowHeight = $(document).height();
			var windowNoHeadHeight = windowHeight - $('#header').height();
			$('#page-main').height(windowNoHeadHeight);
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.addEventListener('DOMContentLoaded', function () { setTimeout(function() {
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller = new iScroll('page-main');
			}, 5000); }, false);
			com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller = new iScroll('page-main');
			//$('html').niceScroll();
			//$('#page-main').niceScroll();
			
			com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.tourplanIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView._populateTourPlan, 100);
			
		},
		_populateTourPlan : function(){

			clearInterval(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.tourplanIntervalID);
			
			var today = new Date();
			
			ED.setValue($('#tpForWeekCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.tpWeekCaption);
			
			var tpTable = new TourPlanTable({
	        	containerId : "#tpForWeekTable",
	        	startDate : today,
	    		onDateSelected : function(tpDate, tpDetails){
	    			weeklyTourPlanClicked(tpDate, tpDetails);
	    		}
	        });	
			//tpTable.onDateSelected('', '');
			com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.doctorIntervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView._populateDoctors, 100);
			
						
		},
		
		_populateDoctors : function(){
			
			var _this = com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView;
			clearInterval(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.doctorIntervalID);
			
			var selectedUser = ED.context.request.selectedUser;
			if (selectedUser == null){
				selectedUser = com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine;
			}
			//_this.populateDoctorDetails(selectedUser);
			_this.initializeUsers();
		},
		
		populateDoctorDetails: function(userName){
			var _this = com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView;
			var doctors = null;
			if (userName == null || userName == com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine){
				var me = com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine;
				$("#singleUserDiv").show();
				$("#multiUserDiv").hide();
				//ED.setValue($('#doctorTableCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.doctorTableCaption);			
				doctors = com.swaas.hidoctor.edetailing.service.DoctorService.getDoctorsForCurrentUser();
				if (doctors.length > 0){
					ED.setValue($('#doctorTableCaption'), 
						com.swaas.hidoctor.edetailing.ui.view.Resource.accompanistDoctorsView.doctorTableCaption + me);		
				} else {
					ED.setValue($('#doctorTableCaption'), 
						com.swaas.hidoctor.edetailing.ui.view.Resource.accompanistDoctorsView.noDoctors + me);
				}
				ED.context.accompanistDoctor = "N";
				ED.context.selectedAccompanist = null;// Included for dcr screen getting Accompanist Detail
			} else {
				$("#singleUserDiv").hide();
				$("#multiUserDiv").show();					
				doctors = com.swaas.hidoctor.edetailing.service.DoctorService.getDoctorsForAccompanist(userName);
				if (doctors.length > 0){
					ED.setValue($('#doctorTableCaption'), 
						com.swaas.hidoctor.edetailing.ui.view.Resource.accompanistDoctorsView.doctorTableCaption + userName);		
				} else {
					ED.setValue($('#doctorTableCaption'), 
						com.swaas.hidoctor.edetailing.ui.view.Resource.accompanistDoctorsView.noDoctors + userName);
				}
				ED.context.accompanistDoctor = "Y";
				ED.context.selectedAccompanist = userName;// Included for dcr screen getting Accompanist Detail
			}
			if (_this._doctorTable == null){
				_this._doctorTable = new DoctorTable({
					containerId: "#doctorTable",
					doctors: doctors,
					userName: userName
				});
			} else {
				_this._doctorTable.display(doctors);
			}
			//com.swaas.hidoctor.edetailing.ui.view.DoctorList.init($('#doctorTable'), doctors, 2);
		},
		
		populateDoctorDetailsByTP: function(tpId){
			var _this = com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView;
			//var _this = com.swaas.hidoctor.edetailing.ui.view.TPDoctorsView;
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
				//ED.clearTable($("#doctorTable"));
				ED.removeTableRow($('#doctorTable').find('.tableDoctorRow'));
			}
			com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.refresh();
			//setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.refresh(), 2000);
		},
		
		initializeUsers: function(){
			var selectUserMenu = $("#md-right-panel").find('ul');
			selectUserMenu.find('li.accomp').empty();
			/*var btn = $("<a data-theme='a' data-inline='false' data-mini='false' data-corners='false' style='text-align:left;margin-left:0px!important;margin-right:0px!important;margin-top:0px!important;margin-bottom:0px!important;width:450px' " +
						"onclick=\"$('#selectUserMenu').popup('close');com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.populateDoctorDetails('" + 
									com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine + "');\"><span style='font-size:24px'>" + com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine + "</span></a>");*/
			var btn = $("<li id=\"" +com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine+ "\" class=\"accomp\"><div><a " +
					">" + com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine + "</a></div></li>");
			selectUserMenu.append(btn);
			/*btn.click(function(e) {
				$('.accomp').removeClass('selected');
				$(this).addClass('selected');
				$( "#md-right-panel" ).panel( "close" );
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.populateDoctorDetails(
						com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine);
			});*/
			var accompanists = com.swaas.hidoctor.edetailing.service.UserService.getSelectedAccompanists();
			$.each(accompanists, function(index, accompanist){
				/*btn = $("<br/><a data-theme='a' data-inline='false' data-mini='false' data-corners='false' style='text-align:left;margin-left:0px!important;margin-right:0px!important;margin-top:0px!important;margin-bottom:0px!important;width:450px' " +
						"onclick=\"$('#selectUserMenu').popup('close');com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.populateDoctorDetails('" + 
						accompanist.accompnistName + "');\"><span style='font-size:24px'>" + accompanist.accompnistName + "</span></a>");*/
				var btn = $("<li id=\""+ accompanist.accompnistName +"\" class=\"accomp\"><div><a " +
						">" + accompanist.accompnistName + "</a></div></li>");
				selectUserMenu.append(btn);
			});
			
			selectUserMenu.delegate('li', 'click', function(){
				ED.context.request.selectedUser = $(this).attr('id');
				$('.accomp').removeClass('selected');
				$(this).addClass('selected');
				$( "#md-right-panel" ).panel( "close" );
				//com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.populateDoctorDetails(
						//com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine);
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.populateDoctorDetails($(this).attr('id'));
			});
			/*btn.click(function(e) {
				$('.accomp').removeClass('selected');
				$(this).addClass('selected');
				$( "#md-right-panel" ).panel( "close" );
				//com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.populateDoctorDetails(
						//com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine);
				
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.populateDoctorDetails(accompanist.accompnistName);
			});*/
			//selectUserMenu.navbar();
		},
		
		weeklyTourPlanClicked: function(selectedDate, tpDetails){
			var _this = this;
			//var value = ED.context.dummay.value;
			ED.context.selectedDate = selectedDate;
			if (tpDetails != null && tpDetails["tpheader"] != null){
				/*var params = {
						tpId: tpDetails.tpheader.tpId
				};*/
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.populateDoctorDetailsByTP(tpDetails.tpheader.tpId);
				//ED.redirect('view/doctor/tpDoctorsView.html', params);
				//ED.redirect('view/doctor/myDoctorsView.html', params);
			} else {
				var selectedUser = ED.context.request.selectedUser;
				if (selectedUser == null){
					selectedUser = com.swaas.hidoctor.edetailing.ui.view.Resource.myDoctorsView.mine;
				}
                _this.populateDoctorDetails(selectedUser, true);
            }
		}
};


com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView = createProxy(com.swaas.hidoctor.edetailing.ui.view._MyDoctorsView, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);

function weeklyTourPlanClicked(selectedDate, tpDetails){
	com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.weeklyTourPlanClicked(selectedDate, tpDetails);
}