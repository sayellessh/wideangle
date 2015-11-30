var __ChemistInputIdCounter = 3000;

function ChemistInput(options) {

	this.settings = $.extend({
		isDiv : false,
		chemistList : [],
		salesProducts : null
	}, options);
	this.chemistInputTable = null;
	this.productList = this.core_input = [];

	this._init();
}

ChemistInput.prototype._init = function() {

	var coreDiv = $(this.settings.containerId);
	this.chemistInputTable = $('<table />');
	coreDiv.append(this.chemistInputTable);
	this.addNewInput();

};

ChemistInput.prototype.isLastRow = function(coreInput) {
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

ChemistInput.prototype.val = function() {

	var val = [];

	$.each(this.core_input, function(i, input) {

		var chemist = input.chemist.val();
		if (chemist != null && chemist != '') {
			val.push({
				chemist : chemist,
				qty : input.qty.val(),
				products : input.products.val()
			});
		}
	});
	return val;
};

ChemistInput.prototype.addNewInput = function() {

	var row = $('<tr />');

	var divContainer = $("<div  id='chemistSelectDiv"
			+ __ChemistInputIdCounter + "'/>");

	var qtyInput = $("<input type='number' step='0.01' id='searchInput"
			+ __ChemistInputIdCounter
			+ "' data-theme='b' style='width:50px' />");

	var column1 = $('<td align="left" bordercolor="white"/>');
	column1.append(divContainer);

	var column2 = $('<td align="left" bordercolor="white"/>');
	column2.append(qtyInput);

	row.append(column1);
	row.append(column2);

	var close = $("<a href='#' data-mini='true' data-theme='a' ><span style='color:white'>X</span></a>");
	
	var column3 = $('<td align="left" style="width:16px" />');
	column3.append(close);
	
	
	var internalRow = $("<tr />");
	internalRow.append(column1);
	internalRow.append(column2);
	internalRow.append(column3);
	
	var internalTbl = $("<table />");
	internalTbl.append(internalRow);

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
	
	var mainCol = $("<td />");
	mainCol.append(internalTbl);
	row.append(mainCol);
	
	var coreInput = {
		chemist : null,
		qty : qtyInput,
		products : null
	};

	var _this = this;
	qtyInput.blur(function() {

		if (qtyInput.val().length > 0 && _this.isLastRow(coreInput)) {
			_this.addNewInput();
		}
	});

	
	this.chemistInputTable.append(row);

	var selectObject = new AutoComplete({
		options : this.settings.chemistList,
		label : ["customerName"],
		listviewId : 'chemistSelect' + __ChemistInputIdCounter,
		containerId : 'chemistSelectDiv' + __ChemistInputIdCounter,
		placeholder : 'Chemist Name'
	});

	var productRow = $('<tr />');
	var prodColumn = $('<td colspan="2" width="100%" align="left" bordercolor="white" nowrap/>');
	var prodContainer = $("<div  id='prodContainer" + __ChemistInputIdCounter
			+ "'  />");

	prodColumn.append(prodContainer);
	productRow.append(prodColumn);
	
	this.chemistInputTable.append(productRow);

	var prodInput = new SalesInput({
		containerId : 'prodContainer' + __ChemistInputIdCounter,
		products : this.settings.salesProducts
	});
	coreInput.products = prodInput;
	coreInput.chemist = selectObject;

	this.core_input.push(coreInput);

	selectObject.autocomplete();
	selectObject.addSelectListener(function(selectedItem){		
		_this.addNewInput();
	});
	
	$("#searchInput" + __ChemistInputIdCounter).textinput();
	$("#searchInput" + __ChemistInputIdCounter).parent().attr("class",
			"ui-input-text ui-shadow-inset ui-btn-shadow ui-body-b");
	$("#searchInput" + __ChemistInputIdCounter).parent().attr("style",
			"width:100px");
	__ChemistInputIdCounter++;
};
