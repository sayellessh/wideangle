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
	var _this = this;


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
