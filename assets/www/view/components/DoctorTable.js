var popup = {
    el: $('#popup_more_wrapper'),
    show: function(content, onCreate){
        popup.createPopup(content, onCreate);
    },
    hide: function(){
        $('#popup_more_wrapper').hide(300, function(){
        $('#popup_more_wrapper').remove();
    });
    },
    createPopup: function(content, onCreate) {
        popup.hide();
        var html = '<div id="popup_more_wrapper"><div class="popup_more" id="popup_more"><div class="popup-content">';
        html += content;
        html += '</div><div class="close_btn">X</div></div></div>';
        html = $(html);
        $('.ui-page').append(html);

        if(onCreate) onCreate();
        $('#popup_more_wrapper').bind('click', function(evt){
            if($(evt.target).attr('id') == 'popup_more_wrapper')
            $(this).remove();
        });
        $('.close_btn').bind('click', function(){
            $('#popup_more_wrapper').remove();
        });
        popup.setPosition();
    },
    setPosition: function(){
        var cHgt = $('.popup_more').height(), wHgt = $(window).height();
        var top = 0;
        if(wHgt > cHgt)
        top = (wHgt - cHgt)/2;
        else
        top = (cHgt - wHgt)/2;
        if(cHgt > 420) $('.popup-content').css('height', '436px');
        $('.popup_more').css('top', top + 'px');
    }
};

function DoctorTable(options) {

	this.settings = $.extend({
		style : {
			"border": "0px",
			"border-spacing":"2px"
		},
		selectedStyle : {
			"border": "2px solid #5589CA",
			"border-spacing":"2px"
		},
		columns: 2,
		isDiv : false,
		userName: null,
		doctors : []
	}, options);

	this.doctorTable = null;
	this.previousSelectedCell = null;
	this.previousSelectedCellBtn = null;
	this.selectedDoctor = null;
	this.selectedAlpha = null;
	this._init();
	this.display(this.settings.doctors, this.doctorTable);
}

DoctorTable.prototype._init = function() {
	if (this.settings.isDiv) {
		this.doctorTable = $("<table />").appendTo(
				$(this.settings.containerId));
	} else {
		this.doctorTable = $(this.settings.containerId);
	}
	this.selectedDoctor = null;
};

DoctorTable.prototype.display = function(doctors, doctorTable) {
	this.settings.doctors = doctors;
	this.selectedAlpha = "#";
	this._display(doctors, doctorTable);
	
};

DoctorTable.prototype._display = function(doctors, doctorTable){
	/*if (doctors.length > 0){
		ED.setValue($('#doctorTableCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.accompanistDoctorsView.doctorTableCaption + this.settings.userName);		
	} else {
		ED.setValue($('#doctorTableCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.accompanistDoctorsView.noDoctors + this.settings.userName);
	}*/
	var _this = this;
	var uniqueAlpha = {};
	$.each(this.settings.doctors, function(i, doctor){
		var alpha = doctor.customerName.charAt(0);
		uniqueAlpha[alpha] = true;
	});
	ED.removeTableRow(_this.doctorTable.find('.tableDoctorRow'));
	
	_this.populateAlphabets(uniqueAlpha);
	
	/*var rows = $("<tr><td valign='top' id='alphabetsTD' /></tr>");
	_this.doctorTable.append(rows);

	var alphabetsTD = $("#alphabetsTD");
	var dataTheme = "a";
	if (this.selectedAlpha == "#"){
		dataTheme = "b";
	}
	var btn = $('<a class= "alpha"  data-theme="' + dataTheme + '" data-inline="true" data-mini="true"  data-corners="false" style="margin-left:0px!important;margin-right:0px!important;margin-top:0px!important;margin-bottom:0px!important">#</a>');
	btn.click(function(){
		$(this).attr('data-theme', 'b');
		_this.filterDoctors("#");
	});
	alphabetsTD.append(btn);
	alphabetsTD.append($("<BR/>"));
	for(var i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++){
		var alpha = String.fromCharCode(i);
		if (uniqueAlpha[alpha] == true){
			dataTheme = "a";
			if (this.selectedAlpha == alpha){
				dataTheme = "b";
			}
			var btn = $('<a class= "alpha" data-theme="' + dataTheme + '" data-inline="true" data-mini="true"  data-corners="false" style="margin-left:0px!important;margin-right:0px!important;margin-top:0px!important;margin-bottom:0px!important">' + alpha + '</a>');
			btn.click(function(){
				$(this).attr('data-theme', 'b');
				_this.filterDoctors($(this).text());
			});
			alphabetsTD.append(btn);
			alphabetsTD.append($("<BR/>"));
		}
	}
	$(".alpha").button();

	rows.append($("<td valign='top' align='left' style='min-width:400px'><table id='doctor-list' style='width:100%'></table></td>"));

	var doctorList = $("#doctor-list");*/

	var rowObject = $('<tr class="tableDoctorRow" />');
	$.each(doctors, function(index, doctor) {
		var cell = _this.getCell(doctor);
		rowObject.append(cell);
		if ((index+1)%_this.settings.columns == 0){
			_this.doctorTable.append(rowObject);
			rowObject = $('<tr class="tableDoctorRow" />');
		}
	});
	
	if (doctors.length%_this.settings.columns != 0){
		this.doctorTable.append(rowObject);

		//setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.refresh(), 1000);
	}
	com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.refresh();
};

