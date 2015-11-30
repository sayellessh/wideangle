function Slider(options) {
	this.settings = $.extend({
		containerId: options.containerId
	});
	this.scrollSize = 0;
	this.width = 0;
	this.sliderWidth = 0;
	this.container = null;
	this.slider = null;
	this.elastislideRow = null;
	this.elastislideTable = null;
	this.prevTD = null;
	this._init();
	this._display();
}

Slider.prototype._init = function() {
	this.container = $(this.settings.containerId);
	this.width = this.container.width();
	
};

Slider.prototype._display = function() {
	var _this = this;
	this.container.empty();
	var elastislideMain = $('<table  width="100%"></table>');
	this.container.append(elastislideMain);
	var elastislideMainRow = $('<tr/>');
	elastislideMain.append(elastislideMainRow);
	
	this.prevTD = $('<td class="prevTD"></td>');
	this.prevTD.css("width", this.width*.1);
	elastislideMainRow.append(this.prevTD);
	var element = $('<td></td>');
	element.css("width", this.width*.80);
	this.sliderWidth = this.width*.80;
	elastislideMainRow.append(element);
	this.slider = $('<div id="' + this.settings.containerId + 'Div' + '" style="overflow-x:scroll;"></div>');
	//_this.prevTD.click(function(){
	//	_this._scrollPrevious(_this.scrollSize);
	//});
	
	this.slider.scroll(function(){
		_this._onScroll(_this.slider.scrollLeft());
		
	});
	
	this.slider.css("width", this.width*.80);
	element.append(this.slider);
	this.elastislideTable = $('<table id="' + this.settings.containerId + 'Table' + '" width="100%"></table>');
	this.slider.append(this.elastislideTable);
	
	this.elastislideRow = $("<tr/>");
	this.elastislideTable.append(this.elastislideRow);

	var nextTD = $('<td class="nextTD"><span class="slider-next"></span></td>');
	nextTD.css("width", this.width*.1);
	elastislideMainRow.append(nextTD);
	//nextTD.click(function(){
	//	_this._scrollNext(_this.scrollSize);
	//});
};

Slider.prototype._onScroll = function(scrollLeft){
	
	if (scrollLeft == 0){
		this.container.find("td.prevTD").each(function(){
			this.innerHTML = "";
		});
	} else {
		this.container.find("td.prevTD").each(function(){
			this.innerHTML = "<span class='slider-previous'></span>";
			console.log(this.innerHTML);
		});
	}
	
	var maxScroll = this.elastislideTable.width() - this.slider.width();
	
	if (scrollLeft >= maxScroll){
		this.container.find("td.nextTD").each(function(){
			this.innerHTML = "";
		});
	} else {
		this.container.find("td.nextTD").each(function(){
			this.innerHTML = '<span class="slider-next"></span>';
		});
	}
};

Slider.prototype._scrollNext = function(target){
	var matrix = this.elastislideTable.css('transform');
	var scrollLeft = 0;
	if (matrix != 'none'){
		scrollLeft = parseInt(matrix.substr(7, matrix.length - 8).split(', ')[4]);
	}
	scrollLeft = scrollLeft - target;
	
	var maxLeft = (this.elastislideTable.width() - this.slider.width())*-1;
	if (scrollLeft < maxLeft){
		scrollLeft = maxLeft;
	} 
	
	this.elastislideTable.css( 'transform', 'translateX(' + scrollLeft + 'px)' );
};

Slider.prototype._scrollPrevious = function(target){
	var matrix = this.elastislideTable.css('transform');
	var scrollLeft = 0;
	//alert(matrix);
	if (matrix != 'none'){
		scrollLeft = parseInt(matrix.substr(7, matrix.length - 8).split(', ')[4]);
	}
	scrollLeft = scrollLeft + target;
	if (scrollLeft > 0){
		scrollLeft = 0;
	} 
	this.elastislideTable.css( 'transform', 'translateX(' + scrollLeft + 'px)' );
};

Slider.prototype.addElement = function(elementDivObj){
	var width = elementDivObj.width();
	this.scrollSize = (this.scrollSize + width)/2;
	var td = $('<td style="text-align:center"/>');
	this.elastislideRow.append(td);
	td.append(elementDivObj);
};
