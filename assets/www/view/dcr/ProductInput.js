function ProductInput(options) {

	this.settings = $.extend({
		isDiv : false,
		productList : [],
	}, options);
	console.log(this.settings);
	this.idCounter = 1;
	this.productInputTable = null;
	this.__productList = this.settings.productList;
	this.core_input = [];
	this._init();
}

ProductInput.prototype._init = function() {
	var coreDiv = $(this.settings.containerId);
	this.productInputTable = $('<table />');
	coreDiv.append(this.productInputTable);

	this.addNewInput();

};

ProductInput.prototype.isLastRow = function(coreInput) {
	var isEnd = false;

	var _this = this;
	console.log("length : " + this.core_input.length);
	$.each(this.core_input, function(i, input) {
		if (input == coreInput) {

			if (i + 1 == _this.core_input.length) {
				isEnd = true;
			}

		}
	});
	return isEnd;
};

ProductInput.prototype.val = function() {

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

ProductInput.prototype.addNewInput = function() {

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
	column1.append(divContainer);

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
		freeEntry : false
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
