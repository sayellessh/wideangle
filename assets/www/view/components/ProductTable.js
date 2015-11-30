function ProductTable(options) {

	this.settings = $.extend({
		style : {
			'background-color' : '',
			'color' : 'black',
			'border-bottom' : '1px solid #999999'
		},
		selectedStyleProduct : {
			'background-color' : '#3e6790',
			'color' : 'white'
		},
		onProductSelected : function(selectedProduct) 
		{
			alert("Selected Prodcut : " + selectedProduct.productName);
		},
		onMoreClicked : function(selectedProduct) 
		{
			alert("Adding Downloaded product list.");
		},
		
		isDiv : false,
		showMore : false,
		products : []
	}, options);

	this.productTable = null;
	this.previousSelectedRow = null;
	this.currentIndex = 0;
	this._init();
	this.display();
}

ProductTable.prototype._init = function() {

	if (this.settings.isDiv) {

		this.productTable = $('<div style="float: left; width: 100%;" />').appendTo(
				$(this.settings.containerId));

	} else {

		this.productTable = $(this.settings.containerId);
	}
};

ProductTable.prototype.display = function() {

	var _productTable = this;
	ED.clearTable(this.productTable);
	this.productTable.find('li').remove();
	
	var products = this.settings.products;
	$.each(products, function(index, product) {
		_productTable.addRow(index, product);
	});
	if(this.settings.showMore){
		this.addButtonRow();
	}
};

ProductTable.prototype.addRow = function(index, product) {
	
	var _productTable = this;
	var row = null;

	_productTable.currentIndex++;
	
	var rowObject = $('<li data-theme="b" style="list-style: none; float: left; width: 100%; padding: 10px;">');
	rowObject.attr('productCode', product.productCode);
	rowObject.css(this.settings.style);

	var selectedRowCallback = this.settings.onProductSelected;

	rowObject.click(function() {
		if(_productTable.previousSelectedRow != null){
			_productTable.previousSelectedRow.css(_productTable.settings.style);
		}
		$('li', _productTable.productTable).css(_productTable.settings.style);
		rowObject.css(_productTable.settings.selectedStyleProduct);
		_productTable.previousSelectedRow = rowObject;
		selectedRowCallback(product);
	});
	
	var fileURL = "eDetailing/ProductCategory/" + ED.context.currentUser.companyCode + "_" + product.productCategoryCode +".jpg";
	var fileEntry = com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(fileURL);
	if (fileEntry != null){
		fileURL = com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(fileURL).fullPath;
	} else {
		// we can give the default image
	}
	/*rowObject
			.append('<td><img src="' + fileURL + '" style="opacity:1;width:60px;height:50px;"/></td>');
	row += '<td> <table>';
	row += '<tr> <td style="font-size:15px;">' + product.productName
			+ '</td> </tr>';
	row += '<tr> <td style="font-size:15px;">' + product.specialityName
			+ '  |  ' + product.productCategoryName + '</td> </tr>';
	row += '<tr> <td style="font-size:15px;">' + product.brandName
			+ '</td> </tr> </table>';
	row += '</td>';*/
	row = '';
	//row += '<div style="float: left; width: 100%; padding: 5px;">';
	//row += '<li>';
	row += '<div data-theme="b" style="float: left; padding-right: 5px;"><img src="' + fileURL + '" style="opacity:1;width:60px;height:50px;"/></div>';
	row += '<div style="float: left;">';
	row += '<div style="font-size:15px;">' + product.productName + '</div>';
	row += '<div style="font-size:15px;">' + product.specialityName + '  |  ' + product.productCategoryName + '</div>';
	row += '<div style="font-size:15px;">' + product.brandName + '</div>';
	row += '</div>';
	//row += '</li>';
	
	//row += '</div>';
	rowObject.append(row);
	if (index == 0){
		if(_productTable.previousSelectedRow == null){
			rowObject.css(_productTable.settings.selectedStyleProduct);
		}
		_productTable.previousSelectedRow = rowObject;
	}

	this.productTable.append(rowObject);
	if(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView != undefined)
		setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.refreshPages(), 500);
};

ProductTable.prototype.addButtonRow = function() {

	var _productTable = this;
	//var row = $('<tr />');
	//var rowObject = $('<td colspan="2" />');
	var rowObject = $('<div data-theme="b" style="float: left; width: 100%; height: 60px;"/>');
	//row.append(rowObject);
	//rowObject.attr('productCode', 'btn');
	rowObject.css(this.settings.style);

	var selectedRowCallback = this.settings.onMoreClicked;

	rowObject.click(function() {
		selectedRowCallback(_productTable);
		rowObject.hide();
		if(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView != undefined)
			setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.refreshPages(), 500);
		//alert('hide ButtonRow');
	});
	var btn = '<button id="moreBtn"  data-theme="b" data-shadow="true" data-corners="false"> ' + com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.moreButtonCaption + '</button>';
	rowObject.append(btn);
	
	this.productTable.append(rowObject);
	$("#moreBtn").button();
	if(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView != undefined)
		setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.refreshPages(), 500);
};
