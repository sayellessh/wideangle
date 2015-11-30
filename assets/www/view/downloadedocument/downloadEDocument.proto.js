com.swaas.hidoctor.edetailing.ui.view._downloadEDocument = {

	selectedAssetObject : null,
	selectedProduct: null,
	intervalID : null, 
	products : null,
	clickedAsset : null,
	docOpenDeatils : {docOpen : false, openTime : 0,closeTime : 0, daBillingId : null },
	
	init : function() {
		
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument._init, 100);	
		
	},

	_init : function(){
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID);	
		ED.pageContext.pageName = com.swaas.hidoctor.edetailing.ui.view.Resource.download.header;		
		
		ED.includeHeader($("#header"),null, null, true);
		ED.setValue($('#lblDownload'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.download.header);
		
		ED.setValue($('#assetDownloadCaption'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.download.downloadList);	
		
		ED.setValue($('#productCaption'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.download.productList);


		var headerHieght = $("#header").height();
		var clientHeigt = $(window).height();
		$('#productContainer').height(clientHeigt - headerHieght);
		$('#productContainer').show();
		$('#productContainer').show();

		$("#content").show();
		
		ED.setValue($('#productCaption'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);
		
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument._populateProduct, 100);
		
	},
	
	_populateProduct : function(){
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID);	
		
		ED.setValue($('#productCaption'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.download.productList);
		
		var products = com.swaas.hidoctor.edetailing.service.ProductService.getProductsHasAssets();
		new ProductTable({
			containerId : "#productTable",
			products : products,
			onProductSelected : function(selectedProduct) {
				productClicked(selectedProduct);
			}
		});

		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.products = products;
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
							var product = com.swaas.hidoctor.edetailing.service.ProductService.getProduct(asset.productCode);
							com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.populateAsset(product);
						} else if (status == "FAILED") {
							//HANDLE ERROR IF REQUIRED
						} else if (status == "FAILEDNOMEMORY") {
							alert('No space available');
						}
						return Math.round(progress);
					}
				});

		if (products.length > 0) {
			ED.setValue(
					$('#assetCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);
					
			com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument._loadDefaultAssets, 100);
		}
		
	},
	_loadDefaultAssets : function(){
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.intervalID);	
		
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.selectedProduct = com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.products[0];
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument
				.populateAsset(com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.selectedProduct);
		
	},
	
	populateAsset : function(product) {
		$('#assetTable').show();
		if (product != null) {
			
			ED.setValue(
							$('#assetCaption'),
							(com.swaas.hidoctor.edetailing.ui.view.Resource.download.assetList
									+ " " + product.productName));
			var assets = com.swaas.hidoctor.edetailing.service.AssetService
					.getAssetByProductCode(product.productCode);

			new AssetTable(
					{
						containerId : "#assetTable",
						assets : assets,
						isStarRequired : false,
						isConfirmRequired : true,
						forDownload: true,
						onlineCheckRequired : true,
						confirmText : com.swaas.hidoctor.edetailing.ui.view.Resource.download.addToList,
						product : product,
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
							com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.previewAsset(selectedAsset);
						}
					});
		}

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
		var assetURL = com.swaas.hidoctor.edetailing.ui.view.CoreView.getAssetURL(asset);
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
	productClicked : function(product) {
		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument.selectedProduct = product;
		$('#assetContainer').show();
		$('#productDetails').hide();
		$('#productList').show();
		$('#downloadList').show();

		com.swaas.hidoctor.edetailing.ui.view.downloadEDocument
				.populateAsset(product);
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