DoctorTable.prototype.filterDoctors = function(startsWth){
	var _this = this;
	var filteredDoctors = [];
	_this.selectedAlpha = startsWth;
	$.each(_this.settings.doctors, function(i, doctor) {
		if (startsWth == "#" || doctor.customerName.indexOf(startsWth) == 0) {
			filteredDoctors.push(doctor);
		}
	});
	_this._display(filteredDoctors, this.doctorTable);
};

DoctorTable.prototype.searchDoctors = function(input){
	var searchDoctors = [];
	$.each(this.settings.doctors, function(i, doctor) {
		var result=doctor.customerName.match(new RegExp(input,"ig"));
		if(result){
			searchDoctors.push(doctor);
		}	
	});
	this.selectedAlpha = "#";
	this._display(searchDoctors, this.doctorTable);
};

DoctorTable.prototype.getCell = function(doctor) {
	var style = this.settings.style;
	var selected = false;
	if (this.selectedDoctor != null && this.selectedDoctor.customerCode == doctor.customerCode){
		style = this.settings.selectedStyle;
		selected = true;
	}
	
	var cell = $('<td width="50%" class="tableDoctorItem" />');
	var tableStr = '<table style="padding: 10px; width: 99%; margin: 5px; border: 1px solid #E4E8EA; box-shadow: 1px 1px 5px #3f464c; ">';
	tableStr += '<tr>';
	tableStr += '<td style="border: 1px solid #CCCCCC; width: 100px;"><img src="../../hidoctor/images/doctor.png" width="100px" height="100px" /></td>';
	tableStr += '<td style="vertical-align: top; padding: 5px;">';
	tableStr += '<label style="font-weight: bold;">' + doctor.customerName + '</label><br />';
	tableStr += '<label class="small-gray" style="color: #4F535A;">' + doctor.specialityName + '</label>';
	tableStr += '</td>';
	tableStr += '</tr>';
	tableStr += '</table>';
	var table = $(tableStr);
    //var cell = $('<td style="min-width:200px"/>');
    //var table = $('<table width="100%"><tr><td width="10%"><img src="../../hidoctor/images/doctor.png"></td>' +
    //		'<td valign="middle" width="90%" >' + doctor.customerName +' '+'|'+' '+ doctor.specialityName + '</td></td></tr></table>');
    table.css(style);
    cell.append(table);
    
    var _this = this;
 
    cell.click(function(){
    	var _thisBtn = this;
    	ED.showLoading();
    	if(_this.previousSelectedCell != null){
    		_this.previousSelectedCell.css(_this.settings.style);
    		//_this.previousSelectedCellBtn.remove();
		}
    	_this.selectedDoctor = doctor;
    	ED.selectedDoctor = doctor;
    	table.css(_this.settings.selectedStyle);
    	
    	//$('.tableDoctorItem').find('table').removeClass('selected');
		//$(this).find('table').addClass('selected');
		var position = $(this).position();
		var arrowPos = position.left - 220;
		$('#tableRow').remove();
		var str = '<tr id="tableRow" class="tableDoctorRow" style="margin-bottom: 10px;">';
		str += '<td colspan="2" style="padding: 0px;">';
		str += '<table style="width: 100%; margin-bottom: 10px;">';
		str += '<tr><td colspan="2" style="background-color: transparent;"><div style="margin-left: ' + arrowPos + 'px; border-bottom: 10px solid #222; border-left: 10px solid transparent; border-right: 10px solid transparent; float: left; width: 0px;"></div></td></tr>';
		str += '<tr style="background-color: #222222;">';
		str += '<td style="width: 300px; padding: 10px;"><img src="img/erkek.png" style="width: 300px; height: 300px;" /></td>';
		str += '<td style="vertical-align: top; ">';
		str += '<div style="float: right;"><a href="#" onclick="closeBtn();" id="close"><div style="display: inline-block; float: right; width: 30px; height: 30px; background-image: url(\'close_square_black-32.jpg\');"></div></</a></div>';
		str += '<div style="padding: 10px 80px;" data-role="controlgroup" data-type="vertical" data-theme="a" class="ui-corner-all ui-controlgroup ui-controlgroup-vertical" aria-disabled="false" data-disabled="false" data-shadow="false" data-corners="true" data-exclude-invisible="true" data-mini="false" data-init-selector=":jqmData(role=\'controlgroup\')">';
		str += '<div class="ui-controlgroup-controls">';
		
		str += '<a href="#" id="btnProfile" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c"><span class="ui-btn-inner" style="background: url(\'doctor360.png\') no-repeat 25px 25px;"><span class="ui-btn-text">Profile 360*</span></span></a>';
		str += '<a href="#" id="btnEdetailing" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner" style="background: url(\'Detailing.png\') no-repeat 5px 10px;"><span class="ui-btn-text">Detailing</span></span></a>';
		str += '<a href="#" id="btnTag" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner" style="background: url(\'tag1.png\') no-repeat 5px 10px;"><span class="ui-btn-text">Tag customer</span></span></a>';		
		str += '<a href="#" id="btnDCR" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-last-child ui-btn-up-c"><span class="ui-btn-inner" style="background: url(\'DCR_1.png\') no-repeat 5px 10px;"><span class="ui-btn-text">CRM</span></span></a>';
		
		str += '</div>';
		str += '</div>';
		str += '</td>';
		str += '</tr>';
		str += '</table>';
		str += '</td>';
		str += '</tr>';
		var o = $(str);
		$(this).parent().after(str);
		//$('#tableRow').hide();
		//o.show();
		
		$('#btnDCR').click(function(){
       		var valid = true;
    		if((ED.context.selectedDate > new Date())){
    			valid = false;
				alert('User cannot enter DCR for future Date!!');
				return;
    		}else {
    			valid = true;
        		ED.redirect("view/dcr/dcrNew.html", {selectedDoctor: doctor});
    		}
    	});
		
		$('#btnEdetailing').click(function(){
       		var valid = true;
       		if((ED.context.selectedDate > new Date())){
       			valid = false;
				alert('You can not do e-Detailing for a future date');
				return;
				//ED.redirectToHome();
    		}else {
    			
    	    	var dcrActualDate =  new Date();
    	    	doctorVisitTime = new Date();
    	    	dcrActualDate = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(dcrActualDate);
    			var position = ED.getGeoLocation();
    			
    			var analyticsDocVisit = {
    					dcrActualDate: dcrActualDate,
    					doctorCode : doctor.customerCode ,
    					doctorName : doctor.customerName ,
    					doctorRegionCode: doctor.regionCode,
    					accompanistName : ED.context.selectedAccompanist,
    					doctorVisitTime : doctorVisitTime,
    					latitude : position.coords.latitude,
    					longitude : position.coords.longitude,
    					geoAddress: position.geoAddress
    			};
    			com.swaas.hidoctor.edetailing.service.DCRService.saveAnalyticalData(analyticsDocVisit);
    			//alert(JSON.stringify(analyticsDocVisit));
    			valid = true;
    			//ED.redirect("view/eDetailing/eDetailing.html", {selectedDoctor: doctor});
    			ED.redirect("view/eDetailing/story.html", {selectedDoctor: doctor});
    		}
    	});
		
		$('#btnTag').click(function(){
    		_this.tagDoctor();
    	});
		
		$('#btnProfile').click(function(){
    		ED.showLoading();
    		ED.intervalId = setInterval(_this.showDoctor360, 300);
    		
    	});
		
		//$('#page-main').niceScroll();
		setTimeout(function() {
			$('#tableRow').slideDown('slow');
			$('#tableRow').show();
			
			//alert($(this).offset().top);
			com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.refresh();
			ED.hideLoading();
			//$('#page-main').animate({ scrollTop: $(_thisBtn).offset().top }, 500);
			//setTimeout(myscroll.scrollTo(0, -($(_thisBtn).offset().top)), 1000);
			setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.scrollToElement(_thisBtn), 200);
		}, 300);
		
       	_this.previousSelectedCell = table;
		//_this.previousSelectedCellBtn = btnRow;
    });
    /*cell.click(function(){
    	if(_this.previousSelectedCell != null){
    		_this.previousSelectedCell.css(_this.settings.style);
    		_this.previousSelectedCellBtn.remove();
		}
    	_this.selectedDoctor = doctor;
    	ED.selectedDoctor = doctor;
    	table.css(_this.settings.selectedStyle);
		var btnRow = $("<tr id='selectedDoctor' />");
    	table.append(btnRow);
    	btnRow.append($('<td/>'));
    	var btnCell = $("<td colspan='2' align='right'/>");
    	btnRow.append(btnCell);
    	var navBar = $('<div data-role="navbar" data-mini="true"></div>');
       	var navBarUL = $('<ul></ul>');
       	navBar.append(navBarUL);
       	var dcrBtn = $('<li id="enterDCRLI"><a id="enterDCR" data-icon="custom"></a></li>');
       	navBarUL.append(dcrBtn);
    	dcrBtn.click(function(){
       		var valid = true;
    		if((ED.context.selectedDate > new Date())){
    			valid = false;
				alert('User cannot enter DCR for future Date!!');
				return;
    		}else {
    			valid = true;
        		ED.redirect("view/dcr/dcrNew.html", {selectedDoctor: doctor});
    		}
    	});
    	
    	var eDetailingBtn = $('<li id="eDetailingLI"><a id="eDetailing" data-icon="custom"></a></li>');
       	navBarUL.append(eDetailingBtn);
       	eDetailingBtn.click(function(){
       		var valid = true;
       		if((ED.context.selectedDate > new Date())){
       			valid = false;
				alert('You can not do e-Detailing for a future date');
				return;
				//ED.redirectToHome();
    		}else {
    			
    	    	var dcrActualDate =  new Date();
    	    	doctorVisitTime = new Date();
    	    	dcrActualDate = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(dcrActualDate);
    			var position = ED.getGeoLocation();
    			
    			var analyticsDocVisit = {
    					dcrActualDate: dcrActualDate,
    					doctorCode : doctor.customerCode ,
    					doctorName : doctor.customerName ,
    					doctorRegionCode: doctor.regionCode,
    					accompanistName : ED.context.selectedAccompanist,
    					doctorVisitTime : doctorVisitTime,
    					latitude : position.coords.latitude,
    					longitude : position.coords.longitude,
    					geoAddress: position.geoAddress
    			};
    			com.swaas.hidoctor.edetailing.service.DCRService.saveAnalyticalData(analyticsDocVisit);
    			//alert(JSON.stringify(analyticsDocVisit));
    			valid = true;
    			ED.redirect("view/eDetailing/eDetailing.html", {selectedDoctor: doctor});
    		}
    	});
       	
       	var tagDoctorBtn = $('<li id="tagDoctorLI"><a id="tagDoctor" data-icon="custom"></a></li>');
       	navBarUL.append(tagDoctorBtn);
       	tagDoctorBtn.click(function(){
    		_this.tagDoctor();
    		});
 
    	if (com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()){
    		var doctor360Btn = $('<li id="doctor360LI"  class="doctor360LIClass"><a id="doctor360" data-icon="custom"></a></li>');
    	   	navBarUL.append(doctor360Btn);
        	doctor360Btn.click(function(){
        		ED.showLoading();
        		ED.intervalId = setInterval(_this.showDoctor360, 300);
        		
        	});
    	}
    	btnCell.append(navBar);
       	navBar.navbar();
    	
       	_this.previousSelectedCell = table;
		_this.previousSelectedCellBtn = btnRow;
    });*/
    return cell;

};

