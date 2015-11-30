function TourPlanTable(options) {
	this.settings = $.extend({
		style : "tpNormalRow",
		selectedStyle : "tpSelectedRow",
		onDateSelected : function(selectedDate, tpDetails) {
			alert("Date Selected"+selectedDate.getDate());
		},
		isDiv : false,
		tpDetailsOfweek :null,
		startDate : null,
		syncNoOfDays : 0,
		dateCounter : null,
		doctorChartRequired: true
	}, options);

	this.tourplanTable = null;
	this.previousSelectedRow = null;
	this.previousSelectedTable = null;
	this.dateUtil = com.swaas.hidoctor.edetailing.util.DateUtil;
	this._init();
	this.display();
}

TourPlanTable.prototype._init = function() {
	if (this.settings.isDiv) {

		this.tourplanTable = $("<ul />").appendTo(
				$(this.settings.containerId));

	} else {

		this.tourplanTable = $(this.settings.containerId);
	}
	
	if (this.settings.syncNoOfDays == 0){
		var configuration =  com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
		this.settings.syncNoOfDays = configuration.syncNoOfDays;
	}
	
	this.settings.startDate = this.dateUtil.scrapTime(this.settings.startDate);
	if (this.settings.tpDetailsOfweek == null){
		var tpWeekEndDate = com.swaas.hidoctor.edetailing.util.DateUtil.addDays(this.settings.startDate, this.settings.syncNoOfDays); 
		this.settings.tpDetailsOfweek = com.swaas.hidoctor.edetailing.service.TourPlanServices.getTPDetailsByDates(this.settings.startDate, tpWeekEndDate);
	}
};

TourPlanTable.prototype.display = function() {
	var _tpTable = this;
	var dateCounter = new Date(_tpTable.settings.startDate);
	var syncNoOfDays = this.settings.syncNoOfDays;

	for ( var i = 0; i < syncNoOfDays; i++) {	    
		if(i == 1) 
			_tpTable.addRow(dateCounter, com.swaas.hidoctor.edetailing.ui.view.Resource.tpDoctorsView.later);
		else
			_tpTable.addRow(dateCounter);
		 dateCounter.setDate(dateCounter.getDate()+1);
	}
};

