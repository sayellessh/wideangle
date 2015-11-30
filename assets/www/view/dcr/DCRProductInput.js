function DCRProductInput(options) {

	this.settings = $.extend({
		isDiv : false,
		productList : [],
		width:"230px"
	}, options);
	this.idCounter = 1;
	this.productInputTable = null;
	this.__productList = this.settings.productList;
	this.core_input = [];
	this._init();
	this._productCounter = 0;
	this.selectObject = null;
	
}

DCRProductInput.prototype._init = function() {
	var _this = this;
	var addInputBtn = $('#btnAddInput');
	addInputBtn.unbind();
	addInputBtn.click(function() {
			_this.showAddPopup();
	});
	var addDetailedInputBtn = $('#btnAddDetailedInput');
	addDetailedInputBtn.unbind();
	addDetailedInputBtn.click(function() {
			_this.showAddPopupDetailed();
	});
};

DCRProductInput.prototype.showAddPopup = function() {
	var _this = this;
	var coreInput = {
			product : null,
			qty : null,
			detailed:null
		};
	var coreDiv = $(_this.settings.containerId);
	_this.productInputTable = $('<table />');
	coreDiv.prepend(_this.productInputTable);
	var divContainer = null;
	if( $('#productSelectDiv' + _this.idCounter).length ){ 
		divContainer = $('#productSelectDiv' + _this.idCounter);
		$('#productQuantityDiv').html('');
		$('#isDetailed').prop('checked', false); 
		$('#productSelectDiv .ui-input-text').val('');
	}else{
		divContainer = $("<div id='productSelectDiv" + _this.idCounter + "' style='width:430px'/>");
		coreDiv.prepend(divContainer);
	}
	var quantity = new QuantityInput({
		placeholder : "Quantity Input",
		containerId : "productQuantityDiv",
		defaultValue : 0

	});
	_this.selectObject = getAuto();
	_this.selectObject.autocomplete();
	_this.selectObject.addSelectListener(function(selectedItem){
		coreInput.product = selectedItem;
	});
	
	$('#showAddPopup').popup({
		history : false
	});
	$('#showAddPopup').popup('open');
	$('#productQuantityDiv').show();
	$('#productDetailCheckbox').show();
	var saveButton = $('#saveInputProduct');
	saveButton.unbind();
	saveButton.click(function() {
		var checked = $('#isDetailed').is(':checked');
		var img = '<fieldset data-role="controlgroup"><input type="checkbox" name="checkbox-1" id="checkbox-1'
				+ '" data-mini="true" data-theme="a" checked="' + (checked?'checked':'') + '"/>'
				+ '&nbsp;&nbsp;<label for="checkbox-1">Detailed</label></fieldset>';
		coreInput.qty = quantity.val();
		var nameDivSave =  '<div id="nameDiv'+coreInput.product.productCode+'1" style="min-width: 200px;"><label>'+coreInput.product.productName+'<label></div>';
		var quantityDivSave = '<div id="quantityDiv'+coreInput.product.productCode+'1"></div>';//remove 1 for testing only
		var checkDiv = '<div id="checkDiv'+coreInput.product.productCode+'"></div>';
		$("#productInputDiv  ol").append('<li ><div style="display: -webkit-box;">'+nameDivSave+quantityDivSave+checkDiv+'</div></li>');
		$("#checkDiv"+coreInput.product.productCode).append(img);
		var addQuantity = new QuantityInput({
			placeholder : "Quantity Input",
			width: "230px",
			containerId : "quantityDiv"+coreInput.product.productCode+'1',//remove 1 for testing only
			defaultValue : coreInput.qty 

		});
		coreInput.qty = addQuantity.val();
		$('#showAddPopup').popup('close');
});
	function getAuto() {
		if(_this.selectObject == null){
			var select = new AutoComplete({
				options : com.swaas.hidoctor.edetailing.ui.view.Dcr.salesProducts,
				label : ["productName"],
				listviewId : "productSelect" + _this.idCounter,
				containerId : "productSelectDiv" + _this.idCounter,
				placeholder : 'Product Name',
				width: _this.settings.width,
				freeEntry : false,
				onTop : true
			});
			return select;
		}else{
			return _this.selectObject;
		}
	}

};
DCRProductInput.prototype.showAddPopupDetailed = function() {
	var _this = this;
	var coreInput = {
			product : null,
			qty : null,
			detailed:null
		};
	var coreDiv = $(_this.settings.containerId);
	_this.productInputTable = $('<table />');
	coreDiv.prepend(_this.productInputTable);
	var divContainer = null;
	if( $('#productSelectDiv' + _this.idCounter).length ){ 
		divContainer = $('#productSelectDiv' + _this.idCounter);
		$('#productSelectDiv1 .ui-input-text').val('');
		
	}else{
		divContainer = $("<div id='productSelectDiv" + _this.idCounter + "' style='width:230px;'/>");
		coreDiv.prepend(divContainer);
	}
	_this.selectObject = getAuto();
	_this.selectObject.autocomplete();
	_this.selectObject.addSelectListener(function(selectedItem){
		coreInput.product = selectedItem;
	});
	
	$('#showAddPopup').popup({
		history : false
	});
	$('#showAddPopup').popup('open');
	$('#productQuantityDiv').hide();
	$('#productDetailCheckbox').hide();
	var saveButton = $('#saveInputProduct');
	saveButton.unbind();
	saveButton.click(function() {
		$("#detailedInputDiv  ol").append('<li >'+coreInput.product.productName+'&nbsp &nbsp &nbsp</li>');
		$('#showAddPopup').popup('close');
});
	function getAuto() {
		if(_this.selectObject == null){
			var select = new AutoComplete({
				options : com.swaas.hidoctor.edetailing.ui.view.Dcr.salesProducts,
				label : ["productName"],
				listviewId : "productSelect" + _this.idCounter,
				containerId : "productSelectDiv" + _this.idCounter,
				placeholder : 'Product Name',
				freeEntry : false,
				onTop : true
			});
			return select;
		}else{
			return _this.selectObject;
		}
	}
};

