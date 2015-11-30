function DoctorTable(options) {

	this.settings = $.extend({
		style : {
			"border": "4px solid #388BBF",
			"border-spacing":"4px",
			"background-color":"#266389"
		},
		selectedStyle : {
			
			"border-left": "4px solid #388BBF",
			"border-top": "4px solid #388BBF",
			"border-bottom": "4px solid #388BBF",
			"border-right": "0px solid #388BBF",
			"border-spacing":"4px 4px 4px 0px",
			"background-color":"#2D3844"
		},
		onSelection: function(selectedDoctor){
			
		},
		columns: 1,
		isDiv : false,
		doctors : [],
		dcrPrivilage : {},
		dcrConfig: {},
		onDelete: function(doctor){
			alert(JSON.stringify(doctor) + " Deleted!");
			return true;
		}
	}, options);

	this.doctorTable = null;
	this.previousSelectedCell = null;
	this.previousSelectedCellBtn = null;
	this.selectedDoctor = null;
	this.selectedAlpha = null;
	this._init();
	this.display(this.settings.doctors);
}

DoctorTable.prototype._init = function() {
	if (this.settings.isDiv) {
		this.doctorTable = 
				$(this.settings.containerId);
	} else {
		this.doctorTable = $(this.settings.containerId);
	}
	this.selectedDoctor = this.settings.selectedDoctor;
};

DoctorTable.prototype.display = function(doctors) {
	this.settings.doctors = doctors;
	this._display(doctors);
	
};

DoctorTable.prototype._display = function(doctors){
	var _this = this;
	ED.clearTable(_this.doctorTable);
	$.each(doctors, function(index, doctor) {
		_this.addDoctor(doctor, index);
	});
};

DoctorTable.prototype.addDoctor = function(doctor, index){
	var _this = this;
	var rowObject = $('<tr />');
	var cell = _this.getCell(doctor, index);
	rowObject.append(cell);
	rowObject.click(function() {
		if (_this.settings.onSelection(doctor, index, _this.forced) == false){
			return;
		}
		if(_this.previousSelectedCell != null){
    		_this.previousSelectedCell.css(_this.settings.style);
		}
		
		if ($($($(this).children()[0]).children()[0]).css('background-color') == "rgb(45, 56, 68)"){
			return;
		}
    	$("#outerTableDoctor"+doctor.customerCode).css(_this.settings.selectedStyle);
       	_this.previousSelectedCell = $("#outerTableDoctor"+doctor.customerCode);
	});
	_this.doctorTable.append(rowObject);
	return rowObject;
};