TourPlanTable.prototype.addRow = function(tpDate, laterString) {
	var _this = this;
	var tpFromTo='';
	var tpDayStatus='';
	var tpCPName='';
	var numberOfDoctors='';
	var _tpTable = this;
	var row = null;
	var tpRowDate = new Date(tpDate);
	var tpDetailsOfweek = this.settings.tpDetailsOfweek;
	var key = "DATE_" + tpRowDate.getDate();
	var tpDetailsOfDay = tpDetailsOfweek[key];
	var doctorsCount = 0;
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
			doctorsCount = doctors.length;
			var resource = com.swaas.hidoctor.edetailing.ui.view.Resource;
			numberOfDoctors = resource.tpDeails.doctorCovered + doctorsCount + ' ' + resource.tpDeails.covered;
		}

	} else {
		tpDayStatus=com.swaas.hidoctor.edetailing.ui.view.Resource.tpDeails.noTPAvailabe;
	}
	
	//--------------------------
	var rowSelected = false;
	var selectedDate=this.settings.startDate.getDate();
	if (ED.context.selectedDate != null){
		selectedDate = ED.context.selectedDate.getDate();
	}
	var selectedDateIn = tpRowDate.getDate();
	var selectedRowCallback = this.settings.onDateSelected;
	if (selectedDate==selectedDateIn){
		rowSelected = true;
		this.tourplanTable.append('<li class="sub-title">' + com.swaas.hidoctor.edetailing.ui.view.Resource.tpDoctorsView.today + '</li>');
		
		/*ED.showLoading();
		setTimeout(function() {
			if (_tpTable.previousSelectedRow != null) {
				var previousChart = $("#chartRow");
				previousChart.remove();
				_tpTable.previousSelectedTable.attr('class', _tpTable.settings.style);		
			}
			
			mainTable.attr('class', _tpTable.settings.selectedStyle);
			
			_tpTable.previousSelectedRow = rowObject;		
			_tpTable.previousSelectedTable = mainTable;
			
			if (doctorsCount > 0){
				_tpTable.drawChart(tpDetailsOfDay["tpDoctors"], mainTable);
			}
			setTimeout(selectedRowCallback(tpRowDate, tpDetailsOfDay), 10);
			ED.hideLoading();
		}, 500);*/
		
	}
	if(laterString != undefined) {
		this.tourplanTable.append('<li class="sub-title">' + laterString + '</li>');
	}

	var rowObject = $('<li style="width: 100%; padding: 0px;" class="nonSelectedRows" />');
	//var columnObject = $('<li class="selected" style="width: 100%; padding: 0px;" class="nonSelectedRows" />');
	var mainTable = $('<table width="100%" />');

	row += '<tr><td width="40%" height="100%" class="leftCell" id="leftCell">';
	row += '<table id="innerDay" style="height: 100%;width : 100%; cellspacing : 0; cellpadding : 0;"><tr><td valign="top" align="center"><div class="tpdetails" >'+tpRowDate.format('dddd') +'</div></td></tr><tr><td align="center"><div class="tpdates">'+tpRowDate.getDate()+'</div></td></tr><tr><td valign="bottom" align="center"><div class="tpdetails">'+tpRowDate.format('mmm - yyyy')+'</div></td></tr></table>';
	row += '</td>';
	//row += '<td><img src="plan.gif" width="100px" height="100px" /></td>';
	row += '<td id="rightCell" width="100%" class="rightCell">';
	row += '<table cellspacing="0" cellpadding="0"  width="100%" ><tr><td ><div class="tpdetails" >'+tpDayStatus+'</div></td></tr><tr><td><div class="tpdetails">'+tpFromTo+'</div></td></tr><tr><td><div class="tpdetails">'+tpCPName+'</div></td></tr><tr><td><div class="tpdetails">'+numberOfDoctors+'</div></td></tr></table>';
	row += '</td></tr>';
	
	/*row += '<tr><td width="40%" height="100%" class="leftCell" id="leftCell">';
	row += '<table id="innerDay" style="height: 100%;width : 100%; cellspacing : 0; cellpadding : 0;"><tr><td valign="top" align="center"><div class="tpdetails" >'+tpRowDate.format('dddd') +'</div></td></tr><tr><td align="center"><div class="tpdates">'+tpRowDate.getDate()+'</div></td></tr><tr><td valign="bottom" align="center"><div class="tpdetails">'+tpRowDate.format('mmm - yyyy')+'</div></td></tr></table>';
	row += '</td><td id="rightCell" class="rightCell">';
	row += '<table cellspacing="0" cellpadding="0"  width="100%" ><tr><td ><div class="tpdetails" >'+tpDayStatus+'</div></td></tr><tr><td><div class="tpdetails">'+tpFromTo+'</div></td></tr><tr><td><div class="tpdetails">'+tpCPName+'</div></td></tr><tr><td><div class="tpdetails">'+numberOfDoctors+'</div></td></tr></table>';
	row += '</td></tr>';*/

	mainTable.append(row);

	//columnObject.append(mainTable);

	//rowObject.append(columnObject);
	rowObject.append(mainTable);

	this.tourplanTable.append(rowObject);
	
	if (rowSelected == true){
		mainTable.attr('class', _tpTable.settings.selectedStyle);
		_tpTable.previousSelectedRow = rowObject;
		_tpTable.previousSelectedTable = mainTable;
	} else {
		mainTable.attr('class', _tpTable.settings.style);
	}
	
	//alert(tpDetailsOfDay);
	
	rowObject.unbind('click').bind('click', function() {
		if(!ED.autoAssetCheckStarted)
			ED.showLoading();
		setTimeout(function() {
			if (_tpTable.previousSelectedRow != null) {
				var previousChart = $("#chartRow");
				previousChart.remove();
				_tpTable.previousSelectedTable.attr('class', _tpTable.settings.style);		
			}
			
			mainTable.attr('class', _tpTable.settings.selectedStyle);
			
			_tpTable.previousSelectedRow = rowObject;		
			_tpTable.previousSelectedTable = mainTable;
			
			if (doctorsCount > 0){
				_tpTable.drawChart(tpDetailsOfDay["tpDoctors"], mainTable);
			}
			setTimeout(selectedRowCallback(tpRowDate, tpDetailsOfDay), 10);
			if(!ED.autoAssetCheckStarted)
				ED.hideLoading();
		}, 500);
		
	});	
	if (rowSelected == true && doctorsCount > 0){
		this.drawChart(tpDetailsOfDay["tpDoctors"], mainTable);
	}
	if(rowSelected)
        rowObject.trigger('click');

	//com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.refresh();
	
};

TourPlanTable.prototype.drawChart = function(tpDoctors, mainTable){
	if (this.settings.doctorChartRequired == true){
		var chartRow = '<tr id="chartRow"><td colspan="2"><div style="height:150px;width:100%" id="chartDiv"></div></td></tr>';
		mainTable.append(chartRow);
		var chart;
		
		var doctorCategories = {};
		$.each(tpDoctors, function(index, tpDoctor){
			var doctorCategory = doctorCategories[tpDoctor.doctor.categoryCode];
			if (doctorCategory == null){
				doctorCategory = {
						categoryName: tpDoctor.doctor.categoryName,
						count: 1
				};
				doctorCategories[tpDoctor.doctor.categoryCode] = doctorCategory;
			} else {
				doctorCategory.count++;
			}
		});
		//var chartData = [{category: "super core",value: 20,color:"#0000FF"},{country: "Non core",value: 20,color:"#FF00FF"},{country: "core",value: 40,color:"#006789"}];
		var chartData = [];
		for (var categoryCode in doctorCategories) {
			  if (doctorCategories.hasOwnProperty(categoryCode)) {
				  var charDataElement = {
						  category:  doctorCategories[categoryCode].categoryName,
						  value: doctorCategories[categoryCode].count
				  };
				  chartData.push(charDataElement);
			  };
			}

		
	    chart = new AmCharts.AmPieChart();
	    chart.startDuration = 0;
	    chart.dataProvider = chartData;
	    chart.titleField = "category";
	    chart.valueField = "value";
	    chart.outlineColor = "";
	    chart.outlineAlpha = 0.8;
	    chart.outlineThickness = 2;
	    chart.depth3D = 8;
	    chart.angle = 30;
	    chart.color="#FF0000";
	    chart.fontSize="12";  
	    
	    chart.pullOutRadius="10%";
	    chart.labelRadius=-5;
	    // WRITE
	    chart.write("chartDiv");
	}
};

