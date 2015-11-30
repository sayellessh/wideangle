function AssetTable(options) {
	this.settings = $.extend({
		style : {
			'background-color' : '#111111'
		},
		selectedStyle : {
			'background-color' : '#3e6790'
		},
		onAssetSelected : function() {
		},
		onPreviewClicked : function() {
		},
		active : false,
		isConfirmRequired : false,
		confirmText : "Add To Delete List",
		isDiv : false,
		assets : [],
		isStarRequired : true,
		forDownload: false,
		onlineCheckRequired: false
	}, options);
	
	this.assetTable = null;
	this.__deleteButtons = [];
	this.__previewButtons = [];
	this._init();
	this.display();
	this.networkAvailable = false;
}
AssetTable.prototype._init = function() {
	this.settings.active = true;
	//alert(this.settings.isDiv);
	this.settings.isDiv = true;
	$(this.settings.containerId).empty();
	if (this.settings.isDiv) {

		//this.assetTable = $("<table />").appendTo($(this.settings.containerId));
		this.assetTable = $('<li style="list-style: none;" />').appendTo($(this.settings.containerId));

	} else {

		//this.assetTable = $(this.settings.containerId);
		this.assetTable = $(this.settings.containerId);
	}
};
AssetTable.prototype.display = function() {
	if (this.settings.onlineCheckRequired == true){
		this.networkAvailable = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
	}
	var _assetTable = this;
	var starDivs = [];
	var ratings = [];
	var assets = this.settings.assets;
	var isStarRequired = this.settings.isStarRequired;
	var rowObject = null;
	//ED.clearTable(this.assetTable);
	$.each(assets, function(index, asset) {
		/*if (index % 4 == 0) {
			if (index == 0) {
				rowObject = $('<tr />');
			} else {
				_assetTable.addRow(rowObject);
				rowObject = null;
				rowObject = $('<tr />');
			}
		}*/
		//alert(asset.name + ' - ' + asset.categoryCode + ' - ' + asset.specialityCode);
		// Start of code modification by Vinoth Kannah MP
		//var selectedAssetCallBack = this.settings.onAssetSelected;
		//alert('asset ' + index);
		var cnt = com.swaas.hidoctor.edetailing.ui.view.Resource.favAssetCnt;
		var divObj = '<div id="assetElement' + cnt + '" class="assetElement" style="background-color: white; float: left; width: 99%; padding: 5px;';
		if((assets.length-1) == index) {
			divObj += ' border-bottom: none';
		} else {
			divObj += ' border-bottom: 1px solid #CCCCCC';
		}
		divObj += '" />';
		if(index == 0) {
			//rowObject = $('<tr style="width: 400px;" />');
			rowObject = $(divObj);
		} else {
			_assetTable.addRow(rowObject);
			rowObject = null;
			//rowObject = $('<tr style="width: 400px;" />');
			rowObject = $(divObj);
		}
		// End of code by Vinoth Kannah MP
		
		_assetTable.addcoloum(asset, rowObject, starDivs, ratings, com.swaas.hidoctor.edetailing.ui.view.Resource.favAssetCnt++);
	});

	if (rowObject != null) {
		_assetTable.addRow(rowObject);
	}

	if (this.settings.isConfirmRequired) {
		var selectedAssetCallBack = this.settings.onAssetSelected;
		$('.popupProd').popup();
		$('.deleteButton').button();

		$.each(this.__deleteButtons, function(i, button) {
			$('#' + button.button).unbind();
			$('#' + button.button).click(function() {
				selectedAssetCallBack(button.asset);
				$('#popup' + button.asset.daCode).popup("close");
			});
		});
	}
	if (this.settings.forDownload) {
		//alert('for download');
		var onPreviewClicked = this.settings.onPreviewClicked;
		$('.popupProd').popup();
		$('.previewButton').button();
		$.each(this.__previewButtons, function(i, button) {
			$('#' + button.button).unbind();
			$('#' + button.button).click(function() {
				$('#popup' + button.asset.daCode).popup("close");
				onPreviewClicked(button.asset);
			});
		});
	}
	if (isStarRequired) {
		
		$.each(starDivs, function(index, divId) {
			com.swaas.hidoctor.edetailing.ui.view.Rating.setRating($(divId),
					ratings[index]);
		});
	}
};
AssetTable.prototype.addcoloum = function(asset, rowObject, starDivs, ratings, index) {
	var row = "";
	//var columnObject = $('<td valign="top" style="width: 330px;"/>');
	var columnObject = $('<div style="opacity: 1;">');
	var selectedAssetCallBack = this.settings.onAssetSelected;
	var previewCallback = this.settings.onPreviewClicked;
	//alert(selectedAssetCallBack);
	var thumbnailURL = com.swaas.hidoctor.edetailing.ui.view.CoreView.getThumbnailURL(asset);
	
	var tickIcon = "";
	if (this.settings.onlineCheckRequired == true){
		if (asset.downloaded == 'Y'){
			tickIcon = "../../hidoctor/images/Local_Storage.png";
		} else {
			if (this.networkAvailable == false){
				tickIcon = "../../hidoctor/images/Webplayer_Offline.png";
			} else {
				tickIcon = "../../hidoctor/images/Webplayer_Online.png";
			}
		}
	} else {
		if (asset.downloaded == 'Y'){
			tickIcon = "../../hidoctor/images/Local_Storage.png";
		} else {
			if (this.networkAvailable == false){
				tickIcon = "../../hidoctor/images/Webplayer_Offline.png";
			} else {
				tickIcon = "../../hidoctor/images/Webplayer_Online.png";
			}
		}
	}
	
	var documentType = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType[asset.documentType];
	if (documentType == null){
		 documentType = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType["UNKNOWN"];
	}
	/*if (this.settings.isConfirmRequired) {
		var fileSize = ''; 
		if(asset.downloaded == 'Y'){
			fileSize = com.swaas.hidoctor.edetailing.util.FileUtil.getFileSize(asset.downloadedFileName)+' MB';
		}
		row += '<div data-role="popup" class="popupProd" id="popup'
				+ asset.daCode
				+ '" data-overlay-theme="a" data-theme="d" data-corners="false">';

		row += '<table cellspacing="0" cellpadding="2" id="lightBox" width="100%" ><tr><td>';
		row += '<img class="popphoto" src="'
				+ thumbnailURL
				+ '" style="max-height:512px;width:200px;height:300px;" alt="assetName"></td></tr>';
		row += '<tr><td>' + this.settings.product.brandName + ' - ' + asset.name
				+ '</td></tr>';
		row += '<tr><td >Speciality :' + this.settings.product.specialityName
				+ ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + fileSize + '</td></tr>';
		row += '<tr><td align="center">';
		var previewButtonHTML = '<a id="previewButton' + asset.daCode
							+ '" class="previewButton" data-theme="b" data-mini="true" data-inline="true" data-corners="false">' 
							+ com.swaas.hidoctor.edetailing.ui.view.Resource.download.previewAsset + ' </a>';
		if(this.settings.forDownload == true && asset.downloadable != 'Y'){
			row += previewButtonHTML;
		}else{
			row += '<a id="btn' + asset.daCode
			+ '" class="deleteButton" data-theme="b" data-mini="true" data-inline="true" data-corners="false">' + this.settings.confirmText + ' </a>';
			if(this.settings.forDownload){
				row += previewButtonHTML;
			}		
		}
		
		row += '</td></tr>';
		row += '</table></div>';
	}

	row += '</td>';
	row += '</tr><tr><td><table>';*/
	
	/*row += '<div class="assetElement" data-theme="b" style="float: left; width: 360px; border-bottom: 1px solid #888888;">';
	row += '<div style="opacity: 1;"><div style="float: left;"><a class="popupLink" href="#popup'
			+ asset.daCode
			+ '" data-rel="popup" data-position-to="window" data-role="button" data-theme="b" data-inline="true" data-transition="fade">'
			+ '<img src="'+ thumbnailURL + '" style="width:100px;height:100px" />'
			+ '</a></div>';
	row += '<div style="float: left; padding-left: 50px;">';
	row += '<div style="float: left;font-size: normal; padding-top: 30px;">'
		+ asset.name + '</div>';
	row += '<div style="clear: both;"></div>';
	row += '<div style="overflow: auto;" id="currentRating_'
			+ $.trim(asset.daCode) + '"></div>';
	row += '</div></div>';
	row += '</div>';*/
	
	row += '<div style="float: left;">';
	row += '<a class="popupLink" href="#popup" data-rel="popup" data-position-to="window" data-role="button" data-theme="b" data-inline="true" data-transition="fade"><img src="' + tickIcon + '" style="position: absolute; width: 16px; height: 16px;" />';
	row += '<img src="' + thumbnailURL + '" style="width:100px;height:100px" />';
	row += '</a>';
	row += '</div>';
	row += '<div style="float: left; width: 300px;">';
	row += '<div style="padding-left: 10px; float: left; display: block; width: 300px; font-size: normal; padding-top: 15px;">'
			+ asset.name + '</div>';
	row += '<div style="clear: both;"></div>';
	
	var fileSize = this.getFileSize(asset);
	if(asset.onlineURL.endsWith('.zip')) {
		asset.documentType = 'ZIP';
	}
	row += '<div style="float: left; padding-left: 10px">' + asset.documentType + ' - Size: ' + fileSize + '</div>';
	row += '<div style="clear: both;"></div>';
	/*row += '<div id="currentRating_'
			+ $.trim(asset.daCode) + '' + index + '"></div>';
	row += '</div>';*/
	
	var assetButtonsDivId = 'assetButtons_' + $.trim(asset.daCode);
	var addToDownloadListId = 'addToDownloasList_' + $.trim(asset.daCode);
	var previewId = 'preview_' + $.trim(asset.daCode);
	
	row += '<div id="' + assetButtonsDivId + '" style="float: right; display: block; padding-top: 20px;">';
	if(this.settings.forDownload) {
		if(asset.downloadable == 'Y' && asset.downloaded == 'N') {
			row += '<a id="' + addToDownloadListId + '" class="custom-blue-button" style="margin-right: 5px;">' + this.settings.confirmText + '</a>';
		} else if(asset.documentType == 'ZIP' && asset.downloaded == 'N') {
			row += '<a id="' + addToDownloadListId + '" class="custom-blue-button" style="margin-right: 5px;">' + this.settings.confirmText + '</a>';
		}
	} else {
		row += '<a id="' + addToDownloadListId + '" class="custom-blue-button" style="margin-right: 5px;">' + this.settings.confirmText + '</a>';
	}
	
	
	if(this.settings.forDownload == true){
		row += '<a id="' + previewId + '" class="custom-blue-button" >Preview</a>';	
	}
	row += '</div>';
	
	columnObject.append(row);
	/*var id = "#currentRating_" + $.trim(asset.daCode) + '' + index;
	starDivs.push(id);
	ratings.push(asset.starValue);*/
	
	/*row += '<tr><td align="center" nowrap style="font-size:small; width : 130px;">'
		+ asset.name + '</td></tr>';
	if (this.settings.forDownload == true){
		row += '<tr><td align="center" style="font-size:small">' + com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.online
			+ (asset.downloadable == 'Y' ? " | " + com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.downloadable : "");
			+ "</td></tr></table>";
		row += '</td></tr></table>';
		columnObject.append(row);
	} else {
		row += '<tr><td><div style="overflow: auto;" id="currentRating_'
			+ $.trim(asset.daCode) + '"></div></td></tr></table>';
		row += '</td></tr></table>';
		columnObject.append(row);
		var id = "#currentRating_" + $.trim(asset.daCode);
		starDivs.push(id);
		ratings.push(asset.starValue);
		
	}*/
	
	/*if (!this.settings.isConfirmRequired) {
		
		columnObject.click(function() {
			selectedAssetCallBack(asset);
		});
	} else {
		if(this.settings.forDownload == true && asset.downloadable != 'Y'){
			//Do Nothing
		}else{
			this.__deleteButtons.push({
				button : 'btn' + asset.daCode,
				'asset' : asset
			});
		}
		this.__previewButtons.push({
			button : 'previewButton' + asset.daCode,
			'asset' : asset
		});
	}*/		
	
	rowObject.append(columnObject);
	//var _settings = this.settings;
	//var _product = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(asset.productCode);
	var _this = this;
	var _product = (this.settings.product!=null?this.settings.product:{});
	setTimeout(function(e) {
		//$('#' + assetButtonsDivId).trigger('create');
		/*$('#' + addToDownloadListId + ', #' + previewId).css('float', 'left');
		$('#' + addToDownloadListId + ', #' + previewId).css('width', 'auto !important');*/
		/*$('#' + addToDownloadListId + ', #' + previewId).css('background-color', '#7EB4EA');
		$('#' + addToDownloadListId + ', #' + previewId).css('color', 'white');
		$('#' + addToDownloadListId + ', #' + previewId).css('padding', '10px');
		$('#' + addToDownloadListId + ', #' + previewId).css('border', 'none');
		$('#' + addToDownloadListId + ', #' + previewId).css('box-shadow', '1px 1px 1px #FFFFFF');*/
		
		$('#' + addToDownloadListId).unbind('click').bind('click', function(e) {
			selectedAssetCallBack(asset);
		});
		
		$('#' + previewId).unbind('click').bind('click', function(e) {
			//selectedAssetCallBack(asset);
			var fileSize = ''; 
			/*if(asset.downloaded == 'Y'){
				fileSize = com.swaas.hidoctor.edetailing.util.FileUtil.getFileSize(asset.downloadedFileName)+' MB';
			} else {
				fileSize = '';
			}*/
			fileSize = _this.getFileSize(asset);
			var row = '<div data-role="popup" class="popupProd" id="popup'
					+ asset.daCode
					+ '" data-overlay-theme="a" data-theme="d" data-corners="false">';
			row +='<div id="preview_close">X</div>';
			row += '<table cellspacing="0" cellpadding="2" id="lightBox" width="100%" style="color: white;" ><tr><td>';
			row += '<img class="popphoto" src="'
					+ thumbnailURL
					+ '" style="max-height:512px;width:200px;height:300px;" alt="assetName"></td></tr>';
			row += '<tr><td>' + (_product.brandName!=null?_product.brandName:'') + ' - ' + asset.name
					+ '</td></tr>';
			if(_product.specialityName != null) {
				row += '<tr><td >Speciality :' + (_product.specialityName!=null?_product.specialityName:'')
					+ ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + fileSize + '</td></tr>';	
			} else {
				row += '<tr><td >File Size :' + fileSize + '</td></tr>';
			}
			row += '<tr><td align="center" height="40px"><div>';
			var previewButtonId = 'previewButton' + asset.daCode;
			var previewButtonHTML = '<a id="' + previewButtonId
								+ '" class="previewButton custom-blue-button" data-theme="b" data-mini="true" data-inline="true" data-corners="false">' 
								+ com.swaas.hidoctor.edetailing.ui.view.Resource.download.previewAsset + ' </a>';
			/*if(_settings.forDownload == true && asset.downloadable != 'Y'){
				row += previewButtonHTML;
			}else{
				row += '<a id="btn' + asset.daCode
				+ '" class="deleteButton" data-theme="b" data-mini="true" data-inline="true" data-corners="false">' + _settings.confirmText + ' </a>';
				if(_settings.forDownload){
					row += previewButtonHTML;
				}		
			}*/
			row += previewButtonHTML;
			row += '</div></td></tr>';
			row += '</table></div>';
			
			$('#popupPreviewDiv').popup();
			$('#popupPreviewDiv div').empty().append(row);
			$('#popupPreviewDiv').popup('open');
			setTimeout(function() {
				$('#' + previewButtonId).unbind('click').bind('click', function(e) {
					 $('#popupPreviewDiv').popup('close');
					previewCallback(asset);
				});
				$('#preview_close').unbind('click').bind('click', function(e) {
					 $('#popupPreviewDiv').popup('close');
				});
			}, 1000);
			//alert($('#popupPreviewDiv').parent().html());
		});
	}, 300);
	
	if(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView != undefined)
		setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.refreshPages(), 500);
};
AssetTable.prototype.addRow = function(rowObject) {
	this.assetTable.append(rowObject);
};

AssetTable.prototype.getFileSize = function(asset) {
	var config = ED.configuration;
	if(config == null) config = {estSizeBitRateStream: 0, estSizeBitRateOffline: 0};
	var fileSize = (asset.fileSize!=null?parseFloat(asset.fileSize):0);
	var bitrate = parseFloat(config.estSizeBitRateStream) + parseFloat(config.estSizeBitRateOffline);
	return (fileSize / bitrate).toFixed(2) + ' MB';
};