DCRProductInput.prototype.isLastRow = function(coreInput) {
	var isEnd = false;

	var _this = this;
	$.each(this.core_input, function(i, input) {
		if (input == coreInput) {

			if (i + 1 == _this.core_input.length) {
				isEnd = true;
			}

		}
	});
	return isEnd;
};

DCRProductInput.prototype.val = function() {

	var val = [];

	$.each(this.core_input, function(i, input) {

		var product = input.product.val();
		if (product != null && product != '') {
			val.push({
				product : product,
				qty : input.qty.val(),
				detailed: 'N'           // Changed from Yes to NO as per CR.
			});
		}
	});
	return val;
};

DCRProductInput.prototype.addNewInput = function() {

	var coreInput = {
		product : null,
		qty : null,
		detailed:null
	};
	var row = $('<tr />');
	var _this = this;

	var divContainer = $("<div id='productSelectDiv" + this.idCounter + "' style='width:230px'/>");
    var qtyInput = $("<input id='productQty" + this.idCounter + "' type='number' step='0.01'data-theme='b' />");
	coreInput.qty = qtyInput;
	
	qtyInput.blur(function() {

		if (qtyInput.val().length > 0 && _this.isLastRow(coreInput)) {
			_this.addNewInput();
		}
	});
	// qtyInput.attr("data-theme", "a");
	//var check =$("<select data-role='slider' id='detailed" + this.idCounter+ "' data-mini='true' ><option value='N'>Not Detailed</option><option value='Y'>Detailed</option></select>");
	//coreInput.detailed = check;
	
	var column1 = $('<td align="left" bordercolor="white">');
	column1.prepend(divContainer);

	var column2 = $('<td align="left" bordercolor="white">');
	column2.append(qtyInput);

	var column3 = $('<td align="left" bordercolor="white" >');
	var switchTable=$('<table cellspacing="2" cellpadding="0"/>');
	var switchTableRow = $('<tr />');
	var switchTableColumn1 = $('<td />');
	//switchTableColumn1.append(check);
	var switchTableColumn2 = $('<td />');
	switchTableRow.append(switchTableColumn1);
	switchTableRow.append(switchTableColumn2);
	switchTable.append(switchTableRow);
	
	column3.append(switchTable);
	column3.append();
	row.append(column1);
	row.append(column2);
	row.append(column3);
	
	
	var close = $("<a href='#' data-mini='true' data-theme='a' ><span style='color:white'>X</span></a>");
	
	var column4 = $('<td align="left" style="width:16px" />');
	column4.append(close);

	close.button();

	var _this = this;
	if(this.core_input.length > 0){
		close.click(function(){
			
			var _arry = [];
			$.each(_this.core_input, function(i, input){
				if(input != coreInput){
					_arry.push(input);
				}
			});
			_this.core_input = _arry;
			
			row.remove();		
		});
	}
	
	row.append(column4);
	//check.slider();	

	
	this.productInputTable.append(row);

	$("#detailed" + this.idCounter).parent().find('.ui-slider').attr("style", "width:120px");
	
	var selectObject = new AutoComplete({
		options : this.__productList,
		label : ["productName"],
		listviewId : "productSelect" + this.idCounter,
		containerId : "productSelectDiv" + this.idCounter,
		placeholder : 'Product Name',
		freeEntry : false,
		onTop : true
	});
	selectObject.autocomplete();
	selectObject.addSelectListener(function(selectedItem){		
		_this.addNewInput();
	});
	
	//coreInput.detailed = check;
	$("#productQty" + this.idCounter).textinput();
	$("#productQty" + this.idCounter).parent().attr("class","ui-input-text ui-shadow-inset ui-btn-shadow ui-body-b");
	$("#productQty" + this.idCounter).attr("style","width:100px");
	
	coreInput.product = selectObject;
	this.core_input.push(coreInput);
	this.idCounter++;
};
