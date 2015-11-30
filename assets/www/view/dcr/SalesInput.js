var __SalesInputIdCounter = 2000;

function SalesInput(options) {

	this.settings = $.extend({
		isDiv : false,
		products : null,
		values: []
	}, options);

	this.salesInputTable = null;

	this.core_input = [];

	this.productList = this.settings.products;
	this.values = this.settings.values;

	this._init();
	
}

SalesInput.prototype._init = function() {

	var coreDiv = $('#' + this.settings.containerId);
	this.salesInputTable = $('<table />');
	coreDiv.append(this.salesInputTable);

	this.values.push({
		competitorProductName: "",
		competitorProductCode: "",
		supportQty: 0
	});
	
	for (var i=0; i < this.values.length; i++){
		this.addNewInput(i, this.values[i]);
	}
	
};

SalesInput.prototype.isLastRow = function(coreInput) {
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

SalesInput.prototype.val = function() {

	var val = [];

	$.each(this.values, function(index, value){
		if (value.competitorProductName != ""){
			val.push(value);
		}
	});
	
	return val;
};

SalesInput.prototype.addNewInput = function(index, competitorProduct) {
	
	var row = $('<tr />');

	var divContainer = $("<div class='ui-block-b' id='productSelectDiv" + __SalesInputIdCounter
			+ "'/>");

	var qtyInput = $("<div id='searchInput"	+ __SalesInputIdCounter + "'/>");

	var coreInput = {
		product : null,
		qty : qtyInput,
		comp : null
	};
	var _this = this;
	qtyInput.blur(function() {

		if (_this.isLastRow(coreInput)) {
			var newProduct = {
					competitorProductName: "",
					competitorProductCode: "",
					supportQty: 0
				};
			this.values.push(newProduct);
			_this.addNewInput(this.values.length+1, newProduct);
		}
	});

	var column1 = $('<td valign="top" >');
	column1.append(divContainer);

	var column2 = $('<td valign="middle" >');

	var dump = $("<div  />");
	dump.append(qtyInput);

	column2.append(dump);

	var close = $("<a href='#' data-mini='true' data-theme='a' ><span style='color:white'>X</span></a>");
	var column3 = $('<td align="left" valign="top" style="width:16px" />');
	column3.append(close);

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
			
			_this.values.splice(index, 1);
			row.remove();		
		});
	}
	
	

	//column1.append(dump);
	//
	row.append(column1);
	row.append(column2);	
	row.append(column3);
	
	

	this.salesInputTable.append(row);

	var selectObject = new AutoComplete({
		options : this.productList,
		label : ["productName"],
		listviewId : "productSelect" + __SalesInputIdCounter,
		containerId : "productSelectDiv" + __SalesInputIdCounter,
		placeholder : 'Competitor Product',
		freeEntry : true,
		onTop: true,
		onChange: function(value){
			if(competitorProduct == null){
				competitorProduct = {};
			}
			competitorProduct.competitorProductName = value;
		},
		onKeyDown: function(keyCode){
			competitorProduct.competitorProductCode = "";
			if (_this.isLastRow(coreInput)){
				var newProduct = {
						competitorProductName: "",
						competitorProductCode: "",
						supportQty: 0
					};
				_this.values.push(newProduct);
				_this.addNewInput(_this.values.length-1, newProduct);
			}
		},
		defaultValue: competitorProduct.competitorProductName
	});

	var prodQuantity = new QuantityInput({
		placeholder : "Quantity Input",
		width : "150px",
		containerId : "searchInput"+ __SalesInputIdCounter,
		defaultValue : competitorProduct.supportQty,
		onChange: function(value){
			competitorProduct.supportQty = value;
		}

	});
	coreInput.product = selectObject;
	coreInput.qty = prodQuantity;
	this.core_input.push(coreInput);

	selectObject.autocomplete();
	
	selectObject.addSelectListener(function(selectedItem){
		if(competitorProduct == null){
			competitorProduct = {};
		}
		competitorProduct.competitorProductCode = selectedItem.productCode;
		competitorProduct.competitorProductName = selectedItem.productName;
		
		if (_this.isLastRow(coreInput)){
			var newProduct = {
					competitorProductName: "",
					competitorProductCode: "",
					supportQty: 0
				};
			_this.values.push(newProduct);
			_this.addNewInput(_this.values.length-1, newProduct);
		}
	});
	
	__SalesInputIdCounter++;
};
