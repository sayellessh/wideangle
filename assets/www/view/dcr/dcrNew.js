com.swaas.hidoctor.edetailing.ui.view._Dcr = {

	productInput : null,
	productDetailedInput : null,
	chemistInput : null,
	doctorInput : null,

	intervalID : null,
	doctors : [],
	userProducts : null,
	doctorTable : null,
	salesProducts : null,
	dcrAccompanist : [],
	accompanistForInput : null,
	selectObject : null,
	selectedSpeciality : null,
	selectedChemist : null,
	selectedDoctor : null,
	selectSalesProduct : null,
	selectedSalesProduct : null,
	salesRCPAProducts : [],

	chemists : null,
	
	dcrHeader: null,
	privilage : null,
	configDCR : null,
	dcrActualDate: null,
	resolution : {
		"width" : $(window).width() * 0.75,
		"height" : $(window).height() * 0.60
	},

	init : function() {
		
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		/*document.addEventListener('backbutton', function(){
			if (ED.context.previousPage != null){
				if (ED.context.previousPage == "view/eDetailing/eDetailing.html"){
					ED.redirect(ED.context.previousPage, {selectedDoctor: ED.context.previousDoctor});
				} else {
					ED.redirect(ED.context.previousPage);
				}
			} else {
				ED.redirectToHome();
			}
		}, false);*/
		ED.handleBackButton();
		ED.initializeGeoLocation(true);
		ED.setFooter();
		
		_this.dcrActualDate = ED.context.selectedDate;
		if (_this.dcrActualDate == null){
			_this.dcrActualDate = new Date();
		}
		_this.dcrActualDate = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(_this.dcrActualDate);
		
		ED.setValue($('#lblvisitTime'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.visitTime);
		ED.setValue($('#lblremarks'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.remarks);
		ED.setValue($('#btnPersist'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.submit);
	
		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._init, 100);
	},

	_init : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);
		$("#visitTimeEntry").change(function(e){
			_this.selectedDoctor.doctorVisitTime = this.value;
		});
		
		$("#timeRadio").change(function(e){
			_this.selectedDoctor.visitMode = this.value;
		});
		
		$("#pob").change(function(e){
			   if (this.value != ""){
				   	this.value = Math.abs(this.value);
			   } else {
				   	this.value = '0';
			   }
			   _this.selectedDoctor.poAmount = this.value;
		});
		
		
		$("#remarks").change(function(e){
			_this.selectedDoctor.remarksByUser = this.value;
		});
		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._loadData, 100);
	},

	_loadData : function() {
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);

		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		_this.privilage = com.swaas.hidoctor.edetailing.service.DCRService.getDCRPrivilage();
		_this.configDCR = com.swaas.hidoctor.edetailing.service.DCRService.getConfigSettings();
		_this.dcrHeader = com.swaas.hidoctor.edetailing.service.DCRService.getDCRHeader(_this.dcrActualDate, "F", ED.context.currentUser);
		_this.dcrHeader.lattitude = ED.latitude;
		_this.dcrHeader.longitude = ED.longitude;
		_this.dcrHeader.geoAddress = ED.geoAddress;
		
		var dateFormat = _this.configDCR.dateDisplayFormat;
		if (dateFormat == null || dateFormat == "dd/MM/yyyy"){
			dateFormat = "dd/mm/yyyy";
		}
		var formatedDate = _this.dcrHeader.dcrActualDate.format(dateFormat);
		$("#dcrDate").text(formatedDate);
		$("#dcrHeadMessage").text('( '+com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.dcrHeadMessage+' )');
		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._loadDoctors, 100);
	},
	
	_loadDoctors: function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		_this.doctors = com.swaas.hidoctor.edetailing.service.DCRService.getDcrDoctors(_this.dcrHeader.dcrCode, _this.dcrHeader.dcrActualDate, "F");
		var selectedDoctor = ED.context.request.selectedDoctor;
		if (selectedDoctor != null){
			if (selectedDoctor.doctorCode == null || selectedDoctor.doctorCode == ""){
				selectedDoctor.doctorCode = selectedDoctor.customerCode;
				selectedDoctor.doctorRegionCode =  selectedDoctor.regionCode;
			}
			
			if (selectedDoctor.doctorName == null || selectedDoctor.doctorName == ""){
				selectedDoctor.doctorName = selectedDoctor.customerName;
			}
			var doctorFoundInTheList = false;
			$.each(_this.doctors, function(i, doctor){
				if (selectedDoctor.doctorCode != null && selectedDoctor.doctorCode != ""){
					if (selectedDoctor.doctorCode == doctor.doctorCode && selectedDoctor.doctorRegionCode == doctor.doctorRegionCode){
						_this.selectedDoctor = doctor;
						_this.selectedDoctor.lattitude = ED.latitude;
						_this.selectedDoctor.longitude = ED.longitude;
						_this.selectedDoctor.geoAddress = ED.geoAddress;
						doctorFoundInTheList = true;
					}
				} else {
					if (selectedDoctor.doctorName == doctor.doctorName) {
						_this.selectedDoctor = doctor;
						_this.selectedDoctor.lattitude = ED.latitude;
						_this.selectedDoctor.longitude = ED.longitude;
						_this.selectedDoctor.geoAddress = ED.geoAddress;
						doctorFoundInTheList = true;
					}
				}
				
			});
			if (doctorFoundInTheList == false){
				_this.selectedDoctor = selectedDoctor;
				_this.selectedDoctor.doctorCode = selectedDoctor.customerCode;
				_this.selectedDoctor.doctorName = selectedDoctor.customerName;
				_this.selectedDoctor.modeOfEntry = "M";
				_this.selectedDoctor.enteredDateTime = new Date();
				_this.selectedDoctor.isAccDoctor =  ((ED.context.currentUser.regionCode == selectedDoctor.regionCode) ?"N":"Y"),
				_this.selectedDoctor.doctorVisitTime = "";
				_this.selectedDoctor.visitMode = "";
				_this.selectedDoctor.doctorRegionCode = selectedDoctor.regionCode;
				_this.selectedDoctor.sourceOfEntry = "Tablet";
				_this.selectedDoctor.dcrActualDate = _this.dcrActualDate;
				com.swaas.hidoctor.edetailing.service.DCRService.getDCRStatuses(_this.selectedDoctor);
				
				if (_this.selectedDoctor.isAccDoctor == "Y"){
					var autoAccompanist = {
							accUserName: ED.context.selectedAccompanist,
							accRegionCode: selectedDoctor.regionCode,
							isOnlyForDoctor: "N",
							modeOfEntry: "A"
					};
					_this.selectedDoctor.accompanists = [];
					_this.selectedDoctor.accompanists.push(autoAccompanist);
					_this.selectedDoctor.accompanistsDone = true; 
				}
				_this.doctors.push(_this.selectedDoctor);
			}
		}
		
		if (_this.selectedDoctor == null){
			if (_this.doctors.length > 0){
				_this.selectedDoctor = _this.doctors[0];
				_this.selectedDoctor.lattitude = ED.latitude;
				_this.selectedDoctor.longitude = ED.longitude;
				_this.selectedDoctor.geoAddress = ED.geoAddress;
			}
		} else {
			if (_this.doctors.length == 0){
				_this.selectedDoctor == null;
			}
		}
		
		$("#doctorLabel").text("Loading...");
		_this.doctorTable = new DoctorTable({
			containerId : "#doctorTable",
			doctors : _this.doctors,
			columns : 1,
			dcrPrivilage : _this.privilage,
			dcrConfig: _this.configDCR,
			selectedDoctor: _this.selectedDoctor,
			onSelection: function(selectedDoctor, index, forced){
				var proceed = false;
				if (forced != true && _this.selectedDoctor != null) {
					if (_this.doctors.length != 0 && JSON.stringify(_this.selectedDoctor) != JSON.stringify(_this.selectedDoctorBackup)){
						if (confirm("You have not saved the changes of the Dr. " + _this.selectedDoctor.doctorName + ", do you want to continue with out saving?") == true){
							proceed = true;
						} 
					} else {
						_this.doctors[index] = _this.selectedDoctorBackup;
						proceed = true;
					}
				} else {
					proceed = true;
				}
				if (proceed == true){
					_this.selectedDoctor = selectedDoctor;
					com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
							com.swaas.hidoctor.edetailing.ui.view.Dcr._loadSelectedDoctor, 100);
				}
				return proceed;
			},
			onDelete: function(selectedDoctor, index){
				com.swaas.hidoctor.edetailing.service.DCRService.deleteDCR(selectedDoctor); 
				
				_this.selectedDoctor.accompanists.splice(index, 1);
				return true;
				
			}
		});
		$("#doctorLabel").text("Visited Doctors List");
		if (_this.selectedDoctor != null){
			com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
					com.swaas.hidoctor.edetailing.ui.view.Dcr._loadSelectedDoctor, 100);
			
		} 
	},
	
	_loadSelectedDoctor: function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);
		$("#doctorVisitDetailDiv").show();
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
	
		var docValues = "Dr. " + _this.selectedDoctor.doctorName + ' ';
		if(_this.selectedDoctor.categoryName != ""){
			docValues = docValues + '| ' + _this.selectedDoctor.categoryName + ' ';
		}
		if (_this.selectedDoctor.mdl != ""){
			docValues = docValues + '| ' + _this.selectedDoctor.mdl + ' ';
		}
		if (_this.selectedDoctor.specialityName != ""){
			docValues = docValues + '| ' + _this.selectedDoctor.specialityName + ' ';
		}
		ED.setValue($('#doctorvalues'), docValues);
		_this.displaySpeciality();
		_this.displayVisitTime();
		//_this.displayPOB();
		if (_this.selectedDoctor.remarksByUser != null){
			$('#remarks').text(_this.selectedDoctor.remarksByUser);
		} else {
			$('#remarks').text("");
		}		
		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._loadAccompanists, 100);
		var specialKeys = new Array();
        specialKeys.push(8); //Backspace
        function IsNumeric(e) {
            var keyCode = e.which ? e.which : e.keyCode ;
            var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
            //document.getElementById("error").style.display = ret ? "none" : "inline";
            return ret;
        }
        
        $('#pob').bind('keypress', function(e){
           return IsNumeric(e);
        });
	},
	displayPOB : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		if (_this.privilage.dcrDoctorPobAmount == "YES") {
			$('#poblabel').parent().css('display', 'table-cell');
			$('#pob').parent().css('display', 'block');
			ED.setValue($('#pob'), _this.selectedDoctor.poAmount);
			
		}else {
			$('#poblabel').parent().css('display', 'none');
			$('#pob').parent().css('display', 'none');
		}
	},
	displaySpeciality : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		// include condition for flexi doctors
		if (_this.selectedDoctor.doctorCode == null || _this.selectedDoctor.doctorCode == "") {
			ED.setValue($('#specialitylabel'), "Speciality");
			if (this.specialities == null){
				this.specialities = com.swaas.hidoctor.edetailing.service.DCRService.getAllSpecialities();
			}
			var selectedSpeciality = new AutoComplete({
				options : this.specialities,
				label : [ "specialityName" ],
				listviewId : "specialitySelect",
				containerId : "specialityInputDiv",
				placeholder : 'Speciality Name',
				width: "140px",
				freeEntry : false,
				onTop : true,
				defaultValue: _this.selectedDoctor.specialityName,
				onKeyDown: function(keyCode){
					_this.selectedDoctor.specialityCode = "";
				}
			});
			selectedSpeciality.autocomplete();
			selectedSpeciality.addSelectListener(function(selectedItem) {
				if(_this.selectedDoctor != null){
					_this.selectedDoctor.specialityCode = selectedItem.specialityCode;
					_this.selectedDoctor.specialityName = selectedItem.specialityName;
				}
			});
		} else {
			ED.setValue($('#specialitylabel'), "");
			$("#specialityInputDiv").html("");
		}		
	},
	
	displayVisitTime : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		if (_this.configDCR.dcrDocVisitTimeEntryMode == "SERVER_TIME" && (_this.selectedDoctor.doctorVisitTime == null || _this.selectedDoctor.doctorVisitTime == "")){
				var date = new Date();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var ampm = hours >= 12 ? 'PM' : 'AM';
				hours = hours % 12;
				hours = hours ? hours : 12;
				hours = hours < 10 ? '0'+hours : hours;
				minutes = minutes < 10 ? '0'+minutes : minutes;
				var strTime = hours + ':' + minutes + ' ' + ampm; 
				_this.selectedDoctor.doctorVisitTime = strTime;
			}
		if($("#visitTime").length){
			ED.setValue($("#visitTime"), _this.selectedDoctor.doctorVisitTime);
		}
		if($("#visitTimeEntry").length){
			ED.setValue($("#visitTimeEntry"), _this.selectedDoctor.doctorVisitTime);
		}
		if (_this.selectedDoctor.visitMode != null && _this.selectedDoctor.visitMode != ''){
			$('#timeRadio').val(_this.selectedDoctor.visitMode).slider("refresh");
		} else {
			$('#timeRadio').val("AM").slider("refresh");
		}
		
		if (_this.selectedDoctor.modeOfEntry != null && _this.selectedDoctor.modeOfEntry == "A" ){
			//disable the visit time
			$($("#visitTimeEntry").parent()).find('a').css('display', 'none');
			$('#timeRadio').slider('disable');
		} else {
			$($("#visitTimeEntry").parent()).find('a').css('display', 'block');
			$('#timeRadio').slider('enable');
		}		

		if (_this.privilage.dcrDoctorVisitMode == "AM_PM") {
			$('#timeRadioDiv').show();
			$('#visitTimeDiv').hide();
			$('#visitTimeEntryDiv').hide();
			_this.selectedDoctor.visitMode = $('#timeRadio').val();
		} else {
			$('#timeRadioDiv').hide();
			
			if (_this.configDCR.dcrDocVisitTimeEntryMode == "SERVER_TIME"){
				$('#visitTimeDiv').show();
				$('#visitTimeDiv').html(_this.selectedDoctor.doctorVisitTime);
				$('#visitTimeEntryDiv').hide();
			} else {
				$('#visitTimeDiv').hide();
				$('#visitTimeEntryDiv').show();
			}
		}
		_this.displayPOB();
	},
	
	// Accompanists
	_loadAccompanists: function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);
		$("#accompanistlabel").text("Loading...");
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		if (_this.selectedDoctor.accompanists == null){
			_this.selectedDoctor.accompanists = 
				com.swaas.hidoctor.edetailing.service.DCRService.getDcrAccompanists(
							_this.selectedDoctor.doctorVisitCode, _this.dcrHeader.dcrActualDate, _this.selectedDoctor.doctorCode,  _this.selectedDoctor.doctorRegionCode, 
							_this.selectedDoctor.tpId);
		}
		$("#accompanistDiv  ol").empty();
		$.each(_this.selectedDoctor.accompanists, function(index, accompanist){
			_this.displayAccompanist(accompanist);
		});
		
		$("#accompanistlabel").text("Accompanist Details");
		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._loadInputs, 100);
	},
	
	
	displayAccompanist : function(accompanist) {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var li = $("<li style='margin-bottom:10px;' ></li>");
		li.data('accompanist', accompanist);
		var accompanistName = (accompanist.accUserName);
		var div = $('<div style="display: -webkit-box;"></div>');
		li.append(div);

		var div1 = $("<div style='width:350px'  />");
		div.append(div1);
		div1.append(accompanistName);
		var div2 = $("<div />");
		div.append(div2);
		var onlyDoctor = $('<input type="checkbox" ' + (accompanist.isOnlyForDoctor == 'Y'?'checked ': ' ')
					+ '" data-mini="true" data-theme="a"/>');
		onlyDoctor.click(function(e){
			if (this.checked == true){
				accompanist.isOnlyForDoctor = 'Y';
			} else {
				accompanist.isOnlyForDoctor = 'N';
			}
		});
		div2.append(onlyDoctor);
		div2.append('<label style="margin-left:5px;">&nbsp;Independent</label>');
		var div3 = $("<div />");
		div.append(div3);
		if (accompanist.modeOfEntry != 'A'){
			var deleteButton = $('<button data-mini="true" data-theme="a" ><span style="color:black">X</span></button>');
			deleteButton.click(function(e){
				var accompanistTobeRemoved = li.data('accompanist');
				var index = _this.selectedDoctor.accompanists.indexOf(accompanistTobeRemoved);
				console.log(index);
				_this.selectedDoctor.accompanists.splice(index, 1);
				li.remove();
			});
			div3.append(deleteButton);
		}
		
		$("#accompanistDiv  ol").append(li);
	},
	
	showAccompanistPopup : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		if (_this.accompanists == null){
			_this.accompanists = 
				com.swaas.hidoctor.edetailing.service.DCRService.getAllAccompanist();
			if (_this.accompanists.length == 0){
				alert("You donot have any accompanist to add");
				return;
			}
			$('#selectAccompanist').html('');
			$('#selectAccompanist').val([]);
			var option = $("<option selected value=''></option>");
			$('#selectAccompanist').append(option);
			
			$.each(_this.accompanists, function(index, accopmanist) {
				option = $("<option value='" + 
						accopmanist.userName + "'>"
						+ (accopmanist.userName)
						+ "</option>");
				$('#selectAccompanist').append(option);
				option.data('accompanist', accopmanist);
				
			});
			
			$('#selectAccompanist').change(function(e){
				var selectedValue = this.value;
				if (this.value != ""){
					$("#selectAccompanist > option").each(function() {
						   if (selectedValue == this.value){
							   $('#selectAccompanist').data('accompanist', $(this).data('accompanist'));
						   }
					});
				} else {
					$('#selectAccompanist').data('accompanist', null);
				}
			});
		} else {
			$('#selectAccompanist').val('');
			$('#selectAccompanist').selectmenu('refresh');
			if (_this.accompanists.length == 0){
				alert("You donot have any accompanist to add");
				return;
			}
		}
		
		$("#doctorCall").attr("checked", false);
		
		var saveButton = $('#saveInputAccompanist');
		saveButton.unbind('');
		saveButton.click(function(e){
			var selectedAccompanist = $('#selectAccompanist').data('accompanist');
			if (selectedAccompanist == null){
				alert("Please select the Accompanist");
				return;
			}
			var alreadyAdded = false;
			$.each(_this.selectedDoctor.accompanists, function(index, existingAccompanist){
				if (existingAccompanist.accUserName == selectedAccompanist.userName &&
						existingAccompanist.accRegionCode == selectedAccompanist.regionCode){
					alert(existingAccompanist.accUserName + " already added as Accompanist for this doctor");
					alreadyAdded = true;
				}
			});
			
			if (alreadyAdded){
				return;
			}
			
			var accompanist = {
				accUserName : selectedAccompanist.userName,
				accRegionCode : selectedAccompanist.regionCode,
				isOnlyForDoctor: ($("#doctorCall").is(':checked') ? "Y" : "N"),
				modeOfEntry: "M"
			};
			_this.displayAccompanist(accompanist);
			_this.selectedDoctor.accompanists.push(accompanist);
			$('#showAddAccompanist').popup('close');
		});

		$('#showAddAccompanist').popup('open');
	},
	
	
	// Input Product
	_loadInputs: function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);
		$("#lblinputs").text("Loading...");
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		if (_this.selectedDoctor.inputProducts == null){
			_this.selectedDoctor.inputProducts = com.swaas.hidoctor.edetailing.service.DCRService.getInputProducts(_this.selectedDoctor.doctorVisitCode);
		}
		
		$("#productInputDiv  ol").empty();
		$.each(_this.selectedDoctor.inputProducts, function(index, product) {
			_this.displayInput(product);
		});
		
		$("#lblinputs").text("Inputs");
		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._loadDetailedProducts, 100);
			
	},
	
	displayInput : function(product) {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var li = $('<li />');
		li.data('product', product);
		var div = $('<div  style="display: -webkit-box;" />');
		li.append(div);
		
		var quantityDiv = $('<div id="quantityDiv' + product.productCode
				+ '"></div>');
		var nameDiv = $('<div style="width:250px"><label>' + product.productName + '<label></div>');
		var detailedDiv = $('<div ></div>');
		
		var detailed = $('<input type="checkbox" data-mini="true" data-theme="a" ' + (product.isDetailed == '1'?'checked':'') + '/>');
		detailedDiv.append(detailed);
		detailedDiv.append('&nbsp;&nbsp;<label>Detailed</label>');
		
		detailed.click(function(e){
			if (this.checked == true){
				product.isDetailed = '1';
			} else {
				product.isDetailed = '0';
			}
		});
		
		var deleteDiv = $('<div style="min-width: 50px;text-align:right"/>');
		var deleteButton = $('<button data-mini="true" data-theme="a" ><span style="color:black">X</span></button>');
		deleteDiv.append(deleteButton);
		deleteButton.click(function(e){
			var productTobeRemoved = li.data('product');
			var index = _this.selectedDoctor.inputProducts.indexOf(productTobeRemoved);
			_this.selectedDoctor.inputProducts.splice(index, 1);
			li.remove();
		});
		
	
		div.append(nameDiv);
		div.append(quantityDiv);
		//div.append(detailedDiv); removed as per CR dt: 25/10/13
		div.append(deleteDiv);
		$("#productInputDiv  ol").append(li);

		new QuantityInput({
			placeholder : "Quantity Input",
			width : "150px",
			containerId : "quantityDiv" + product.productCode,
			defaultValue : product.qtyGiven,
			onChange : function (value){
				product.qtyGiven = value;
			}

		});	
		
	},
	
	showInputPopup: function(){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		if (_this.inputProducts == null){
			if (_this.privilage.dcrProductBringType == null){
				_this.privilage.dcrProductBringType = "";
			}
			var bringTypes = _this.privilage.dcrProductBringType.split(",");
			_this.inputProducts = [];
			$.each(bringTypes, function(i, bringType){
				var inputProductsTypewise = com.swaas.hidoctor.edetailing.service.DCRService.getInputProductsAutocomplete(bringType);
				_this.inputProducts = _this.inputProducts.concat(inputProductsTypewise);
			});
						
			_this.inputProduct = new AutoComplete({
				options : _this.inputProducts,
				label : ["productName"],
				listviewId : "selectInputProduct",
				containerId : "inputProductDiv",
				placeholder : 'Input Name',
				width: "430px",
				freeEntry : false,
				onTop : false,
				onKeyDown: function(keyCode){
					_this.selectedInputProduct = null;
				}
			});
			_this.inputProduct.autocomplete();
			
			_this.inputProduct.addSelectListener(function(selectedItem) {
				_this.selectedInputProduct = selectedItem;
			});
			
			_this.inputProductQuanity = new QuantityInput({
				placeholder : "Quantity Input",
				containerId : "inputProductQuantityDiv",
				defaultValue : 0
			});
		}else {
			_this.inputProduct.setValue("");
			_this.inputProductQuanity.setValue(0);
		}
		
		$("#inputProductDetailed").attr("checked", false);
		$("#detailedCheckBox").hide();
		
		var saveButton = $('#saveInputProduct');
		saveButton.unbind('');
		saveButton.click(function(e){
			var selectedProduct = _this.selectedInputProduct;
			if (selectedProduct == null){
				alert("Please select the Product");
				return;
			}
			var alreadyAdded = false;
			$.each(_this.selectedDoctor.inputProducts, function(index, existingProduct){
				if (existingProduct.productCode == selectedProduct.productCode){
					alert("Product Already added");
					alreadyAdded = true;
				}
			});
			
			if (alreadyAdded){
				return;
			}
			
			var product = {
               	 productCode: selectedProduct.productCode,
            	 productName: selectedProduct.productName,
            	 specialityCode: selectedProduct.specialityCode,
            	 qtyGiven : _this.inputProductQuanity.val(),
            	 isDetailed: ($("#inputProductDetailed").is(':checked') ? "1" : "0")
             };
			
			_this.displayInput(product);
			_this.selectedDoctor.inputProducts.push(product);
			$('#showAddInputPopup').popup('close');
		});
		
		$('#showAddInputPopup').popup('open');		
	},
	
	
	// Detailed Product
	_loadDetailedProducts: function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);
		$("#detailedlabel").text("Loading...");
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		if (_this.selectedDoctor.detailedProducts == null || _this.selectedDoctor.detailedProducts == undefined){
			_this.selectedDoctor.detailedProducts = 
					com.swaas.hidoctor.edetailing.service.DCRService.getDetailedProducts(
								_this.selectedDoctor.doctorVisitCode, _this.dcrHeader.dcrActualDate, _this.selectedDoctor.doctorCode,  _this.selectedDoctor.doctorRegionCode);
		}
		
		$("#detailedInputDiv  ol").empty();
		$.each(_this.selectedDoctor.detailedProducts, function(index, product) {
			_this.displayDetailedProduct(product);
		});
		$("#detailedlabel").text("List of Detailed Products");

		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._loadChemists, 100);
		
	},
	
	displayDetailedProduct : function(product) {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var li = $('<li />');
		li.data('product', product);
		var div = $('<div  style="display: -webkit-box;" />');
		li.append(div);
		
		var nameDiv = $('<div style="min-width: 300px;"><label>' + product.salesProductName + '<label></div>');
		
		var deleteDiv = $('<div style="min-width: 50px;text-align:right"/>');
		if (product.modeOfEntry != 'A'){
			var deleteButton = $('<button data-mini="true" data-theme="a" ><span style="color:black">X</span></button>');
			deleteDiv.append(deleteButton);
			deleteButton.click(function(e){
				var productTobeRemoved = li.data('product');
				var index = _this.selectedDoctor.detailedProducts.indexOf(productTobeRemoved);
				_this.selectedDoctor.detailedProducts.splice(index, 1);
				li.remove();
			});
		}
		
		div.append(nameDiv);
		
		div.append(deleteDiv);
		$("#detailedInputDiv  ol").append(li);
		
	},
	
	showDetailedProductPopup: function(){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		if (_this.detailedProducts == null){
			_this.detailedProducts = com.swaas.hidoctor.edetailing.service.DCRService.getInputProductsAutocomplete(
									"SALES");
			
			_this.detailedProduct = new AutoComplete({
				options : _this.detailedProducts,
				label : ["productName"],
				listviewId : "selectDetailedProduct",
				containerId : "detailedProductDiv",
				placeholder : 'Product Name',
				width: "430px",
				freeEntry : false,
				onTop : false,
				onKeyDown: function(keyCode){
					_this.selectedDetailedProduct = null;
				}
			});
			_this.detailedProduct.autocomplete();
			
			_this.detailedProduct.addSelectListener(function(selectedItem) {
				_this.selectedDetailedProduct = selectedItem;
			});
			
		} else {
			_this.detailedProduct.setValue("");
		}

		var saveButton = $('#saveDetailedProduct');
		saveButton.unbind('');
		saveButton.click(function(e){
			var selectedProduct = _this.selectedDetailedProduct;
			if (selectedProduct == null){
				alert("Please select the Product");
				return;
			}
			var alreadyAdded = false;
			$.each(_this.selectedDoctor.detailedProducts, function(index, existingProduct){
				if (existingProduct.salesProductCode == selectedProduct.productCode){
					alert("Product Already added");
					alreadyAdded = true;
				}
			});
			
			if (alreadyAdded){
				return;
			}
			
			var product = {
					salesProductCode: selectedProduct.productCode,
					salesProductName: selectedProduct.productName,
					modeOfEntry : 'M'
             };
			
			_this.displayDetailedProduct(product);
			_this.selectedDoctor.detailedProducts.push(product);
			$('#showAddDetailedProductPopup').popup('close');
		});
		
		$('#showAddDetailedProductPopup').popup('open');		
	},
	
	
	// Chemists
	_loadChemists: function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);
		$("#lblchemists").text("Loading...");
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		if (_this.selectedDoctor.chemists == null){
			_this.selectedDoctor.chemists = 
					com.swaas.hidoctor.edetailing.service.DCRService.getChemistVisits(
								_this.selectedDoctor.doctorVisitCode);
		}
		
		$("#chemistSelectTableTR").empty();
		$('#chemistDetailTable').hide();
		$('.btnAddChemistProductDiv').hide();
		$('#rcpaDiv').hide();
		_this.previousSelectedChemist = null;
		$.each(_this.selectedDoctor.chemists, function(index, chemist) {
			if((chemist.rcpa == null || chemist.rcpa == []) && chemist.chemistVisitCode != null) {
				chemist.rcpa = com.swaas.hidoctor.edetailing.service.DCRService.getDcrRcpa(chemist.chemistVisitCode);
			}
			_this.displayChemist(chemist);
		});
		
		var td = $('<td><div><img src="images/add.jpg"></div></td>');
		td.unbind();
		td.click(function(e){
			_this.showAddChemist();
		});
		
		$("#chemistSelectTableTR").append(td);
		$("#lblchemists").text("Chemists");
		
		_this.selectedDoctorBackup = JSON.parse(JSON.stringify(_this.selectedDoctor));
	},
	
	displayChemist : function(chemist, insertBefore) {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var td = $('<td style="background-color: #425161;font-size: 16px;"></td>');
		var table = $('<table style="width:100%"><tr></tr></table>');
		td.append(table);
		var tr = $('<tr />');
		table.append(tr);
		var tdChemistName = $('<td>' + chemist.chemistName + '</td>');
		tr.append(tdChemistName);
		var tdDeletButton = $('<td align="right">&nbsp;</td>');
		tr.append(tdDeletButton);
		
		td.data('chemist', chemist);
		tdChemistName.click(function(e){
			
			if (_this.previousSelectedChemist == td){
				return;
			}
			
			tdDeletButton.html("");
			var deleteButton = $('<button data-rel="back" data-role="button" data-theme="r" data-icon="delete" data-iconpos="notext" ' + 
					'class="ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-r" data-corners="true" ' + 
					'data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="Delete"><span class="ui-btn-inner">' + 
					'<span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></button>');
			tdDeletButton.append(deleteButton);
			
			
			var _currentChemistTab = td;
			tdDeletButton.unbind();
			
			tdDeletButton.click(function(e){
				if (confirm("Do you want to delete the Chemist and RCPA details?") == true){
					var index = _this.selectedDoctor.chemists.indexOf(chemist);
					 _this.selectedDoctor.chemists.splice(index, 1);	
					$('#chemistDetailTable').hide();
					$('.btnAddChemistProductDiv').hide();
					$('#rcpaDiv').hide();
					_currentChemistTab.remove();
				}
			});
			
			td.css("background-color", "#266389");
			if (_this.previousSelectedChemist != null){
				_this.previousSelectedChemist.css("background-color", "#425161");
				var prevousTD = $(_this.previousSelectedChemist.find("tr").children()[1]);
				prevousTD.html("");
			}
			_this.previousSelectedChemist = td;
			_this.displayChemistDetails(chemist);
		});
		if (insertBefore == null){
			$("#chemistSelectTableTR").append(td);
		} else {
			td.insertBefore(insertBefore);
		}
		return td;
	},
	
	displayChemistDetails : function(chemist) {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		
		$('#chemistNameLabel').html(chemist.chemistName);
		$('#chemistDetailTable').show();
		$('.btnAddChemistProductDiv').show();
		$('#rcpaDiv').show();
		ED.setValue($("#chemistPob"), chemist.poAmount);
		$("#chemistPob").unbind();
		$("#chemistPob").change(function(e){
			if (this.value != ""){
				this.value = Math.abs(this.value);
			} else {
				this.value = "0";
			}
			chemist.poAmount = this.value;
		});
		
		if (chemist.rcpa == null && chemist.chemistVisitCode != null){
			chemist.rcpa = com.swaas.hidoctor.edetailing.service.DCRService.getDcrRcpa(chemist.chemistVisitCode);
			if (chemist.rcpa == null){
				chemist.rcpa = [];
			}
		}
		
		_this.displayAllRCPA(chemist);
		
		
		$("#btnAddChemistProduct").unbind();
		$("#btnAddChemistProduct").click(function(e){
			_this.showChemistProduct(chemist);
		});
	},
	
	displayAllRCPA: function(chemist){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var rcpaTable = $('#rcpaTable');
		rcpaTable.empty();
		var tr = $('<tr style="background-color: #2A4b74;line-height:28px;" >' +
						'<th align="left" style="font-weight:normal;"><label>Sale product</label></th>' +
						'<th style="font-weight:normal;"><label>Qty</label></th>' +
						'<th align="left" style="font-weight:normal;"><label>Competitor Product</label></th>' +
						'<th colspan="2" style="font-weight:normal;"></th>' +
					'</tr>');
		
		rcpaTable.append(tr);

		$.each(chemist.rcpa, function(index, salesProduct){
			_this.displayRCPA(chemist, index, salesProduct);
		});
		
	},
	
	displayRCPA: function(chemist, index, salesProduct){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var colours = [ '#266389', '#388BBF' ];
		var rowObject = $('<tr />');
		
		rowObject.data('product', salesProduct);
		$('#rcpaTable').append(rowObject);
		rowObject.css('background-color', colours[index % 2]);
		
		var column1 = $('<td style="vertical-align:top" />');
		column1.append('<label>' + salesProduct.salesProductName + '</label>');
		rowObject.append(column1);
		
		var column2 = $('<td align="center" valign="top"><label>' + salesProduct.supportQty + '</label></td>' );
		rowObject.append(column2);
		
		
		var column3 = $('<td valign="top"/>');
		
		var column3Table = $('<table width = "100%" />');
		column3.append(column3Table);
		$.each(salesProduct.competitorProducts, function(i, competitorProduct) {
			var column3TR = $('<tr />');
			column3TR.data('product', competitorProduct);
			column3Table.append(column3TR);
			column3TR.append('<td>' + competitorProduct.competitorProductName + '</td>');
			column3TR.append('<td align = "center">' + competitorProduct.supportQty + '</td>');
			var td = $('<td />');
			column3TR.append(td);
			var deleteButton = $('<button data-mini="true" data-theme="a" ><span style="color:black">X</span></button>');
			td.append(deleteButton);
			deleteButton.click(function(e){
				if (confirm("Are you sure to delete?") == true){
					var productTobeRemoved = column3TR.data('product');
					var index = salesProduct.competitorProducts.indexOf(productTobeRemoved);
					salesProduct.competitorProducts.splice(index, 1);
					column3TR.remove();
				}
				
				
			});
		});
		rowObject.append(column3);
		var column4 = $('<td valign="top" />');

		var editButton = $('<img src="images/edit.png" style="height: 20px; width: 20px" />');
		column4.append(editButton);
		editButton.click(function(e){
			_this.showChemistProduct(chemist, salesProduct);
		});
		//showChemistProduct
		//column4.append('<img src="images/edit.png" style="height: 20px; width: 20px" data-saleproduct='+"'"+ JSON.stringify(salesProduct)+"'"
		//			+	' onclick="com.swaas.hidoctor.edetailing.ui.view.Dcr.editSalesProduct(this);" />');
		rowObject.append(column4);
		var column5 = $('<td valign="top"/>');
		var deleteButton = $('<img src="images/delete.png" style="height: 20px; width: 20px" />');
		deleteButton.click(function (e){
			if (confirm("Are you sure to delete?") == true){
				var productTobeRemoved = rowObject.data('product');
				var index = chemist.rcpa.indexOf(productTobeRemoved);
				chemist.rcpa.splice(index, 1);
				rowObject.remove();
			}
			
		});
		column5.append(deleteButton);
		rowObject.append(column5);
	},
	
	
	showAddChemist : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		if (_this.chemists == null){
			var chemistRegionCode = ED.context.currentUser.regionCode;
			if (_this.privilage.showAccompanistData != null && _this.privilage.showAccompanistData.indexOf("CHEMIST") != -1){
				chemistRegionCode = null;
			}
			_this.chemists = com.swaas.hidoctor.edetailing.service.DCRService.getChemists(chemistRegionCode);
			_this.chemist = new AutoComplete({
				options : _this.chemists,
				label : ["customerName"],
				listviewId : "selectChemist",
				containerId : "selectChemistDiv",
				placeholder : 'Chemist Name',
				width: "430px",
				freeEntry : true,
				onTop : false
			});
			_this.chemist.autocomplete();
			
			_this.chemist.addSelectListener(function(selectedItem) {
				_this.selectedChemist = selectedItem;
			});
		} else {
			_this.chemist.setValue("");
		}
	
		var saveButton = $('#saveChemist');
		saveButton.unbind('');
		saveButton.click(function(e){
			var selectedChemist = _this.selectedChemist;
			if (selectedChemist == null && _this.chemist.val() == null){
				alert("Please select the Chemist");
				return;
			}
			var alreadyAdded = false;
			var freeEnteredValue = false;
			if (selectedChemist == null){
				freeEnteredValue = true;
			}
			$.each(_this.selectedDoctor.chemists, function(index, existingChemist){
					if(freeEnteredValue == false) {
					if (existingChemist.chemistCode == selectedChemist.customerCode){
						alert("Chemist Already added");
						alreadyAdded = true;
					}
				}
			});
			if (alreadyAdded){
				return;
			}
			if (freeEnteredValue == true){
				var chemistName = _this.chemist.val();
				if(chemistName != null && chemistName.trim() == ""){
					alert("Please enter the Chemist");
					return;
				}
				if(chemistName != "" && _this.configDCR.restrictedSpecialCharacters != null && _this.configDCR.restrictedSpecialCharacters != ""){
					var length = _this.configDCR.restrictedSpecialCharacters.length - 1;
					while (length >= 0) {
						var specialChar = _this.configDCR.restrictedSpecialCharacters.charAt(length);
						if(chemistName.indexOf(specialChar) >= 0){
							alert("Special character "+ specialChar +" is not allowed in chemist name. Please remove the special character");
							return false;
						}
						length--;
					}
				}
			}
			var chemist = {};
			if (freeEnteredValue == true){
				chemist.chemistName = _this.chemist.val();
				chemist.isAccChemist = "N"; 
			} else {
				chemist.chemistCode = selectedChemist.customerCode;
				chemist.chemistName = selectedChemist.customerName;
				if (selectedChemist.regionCode != ED.context.currentUser.regionCode){
					chemist.isAccChemist = "Y"; 
				} else {
					chemist.isAccChemist = "N"; 
				}
			}
			chemist.poAmount = 0;
			chemist.rcpa = [];

			_this.selectedDoctor.chemists.push(chemist);
			var chemistTD = _this.displayChemist(chemist, $("#chemistSelectTableTR").children().filter(":last")[0]);
			$('#showAddChemistPopup').popup('close');
			_this.selectedChemist = null;
			chemistTD.click();
		});
			
		$('#showAddChemistPopup').popup('open');		
	},
	
	showChemistProduct : function(chemist, existingProduct) {
		var isAdd = true;
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		if (existingProduct == null){
			_this.currentRCPA = {supportQty:0};
		} else {
			_this.currentRCPA = JSON.parse(JSON.stringify(existingProduct));
			isAdd = false;
		}
		$('#chemistNameSales').html(" - "+chemist.chemistName);
		ED.setValue($("#competitorProductLabel"), "");
		$("#chemistRCPAInput").html("");
		
		_this.competitorProducts =
			com.swaas.hidoctor.edetailing.service.DCRService.getCompetitorProducts(_this.currentRCPA.salesProductCode);			
		
		if (_this.rcpaProducts == null){
			_this.rcpaProducts = com.swaas.hidoctor.edetailing.service.DCRService.getInputProductsAutocomplete(
									"SALES");
			
			_this.rcpaProduct = new AutoComplete({
				options : _this.rcpaProducts,
				label : ["productName"],
				listviewId : "chemistSalesInput",
				containerId : "chemistSalesInputDiv",
				placeholder : 'Product Name',
				width: "400px",
				freeEntry : false,
				onTop : false,
				readOnly: (!isAdd),
				defaultValue: _this.currentRCPA.salesProductName
			});
			_this.rcpaProduct.autocomplete();
			_this.rcpaProduct.addSelectListener(function(selectedItem) {
				_this.currentRCPA.salesProductCode = selectedItem.productCode;
				_this.currentRCPA.salesProductName = selectedItem.productName;
				
				_this.competitorProducts =
						com.swaas.hidoctor.edetailing.service.DCRService.getCompetitorProducts(_this.currentRCPA.salesProductCode );			
						
				ED.setValue($("#competitorProductLabel"), "Competitor Products");
				$('#chemistRCPAInput').html('');
				_this.currentRCPA.competitorProducts = [];
				_this.compProdInput = new SalesInput({
					containerId : "chemistRCPAInput",
					products : _this.competitorProducts,
					width: "150px"
				});
			});
			
			_this.rcpaProductQuantity = new QuantityInput({
				placeholder : "Quantity Input",
				width : "230px",
				containerId : "saleProductQuantityDiv",
				defaultValue : _this.currentRCPA.supportQty,
				onChange: function(value){
					_this.currentRCPA.supportQty = value;
				}

			});
			
		} else {
			_this.rcpaProduct.setValue(_this.currentRCPA.salesProductName);
			_this.rcpaProductQuantity.setValue(_this.currentRCPA.supportQty);
		}
		
		_this.rcpaProduct.setDisabled(!isAdd);
		if (_this.currentRCPA.competitorProducts != null){
			$('#chemistRCPAInput').html('');
			_this.compProdInput = new SalesInput({
				containerId : "chemistRCPAInput",
				products : _this.competitorProducts,
				width: "110px",
				values: _this.currentRCPA.competitorProducts
			});
		}
		
		var saveButton = $('#saveRCPA');
		saveButton.unbind();
		saveButton.click(function() {
			if (isAdd){
				var selectedSaleProduct = _this.currentRCPA.salesProductCode;
				if (selectedSaleProduct == null){
					alert("Please select the Product");
					return;
				}
				var alreadyAdded = false;
				$.each(chemist.rcpa, function(index, exitingProduct){
					if (_this.currentRCPA.salesProductCode == exitingProduct.salesProductCode){
						alert("Product Already added");
						alreadyAdded = true;
					}
				});
				if (alreadyAdded){
					return;
				}
			}
			
			_this.currentRCPA.competitorProducts = _this.compProdInput.val();
			var inValid = false;
			var specialChars = _this.configDCR.restrictedSpecialCharacters;
			$.each(_this.currentRCPA.competitorProducts, function(index, competitorProduct){
				var compName = competitorProduct.competitorProductName;
				if(compName != "" && specialChars != null && specialChars != ""){
					var length = specialChars.length - 1;
					while (length >= 0) {
						var specialChar = specialChars.charAt(length);
						if(compName.indexOf(specialChar) >= 0){
							alert("Special character "+ specialChar +" is not allowed in competitor product. Please remove the special character");
							inValid = true;
						}
						length--;
					}
				}

			});
			if(inValid){
				return;
			}
			
			if (chemist.rcpa == null){
				chemist.rcpa = [];
			}
			
			
			if (isAdd){
				chemist.rcpa.push(_this.currentRCPA);				
				_this.displayRCPA(chemist, chemist.rcpa.length-1, _this.currentRCPA);
			}  else {
				//var index = chemist.rcpa.indexOf(existingProduct);
				existingProduct.supportQty = _this.currentRCPA.supportQty;
				existingProduct.competitorProducts = _this.currentRCPA.competitorProducts;
				_this.displayAllRCPA(chemist);
			}
			

			$('#showAddRCPAPopup').popup('close');

		});
		
		$('#showAddRCPAPopup').popup('open');
		
	},
	
	onSave : function() {	
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var div = $('#saving');
		if($('#saving').length){
			div.html('Validating...');
		} else {
			div = $("<div id='saving' style='background-color:white;color:black;width:100px;text-align:center;z-index:9990;display:none'>Validating...</div>");
			$(document.body).append(div);
		}
		div.screenCenter();
		div.show();
		setTimeout(_this.validateAndSaveDcr, 100);
	},
	
	validateAndSaveDcr : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var div = $('#saving');
		if (_this.selectedDoctor.doctorCode == null || _this.selectedDoctor.doctorCode ==""){
			//Flexi doctor
			if (_this.selectedDoctor.specialityName == null || _this.selectedDoctor.specialityName == ""){
				div.hide();
				alert('Speciality is mandatory');
				return;
			}
		}
	
		var doctorVisitTime = _this.selectedDoctor.doctorVisitTime;
		if(_this.privilage.dcrDoctorVisitMode != null && _this.privilage.dcrDoctorVisitMode =="VISIT_TIME_MANDATORY" 
				&& (doctorVisitTime == null || doctorVisitTime == "")){
			div.hide();
			alert('Visit time is mandatory');
			return;
		}

		var uniqueAccompanists = com.swaas.hidoctor.edetailing.service.DCRService.getAccompanistOfOtherDoctors(_this.dcrHeader.dcrCode, _this.selectedDoctor.doctorVisitCode);
		
		$.each(_this.selectedDoctor.accompanists, function(index, accompanist){
			uniqueAccompanists[accompanist.accUserName] = accompanist.accUserName;
		});
				
		var uniqueAccompanistsCount = 0;
		
		for (var key in uniqueAccompanists) {
		  if (uniqueAccompanists.hasOwnProperty(key)) {
			  uniqueAccompanistsCount++;
		  }
		}
		
		if (_this.configDCR.maxAccompanistForADay == null ||_this.configDCR.maxAccompanistForADay == ""){
			_this.configDCR.maxAccompanistForADay = 4;
		}
		
		if (uniqueAccompanistsCount > _this.configDCR.maxAccompanistForADay){
			div.hide();
			alert("You crossed the maximum limit of " + _this.configDCR.maxAccompanistForADay + " accompanists for the day");
			return;
		}
		
		if (_this.privilage.dcrInputMandatoryNumber != null && _this.privilage.dcrInputMandatoryNumber != "" && _this.privilage.dcrInputMandatoryNumber > 0){
			if (_this.selectedDoctor.inputProducts.length < _this.privilage.dcrInputMandatoryNumber){
				div.hide();
				alert("Please enter atleast " + _this.privilage.dcrInputMandatoryNumber + " input products");
				return;				
			}
		}
		
		
		if (_this.privilage.dcrChemistMandatoryNumber != null && _this.privilage.dcrChemistMandatoryNumber != "" && _this.privilage.dcrChemistMandatoryNumber > 0){
			if (_this.selectedDoctor.chemists.length < _this.privilage.dcrChemistMandatoryNumber){
				div.hide();
				alert("Please enter atleast " + _this.privilage.dcrChemistMandatoryNumber + " chemists");
				return;
			}
		}
		
		var rcpaCount = 0;
		$.each(_this.selectedDoctor.chemists, function(index, chemist){
			if (chemist.rcpa != null){
				rcpaCount += chemist.rcpa.length;
			}
		});
		
		if (_this.privilage.rcpaMandatoryDoctorCategory != null && _this.privilage.rcpaMandatoryDoctorCategory != "" && 
				_this.selectedDoctor.categoryName != null && _this.selectedDoctor.categoryName != "" &&_this.privilage.rcpaMandatoryDoctorCategory.indexOf(_this.selectedDoctor.categoryName) != -1){
			if (rcpaCount == 0){
				div.hide();
				alert("Please enter atleast 1 RCPA details");
				return;	
			}
		}
		
		var remarkByUser = _this.selectedDoctor.remarksByUser;
		if(remarkByUser != null && remarkByUser != "" && (typeof remarkByUser != undefined) 
				&& _this.configDCR.restrictedSpecialCharacters != null && _this.configDCR.restrictedSpecialCharacters != ""){
			var length = _this.configDCR.restrictedSpecialCharacters.length - 1;
			while (length >= 0) {
				var specialChar = _this.configDCR.restrictedSpecialCharacters.charAt(length);
				if(remarkByUser.indexOf(specialChar) >= 0){
					div.hide();
					alert("Special character "+ specialChar +" is not allowed in Remark. Please remove the special character");
					return false;
				}
				length--;
			}
		}

		div.hide();
		div.screenCenter();
		div.show();
		div.html('Saving...');
		setTimeout(_this.saveDCR, 100);
	},
	
	saveDCR: function(){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		_this.dcrHeader.lattitude = ED.latitude;
		_this.dcrHeader.longitude = ED.longitude;
		_this.dcrHeader.geoAddress = ED.geoAddress;
		
		com.swaas.hidoctor.edetailing.service.DCRService.saveDCR(_this.dcrHeader, _this.selectedDoctor);
		var index = _this.doctors.indexOf(_this.selectedDoctor);
		var nextDoctor = (index == -1 || typeof (_this.doctors[index + 1]) == "undefined") ? _this.selectedDoctor : _this.doctors[index + 1];
		_this.selectedDoctor = nextDoctor;
		_this.selectedDoctorBackup = nextDoctor;
		ED.redirect("view/dcr/dcrNew.html", {selectedDoctor: nextDoctor});
	},
	
	showAddDoctorPopup : function() {
		
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		if (_this.doctors.length != 0 && _this.selectedDoctor != null && JSON.stringify(_this.selectedDoctor) != JSON.stringify(_this.selectedDoctorBackup)){
			if (confirm("You have not saved the changes of the Dr. " + _this.selectedDoctor.doctorName + ", do you want to continue with out saving?") == false){
				return;
		    } 
		}
		 		
		if (_this.accompanistsForDoctor == null){
			_this.accompanistsForDoctor = 
				com.swaas.hidoctor.edetailing.service.DCRService.getAllAccompanist();
		}
		$('#selectAccompanistForDoctor').html('');
		$('#selectAccompanistForDoctor').val([]);
		var option = $("<option selected value='None'></option>");
		$('#selectAccompanistForDoctor').append(option);
		option = $("<option value='Mine'>Mine</option>");
		option.data('accompanist',{regionCode : ED.context.currentUser.regionCode});
		$('#selectAccompanistForDoctor').append(option);
		$.each(_this.accompanistsForDoctor, function(index, accopmanist) {
			option = $("<option value='" + accopmanist.userName + "'>"
					+ accopmanist.userName 
					+ "</option>");
			$('#selectAccompanistForDoctor').append(option);
			option.data('accompanist', accopmanist);
			
		});
		$("#selectMyDoctorDiv").hide();
		
		$('#selectAccompanistForDoctor').val('');
		$('#selectAccompanistForDoctor').selectmenu('refresh');

		$('#selectAccompanistForDoctor').change(function(e){
			if (this.value != ""){
				var option = $("#selectAccompanistForDoctor option[value='" + this.value + "']");
				var accompanist = option.data('accompanist');
				setTimeout(function(){
					_this.showDoctorListInDoctorPopup(accompanist);
				}, 100);
			}
		});

		
		$('#showAddDoctors').popup('open');
		_this.selectedNewDoctor = {};
		
		var saveButton = $('#saveAddDoctor');
		saveButton.unbind();
		saveButton.click(function() {
			var isFlexi = false;
			if (_this.selectedNewDoctor.customerCode == null){
				if (_this.selectedNewDoctor.customerName == null || _this.selectedNewDoctor.customerName == ""){
					alert("Please choose the doctor");
					return false;
				} else {
					if (_this.privilage.rigidDoctorEntry != null && _this.privilage.rigidDoctorEntry != "" && _this.privilage.rigidDoctorEntry != "NO"){
						alert("Please choose the doctor");
						return false;
					}
					if(_this.configDCR.restrictedSpecialCharacters != null && _this.configDCR.restrictedSpecialCharacters != ""){
						var length = _this.configDCR.restrictedSpecialCharacters.length - 1;
						var docName = _this.selectedNewDoctor.customerName;
						while (length >= 0) {
							var specialChar = _this.configDCR.restrictedSpecialCharacters.charAt(length);
							if(docName.indexOf(specialChar) >= 0){
								alert("Special character "+ specialChar +" is not allowed in doctor name. Please remove the special character");
								return false;
							}
							length--;
						}
					}
					isFlexi = true;
				}
			}
			var alreadyExists = false;
			if (isFlexi == true){
				$.each(_this.doctors, function(index, doctor){
					if (doctor.doctorCode == null && doctor.doctorName == _this.selectedNewDoctor.customerName){
						alreadyExists = true;
					}
				});
			} else {
				$.each(_this.doctors, function(index, doctor){
					if (doctor.doctorCode != null && doctor.doctorCode == _this.selectedNewDoctor.customerCode){
						alreadyExists = true;
					}
				});
			}
			
			if (alreadyExists == true){
				alert("Doctor already added");
				return false;
			}

			if (isFlexi != true){
				var doctorSelected = null;
				$.each(_this.regionWiseDoctors[_this.selectedNewDoctor.doctorRegionCode], function (index, doctor){
					if (doctor.customerCode == _this.selectedNewDoctor.customerCode){
						doctorSelected = doctor;
					}
				});
				_this.selectedNewDoctor.categoryCode = doctorSelected.categoryCode;
				_this.selectedNewDoctor.specialityCode = doctorSelected.specialityCode;
				var speciality = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(doctorSelected.specialityCode);
				if (speciality != null){
					_this.selectedNewDoctor.specialityName = speciality.specialityName;
				}
				
				var category = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get(doctorSelected.categoryCode);
				if (category != null){
					_this.selectedNewDoctor.categoryName = category.categoryName;
				}
				_this.selectedNewDoctor.mdl = doctorSelected.mdl;
				_this.selectedNewDoctor.doctorVisitTime = "";
			} else {
				_this.selectedNewDoctor.categoryName = "";
				_this.selectedNewDoctor.specialityName = "";
				_this.selectedNewDoctor.mdl = "";
				_this.selectedNewDoctor.categoryCode = "";
				_this.selectedNewDoctor.doctorVisitTime = "";
			}
			_this.selectedNewDoctor.enteredDateTime = new Date();
			_this.selectedNewDoctor.modeOfEntry = "M";
			_this.selectedNewDoctor.visitMode = "";
			_this.selectedNewDoctor.doctorCode = _this.selectedNewDoctor.customerCode;
			_this.selectedNewDoctor.doctorName = _this.selectedNewDoctor.customerName;
			_this.selectedNewDoctor.sourceOfEntry = "Tablet";
			_this.selectedNewDoctor.isAccDoctor = (ED.context.currentUser.regionCode == _this.selectedNewDoctor.doctorRegionCode?"N":"Y");
			_this.selectedNewDoctor.lattitude = ED.latitude;
			_this.selectedNewDoctor.longitude = ED.longitude;
			_this.selectedNewDoctor.geoAddress = ED.geoAddress;
			_this.doctors.push(_this.selectedNewDoctor);
			var doctorTR = _this.doctorTable.addDoctor(_this.selectedNewDoctor, _this.doctors.length-1);
			doctorTR.click();
			$('#showAddDoctors').popup('close');
		});

	},
	
	showDoctorListInDoctorPopup: function(accompanist){
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		if (accompanist != null && accompanist.regionCode != null){
			var regionCode = accompanist.regionCode;
			if (_this.regionWiseDoctors == null){
				_this.regionWiseDoctors = {};
			}
			
			if (_this.regionWiseDoctors[regionCode] == null){
				_this.regionWiseDoctors[regionCode] = com.swaas.hidoctor.edetailing.service.DCRService.getMyDoctors(regionCode);
			}
			$("#selectMyDoctorDiv").show();
			$("#selectMyDoctorDiv").html("");
			
			var myDoctorSelect = new AutoComplete({
				options : _this.regionWiseDoctors[regionCode],
				label : [
						"customerName",
						"mdl",
						"specialityName" ],
				listviewId : "selectMyDoctor",
				containerId : "selectMyDoctorDiv",
				placeholder : 'Doctor Name',
				freeEntry : (_this.privilage.rigidDoctorEntry == null || _this.privilage.rigidDoctorEntry != "YES"),
				onTop: true,
				width: "420px",
				onChange: function(value){
					_this.selectedNewDoctor = {};
					_this.selectedNewDoctor.customerName = value;
					_this.selectedNewDoctor.doctorRegionCode = accompanist.regionCode;
					if(accompanist.userName != null){
						var autoAccompanist = {
								accUserName: accompanist.userName,
								accRegionCode: accompanist.regionCode,
								isOnlyForDoctor: "N",
								modeOfEntry: "A"
						};
						_this.selectedNewDoctor.accompanists = []; 
						_this.selectedNewDoctor.accompanists.push(autoAccompanist);
					}
				},
				onKeyDown: function(keyCode){
					if(_this.selectedNewDoctor != null){
						_this.selectedNewDoctor.customerCode = null;
					}
				}
			});
			myDoctorSelect.autocomplete();
			myDoctorSelect.addSelectListener(function(
					selectedItem) {
				if (selectedItem != null){
					_this.selectedNewDoctor = selectedItem;
					_this.selectedNewDoctor.doctorRegionCode = accompanist.regionCode;
					if(accompanist.userName != null){
						var autoAccompanist = {
								accUserName: accompanist.userName,
								accRegionCode: accompanist.regionCode,
								isOnlyForDoctor: "N",
								modeOfEntry: "A"
						};
						_this.selectedNewDoctor.accompanists = []; 
						_this.selectedNewDoctor.accompanists.push(autoAccompanist);
					}
				}
			});
			
		} else {
			$("#selectMyDoctorDiv").hide();
		}
	},
	removeDoctorFromList : function(doctorToRemove) {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		$.each(_this.doctors, function(index, doc) {
		      if(doctorToRemove != null && doc != null && doc['customerCode'] == doctorToRemove['customerCode']) {
		    	  _this.doctors.splice(index, 1);
		      }    
		   });
	}
};

	
com.swaas.hidoctor.edetailing.ui.view.Dcr = createProxy(
		com.swaas.hidoctor.edetailing.ui.view._Dcr,
		com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);