DoctorTable.prototype.showDoctor360 = function(){
	clearInterval(ED.intervalId);
	com.swaas.hidoctor.edetailing.dao.CoreSOAP.errorHandler = function(error) {
		alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
		ED.hideLoading();
		$("#doctorTable>ul>li.doctor360LIClass").remove();
		};
	doctor360_g = com.swaas.hidoctor.edetailing.service.DoctorService.getDoctor360(1, ED.context.currentUser.companyCode, ED.selectedDoctor.customerCode, ED.selectedDoctor.regionCode, ED.context.currentUser.userCode);
	if(doctor360_g != null){
		fnBuildDoctorDetails();
		$("#popupDoctor").popup();
	    $("#popupDoctor").popup('open');
		ED.hideLoading();	
	}
};

DoctorTable.prototype.tagDoctor = function(){
	try {
		$("#mytags").html('');
		var _this = this;
		// for adding tags to tag-it
		var tags = com.swaas.hidoctor.edetailing.service.DoctorService.getAllTags();
		//alert(tags);
		var availableTags = [];
		$.each(tags , function(id, tag) {
			if(tag.tagDescription != null && tag.tagDescription.length >1){
				availableTags.push(tag.tagDescription);
			}
		});
		var options = {};
		options["availableTags"] = availableTags;
		//alert(options);
		$("#mytags").tagit(options);
		var list = $('#listViewTag');
		list.bind('liAdded',function(event, li){
			var enteredTag = $(li).text();
			if (enteredTag.length > 2){
				enteredTag  = enteredTag.substring(0, enteredTag.length-2);
				enteredTag = enteredTag.trim();
			}
			var tagId = _this.onTagAdded(enteredTag);
			$(li).attr("id", tagId);
		}); 
		list.bind('liRemoved',  function(event, li){
			 var tag = $(li).text();
			 tag = tag.trim();
			 var tagId = li.id;
			 _this.onTagRemoved(tagId);
		});
		$("#tagCell").click(function() {
			$("#mytags").find(".ui-input-text").focus();
		});
	    $("#tagDoctorPopup").popup();
	    $('#tagHeading').html('');
	    $('#tagHeading').append(" " + this.selectedDoctor.customerName +"  "+" - Tag Doctor");
	    $("#tagDoctorPopup").popup('open');
	} catch(e) {
		console.log(e);
	}
};
DoctorTable.prototype.onTagAdded = function(enteredTag) {
	return com.swaas.hidoctor.edetailing.service.DoctorService.addTag(enteredTag, ED.context.currentUser, ED.selectedDoctor);
};
DoctorTable.prototype.onTagRemoved = function(tagId) {
	com.swaas.hidoctor.edetailing.service.DoctorService.removeTag(tagId);
};

