com.swaas.hidoctor.edetailing.ui.view._Dcr = {

	productInput : null,
	chemistInput : null,

	intervalID : null,

	userProducts : null,

	chemists : null,

	init : function() {
		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._init, 100);
	},

	_init : function() {
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);
		ED.includeHeader($("#header"));
		ED
				.setValue(
						$('#progress'),
						com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);
		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._loadData, 100);
	},

	_loadData : function() {
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);

		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;

		_this.userProducts = com.swaas.hidoctor.edetailing.service.DCRService
				.getCurrentUserProducts();
		_this.salesProducts = com.swaas.hidoctor.edetailing.service.ProductService
				.getByProductType('SALES');
		_this.chemists = com.swaas.hidoctor.edetailing.service.DCRService
				.getUserChemists();

		com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID = setInterval(
				com.swaas.hidoctor.edetailing.ui.view.Dcr._displayScreen, 100);
	},

	_displayScreen : function() {
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Dcr.intervalID);

		ED.setValue($('#lblvisitTime'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.visitTime);
		ED.setValue($('#lblremarks'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.remarks);
		ED.setValue($('#lblinputs'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.inputs);
		ED.setValue($('#lblchemists'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.chemists);
		ED.setValue($('#btnPersist'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.submit);
		var docValues = ED.context.request.selectedDoctor.customerName + ' | '
				+ ED.context.request.selectedDoctor.specialityName;

		ED.setValue($('#doctorvalues'), docValues);
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;

		$("#content").show();
		$('#progress').hide();

		_this.productInput = new ProductInput({
			containerId : "#productInputDiv",
			productList : _this.userProducts
		});

		_this.chemistInput = new ChemistInput({
			containerId : "#chemistInputDiv",
			chemistList : _this.chemists,
			salesProducts : _this.salesProducts
		});

		$("#visitTime").parent().attr("class", "ui-input-datebox ui-body-b");
		$("#visitTime").parent().parent().attr("class",
				"ui-input-text ui-shadow-inset ui-btn-shadow ui-body-b");
		$("#remarks").attr("class", "ui-input-text ui-body-b ui-shadow-inset");
		$("#btnPersist").parent().attr("style", "width:100px");

	},

	onSave : function() {
		var _this = com.swaas.hidoctor.edetailing.ui.view.Dcr;
		var position = ED.getGeoLocation();
		var dcrDetails = {
			doctorVisitTime : $('#visitTime').val(),
			remarks : $('#remarks').val(),
			dcrEnteredDate : new Date(),
			companyCode : ED.context.currentUser.companyCode,
			userCode : ED.context.currentUser.userCode,
			doctorCode : ED.context.request.selectedDoctor.customerCode,
			doctorRegionCode : ED.context.request.selectedDoctor.regionCode,
			isAccompanistDoctor : (ED.context.request.selectedDoctor.regionCode == ED.context.currentUser.regionCode ? "0"
					: "1"),
			dcrActualDate : ED.context.selectedDate,
			latitude : position.coords.latitude,
			longitude : position.coords.longitude,
			products : _this.productInput.val(),
			chemists : _this.chemistInput.val()
		};
		var valid = (dcrDetails.doctorVisitTime == null || dcrDetails.doctorVisitTime == '') ? false : true;
		if (valid) {
			com.swaas.hidoctor.edetailing.service.DCRService
					.saveDCR(dcrDetails);
			alert(com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.dcrSaved);
			ED.redirectToHome();
		}else {
			alert(com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.doctorVisitTimeMandatory);
		}
	}
};

com.swaas.hidoctor.edetailing.ui.view.Dcr = createProxy(com.swaas.hidoctor.edetailing.ui.view._Dcr, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);