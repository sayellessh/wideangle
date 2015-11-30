var __CompInputIdCounter = 1000;

function CompetitorInput(options) {

	this.settings = $.extend({
		isDiv : false
	}, options);
	this.competitorInputTable = null;

	this.chemistList = [];
	this.core_input = [];

	this._init();
}

CompetitorInput.prototype._init = function() {

	var coreDiv = $('#' + this.settings.containerId);//
	this.competitorInputTable = $('<table />');
	coreDiv.append(this.competitorInputTable);
};

CompetitorInput.prototype.populateChemist = function(chemistList) {
	
	this.chemistList = chemistList;
	
	if(this.core_input.length == 0){
		this.addNewInput();
	}
	else {
		// TODO : remove the existing components
	}
	
};

CompetitorInput.prototype.val = function() {

	var val = [];

	$.each(this.core_input, function(i, input) {

		var selectedComp = input.compitetor.val();
		if (selectedComp != null && selectedComp != '') {
			val.push({
				compitetor : selectedComp,
				qty : input.qty.val()
			});
		}
	});
	return val;
};

CompetitorInput.prototype.isLastRow = function(coreInput) {
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

CompetitorInput.prototype.addNewInput = function() {

	var row = $('<tr />');

	var divContainer = $("<div id='competitorSelectDiv" + __CompInputIdCounter
			+ "'/>");

	var qtyInput = $("<input type='number' step='0.01' id='searchInput"
			+ __CompInputIdCounter + "' data-theme='b' style='width:50px' />");

	var coreInput = {
		compitetor : null,
		qty : qtyInput
	};

	var _this = this;
	qtyInput.blur(function() {
		if (qtyInput.val().length > 0 && _this.isLastRow(coreInput)) {
			_this.addNewInput();
		}
	});

	var column1 = $('<td />" valign="top" bordercolor="white">');
	column1.append(divContainer);

	var column2 = $('<td valign="top" bordercolor="white">');
	column2.append(qtyInput);
	
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
	

	row.append(column1);
	row.append(column2);
	row.append(column4);

	this.competitorInputTable.append(row);

	var _this = this;

	console.log("Number of chemists product : "
			+ JSON.stringify(_this.chemistList));
	var selectObject = new AutoComplete({
		options : _this.chemistList,
		label : ["productName"],
		listviewId : "competitorSelect" + __CompInputIdCounter,
		containerId : "competitorSelectDiv" + __CompInputIdCounter,
		placeholder : 'Competitor Product'
	});
	coreInput.compitetor = selectObject;

	selectObject.autocomplete();	
	selectObject.addSelectListener(function(selectedItem) {
		_this.addNewInput();
	});

	$("#searchInput" + __CompInputIdCounter).textinput();
	$("#searchInput" + __CompInputIdCounter).parent().attr("class",
			"ui-input-text ui-shadow-inset ui-btn-shadow ui-body-b");
	$("#searchInput" + __CompInputIdCounter).attr("style", "width:100px");

	this.core_input.push(coreInput);

	__CompInputIdCounter++;
};
