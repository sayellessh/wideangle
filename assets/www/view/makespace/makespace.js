com.swaas.hidoctor.edetailing.ui.view._Makespace = {
	relatedAssetUL : null,
	selectedAssetObject : null,
	intervalID : null,

	init : function() {
		
		com.swaas.hidoctor.edetailing.ui.view.Makespace.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.Makespace._init, 100);
		
	},

	_init : function() {
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Makespace.intervalID);
		
		//ED.includeHeader($("#header"));
		ED.includeNewHeader($("#header"), com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.header, true, false, true, true, true, true);
		
		ED.setValue(
				$('#productCaption'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);

		/*ED.setValue(
					$('#lblmakeSpace'),
					com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.header);*/
		

		
		var headerHieght = $("#header").height();
		var clientHeigt = $(window).height();
		$('#productContainer').height(clientHeigt - headerHieght);

		$('#carousel').hide();
		$("#content").show();
		
		com.swaas.hidoctor.edetailing.ui.view.Makespace.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.Makespace._populateProduct, 100);

	},

	_populateProduct : function() {
		
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.Makespace.intervalID);	
		var _this = this;
		ED
		.setValue(
				$('#productCaption'),
				com.swaas.hidoctor.edetailing.ui.view.Resource.download.productList);
		ED.setValue(
					$('#selectedAssetsCaption'),
					com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.selectedAssets);
		ED.setValue(
					$('#assetCaption'),
					com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.assetCaption);

		var products = com.swaas.hidoctor.edetailing.service.ProductService
				.getProductsByOfflineAssets();

		new ProductTable({
			containerId : "#productTable",
			products : products,

			onProductSelected : function(selectedProduct) {
				com.swaas.hidoctor.edetailing.ui.view.Makespace
						.populateAsset(selectedProduct);

			}
		});
		
		if (products.length > 0){
			ED.hideEmptyList();
			com.swaas.hidoctor.edetailing.ui.view.Makespace.populateAsset(products[0]);
		}else{
		
				ED.setValue($('#assetCaption'),
						(com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.emptyList));
				ED.clearTable($("#assetTable"));
				ED.clearTable($("#selectedItemsTable"));
				ED.showEmptyList(com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.emptyList);
		}
		com.swaas.hidoctor.edetailing.ui.view.Makespace.selectedAssetObject = new SelectedAssetTable(
				{
					containerId : "#selectedItemsTable",
					activityType : "delete",
					progressManipulation : function(asset, status) {
						var progress = 0;
						if (status == "STARTED") {
							progress = 50;
						}
						if (status == "SD_CARD_DONE") {
							progress = 70;
						}

						if (status == "THUMBNAIL_DONE") {
							progress = 90;
						}

						if (status == "DONE") {
							progress = 100;
							com.swaas.hidoctor.edetailing.ui.view.Makespace.refreshProductList();
							
							var cfg = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO;
							var cdn = cfg.get();
							cdn.toDownloadCnt = _this.getDownloadableAssets().length;
							cfg.update(cdn);
							
							ED.bindNotificationEvents(cdn.toDownloadCnt);
							}
						return progress;
					}
				});
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
	populateAsset : function(product) {
		if (product != null) {
			ED
					.setValue(
							$('#assetCaption'),
							(com.swaas.hidoctor.edetailing.ui.view.Resource.download.assetList
									+ " " + product.productName));
			var assets = com.swaas.hidoctor.edetailing.service.AssetService
					.getOfflineAssetsByProductCode(product.productCode);

			new AssetTable(
					{
						containerId : "#assetTable",
						assets : assets,
						isStarRequired : false,
						isConfirmRequired : true,
						confirmText : com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.addToList,
						product : product,
						onAssetSelected : function(selectedAsset) {
							com.swaas.hidoctor.edetailing.ui.view.Makespace.selectedAssetObject
									.addAsset(selectedAsset);
						}
					});
		}
	},
	
	refreshProductList : function() {
				ED
				.setValue(
						$('#productCaption'),
						com.swaas.hidoctor.edetailing.ui.view.Resource.download.productList);
				ED.setValue(
							$('#selectedAssetsCaption'),
							com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.selectedAssets);
				ED.setValue(
							$('#assetCaption'),
							com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.assetCaption);
		
				var products = com.swaas.hidoctor.edetailing.service.ProductService
						.getProductsByOfflineAssets();
		
				new ProductTable({
					containerId : "#productTable",
					products : products,
		
					onProductSelected : function(selectedProduct) {
						com.swaas.hidoctor.edetailing.ui.view.Makespace
								.populateAsset(selectedProduct);
					}
				});
				
				if (products.length > 0){
					com.swaas.hidoctor.edetailing.ui.view.Makespace.populateAsset(products[0]);
				}else{
				
						ED.setValue($('#assetCaption'),
								(com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.emptyList));
						ED.clearTable($("#assetTable"));
						ED.clearTable($("#selectedItemsTable"));
						ED.showEmptyList(com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.emptyList);
				}	
	}
};

com.swaas.hidoctor.edetailing.ui.view.Makespace = createProxy(com.swaas.hidoctor.edetailing.ui.view._Makespace, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);