function SelectedAssetTable(options) {
	this.settings = $.extend({
		style : {
			'background-color' : 'black'
		},
		isDiv : false,
		activityType : "",
		selecteAsset : {},
		progressManipulation : function(asset, status) {
        }
	}, options);
	this.assets = [];
	this.seletedAssetTable = null;
	var _this = this;
	this.activityManager = new ActivityManager({
		onActivityProgress : function(asset, status) {
			_this.onActivityProgress(asset, status);
		}
	});
	this.currentProgress = 0;
	this._init();
}
SelectedAssetTable.prototype.onActivityProgress = function(asset, status) {

	var progress = 0;
	
	progress = this.settings.progressManipulation(asset, status);
	
	if(isNaN(progress)){
		progress = this.currentProgress;
		$("tr[idRow='assetRow"+asset.daCode+"']").attr("downloadStatus", "FAILED");
		$('#progressContainer' + asset.daCode).removeClass('ui-tolito-progressbar-active-');
		$('#progressContainer' + asset.daCode).addClass('ui-tolito-progressbar-active-f');
		this.activityManager.currentCounter++;
	}else {
		this.currentProgress = progress;
		$('#progressContainer' + asset.daCode).progressbar({
			value : progress
		});
	}
};
SelectedAssetTable.prototype._init = function() {
	if (this.settings.isDiv) {

		this.seletedAssetTable = $("<table />").appendTo(
				$(this.settings.containerId));

	} else {
		
		this.seletedAssetTable = $(this.settings.containerId);
	}
	
	var _this = this;
	
	$('#activityTrigger').hide();
	$('#activityTrigger').unbind();
	$('#activityTrigger').click(function() {
		if(_this.settings.activityType == 'download' && !com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()){
			alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
			return;
		} else {
			_this.activityManager.start();
		}
	});

};
SelectedAssetTable.prototype.addRow = function(selectedAsset) {

	var idCounter = selectedAsset.daCode;
	var assetType = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType[selectedAsset.documentType];
	if (assetType == null){
		assetType = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType["UNKNOWN"];
	}

	var rowObject = $('<tr />');
	rowObject.attr("idRow",'assetRow'+idCounter);
	var column1 = $('<td />');
	column1
			.append('<img src="' + selectedAsset.thumbnailURL +'" style="opacity:1;width:50px;height:75px;">');
	rowObject.append(column1);

	var column2 = $('<td />');
	
	var column2Content = $('<table width = "100%"><tr width = "100%"><td>' + selectedAsset.name
			+ '</td><td align = "right"><div id="removeButtonCtr' + idCounter
			+ '"/></td></tr></table>');

	column2.append(column2Content);
	rowObject.append(column2);
	
	var progressBarRow = $("<tr/>");
	column2Content.append(progressBarRow);
	
	var progressBarColumn = $('<td width="100%" colspan="2" />');
	progressBarRow.append(progressBarColumn);
	
	progressBarColumn.append($('<div style="display: block;" clas="progressCtn" id="progressContainer' + idCounter + '" />'));

	this.seletedAssetTable.append(rowObject);
	var button = $('<a href="#" data-role="button" data-theme="b" data-inline="true" data-corners="false" data-mini="true" id="removeButton' + idCounter 
			+ '" class="removeButton">'+com.swaas.hidoctor.edetailing.ui.view.Resource.download.removeFromList+'</a>');

	var _this = this;
	button.click(function() {
		var downloadInProgress = ED.downloading;
		var failedDownload = ("FAILED" == rowObject.attr('downloadStatus'));
		if(typeof downloadInProgress=== "undefined" || downloadInProgress == null){
			downloadInProgress = false;
		}
		if(typeof failedDownload != "undefined" && failedDownload){
			downloadInProgress = false;
		}
		if(!downloadInProgress){
			var activityStatus = _this.activityManager.getActivityStatus(selectedAsset);
	        if(activityStatus === "NEW" || activityStatus === "DONE"){
	        	_this.activityManager.unscheduleActivity(selectedAsset);
	        	rowObject.remove();
	    		$.each(_this.assets, function(index, assetRow) {
	    			if (assetRow != null && (assetRow.daCode == selectedAsset.daCode)) {
	    				_this.assets.splice(index, 1);
	    			}
	    		});
	        }else if(failedDownload){
	        	_this.activityManager.unscheduleActivity(selectedAsset);
	        	rowObject.remove();
	    		$.each(_this.assets, function(index, assetRow) {
	    			if (assetRow != null && (assetRow.daCode == selectedAsset.daCode)) {
	    				_this.assets.splice(index, 1);
	    			}
	    		});
	        }
        }
	});
	$("#removeButtonCtr" + idCounter).append(button);
	
	$("#removeButton" + idCounter).button();
	$('#progressContainer' + idCounter).progressbar({
		value : 0,
		outerTheme : "b",
		innerTheme : "e",
		mini : true
	});
};

SelectedAssetTable.prototype.addAsset = function(asset) {
	var _selectedAssetTable = this;
    var existingAssets = this.assets;
	var isAssetExists = false;
	$.each(existingAssets, function(index, assetRow) {
		if (assetRow.daCode == asset.daCode) {
			isAssetExists = true;
		}
	});

	if (!isAssetExists) {
		
		var isFileExist = com.swaas.hidoctor.edetailing.util.FileUtil.checkIfFileExists(asset.downloadedFileName);
		var isDownloaded = (asset.downloaded == 'Y') ? true : false;
		if (this.settings.activityType === "delete"  && isDownloaded && isFileExist) {		
			$('#activityTrigger').show();
			this.assets.push(asset);
			_selectedAssetTable.addRow(asset);
	
			var assetToManage = $.extend({
				action : this.settings.activityType
			}, asset);
			this.activityManager.scheduleActivity(assetToManage);
		}else if (this.settings.activityType === "download"  && !isDownloaded) {
			var isDownloading = ED.downloading;
			if(false == isDownloading){
				$('#activityTrigger').show();
				this.assets.push(asset);
				_selectedAssetTable.addRow(asset);
		
				var assetToManage = $.extend({
					action : this.settings.activityType
				}, asset);
				this.activityManager.scheduleActivity(assetToManage);
			}else{
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.download.pleaseWait);
			}
		}
		else{
			if (this.settings.activityType === "download") {
				alert( asset.name + com.swaas.hidoctor.edetailing.ui.view.Resource.download.alreadyDownloaded);
			} else if(this.settings.activityType === "delete"){
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.alreadyDeleted);
			}
		}
	}else{
		alert(com.swaas.hidoctor.edetailing.ui.view.Resource.download.assetadded + this.settings.activityType + com.swaas.hidoctor.edetailing.ui.view.Resource.download.list);
	}

};