DoctorTable.prototype.getCell = function(doctor, index) {
    var _this = this;
	var style = this.settings.style;
	var selected = false;
	if (this.selectedDoctor != null){
		if (this.selectedDoctor.doctorCode != null) {
			if (this.selectedDoctor.doctorCode == doctor.doctorCode){
				style = this.settings.selectedStyle;
				selected = true;
			}
		} else {
			if (this.selectedDoctor.doctorName == doctor.doctorName){
				style = this.settings.selectedStyle;
				selected = true;
			}
		}
		
	}
    var cell = $('<td style="padding:0px"/>');
    var outerTable =  $("<table  class='cell' id='outerTableDoctor"+doctor.customerCode+"' width='100%'></table>");
    var outerTableTR = $("<tr></tr>");
    outerTableTR.append('<td valign="top" width="50px"><table style="background-repeat: no-repeat; background-size: 54px 30px; "><tr><td valign="bottom" nowrap="nowrap" style="width:74px;height:30px"><label style="font-size: 16px;color: black;"> ' + 
    		(this.settings.dcrPrivilage.dcrDoctorVisitMode == "AM_PM" ?  doctor.visitMode : doctor.doctorVisitTime) + '</label></td></tr>'+
    		//(this.settings.dcrPrivilage.dcrDoctorVisitMode == "VISIT_TIME" ? '<tr><td valign="middle" align="center"><label style="font-size: 20px">' + doctor.visitMode + '</label></td></tr>':'') +
    		'</table></td>');
    var table = $('<td valign="top"><table width="100%"><tr>' +
    		'<td valign="middle" width="90%" align="left" > Dr. ' + doctor.doctorName +' '+  (doctor.categoryName != "" ? ('|'+' '+ doctor.categoryName + ' '): '') + (doctor.mdl != "" ?('|'+' '+'MDL: ' +doctor.mdl +' ') : '') + (doctor.specialityName != "" ? ('|'+' '+doctor.specialityName): '') + '</td></td></tr></table></td>');
    outerTable.css(style);
    outerTable.append(outerTableTR);
    outerTableTR.append(table);
    cell.append(outerTable);
    
    //var iconsTable =  $("<table id='outerTableDoctor1"+doctor.customerCode+"' width='100%'></table>");
    var iconsTableTR = $("<tr></tr>");
    //iconsTable.append(iconsTableTR);
    outerTable.append(iconsTableTR);
	var btnCell = $("<td colspan='2' id='selectedDoctor"+doctor.customerCode+"' align='left'/>");
	var navBar = $('<div></div>');
   	var navBarUL = $('<table style="border-spacing:0px;width:100%"></table>');
   	navBarUL.append($('<tr/>'));
   
   	if(doctor.accompanistsDone == true){
    	var accompanistIcon =  $('<td id="accompanistIconLI" width="34" align="right"><a id="accompanistIcon" style=""><img src="../dcr/images/Accompanist.png" ></a> </td>');
       	navBarUL.append(accompanistIcon);
       	$('#eDetailing').removeClass('ui-btn ui-btn-inline');
   	}
   	if(doctor.inputDone == true){
   		
       	var inputIcon = $('<td id="inputIconLI"  width="34" align="right"><a id="inputIcon" style=""><img src="../dcr/images/Inputs.png" ></a> </td>');
       	navBarUL.append(inputIcon);
       	$('#enterDCR').removeClass('ui-btn ui-btn-inline');
   	}
   	if(doctor.detailingDone == true){
       	var inputIcon = $('<td id="inputIconLI"  width="34" align="right"><a id="inputIcon" style=""><img src="../../hidoctor/images/eDetailing.png" ></a> </td>');
       	navBarUL.append(inputIcon);
       	$('#enterDCR').removeClass('ui-btn ui-btn-inline');
   	}
   	if(doctor.chemistDone == true){
    	var chemistIcon = $('<td id="chemistIconLI"  width="34" align="right"><a id="chemistIcon" style=""><img src="../dcr/images/chemist1.png" ></a> </td>');
    	navBarUL.append(chemistIcon);
    	$('#eDetailing').removeClass('ui-btn ui-btn-inline');
   	}
   	if(doctor.rcpaDone){
   		var rcpaIcon = $('<td id="rcpaIconLI"  width="34" align="right"><a id="rcpaIcon" style=""><img src="../dcr/images/Prescription_Symbol.png" ></a> </td>');
   		navBarUL.append(rcpaIcon);
   		$('#eDetailing').removeClass('ui-btn ui-btn-inline');
   	}
   
   	var tagDoctorBtn = $('<td id="tagDoctorLI"  width="34" align="right"><a id="tagDoctor" style=""><img src="../../hidoctor/images/tagDoctor.png" ></a> </td>');
    navBarUL.append(tagDoctorBtn);
    $('#tagDoctor').removeClass('ui-btn ui-btn-inline');
    tagDoctorBtn.click(function(event){
    	event.stopPropagation();
    	ED.selectedDoctor = doctor;
    	_this.tagDoctor();
    });
 
	if (com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()){
		if(doctor.doctorCode && doctor.doctorCode != null){
		var doctor360Btn = $('<td id="doctor360LI"  class="doctor360LIClass"  width="34" align="right"><a id="doctor360" style=""><img src="../../hidoctor/images/doctor360.png"  ></a></td>');
	   	navBarUL.append(doctor360Btn);
	   	$('#doctor360').removeClass('ui-btn ui-btn-inline');
    	doctor360Btn.click(function(event){
    		event.stopPropagation();
    		ED.selectedDoctor = doctor;
    		ED.showLoading();
    		ED.intervalId = setInterval(_this.showDoctor360, 300);
    		});
		}
	}

	if (doctor.modeOfEntry == "M" && typeof doctor.tpId == "undefined"){
		var tdDeletButton = $('<td align="right" valign="middle" >&nbsp;</td>');
		var spaceDiv = $('<div style="display: -webkit-inline-box;" >&nbsp;</div>');
		tdDeletButton.append(spaceDiv);
		var deleteButton = $('<button data-rel="back" data-role="button" data-theme="r" data-icon="delete" data-iconpos="notext" ' + 
				'class="ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-r" data-corners="true" ' + 
				'data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="Delete"><span class="ui-btn-inner">' + 
				'<span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></button>');
		tdDeletButton.append(deleteButton);
		tdDeletButton.click(function (event){
			event.stopPropagation();
			if (confirm("Are you sure you want to remove the Doctor from DCR?") == true){
				if (_this.settings.onDelete(doctor, index) == true){
					var rowTobeRemoved = $(cell.parent());
					rowTobeRemoved.remove();
					var rows = $(_this.doctorTable.children()[0]).children();
					if (rows.length > 0){
						if (index > 0){
							index--;
						}
						if (index >= rows.length){
							index = 0;
						}
						_this.forced = true;
						$(rows[index]).click();
						_this.forced = false;
					} else {
						$("#doctorVisitDetailDiv").hide();
					}
					com.swaas.hidoctor.edetailing.ui.view.Dcr.removeDoctorFromList(doctor);
				}
			}
		});
		navBarUL.append(tdDeletButton);
	} else {
		var tdDeletButton = $('<td align="right" valign="middle" >&nbsp;</td>');
		navBarUL.append(tdDeletButton);
	}
	
   	navBar.append(navBarUL);
	btnCell.append(navBar);
	iconsTableTR.append(btnCell);
	if (selected == true){
		_this.previousSelectedCell = outerTable;
	}
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
		//$("#popupDoctor").popup();
	    //$("#popupDoctor").popup('open');
		ED.hideLoading();	
	}
};

DoctorTable.prototype.tagDoctor = function(){
	$("#mytags").html('');
	var _this = this;
	// for adding tags to tag-it
	var tags = com.swaas.hidoctor.edetailing.service.DoctorService.getAllTags();
	var availableTags = [];
	$.each(tags , function(id, tag) {
		if(tag.tagDescription != null && tag.tagDescription.length >1){
			availableTags.push(tag.tagDescription);
		}
	});
	var options = {};
	options["availableTags"] = availableTags;
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
    $('#tagHeading').append(" " + ED.selectedDoctor.customerName +"  "+" - Tag Doctor");
    $("#tagDoctorPopup").popup('open');
};
DoctorTable.prototype.onTagAdded = function(enteredTag) {
	return com.swaas.hidoctor.edetailing.service.DoctorService.addTag(enteredTag, ED.context.currentUser, ED.selectedDoctor);
};
DoctorTable.prototype.onTagRemoved = function(tagId) {
	com.swaas.hidoctor.edetailing.service.DoctorService.removeTag(tagId);
};