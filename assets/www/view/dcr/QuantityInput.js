function QuantityInput(options) {
	this.settings = $.extend({
		placeholder : "Search",
		width : "120px",
		containerId : null,
		defaultValue : 0,
		onChange : function(value){
			
		}
	}, options);
	this.inputNumber = null;
	this._init();
};

QuantityInput.prototype.val = function() {

	var val = null;
	val = this.inputNumber.val();
	if (!isNaN(val) && val >= 0) {
		return val;
	} else {
		alert('Quantity must be a positive number');
		return "";
	}

};

QuantityInput.prototype.setValue = function(value){
	this.inputNumber.val(value);
};

QuantityInput.prototype._init = function() {
	var coreDiv = $('#' + this.settings.containerId);
	coreDiv.css("display", "-webkit-flex");
	coreDiv.css("width", this.settings.width);
	var _this = this;
	var minus = $('<img src="images/minus.png" style="height: 22px; width: 20px;margin-right: 10px;"></img>');
	var plus = $('<img src="images/plus.png" style="height: 22px; width: 20px;margin-left: 10px;"></img>');
	var inputNumber = $('<input id="inputQuantity'+this.settings.containerId+'" type="number" min="1" value="'
			+ this.settings.defaultValue + '" style="width: 50px;text-align: center;"/>');
	
	inputNumber.focus(function(){
		$.mobile.silentScroll($(this).offset().top - 10);
	});
	
	inputNumber.change(function(e){
		_this.isValid();
		_this.settings.onChange(this.value);
	});
	coreDiv.append(minus);
	coreDiv.append(inputNumber);
	coreDiv.append(plus);
	minus.click(function() {
		_this.minus();
		_this.settings.onChange(inputNumber.val());
	});
	plus.click(function() {
		_this.plus();
		_this.settings.onChange(inputNumber.val());
	});
	$('#spin').remove();
	_this.inputNumber = inputNumber;
};
QuantityInput.prototype.minus = function() {
	this.isValid();
	var quantity = this.inputNumber;
	if (!isNaN(quantity.val()) && quantity.val() > 0) {
		quantity.val(parseInt(quantity.val()) - 1);
	}
};
QuantityInput.prototype.plus = function() {
	this.isValid();
	var quantity = this.inputNumber;
	if (!isNaN(quantity.val())) {
		quantity.val(parseInt(quantity.val()) + 1);
	}
};

QuantityInput.prototype.isValid = function(){
	if (this.inputNumber.val() != '' && !isNaN(this.inputNumber.val())){
		if (parseInt(this.inputNumber.val(), 10) == parseFloat(this.inputNumber.val())){
			this.inputNumber.val(Math.abs(parseInt(this.inputNumber.val(), 10)));
			return true;
		} else {
			this.inputNumber.val(Math.abs(parseInt(this.inputNumber.val(), 10)));
			return false;
		}
	} else {
		this.inputNumber.val(0);
		return false;
	}
};
