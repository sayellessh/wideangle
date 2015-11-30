com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView = {
		pageScroller : null,
		productScroller : null,
		refreshPages : function() {
			//alert('refreshing');
			if(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller != null) {
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller.refresh();
			} else {
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.pageScroller = new iScroll('assetTable');
			}
			if(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.productScroller != null) {
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.productScroller.refresh();
			} else {
				com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.productScroller = new iScroll('productTable');
			}
		}
};

com.swaas.hidoctor.edetailing.ui.view._eDetailing = {
	clickedAsset: null,
	selectedProduct: null,
	doctor: null,
	docOpenDeatils : {docOpen : false, openTime : 0,closeTime : 0, daBillingId : null },
	intervalID : null, 
	
	productTable: null,
	
	init : function() {
		com.swaas.hidoctor.edetailing.ui.view.eDetailing.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.eDetailing._init, 100);			
	},
	
	configuration: null,
	doctor: null,
	assets: null,
	products: null,
	spotliteAssets: null,
	productsHavingDownloadedAssets : null,
	showMore : true,
	
	_init : function() {
		console.log('Started loading eDetailing');
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.eDetailing.intervalID);	
		
		ED.pageContext.pageName = com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.eDetailing;		
		ED.context.previousPage = "view/doctor/myDoctorsView.html";
		//console.log(objToString(ED.context.request.selectedDoctor));
		//console.log(JSON.stringify(ED.context.request.selectedDoctor));
		ED.context.previousDoctor = ED.context.request.selectedDoctor;
		//ED.context.request.selectedDoctor = {"customerCode":"DOC00000006D252","regionCode":"REC00000006","customerName":"RODE A A","mdl":"00000001","categoryCode":"DCT00000010","specialityCode":"SPC00000024","customerEntityType":"DOCTOR","regionName":"MUMBAI KALYAN E","categoryName":"PRX NC","specialityName":"SURGEON"};
		//ED.context.previousDoctor = {"customerCode":"DOC00000006D252","regionCode":"REC00000006","customerName":"RODE A A","mdl":"00000001","categoryCode":"DCT00000010","specialityCode":"SPC00000024","customerEntityType":"DOCTOR","regionName":"MUMBAI KALYAN E","categoryName":"PRX NC","specialityName":"SURGEON"};
		
		//ED.includeHeader($("#header2"), false, true, true);
		
		doctor = ED.context.request.selectedDoctor;
		//ED.includeNewHeader($("#header"), doctor.customerName, true, false, false, true);
		ED.includeNewHeader($("#header"), doctor.customerName, false, true, true, false, true, true);
		//ED.setValue($('#eDetailingCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);
		
		var headerHieght = $("#header").height();
		var clientHeigt = $(window).height();
		$('#productContainer').height(clientHeigt - headerHieght);
		$('#productContainer').show();
		$('#player').hide();			

		$('#relatedAssetList').width($(window).width()*.35);
		$('#spotLiteList').width($(window).width()*.35);
		$('#player').width($(window).width()*.40);
		$('#assetAnalyticsDisplay').width($(window).width()*.40);
		$('#assetAnalyticsInput').width($(window).width()*.40);
		
		$('#assetTable').height($(window).height()-75);
		$('#productTable').height($(window).height()-75);
		//$('#productTable').height($(window).height()-50);
		//alert($(window).height());
		$('#content').show();
		//configuration added
		com.swaas.hidoctor.edetailing.ui.view.eDetailing.configuration = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
		com.swaas.hidoctor.edetailing.ui.view.eDetailing.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.eDetailing._populateData, 100);
		
		/*var cont = '<a href="#left-panel" style="border: none; background: none; width: 50px;" data-theme="d" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-icon-nodisc ui-btn-left ui-btn ui-btn-corner-all ui-btn-icon-notext ui-btn-up-d" data-corners="true" data-wrapperels="span" title="Open left panel">';
		cont += '<span id="swipe-icon-img" style="background-image: url(\'img/menu-opt.png\'); background-size: 100% auto; width: 32px; height: 32px; float: left;"></span>';
		cont += '</a>';
		$('#header').append(cont);*/
		
		//$('#heading').empty().append(doctor.customerName);
		com.swaas.hidoctor.edetailing.ui.view.Resource.favAssetCnt = 1;
		console.log('End loading eDetailing');
	},
	
	_populateData : function() {
		console.log("Start _populateData");
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.eDetailing.intervalID);		
		var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;		
		doctor = ED.context.request.selectedDoctor;		
		_this.populateData(doctor);			
		
		if (_this.products.length > 0){
			//var eDetailingCaption = doctor.customerName + " | "  + doctor.specialityName;		
			//ED.setValue($('#eDetailingCaption'), eDetailingCaption);
			/*$('#eDetailingCaption').append(eDetailingCaption);*/
			ED.setValue($('#productCaption'),
					com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.productList);
			/*$('#productCaption').append(
					com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.productList);*/
		} else {
			var ind = 0;
			ED.setValue($('#productCaption'),
					com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.noProducts);
			var productElementDiv = $('<li class="productOverviewDiv" style="background-color: white; box-shadow: 0px 0px 1px #888888; float: left; width: 100%; border: 1px solid #CCCCCC; padding-bottom: 5px; margin-bottom: 10px;" />');
			productElementDiv.append('<div class="title" style="padding: 10px; border-bottom: 1px solid #CCCCCC;">' 
					+ (com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.emptyList + ' ' + doctor.customerName) + '</div>');
			var rowObject = $('<div class="assetOverviewDiv" id="divProduct' + ind + '"><ol style="margin: 0px; padding: 10px;" id="olAssets' + ind + '"></ol></div>');
			productElementDiv.append(rowObject);
			$('#assetList').append(productElementDiv);
			
			/*ED.setValue($('#eDetailingCaption'),
					(com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.noAssets
							+ " " + doctor.customerName));*/
			return;
		}
		
		_this.productTable = new ProductTable({
        	containerId : "#productList",
        	products : _this.products,
        	showMore : _this.showMore,
        	onProductSelected : function(selectedProduct){
        		com.swaas.hidoctor.edetailing.ui.view.eDetailing.productClicked(selectedProduct);
        		$( "#left-panel" ).panel( "close" );
        	},
        	onMoreClicked : function(productTable) {
        		com.swaas.hidoctor.edetailing.ui.view.eDetailing.addMoreProducts(productTable);
			}
        });  
		
		if (_this.products.length > 0){
			/*ED.setValue($('#assetCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);*/
			//$('#assetCaption').append(com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading);
			
			com.swaas.hidoctor.edetailing.ui.view.eDetailing.intervalID = setInterval(com.swaas.hidoctor.edetailing.ui.view.eDetailing._loadDefaultAssets, 100);	
		}
		
	},
	
	_loadDefaultAssets : function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.eDetailing.intervalID);
		
		var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
		
		//com.swaas.hidoctor.edetailing.ui.view.eDetailing.selectedProduct = _this.products[0];
		//_this.populateAsset(_this.products[0]);
		_this.populateFavAsset(_this.products);
	},
	
	populateData: function(doctor){
		var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
		_this.doctor = doctor;
		var excludeMCAssets = true;
		var mappedDoctorProducts = com.swaas.hidoctor.edetailing.service.ProductService.getDoctorProductsHasAssets(doctor);
		
		var productCodes = {};
		if(mappedDoctorProducts.length > 0){
			var mappedProductCodes = [];
			$.each(mappedDoctorProducts, function(index, mappedDoctorProduct) {
				mappedProductCodes.push(mappedDoctorProduct.productCode);
				productCodes[mappedDoctorProduct.productCode] = mappedDoctorProduct.productCode;
			});

			_this.assets = com.swaas.hidoctor.edetailing.service.AssetService.getAssetsForProductCodes(mappedProductCodes, excludeMCAssets);
			_this.products = mappedDoctorProducts;
		} else {
			_this.assets = com.swaas.hidoctor.edetailing.service.AssetService.getAllAssetsForDoctorProfile(doctor, excludeMCAssets);
			_this.products = [];
			$.each(_this.assets, function(index, asset){
				var productCode = asset.productCode;
				if (productCodes[productCode] == null){
					productCodes[productCode] = productCode;
					var product = com.swaas.hidoctor.edetailing.service.ProductService.getProduct(productCode);
					if(product != null){
						_this.products.push(product);
					}
				}
			});		
		}
		
		var spotliteAssets = com.swaas.hidoctor.edetailing.service.AssetService.getSpotliteAssetsWithProducts(doctor);
		if (spotliteAssets != null){
			$.each(spotliteAssets, function(index, asset){
				var productCode = asset.productCode;
				if (productCodes[productCode] == null){
					productCodes[productCode] = productCode;
					var product = com.swaas.hidoctor.edetailing.service.ProductService.getProduct(productCode);
					if(product != null){
						_this.products.push(product);
					}
				}
			});		
				
			_this.assets = _this.assets.concat(spotliteAssets);
		}
		if(_this.assets == null || _this.assets.length == 0){
			_this.showMore = false;
			_this.assets = com.swaas.hidoctor.edetailing.service.AssetService.getAllAssets(true);
			$.each(_this.assets, function(index, asset){
				var productCode = asset.productCode;
				if (productCodes[productCode] == null){
					productCodes[productCode] = productCode;
					var product = com.swaas.hidoctor.edetailing.service.ProductService.getProduct(productCode);
					if(product != null){
						_this.products.push(product);
					}
				}
			});				
		}
		
		if(_this.products.length >0){
			//com.swaas.hidoctor.edetailing.ui.view.eDetailing.selectedProduct = _this.products[0];	
		}
	},

	populateAsset : function(product) {
		if (product != null) {
			var ind = 1;
			var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
			var assets = [];
			var uniqueAsset = {};
			$.each(_this.assets, function(index, asset){
				if (asset.productCode == product.productCode && uniqueAsset[asset.daCode] == null){
					assets.push(asset);
					uniqueAsset[asset.daCode] = asset;
				}
			});
			
			var productElementDiv = $('<li class="productOverviewDiv" style="background-color: white; box-shadow: 0px 0px 1px #888888; float: left; width: 100%; border: 1px solid #CCCCCC; padding-bottom: 5px; margin-bottom: 10px;" />');
			productElementDiv.append('<div class="title" style="padding: 10px; border-bottom: 1px solid #CCCCCC;">' + product.productName + '</div>');
			var rowObject = $('<div class="assetOverviewDiv" id="divProduct' + ind + '"><ol style="margin: 0px; padding: 10px;" id="olAssets' + ind + '"></ol></div>');
			productElementDiv.append(rowObject);
			$('#assetList').empty().append(productElementDiv);
			var olObject = $('#olAssets' + ind);
			
			//alert(product.productCode + ' len: ' + assets.length);
			if (assets.length > 0){
				/*olObject.append('<li id="assetCaption' + ind + '">' 
						+ (com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.assetList
						+ " " + product.productName) + '</li>');*/
				/*ED.setValue($('#assetCaption'),
						(com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.assetList
								+ " " + product.productName));*/
			} else {
				olObject.append('<li style="background-color: white; border-bottom: none;" id="assetCaption' + ind + '">' 
						+ (com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.emptyList
						+ " " + product.productName) + '</li>');
				/*ED.setValue($('#assetCaption' + ind),
						(com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.emptyList
								+ " " + product.productName));*/
			}
			
			new AssetTable({
	        	containerId : "#olAssets" + ind,
	        	assets :  assets,
	        	limit : 3,
	        	isRatingRequired : true,
	        	isConfirmRequired : false,
	        	onlineCheckRequired: true,
	        	product :product,
	        	onAssetSelected : function(selectedAsset){
	        		assetClicked(selectedAsset);
	        	}
	        });
			setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.refreshPages(), 500);
			//setTimeout(productScroll.refresh(), 1000);

		}
		setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.refreshPages(), 500);
	},
	populateFavAsset : function(products) {
		//ED.setValue($("#stopLightLbl"), "");
		console.log('populateFavAsset');
		if(products.length > 0) {
			$.each(products, function(ind, product) {
				if (product != null) {
					var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
					var assets = [];
					var uniqueAsset = {};
					$.each(_this.assets, function(index, asset){
						if (asset.productCode == product.productCode && uniqueAsset[asset.daCode] == null && index < 3){
							assets.push(asset);
							uniqueAsset[asset.daCode] = asset;
						}
					});
					
					var productElementDiv = $('<li class="productOverviewDiv" style="background-color: white; box-shadow: 0px 0px 1px #888888; float: left; width: 100%; border: 1px solid #CCCCCC; padding-bottom: 5px; margin-bottom: 10px;" />');
					productElementDiv.append('<div class="title" style="padding: 10px; border-bottom: 1px solid #CCCCCC;">' + product.productName + '</div>');
					var rowObject = $('<div class="assetOverviewDiv" id="divProduct' + ind + '"><ol style="margin: 0px; padding: 10px;" id="olAssets' + ind + '"></ol></div>');
					productElementDiv.append(rowObject);
					$('#assetList').append(productElementDiv);
					var olObject = $('#olAssets' + ind);
					
					//alert(product.productCode + ' len: ' + assets.length);
					if (assets.length > 0){
						/*olObject.append('<li id="assetCaption' + ind + '">' 
								+ (com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.assetList
								+ " " + product.productName) + '</li>');*/
						/*ED.setValue($('#assetCaption'),
								(com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.assetList
										+ " " + product.productName));*/
					} else {
						olObject.append('<li style="background-color: white; border-bottom: none;" id="assetCaption' + ind + '">' 
								+ (com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.emptyList
								+ " " + product.productName) + '</li>');
						/*ED.setValue($('#assetCaption' + ind),
								(com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.emptyList
										+ " " + product.productName));*/
					}
					
					new AssetTable({
			        	containerId : "#olAssets" + ind,
			        	assets :  assets,
			        	isRatingRequired : true,
			        	isConfirmRequired : false,
			        	onlineCheckRequired: true,
			        	product :product,
			        	onAssetSelected : function(selectedAsset){
			        		assetClicked(selectedAsset);
			        	}
			        });
					setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.refreshPages(), 500);
				}
			});
		}
		setTimeout(com.swaas.hidoctor.edetailing.ui.view.MyDoctorsView.refreshPages(), 500);
	},

	relatedAssets: [],
	spotLightAssets: [],
	populateRelatedAsset : function(asset) {
		
		var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
		_this.relatedAssets = [];
		var uniqueAssets = {};
		$.each(_this.assets, function(index, relatedAsset){
			if (relatedAsset.productCode == asset.productCode){
				if (uniqueAssets[relatedAsset.daCode] == null){
					_this.relatedAssets.push(relatedAsset);
					uniqueAssets[relatedAsset.daCode] = relatedAsset.daCode;
				}
			}
		});
		
		$.each(_this.assets, function(index, relatedAsset){
			if (relatedAsset.productCode != asset.productCode){
				if (uniqueAssets[relatedAsset.daCode] == null){
					_this.relatedAssets.push(relatedAsset);
					uniqueAssets[relatedAsset.daCode] = relatedAsset.daCode;
				}
			}
		});
			
		
		_this.intervalID = setInterval(_this.displayRelatedAssetSlider, 100);
		
	},
	
	displayRelatedAssetSlider: function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.eDetailing.intervalID);
		var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
		var asset = _this.clickedAsset;
		var relatedAssetsSlider = new Slider({
			containerId: '#relatedAssetList'
		});
		$.each(_this.relatedAssets, function(index, relatedAsset) {
			var background = "black";
			if (relatedAsset.daCode == asset.daCode){
				background = "blue";
			}
			var thumbnailURL = com.swaas.hidoctor.edetailing.ui.view.CoreView.getThumbnailURL(relatedAsset);
			
			var documentType = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType[relatedAsset.documentType];
			if (documentType == null){
				 documentType = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType["UNKNOWN"];
			}
			
			var relatedAssetDiv = $('<div style="text-align:center;vertical-align middle; background-color:' +
					background + ';width:110px; height:90px"><img src="'+ thumbnailURL +'" style="width:100px; height:90px"/></div><div style="text-align:center;vertical-align: middle; background-color:' +
					background + ';">' +
					'<span style="font-size:10px;font-color:white;width:100px;float: left;">'+ relatedAsset.name + '</span> </div>');
			relatedAssetsSlider.addElement(relatedAssetDiv);
			
			relatedAssetDiv.click(function(){
				_eDetailing = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
				if(relatedAsset.productCode != _eDetailing.selectedProduct.productCode){
					var productRow = $('#productTable').find("[productCode='" + relatedAsset.productCode + "']");
					var previousRow = $('#productTable').find("[productCode='" + _eDetailing.selectedProduct.productCode + "']");
					productRow.css('background-color' , 'blue');
					previousRow.css('background-color' , 'black');
					_eDetailing.selectedProduct = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(relatedAsset.productCode); 
					_eDetailing.productTable.previousSelectedRow = productRow;
				}else {
					var productRow = $('#productTable').find("[productCode='" + relatedAsset.productCode + "']");
					productRow.css('background-color' , 'blue');					
				}
				assetClicked(relatedAsset);
			});

		});
		
		_this.intervalID = setInterval(_this.displaySpotLightAssetSlider, 100);
	},
	
	displaySpotLightAssetSlider: function(){
		clearInterval(com.swaas.hidoctor.edetailing.ui.view.eDetailing.intervalID);
		var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
		var asset = _this.clickedAsset;
		// For spotLight Section 
		if (_this.spotliteAssets == null){
			_this.spotliteAssets = com.swaas.hidoctor.edetailing.service.AssetService.getSpotliteAssets(_this.doctor);
		}
		var spotlightAssets = _this.spotliteAssets;
		
		
		
		//Spotlight Documents
		if (spotlightAssets.length > 0){
			ED.setValue($("#stopLightLbl"),com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.spotlightYes);
			var spotLightAssetsSlider = new Slider({
				containerId: '#spotLiteList'
			});
			
			$.each(spotlightAssets, function(index, relatedAsset) {
				var background = "black";
				if (relatedAsset.daCode == asset.daCode){
					background = "blue";
				}
				var thumbnailURL = com.swaas.hidoctor.edetailing.ui.view.CoreView.getThumbnailURL(relatedAsset);
				
				var documentType = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType[relatedAsset.documentType];
				if (documentType == null){
					 documentType = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType["UNKNOWN"];
				}
				
				var relatedAssetDiv = $('<div style="text-align:center;vertical-align middle; background-color:' +
						background + ';width:110px; height:90px"><img src="'+ thumbnailURL +'" style="width:100px; height:90px"/></div><div style="text-align:center;vertical-align middle; background-color:' +
						background + ';">' +
						'<span style="font-size:10px;font-color:white;float: left;">'+ relatedAsset.name + '</span> </div>');
				spotLightAssetsSlider.addElement(relatedAssetDiv);
					
				relatedAssetDiv.click(function(){
					_eDetailing = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
					if(relatedAsset.productCode != _eDetailing.selectedProduct.productCode){
						var productRow = $('#productTable').find("[productCode='" + relatedAsset.productCode + "']");
						var previousRow = $('#productTable').find("[productCode='" + _eDetailing.selectedProduct.productCode + "']");
						productRow.css('background-color' , 'blue');
						previousRow.css('background-color' , 'black');
						_eDetailing.selectedProduct = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(relatedAsset.productCode); 
					}else {
						var productRow = $('#productTable').find("[productCode='" + relatedAsset.productCode + "']");
						productRow.css('background-color' , 'blue');					
					}
					assetClicked(relatedAsset);
				});

			});		
			
		} else {
			ED.setValue($("#stopLightLbl"),com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.spotlightNo);
		}		
	},
	
	productClicked: function(product) {
		//jwplayer("player").stop();
		//var value = ED.context.dummay.value;
		$('#assetDetails').hide();
		$('#relatedAssetList').hide();
		$('#spotLiteList').hide();
		$('#assetList').show();
		com.swaas.hidoctor.edetailing.ui.view.eDetailing.selectedProduct = product;
		com.swaas.hidoctor.edetailing.ui.view.eDetailing.populateAsset(product);
	},
	
	addMoreProducts: function(productTable) {
		var _this = com.swaas.hidoctor.edetailing.ui.view.eDetailing;
		var uniqueProducts = {};
		$.each(_this.products, function(i, product){
			uniqueProducts[product.productCode] = product;
		});
		
		var moreProducts = [];
		// get the products
		var products  = 
			com.swaas.hidoctor.edetailing.service.ProductService.getProductsHasAssets();
		_this.assets = com.swaas.hidoctor.edetailing.service.AssetService.getAllAssets(true);
		
		var spotliteAssets = com.swaas.hidoctor.edetailing.service.AssetService.getSpotliteAssetsWithProducts(doctor);
		if (spotliteAssets != null && spotliteAssets.length > 0){
			_this.assets = _this.assets.concat(spotliteAssets);
		}
		//adding using product table add row with no duplicates
		$.each(products, function(i, product){
			if (uniqueProducts[product.productCode] == null){
				moreProducts.push(product);
			}
		});
		var index = productTable.currentIndex;
		$.each(moreProducts, function(i, product) {
			productTable.addRow(index, product);
			index += 1;
		});
	},
	
	assetClicked: function(asset) {
		com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset = asset;
		
		com.swaas.hidoctor.edetailing.ui.view.eDetailing.playOrOpenAsset();
		
		var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();

		if (asset.downloaded != 'Y' && isConnected == false){
			$('#player').html("");
		} else {
			if (asset.documentType == 'VIDEO'){
				$('#player').html("<img align='middle' src='../../hidoctor/images/play.png' />");
			}else {
				$('#player').html("<img align='middle' src='../../hidoctor/images/open.gif' />");
			} 
		}
		
		$('#player').show();
		$('#assetList').hide();
		ED.setValue($('#assetCaption'), asset.name);
		var thumbnailURL = com.swaas.hidoctor.edetailing.ui.view.CoreView.getThumbnailURL(asset);
		$('#player').css({"background-image" : "url(" + thumbnailURL + ")","background-position" : "center"});
		$('#player').unbind();
		$('#player').click(function(){
			com.swaas.hidoctor.edetailing.ui.view.eDetailing.playOrOpenAsset();
		});
		
		$('#assetDetails').show();
		$('#relatedAssetList').show();
		$('#spotLiteList').show();

		com.swaas.hidoctor.edetailing.ui.view.eDetailing.populateRelatedAsset(asset);
		
		
		// Populating Asset Analytics
		populateAssetAnalytics(asset.daCode);
		
	},
	playOrOpenAsset : function() {
		var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
		var documentType = com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.documentType;
		if (com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.downloaded != 'Y' && isConnected == false){
			if(documentType == 'VIDEO'){
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.networkMessage.video);
			}else {
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.networkMessage.document);
			}
			return;
		}
		//Populate Billing Section
		var _this = com.swaas.hidoctor.edetailing.ui.view._eDetailing;
		var daBillingId = _this.populateAssetBilling();
		_this.populateDCRAnalyticalData();
		
		var isAssetDownloaded = com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.downloaded;
		var assetURL = com.swaas.hidoctor.edetailing.ui.view.CoreView.getAssetURL(com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset);
		var assetCode = com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.daCode;
		if (documentType == 'VIDEO'){
			console.log(assetURL);
			window.plugins.videoPlayer.play([assetURL, daBillingId]);
		} else {
			this.docOpenDeatils.daBillingId = daBillingId;
			if(isAssetDownloaded == 'Y'){
				var d = new Date();
				this.docOpenDeatils.openTime = d.getTime();
				this.docOpenDeatils.docOpen = true;
				window.plugins.fileOpener.open(assetURL);
			}else{
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
			            	ED.logError(com.swaas.hidoctor.edetailing.ui.view.eDetailing, progressStatus, 
			            			com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset, "playOrOpenAsset");
						}	
						if(progressStatus.progress == 100 && firstOpen){
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
	populateAssetAnalytics: function(assetCode){
		//var value = ED.context.dummay.value;
		var canAddOwnTags = 'Y';
		if(com.swaas.hidoctor.edetailing.ui.view.eDetailing.configuration != null){
			canAddOwnTags = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get().canAddOwnTags;
		}
		$("#assetAnalyticsDisplay").empty();
		$("#assetAnalyticsInput").empty();
		var analytics = com.swaas.hidoctor.edetailing.service.AssetService.getAnalyticsForAsset(assetCode);
		var tags = com.swaas.hidoctor.edetailing.service.AssetService.getAllTags();
		var tableAnalytics = '';
		    tableAnalytics += '<table width="100%"><tr>';
		    tableAnalytics += '<td><div style="overflow: auto;" id="currentRatingDisplay"></div> </td>';
		    tableAnalytics += '<td>&nbsp;('+analytics.starValue+' Stars)</td>';
		    tableAnalytics += '<td>&nbsp;'+analytics.totalViewsCount+' Views  |</td>';
		    tableAnalytics += '<td>&nbsp;'+analytics.totalLikesCount+' Like &nbsp; | &nbsp; &nbsp;'+analytics.totalDislikesCount+' Dislike</td>';
			tableAnalytics += '</tr></table>';
		$("#assetAnalyticsDisplay").append(tableAnalytics);
		com.swaas.hidoctor.edetailing.ui.view.Rating.setRating($('#currentRatingDisplay'), analytics.starValue);
		
		  if(canAddOwnTags == 'Y'){
			  
			var responce = '<table width="100%"><tr><td width="40%" valign="top">' + com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.likeQuestion + '</td>'; 
			    responce += '<td  width="60%" valign="top">' +  com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.shareYourComments + '</td></tr>';
			    
			    responce += '<tr>';
			    responce +=  '<td width="40%" valign="top"><table width="100%">';
			    responce +=  '<tr class="hideAfterLike"><td><img src="../../hidoctor/images/like.png" onclick="assetLike(true);"/>&nbsp;';
			    responce +=  '<img src="../../hidoctor/images/unlike.png" onclick="assetLike(false);"/></td></tr>';
			    responce +=  '<tr><td><label id="likeDislikeThankyou" style="font-size:small"></label></td></tr>';
			    responce +=  '<tr><td>'+ com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.rateQuestion + '</td></tr>';
			    responce +=  '<tr><td><div style="overflow: auto;" id="inputRatingDisplay"></td></tr>';
			    responce +=  '<tr><td><label id="ratingThankyou" style="font-size:small"></label></td></tr>';
			    responce +=  '</table></td>';
				responce +=  '<td width="60%" valign="top"  style="background-color: white;">';
				responce +=  '<ul id="mytags"></ul>';
			    responce +=  '</td></tr>';
			    //responce +=  '<tr><td colspan="2" align="right"><button id="updateBtn" data-mini="true" data-inline="true" data-theme="b" data-shadow="true" data-corners="false" ></button></td></tr></table>';
			 	    	
				$("#assetAnalyticsInput").append(responce);
				// as per CR dt 25/10/13 dcr button removed
				/*$("#updateBtn").button();
				ED.setValue($("#updateBtn"), com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.updateBtnCaption);
				$("#updateBtn").click(function(){
					ED.redirect("view/dcr/dcrNew.html", {selectedDoctor: com.swaas.hidoctor.edetailing.ui.view.eDetailing.doctor});
				});*/
				// Star value input
				com.swaas.hidoctor.edetailing.ui.view.Rating.init($('#inputRatingDisplay'), 0, true);
				// for adding tags to tag-it
				var availableTags = [];
				$.each(tags , function(id, tag) {
					if(tag.tagDescription != null && tag.tagDescription.length >1){
						availableTags.push(tag.tagDescription);
					}
				});
				var options = {};
				options["availableTags"] = availableTags;
				$("#mytags").tagit(options);
				
				var list = $('#listViewTag');
				list.bind('liAdded',function(event, li){
					var enteredTag = $(li).text();
					if (enteredTag.length > 2){
						enteredTag  = enteredTag.substring(0, enteredTag.length-2); //removing space and X
					}				
					
					enteredTag = enteredTag.trim();
					var daTagAnalyticId = onTagAdded(enteredTag, assetCode);
					var savedTags = com.swaas.hidoctor.edetailing.service.AssetService.getAllTags();
					$(li).attr("id", daTagAnalyticId);
					var defaultTags = [];
					$.each(savedTags, function(i, tagSaved) {
						defaultTags.push(tagSaved.tagDescription);
					});
					if ($.inArray(enteredTag, defaultTags) < 0){
					onNewTagAdded(enteredTag);
					}
				}); 
				list.bind('liRemoved',  function(event, li){
					 var tag = $(li).text();
					 tag = tag.trim();
					 var daTagAnalyticId = li.id;
					 deleteAnalytics(daTagAnalyticId);
				});
			  } else {
				  var responce = '<table width="100%">';
				  responce +=  '<tr><td colspan="2" align="right"><button id="updateBtn" data-mini="true" data-inline="true" data-theme="b" data-shadow="true" data-corners="false" ></button></td></tr></table>';
				  $("#assetAnalyticsInput").append(responce);
				  $("#updateBtn").button();
				  ED.setValue($("#updateBtn"), com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.updateBtnCaption);
				  $("#updateBtn").click(function(){
					  ED.redirect("view/dcr/dcrNew.html", {selectedDoctor: com.swaas.hidoctor.edetailing.ui.view.eDetailing.doctor});
				  });
			  }
			
	},
	
	assetLike: function(like) {
		//var value = ED.context.dummay.value;
		var liked = '0';
		var disliked = '0';
		if(like){
			liked = '1';
		}else{
			disliked = '1';
		}
		var analytics = null;
		var doctor = ED.context.request.selectedDoctor;
		var user = ED.context.currentUser;
		analytics = {
				companyCode: user.companyCode,
				daCode: com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.daCode,
				doctorCode: doctor.customerCode,
				doctorRegionCode: doctor.regionCode,
				userCode: user.userCode,
				userRegionCode: user.regionCode,
				like: liked,
				dislike: disliked,
				rating: "0",
				dateTime: new Date(),
				tagDescription: "",
    			productCode : com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.productCode 
				
		};
		saveAnalytics(analytics);
		$('.hideAfterLike').hide();
		ED.setValue($("#likeDislikeThankyou"), com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.likeDislikeThankyou);
		
	},
	
	insertRatingAnalytics: function(rating) {
		//var value = ED.context.dummay.value;
		var analytics = null;
		var doctor = ED.context.request.selectedDoctor;
		var user = ED.context.currentUser;
		
		analytics = {
				companyCode: user.companyCode,
				daCode: com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.daCode,
				doctorCode: doctor.customerCode,
				doctorRegionCode: doctor.regionCode,
				userCode: user.userCode,
				userRegionCode: user.regionCode,
				like: "0",
				dislike: "0",
				rating: rating,
				dateTime: new Date(),
				tagDescription: "",
    			productCode : com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.productCode 
				
		};
		saveAnalytics(analytics);
		$('#inputRatingDisplay').html('');
		com.swaas.hidoctor.edetailing.ui.view.Rating.setRating($('#inputRatingDisplay'), analytics.rating, true);
		ED.setValue($("#ratingThankyou"), com.swaas.hidoctor.edetailing.ui.view.Resource.eDetailing.ratingThankyou);
    },
    
    onTagAdded: function(tag, assetCode) {
    	//var value = ED.context.dummay.value;
    	var analytics = null;
    	var doctor = ED.context.request.selectedDoctor;
    	var user = ED.context.currentUser;
    	
    	analytics = {
    			companyCode: user.companyCode,
    			daCode: assetCode,
    			doctorCode: doctor.customerCode,
    			doctorRegionCode: doctor.regionCode,
    			userCode: user.userCode,
    			userRegionCode: user.regionCode,
    			like: "0",
    			dislike: "0",
    			rating: "0",
    			dateTime: new Date(),
    			tagDescription: tag,
    			productCode : com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset.productCode 
    			
    	};
    	
    	return saveAnalytics(analytics);
    },
    
    saveAnalytics: function(analytics){
    	if(analytics != null){
    		return com.swaas.hidoctor.edetailing.service.AssetService.persistAnalytics(analytics);
    	}	
    },
    
    onNewTagAdded: function(tag){
    	//var value = ED.context.dummay.value;
    	if(tag != null && tag != ''){
    		com.swaas.hidoctor.edetailing.service.AssetService.persistNewTag(tag);
    	}	
    },
    
    populateDCRAnalyticalData: function(){
    	var doctor = ED.context.request.selectedDoctor;
    	
    	var dcrActualDate =  new Date();
    	doctorVisitTime = new Date();
    	dcrActualDate = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(dcrActualDate);
		
				
		var analyticsProduct = {
				dcrActualDate: dcrActualDate,
				doctorCode : doctor.customerCode ,
				doctorRegionCode: doctor.regionCode,
				productCode: com.swaas.hidoctor.edetailing.ui.view.eDetailing.selectedProduct.productCode
		};
		com.swaas.hidoctor.edetailing.service.DCRService.saveAnalyticsDetailedData(analyticsProduct);
    },
    
    populateAssetBilling: function(){
    	//var value = ED.context.dummay.value;
    	var billingId = null;
    	var currentAsset = com.swaas.hidoctor.edetailing.ui.view.eDetailing.clickedAsset;
    	var doctor = com.swaas.hidoctor.edetailing.ui.view.eDetailing.doctor;
    	var user = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
    	var division = com.swaas.hidoctor.edetailing.service.UserService.getUserDivision(user.userCode);
    	var selectedProduct = com.swaas.hidoctor.edetailing.ui.view.eDetailing.selectedProduct;
    	var selectedDate = ED.context.selectedDate;
    	
    	var offline = 0;
    	var online  = 0;
    	if(currentAsset.downloaded == 'Y'){
    		offline = 1;
    	}else{
    		online = 1;
    	}
    	if (division == null){
    		division = {};
    	}
    	if (selectedProduct == null){
    		selectedProduct = {};
    	}
    	if (doctor == null){
    		doctor = {};
    	}
    	
    	if (selectedDate == null){
    		selectedDate = new Date();
    	}
    	
		var position = ED.getGeoLocation();		
		var assetBilling = {
				companyCode: user.companyCode,
			    daCode: currentAsset.daCode,
			    userCode:user.userCode,
				userName: user.userName,
				regionCode: user.regionCode,
				regionName: user.regionName,
				divisionCode: division.divisionCode,
				divisionName: division.divisionName,
				dateTime: new Date(),
				offlineClick: offline,
				downloaded: 0,
				onlinePlay: online,
				dcrActualDate: selectedDate,
				productCode: selectedProduct.productCode,
				productName: selectedProduct.productName,
				doctorCode: doctor.customerCode,
				doctorRegionCode: doctor.regionCode,
				latitude : position.coords.latitude,
				longitude : position.coords.longitude,
				geoAddress : position.geoAddress
				
		};
		assetBilling = com.swaas.hidoctor.edetailing.service.AssetService.insertAssetBilling(assetBilling);
		billingId = assetBilling.daBillingId;
    		
    	return billingId;
    },
    
    deleteAnalytics: function(daTagAnalyticId){
    	//var value = ED.context.dummay.value;
   	 if(daTagAnalyticId != null){
   		 com.swaas.hidoctor.edetailing.service.AssetService.deleteAnalytics(daTagAnalyticId);
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
    },

   onBackKeyDown : function() {
	   console.log('back pressed');
	   if($.mobile.activePage.jqmData( "panel" ) === "open") {
		   $( "#left-panel" ).panel( "close" );
	   } else {
		   location.href = '../doctor/myDoctorsView.html';
	   }
   }
};

function productClicked(product) {
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.productClicked(product);
}

function assetClicked(asset) {
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.assetClicked(asset);
}

function populateAssetAnalytics(assetCode){
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.populateAssetAnalytics(assetCode);
}

function assetLike(like) {
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.assetLike(like);
}

function insertRatingAnalytics(rating) {
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.insertRatingAnalytics(rating);	
}

function onTagAdded(tag, assetCode) {
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.onTagAdded(tag, assetCode);

}

function saveAnalytics(analytics){
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.saveAnalytics(analytics);
}

function onNewTagAdded(tag){
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.onNewTagAdded(tag);
}

function populateAssetBilling(){
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.populateAssetBilling();
}

com.swaas.hidoctor.edetailing.ui.view.eDetailing = createProxy(com.swaas.hidoctor.edetailing.ui.view._eDetailing, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);

function deleteAnalytics(daTagAnalyticId){
	com.swaas.hidoctor.edetailing.ui.view.eDetailing.deleteAnalytics(daTagAnalyticId);
}