DoctorTable.prototype.populateAlphabets = function(uniqueAlpha) {
	var _this = this;
	var divId = $('#alphabets-div .ui-controlgroup-controls');
	/*var alphabets = '#,A,B,C,D,E,F,G,H,I,J,K,L,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
	var alphabetsArray = alphabets.split(',');*/
	divId.empty();
	var obj = '<a href="#" style="font-size: 24px !important; padding: 5px !important;" data-theme="b" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c ui-first-child"><span style="padding: 5px;" class="ui-btn-inner"><span class="ui-btn-text">#</span></span></a>';
	var o = $(obj);
	o.click(function(e) {
		$(this).attr('data-theme', 'b');
		_this.filterDoctors($(this).text());
	});
	divId.append(o);
	var o = undefined;
	for(var i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++){
		var objClass = '';
		var a = String.fromCharCode(i);
		if (uniqueAlpha[a] == true){
			dataTheme = "a";
			if (this.selectedAlpha == a){
				dataTheme = "b";
			}
			/*if(a == 0) {
				objClass = 'ui-first-child';
			} else if(a == uniqueAlpha.length-1) {
				objClass = 'ui-last-child';
			}*/
			var obj = '<a href="#" style="font-size: 24px !important; padding: 5px !important;" data-theme="b" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c ' + objClass + '"><span style="padding: 5px;" class="ui-btn-inner"><span class="ui-btn-text">' + a + '</span></span></a>';
			o = $(obj);
			o.click(function(e) {
				$(this).attr('data-theme', 'b');
				_this.filterDoctors($(this).text());
			});
			divId.append(o);
			$('#alphabets-div').trigger('create');
		}
	}
	if(o != undefined) {
		o.addClass('ui-last-child');
	}
	/*for(var a in alphabetsArray) {
		var objClass = '';
		if(a == 0) {
			objClass = 'ui-first-child';
		} else if(a == alphabetsArray.length-1) {
			objClass = 'ui-last-child';
		}
		//var obj = '<a href="#" data-role="button">' + alphabetsArray[a] + '</a>';
		var obj = '<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c ' + objClass + '"><span style="padding: 5px;" class="ui-btn-inner"><span class="ui-btn-text">' + alphabetsArray[a] + '</span></span></a>';
		var o = $(obj);
		o.click(function(e) {
			$(this).attr('data-theme', 'b');
			_this.filterDoctors($(this).text());
		});
		divId.append(o);
		$('#alphabets-div').trigger('create');
	}*/
};

var closeBtn = function() {
	$('.tableDoctorItem').find('table').removeClass('selected');
	$('#tableRow').remove();
	com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.refresh();
};