function AutoComplete(options) {

	this.settings = $.extend({
		options : [],
		label : [],
		listviewId : "",
		placeholder : "Search",
		width : "230px",
		cornerall : false,
		freeEntry : true,
		onTop : false,
		readOnly: false,
		onChange: function(value){
			
		},
		onKeyDown: function(){
			
		},
		defaultValue: ""
	}, options);

	this.listview = null;
	this.selectedValue = null;
	this.inputSearch = null;
	this.onSelectCallback = null;
	this._init();
}

AutoComplete.prototype.addSelectListener = function(onSelectCallback) {
	this.onSelectCallback = onSelectCallback;
};
AutoComplete.prototype.addBlurListener = function(onSelectCallback) {
	this.onSelectCallback = onSelectCallback;
};
AutoComplete.prototype.autocomplete = function() {
	var listviewId = '#' + this.settings.listviewId;

	$(listviewId).listview();

	if (this.settings.cornerall) {
		$(listviewId).parent().find('.ui-input-search').attr('class',
				'ui-input-search ui-corner-all ui-body-c');
	} else {
		$(listviewId).parent().find('.ui-input-search').attr('class',
				'ui-input-search ui-body-c');
				$(listviewId).parent().find('.ui-listview').removeClass('ui-corner-all');
	}

	$(listviewId).parent().find('.ui-input-clear').hide();
	$(listviewId).parent().find('.ui-input-search').css('padding', '0px 0px');
	$(listviewId).parent().find('.ui-input-search').parent().css('display','table-footer-group');

	$(listviewId).parent().find('.ui-input-text').attr('style',
			"width:" + this.settings.width);
	$(listviewId).css({
		"overflow-y" : "visible",
		"overflow-x" : "scroll",
		"position" : "absolute",
		"z-index" : "1200"
	});
	this.inputSearch = $(listviewId).parent().find('.ui-input-text');
	var _this = this;
	this.inputSearch.change(function(e){
		_this.settings.onChange(this.value);
	});
	this.inputSearch.keydown(function(e){
		_this.settings.onKeyDown(e.keyCode);
		_this.selectedValue = null;
		_this.onSelectCallback(_this.selectedValue);
	});
	
	/*
	this.inputSearch.blur(function(e){
		var inputValue = this.value;
		$(listviewId).parent().find('.ui-icon-delete').trigger('click');			
		this.value = inputValue;
	});
	*/
	
	this.inputSearch.focus(function(){
		$.mobile.silentScroll($(this).parent().offset().top-10);
	});
	this.setValue(this.settings.defaultValue);
	this.setDisabled(this.settings.readOnly);

};

AutoComplete.prototype.setDisabled = function(readOnly){
	if (readOnly == true){
		this.inputSearch.attr("disabled", "disabled");
	} else {
		this.inputSearch.removeAttr("disabled");
	}
};

AutoComplete.prototype.setValue = function (value){
	this.inputSearch.val(value);
};

AutoComplete.prototype.val = function() {

	var val = null;
	var _this = this;

	if (this.settings.freeEntry) {
		var listviewId = '#' + _this.settings.listviewId;
		val = $(listviewId).parent().find('form').find('input').val();
		this.inputSearch.val(val);
	}
	
	if (this.selectedValue != null) {
		var selectedValue = "";
		$.each(_this.settings.label, function(index, labelIndex) {
			if(typeof _this.selectedValue[labelIndex] != 'undefined' && _this.selectedValue[labelIndex] != null){
				selectedValue += _this.selectedValue[labelIndex];				
				if (index < (_this.settings.label.length - 1)) {
					selectedValue += " | ";
				}
			}
		});
		
		if (val == selectedValue) {
			val = _this.selectedValue;
		}
	}
	console.log("Selected Val : " + val);
	return val;

};

AutoComplete.prototype._init = function() {
	var _this = this;
	var coreDiv = $('#' + this.settings.containerId);
	coreDiv.find('input').css('background-color', '#388BBF');
	var selectObject = $('<ul id="'
			+ this.settings.listviewId
			+ '" data-role="listview" data-inset="true" data-filter="true" data-filter-reveal="true" data-filter-placeholder="'
			+ this.settings.placeholder + '" data-theme="b" />');


	_this.listview = selectObject;
	if (_this.settings.options != null) {
		_this.populateOptions(this.settings.options);
	}
	coreDiv.append(selectObject);
	if(_this.settings.onTop){
		selectObject.css("display","table-caption");
	}
};
AutoComplete.prototype.populateOptions = function(options) {

	var _this = this;
	var selectObject = this.listview;
	var listviewId = '#' + this.settings.listviewId;

	$.each(options, function(i, option) {
		if(option != null) {
			var liText = "";
			$.each(_this.settings.label, function(index, labelIndex) {
				if(typeof option[labelIndex] != 'undefined' && option[labelIndex] != null){
					liText += option[labelIndex];				
					if (index < (_this.settings.label.length - 1)) {
						liText += " | ";
					}
				}
			});
			var optionLI = $("<li style='width:auto; float:left;'>" + liText + "</li>");
			optionLI.click(function() {

				// var listviewId= this.settings.listviewId;
				// optionLI
				$(listviewId).parent().find('.ui-icon-delete').trigger('click');
				$(listviewId).parent().find('.ui-input-text').val(liText);
				_this.selectedValue = option;
				if (_this.onSelectCallback != null) {
					_this.onSelectCallback(option);
				}
			});
			selectObject.append(optionLI);
		}
	});
};
