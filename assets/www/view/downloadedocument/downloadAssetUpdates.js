/*var globalPlayerSettings = {
	selectedAsset : null,
	selectedDoctor : null,
	previousUrl : window.location.href
};*/

window.siteAnalyticsInsert = function(params) {
	/*alert('Inside site anal');
	com.swaas.hidoctor.edetailing.dao.SiteAnalyticsLocalDAO.insert(params,
		function(result) {
			alert('Success');
	}, function(e) {
			alert('Fail');
	});
	alert(JSON.stringify(com.swaas.hidoctor.edetailing.dao.SiteAnalyticsLocalDAO.get()));*/
};

window.siteAssetMasterInsert = function(params, success, failure) {
	/*//alert('Inside site assetmaster');
	//alert(JSON.stringify(params));
	com.swaas.hidoctor.edetailing.dao.SiteAssetMasterLocalDAO.insert(params,
			function(result) {
				//alert('Success-1');
			}, function(e) {
				//alert('Fail-1');
			});
	//alert(JSON.stringify(com.swaas.hidoctor.edetailing.dao.SiteAssetMasterLocalDAO.get()));
*/
};

com.swaas.hidoctor.edetailing.ui.view._downloadEDocument = {

	selectedAssetObject : null,
	intervalID : null, 
	clickedAsset : null,
	docOpenDeatils : {docOpen : false, openTime : 0,closeTime : 0, daBillingId : null },
	
	init : function() {
		
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument._init, 100);	
		
	},

	_init : function(){
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID);	
		ED.pageContext.pageName = com.swaas.hidoctor.edetailing.ui.view.Resource.download.header;		
		
		ED.includeNewHeader($("#header"), com.swaas.hidoctor.edetailing.ui.view.Resource.download.headerNoProduct, true, false, true, true, true, true);
		/*ED.setValue($('#lblDownload'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.download.header);*/
		$('#header').height(60);
		$('#header').show();
		ED.setValue($('#assetDownloadCaption'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.download.downloadList);	

		var headerHieght = $("#header").height();
		var clientHeigt = $(window).height();
		$('#productContainer').height(clientHeigt - headerHieght);
		$('#productContainer').show();
		$('#productContainer').show();

		$("#content").show();
		
		$('#popupPreviewDiv').popup();
		
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument._initSelectedAsset, 100);
		
	},
	
	_initSelectedAsset : function(){
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID);	
		
		var _this = this;
		
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.selectedAssetObject = new SelectedAssetTable(
				{
					containerId : "#assetDownloadTable",
					activityType : "download",
					progressManipulation : function(asset, status) {
						var progress = 0;
						if (status == "NEW") {
							progress = 5;
						} else if (status.indexOf("ASSET_DOWNLOADING_") == 0){
							progress = 5 + (parseFloat(status.substring("ASSET_DOWNLOADING_".length, status.length)) *.8);
						} else if (status == "ASSET_DOWNLOADED") {
							progress = 85;
						} else if (status.indexOf("THUMBNAIL_DOWNLOADING_") == 0){
							progress = 85 + (parseFloat(status.substring("THUMBNAIL_DOWNLOADING_".length, status.length)) *.1);
						} else if (status == "THUMBNAIL_DOWNLOADED") {
							progress = 95;
						} else if (status == "DONE") {
							populateAssetBilling(asset, false);
							progress = 100;
							
							var cfg = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO;
							var cdn = cfg.get();
							cdn.toDownloadCnt = _this.getDownloadableAssets().length;
							cfg.update(cdn);
							
							ED.bindNotificationEvents(cdn.toDownloadCnt);
							
							_this.populateAsset();
						} else if (status == "FAILED") {
							//HANDLE ERROR IF REQUIRED
						} else if (status == "FAILEDNOMEMORY") {
							alert('No space available');
						}
						return Math.round(progress);
					}
				});
		_this.populateAsset();
	},
	
	getDownloadableAssets: function() {
		var _this = this;
		var downloadAssets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAll();
		var downAssets = ED.getUniqueAssetsBy(downloadAssets, 'daCode');
		var assets = new Array();
		if(downAssets != null && downAssets.length > 0) {
			for(var i=0;i<=downAssets.length-1;i++) {
				if(downAssets[i].downloadable == 'Y' && downAssets[i].downloaded == 'N')
					assets.push(downAssets[i]);
			}
		}
		return assets;
	},
	populateAsset : function() {
		var _this = this;
		var assets = _this.getDownloadableAssets();
		if(assets.length > 0) {
			ED.hideEmptyList();
			$('#assetTable').show();
			ED.setValue($('#assetCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.download.assetList);
			new AssetTable(
			{
				containerId : "#assetList",
				assets : assets,
				isStarRequired : false,
				isConfirmRequired : true,
				forDownload: true,
				onlineCheckRequired : true,
				confirmText : com.swaas.hidoctor.edetailing.ui.view.Resource.download.addToList,
				product : null,
				onAssetSelected : function(selectedAsset) {
					var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
					if (isConnected == true){
						com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.selectedAssetObject
								.addAsset(selectedAsset);
					} else{
						if(selectedAsset.documentType == 'VIDEO'){
							alert(com.swaas.hidoctor.edetailing.ui.view.Resource.networkMessage.download.video);
						}else {
							alert(com.swaas.hidoctor.edetailing.ui.view.Resource.networkMessage.download.document);
						}
					}
				},
				onPreviewClicked : function(selectedAsset) {
					if(selectedAsset.downloaded != 'Y' && selectedAsset.onlineURL.endsWith('.zip')) {
						alert(com.swaas.hidoctor.edetailing.ui.view.Resource.messages.downloadAssetToPlay);
						return;
					}
					com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.previewAsset(selectedAsset);
				}
			});	
		} else {
			ED.showEmptyList("No Assets Available");
		}
	},
	
	getUniqueAssetsBy: function(assets, key) {
		var uniqueAssetsArray = new Array();
		if(assets != null && assets.length > 0) {
			var uniqueAssets = {};
			for(var i=0;i<=assets.length-1;i++) {
				if(uniqueAssets[assets[i][key]] == null) {
					uniqueAssets[assets[i][key]] = assets[i];
					uniqueAssetsArray.push(assets[i]);
				}
			}
		}
		return uniqueAssetsArray;
	},
	
	previewAsset : function(asset) {
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.clickedAsset = asset;
		var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
		var documentType = asset.documentType;
		if (asset.downloaded != 'Y' && isConnected == false){
			if(documentType == 'VIDEO'){
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.networkMessage.video);
			}else {
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.networkMessage.document);
			}
			return;
		}
		

		//Populate Billing Section
		var daBillingId = this.populateAssetBilling(asset, true);
		var assetURL = '';
		if(asset.documentType == 'ZIP') {
			assetURL = asset.offLineURL;
			//window.plugins.fileOpener.open(assetURL);
					
			$('#page-download, p.copy_right').hide();
			$('#html_viewer').show().attr('src', assetURL);
			$('#html_viewer').load(function(){
				$('#html_viewer').contents().find('.obj-string').text('');
				//$('#html_viewer').contents().find('.obj-string').text(JSON.stringify(globalPlayerSettings));
				$('#html_viewer').contents().find('body').addClass('loaded');
			});
			
			return;
		} else {
			assetURL = com.swaas.hidoctor.edetailing.ui.view.CoreView.getAssetURL(asset);
		}
		var assetCode = asset.daCode;
		if (documentType == 'VIDEO'){
				window.plugins.videoPlayer.play([assetURL, daBillingId]);
		} else {
			this.docOpenDeatils.daBillingId = daBillingId;
			if(asset.downloaded == 'Y'){
				var d = new Date();
				this.docOpenDeatils.openTime = d.getTime();
				this.docOpenDeatils.docOpen = true;
				window.plugins.fileOpener.open(assetURL);
			} else {
				var ext = "";
				var assetURLSplit = assetURL.split(".");
					if (assetURLSplit != null && assetURLSplit.length > 0){
						ext = assetURLSplit.pop();
						ext = "." + ext;
					}
				var fileName = assetCode + ext;
				var tempFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.tempFolder;
				var downloadedFileName = "file:///sdcard/" + tempFolder + "/" + fileName;
				var isFileExist = com.swaas.hidoctor.edetailing.util.FileUtil.checkIfFileExists(downloadedFileName);
					if (!isFileExist){
						var firstOpen = true;
						ED.showLoading();
						var downloaderUtil = new Downloader();
						var context = this;
						downloaderUtil.downloadFile(assetURL, tempFolder, fileName, {}, function(progressStatus){
							if (progressStatus.status == -1){
				            	ED.logError(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument, progressStatus, asset, "previewAsset");
							}	
							if(progressStatus.progress >= 100 && firstOpen){
								firstOpen = false;
								ED.hideLoading();
								var d = new Date();
								context.docOpenDeatils.openTime = d.getTime();
								context.docOpenDeatils.docOpen = true;
								window.plugins.fileOpener.open(downloadedFileName);		
							}
						});		
					}else {
						var d = new Date();
						this.docOpenDeatils.openTime = d.getTime();
						this.docOpenDeatils.docOpen = true;
						window.plugins.fileOpener.open(downloadedFileName);		
					}
			}
		}
	},
	populateAssetBilling : function(currentAsset, isPreview){
		if(isPreview == null){
			isPreview = false;
		}
    	var user = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
    	var selectedProduct = com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.selectedProduct;

		var billing = null;
		var division = com.swaas.hidoctor.edetailing.service.UserService.getUserDivision(user.userCode);
		if(division == null){
			division = {};
		}
		var billingDate = ED.context.selectedDate;
		if(billingDate == null || (typeof billingDate == 'undefined')){
			billingDate = new Date();
		}
    	if (selectedProduct == null){
    		selectedProduct = {};
    	}
    	
		var product = com.swaas.hidoctor.edetailing.service.ProductService.getProduct(currentAsset.productCode);
		var position = ED.getGeoLocation();
		var assetBilling = {
				companyCode: user.companyCode,
			    daCode: currentAsset.daCode,
			    userCode:user.userCode ,
				userName: user.userName,
				regionCode: user.regionCode ,
				regionName: user.regionName,
				divisionCode: division.divisionCode,
				divisionName: division.divisionName,
				dateTime: new Date(),
				offlineClick: 0,
				downloaded: 0,
				onlinePlay: 0,
				dcrActualDate: billingDate,
				productCode: currentAsset.productCode,
				productName: product.productName,
				doctorCode: null,
				doctorRegionCode: null,
				latitude : position.coords.latitude,
				longitude : position.coords.longitude,
				geoAddress : position.geoAddress
		};
		if(isPreview){
			if(currentAsset.downloaded == 'Y'){
				assetBilling.offlineClick = 1;
			} else {
				assetBilling.onlinePlay = 1;
			}
		}else{
			assetBilling.downloaded = 1;
		}
		billing = com.swaas.hidoctor.edetailing.service.AssetService.insertAssetBilling(assetBilling);
		if(billing != null){
			return billing.daBillingId;
		}
	},
   
    backFromDocOpen : function(){ 
		if(this.docOpenDeatils.docOpen == true){
			var d = new Date();
			this.docOpenDeatils.docOpen = false;
			var documentViewTime =(d.getTime()-this.docOpenDeatils.openTime);
			console.log(d.getTime()-this.docOpenDeatils.openTime);
			com.swaas.hidoctor.edetailing.service.AssetService.updateAssetBilling(this.docOpenDeatils.daBillingId, documentViewTime);
			this.docOpenDeatils.openTime = 0;
		}
    }
};


function productClicked(product) {
	com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.productClicked(product);
}
function populateAssetBilling(currentAsset, isPreview){
	com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.populateAssetBilling(currentAsset, isPreview);
}
com.swaas.hidoctor.edetailing.ui.view.downloadEDocument = createProxy(com.swaas.hidoctor.edetailing.ui.view._downloadEDocument, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);