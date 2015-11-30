/* 
	Things to replace while putting in to android
	
	AssetService:
	-------------

	1) DigitalAssetLocalDAO,
	2) DAAnalyticHistoryLocalDAO
	3) DATagMasterLocalDAO
	4) DigitalAssetBillingLocalDAO
	5) DATagAnalyticLocalDAO
	6) McDoctorsLocalDAO


	ProductService:
	---------------

	1) ProductLocalDAO
	2) UserProductMappingLocalDAO
	3) SpecialityLocalDAO
	4) BrandLocalDAO
	
	a) coreviewNew
	b) utilios
	
	Replace this file from the ios files
*/

var popup = {
    el: $('#popup_more_wrapper'),
    show: function(content, onCreate){
        popup.createPopup(content, onCreate);
    },
    hide: function(){
        $('#popup_more_wrapper').hide(300, function(){
            $('#popup_more_wrapper').remove();
        });
    },
    createPopup: function(content, onCreate) {
    	ED.hideLoading();
        popup.hide();
        var html = '<div id="popup_more_wrapper"><div class="popup_more"><div class="popup-content">';
        html += content;
        html += '</div><div class="close_btn">X</div></div></div>';
        html = $(html);
        $('.ui-page').append(html);
        
        if(onCreate) onCreate();
        $('#popup_more_wrapper').bind('click', function(evt){
            if($(evt.target).attr('id') == 'popup_more_wrapper')
                $(this).remove();
        });
        $('.close_btn').bind('click', function(){
            $('#popup_more_wrapper').remove();
        });
        popup.setPosition();
    },
    setPosition: function(){
        var cHgt = $('.popup_more').height(), wHgt = $(window).height();
        var top = 0;
        if(cHgt > 420){cHgt = 436; $('.popup-content').css('height', '436px');}
        if(wHgt > cHgt)
        top = (wHgt - cHgt)/2;
        $('.popup_more').css('top', top + 'px');
    }
};

function storySlider(options) {

	var $el = $(el);
	var items = options.items;

}

com.swaas.hidoctor.edetailing.ui.view.story = {
    currentStory : null,
    clickedAsset: null,
    currentStoryAssets: null,
    selectedProduct: null,
    slider: null,
    assetTable: null,
    docOpenDeatils : {docOpen : false, openTime : 0,closeTime : 0, daBillingId : null },
    showListAssets: new Array(),
    playListArray:new Array(),
    showMore: true,
    init: function(){
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        ED.includeStoryHeader(ED.context.request.selectedDoctor);
        _this.createStoryBar();
        _this.renderStories();
       /* tab section */
       $("#asset_part").hide();
       $("#story_part").show();
       $("#show_part").hide();
       $(".menu .product_sec").hide();
       $('.search_sec').css('visibility', 'hidden');
        //will be removed
        $('.popup_input').textinput({theme: 'none'});
        $('#moreProductsPopup').popup();
        $('#moreProductsPopup').popup('open');
    },
    createStoryBar: function() { //alert('html header');
    	var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        ED.showLoading();
        var html = '';
        html+='<div class="menu">';
        html+='<div class="search_sec"> <input class="product_search" type="text" value="" /> </div>';
        html+='<ul class="slide_menu"><li ><a href="#asset_part">Asset View</a></li><li class="active"><a href="#story_part">Story View</a></li><li><a href="#show_part">Show List</a></li></ul>';
        html+='<div class="product_sec"><label>Product Name</label><div class="select_box">';
        html+='<select class="productSelect"></select>';
        //html+='<div class="show" id="show_asset">show</div>';
        html+='</div></div>';
        html+='</div>';
        
        $(html).insertAfter('#header');
        $('.product_search').textinput();
        $('.productSelect').selectmenu({theme : 'none'});
        var doctor = ED.context.request.selectedDoctor;
        this.getDoctorProducts(doctor);
        this.searchAssets();
        
        $(".slide_menu li a").bind("click",function(e){
        	//alert('hi');
           $("#menu_list").hide();
           $("#asset_part").hide();
           $("#story_part").hide();
           $("#show_part").hide();
           $(".slide_menu li").removeClass("active");
           var selectedTab = $(this).attr('href');
           $(this).parent().addClass("active");
           $(selectedTab).show();
           if(($(selectedTab).attr('id'))=='show_part'){
        	   $('.menu .product_sec').hide();
        	   $('.search_sec').css('visibility', 'hidden');
        	   $('.product_search').val('');
        	   _this.addToShowList();
           } else if(($(selectedTab).attr('id'))=='story_part'){
        	   $('.menu .product_sec').hide();
        	   $('.search_sec').css('visibility', 'hidden');
        	   $('.product_search').val('');
        	   if(_this.slider)
        		   _this.slider.reloadSlider();
           }else{
	           $('.menu .product_sec').show();
	           $('.search_sec').css('visibility', 'visible');
	           $('.product_search').val('');
           }
           //$(".slide_menu li").addClass("select_tab");
           return false;
           
        });
        
        
    },
    searchAssets: function() {
        var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        $('input.product_search').bind('change', function(){
            // var keycode = (event.keyCode ? event.keyCode : event.which);
             //if(keycode == '13'){
               var srcString = $(this).val().toLowerCase();
               var matchedAssets = new Array();
               if(_this.assets.length == 0)
                  alert('No assets found for this doctors');
               var uniqueAsset = {};
               $.each(_this.assets, function(i, asset){
                   var name = asset.name;
                   name = name.toLowerCase();
                   //console.log(name + ".indexOf " + srcString + "=" + name.indexOf(srcString));
                   if(srcString == '') {
                       if(asset.productCode == _this.selectedProduct.productCode)
                           matchedAssets.push(asset);
                   } else {
                       //if(uniqueAsset[asset.daCode] == null) {
                           //uniqueAsset[asset.daCode] = asset;
                           if(name.indexOf(srcString) > -1) {
                               if(asset.productCode == _this.selectedProduct.productCode)
                                   matchedAssets.push(asset);
                           }
                       //}
                   }
               });
               if(matchedAssets && matchedAssets.length > 0 ) {
                   var finalAssets = new Array();
                   _this.getAssetAnalytics(0, matchedAssets, finalAssets, function(finalAssets){
                       _this.assetTable = new AssetTableNew({
                           assets: finalAssets,
                           product: _this.selectedProduct,
                           container: '#asset_part',
                           tableId: 'asset_list',
                           onAssetClicked: function(assetCode) {

                           },
                           onAssetHold: function(asset){
                           }
                       });
                   });
               } else {
                   $('.asset_list').remove();
                   $('.info_msg, .warning_msg').remove();
                   $('#asset_part').prepend('<p class="warning_msg">No Assets found for search string</p>');
                   alert('No assets matches the string');
               }
           });
        /*$('input.product_search').bind('change', function(){ //alert(1);
            var srcString = $(this).val().toLowerCase();
            var matchedAssets = new Array();
            if(_this.assets.length == 0)
               alert('No assets found for this doctors');
            var uniqueAsset = {};
            
            $.each(_this.assetTable.assets, function(i, asset){
                var name = asset.name;
                name = name.toLowerCase();
                if(uniqueAsset[asset.daCode] == null)
                {
                    uniqueAsset[asset.daCode] = asset;
                    if(name.indexOf(srcString) > -1) {
                        matchedAssets.push(asset);
                    }
                }
                
            });
            if(matchedAssets && matchedAssets.length > 0 ) {
                var finalAssets = new Array();
               _this.getAssetAnalytics(0, matchedAssets, finalAssets, function(finalAssets) {
            	   _this.assetTable = new AssetTableNew({
            		   assets: finalAssets,
            		   container: '#asset_part',
            		   tableId: 'asset_list',
            		   onAssetClicked: function(assetCode) {
            		   
            		   },
            		   onAssetHold: function(asset){
            		   }
            	   });
               });
            } else {
                $('.asset_list').remove();
                $('.info_msg, .warning_msg').remove();
                $('#asset_part').prepend('<p class="warning_msg">No Assets found for search string</p>');
                alert('No assets matches the string');
            }
        });*/
    },
    loadProducts: function(onLoadProducts) {
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        var moreProducts = [];
        com.swaas.hidoctor.edetailing.service.ProductService.getProductsHasAssets(function(products){
            var optionHtml = '';
            $.each(products, function(i, product){
               optionHtml += '<option value="' + product.productCode + '">' + product.productName + '</option>';
            });
            $('.productSelect').append(optionHtml);
            ED.hideLoading();
            
            /*$('select.productSelect').unbind('change').bind('change', function(){
            	var prdCode = $(this).val();
                if(prdCode != null) {
                    _this.selectedProduct = _this.getProduct(prdCode, products);
                   $('span.productSelect').text(_this.selectedProduct['productName']);
                   //com.swaas.hidoctor.edetailing.ui.view.story.selectedProduct = _this.selectedProduct;
                   console.log(products);
                   _this.loadAssetByProductCode(prdCode);
                } else {
                	alert("Please select a product");
                }
            });*/
        }, null);
    },
    getDoctorProducts: function(doctor) {
		var excludeMCAssets = true;
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        com.swaas.hidoctor.edetailing.service.ProductService.getDoctorProductsHasAssets(doctor, function(mappedDoctorProducts){
            var productCodes = {};
            if(mappedDoctorProducts.length > 0){
                var mappedProductCodes = [];
                $.each(mappedDoctorProducts, function(index, mappedDoctorProduct) {
                    mappedProductCodes.push(mappedDoctorProduct.productCode);
                    productCodes[mappedDoctorProduct.productCode] = mappedDoctorProduct.productCode;
                });
                com.swaas.hidoctor.edetailing.service.AssetService.getAssetsForProductCodes(mappedProductCodes, excludeMCAssets, function(assets){
                    _this.assets = assets;
                    _this.getSpotLiteProducts(doctor, mappedDoctorProducts, productCodes);
                });
            } else {
            	//_this.showMore = false;
                var products = new Array();
                com.swaas.hidoctor.edetailing.service.AssetService.getAllAssetsForDoctorProfile(doctor, excludeMCAssets, function(assets){
                    _this.assets = assets;
                    if(assets.length > 0) { //alert(1);
                        $.each(assets, function(index, asset){
                            var productCode = asset.productCode;
                            com.swaas.hidoctor.edetailing.service.ProductService.getProduct(productCode, function(product){
                                if (productCodes[productCode] == null){
                                    productCodes[productCode] = productCode;
                                    if(product != null){
                                        products.push(product[0]);
                                    }
                                }
                                if(index == (assets.length - 1))
                                    _this.getSpotLiteProducts(doctor, products, productCodes);
                            });
                        });
                    } else {
                        _this.getSpotLiteProducts(doctor, products, productCodes);
                    }
                });
            }
        });
    },
    getSpotLiteProducts: function(doctor, products, productCodes) {
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        com.swaas.hidoctor.edetailing.service.AssetService.getSpotliteAssetsWithProducts(doctor, function(spotliteAssets){
            if (spotliteAssets && spotliteAssets.length > 0){
                _this.assets = _this.assets.concat(spotliteAssets);
                $.each(spotliteAssets, function(index, asset){
                    var productCode = asset.productCode;
                    com.swaas.hidoctor.edetailing.service.ProductService.getProduct(productCode, function(product){
                        if (productCodes[productCode] == null){
                            productCodes[productCode] = productCode;
                            if(product != null){
                                products.push(product[0]);
                            }
                        }
                        if(index == (spotliteAssets.length - 1)) {
                            _this.getOtherProductsWithAssets(products, productCodes);
                        }
                    });
               });
            } else {
                _this.getOtherProductsWithAssets(products, productCodes);
            }
        });
    },
    getOtherProductsWithAssets: function(products, productCodes) {
        var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        //alert('Mapped assets not available');
        if(_this.assets == null || _this.assets.length == 0){
			_this.showMore = false;
            com.swaas.hidoctor.edetailing.service.AssetService.getAllAssets(true, function(assets){
                //alert('asset service assets ' + assets.length);
            	_this.assets = _this.assets.concat(assets);
            	//alert('asset service assets after concat ' + _this.assets.length);
                if(_this.assets && _this.assets.length > 0){
	                $.each(_this.assets, function(index, asset){
	                    var productCode = asset.productCode;
	                    com.swaas.hidoctor.edetailing.service.ProductService.getProduct(productCode, function(product){
	                    	//alert('productCode ' + productCode);
	                    	//alert(product);
	                    	if (productCodes[productCode] == null){
	                            productCodes[productCode] = productCode;
	                            if(product != null){
	                            	if(product && product.length > 0) {
	                            		products.push(product[0]);
	                            	} else {
	                            		products.push(product);
	                            	}
	                            }
	                        }
	                    	//alert('index = ' + index);
	                    	//alert(' asset length ' + index == (_this.assets.length - 1));
	                        if(index == (_this.assets.length - 1)) {
	                            _this.addDoctorProducts(products);
	                        }
	                    });
	                });
                } else {
                	//alert('not mapped assets legnth not found ' + _this.asset.length);
                	_this.addDoctorProducts(products);
                }
            });
        } else {
            _this.addDoctorProducts(products);
        }
    },
    getMoreProducts: function(products) {
    	var _this = com.swaas.hidoctor.edetailing.ui.view.story;
    	var moreProducts = [];
		var uniqueProducts = {};
		$.each(products, function(i, product){
			uniqueProducts[product.productCode] = product;
			/*if(uniqueProducts[product.productCode] == null) {
				moreProducts.push(product);
			}*/
		});
		//alert('add more products');
        com.swaas.hidoctor.edetailing.service.ProductService.getProductsHasAssets(function(mProducts){
        	//alert('mProducts ' + mProducts.length);
        	com.swaas.hidoctor.edetailing.service.AssetService.getAllAssets(true, function(assets){
        		_this.assets = assets;
                //alert('assets ' + _this.assets.length);
                var doctor = ED.context.request.selectedDoctor;
                com.swaas.hidoctor.edetailing.service.AssetService.getSpotliteAssetsWithProducts(doctor, function(spotliteAssets){
                	//alert('spotliteAssets ' + spotliteAssets.length);
                	if (spotliteAssets != null && spotliteAssets.length > 0){
                        _this.assets = _this.assets.concat(spotliteAssets);
                    }
                    if(mProducts && mProducts.length > 0) {
                    	$.each(mProducts, function(i, product){
                        	if (uniqueProducts[product.productCode] == null){
                            	moreProducts.push(product);
                            	/*	products.push(product);*/
                            }
                        });
                    }
                                                                                                 
                    /*var finalProducts = new Array();
                    $.each(products, function(i, prod){
                        moreProducts.push(prod);
                    });*/
                    if(moreProducts.length > 0){
                    	_this.prepareGrid(moreProducts, products);
                	}else{
                    	alert("No more products available.");
                     	ED.hideLoading();
                    }
                });
            });
        });
    },
    prepareGrid: function(moreProducts, existingProducts){
        var html = '', grid = '', gridRow = null;
        var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        $.each(moreProducts, function(i, product){
           if(i == 0) {
        	   grid += '<div class="grid-row">';
           } else if (i != 0 && i % 4 == 0) {
        	   grid += '</div><div class="grid-row">';
           }
           grid += '<div class="grid-col-4" data-product="' + product.productCode + '"><img src="../../hidoctor/images/productType/product_img.png"/><p>' + product.productName + '</p></div>';
           if(i == moreProducts.length - 1) {
        	   grid += ' </div>';
         }
        });
        
        /*$.each(moreProducts, function(i, product){
           if(i % 4 == 0) {
               if(gridRow != null)
                   grid += '<div class="grid-row">' + gridRow.html() + '</div>';
               
               gridRow = $('<div class="grid-row"></div>');
           }
           gridRow.append('<div class="grid-col-4" data-product="' + product.productCode + '"><img src="../../hidoctor/images/productType/product_img.png"/><p>' + product.productName + '</p></div>');
        });*/
        
        popup.show(grid, function(){
            $('.grid-col-4').bind('click', function(){
                var prdCode = $(this).data('product');
                popup.hide();
                //_this.loadAssetByProductCode(prdCode);

                //$('select.productSelect').empty();
                $('select.productSelect option').last().remove();
                var optionHtml = '';
                //alert('exisiting length ' + existingProducts.length);
                //alert('more products length ' + moreProducts.length);
                $.each(moreProducts, function(i, product){
                       console.log(product.productCode + '==' +  prdCode);
                       var bSelProd = (product.productCode == prdCode);
                       optionHtml += '<option value="' + product.productCode + '" ' + (bSelProd ? 'selected' : '')+ '>' + product.productName + '</option>';
                       if(bSelProd)
                           $('span.productSelect').text(product.productName);
                       existingProducts.push(product);
                       
                });
                //alert('after process' + existingProducts.length);
                //$('select.productSelect option').last().remove();
                
                $('select.productSelect').append(optionHtml);
                //_this.prepareGrid(moreProducts);
                //$.extend(moreProducts, existingProducts);
                _this.createSelectBox(existingProducts);
            });
        });
    },
    addDoctorProducts: function(products) {
    	//alert('adddoctorproducts');
    		//alert('the products length ' + products.length);
	    	if(products && products.length > 0){
		        var optionHtml = '';
		        var _this = com.swaas.hidoctor.edetailing.ui.view.story;
		        if(products && products.length > 0) {
		            $.each(products, function(i, product){
		                   optionHtml += '<option value="' + product.productCode + '">' + product.productName + '</option>';
		            });
		            //console.log(optionHtml);
		            $('select.productSelect').append(optionHtml);
		            if(_this.showMore)
		                $('select.productSelect').append('<option value="show-more">Show More products</option>');
		        }
		        ED.hideLoading();
	        
		        /*
		        Show button removed as per new requirements
		        $('#show_asset').bind('click', function(){
		            var prdCode = $('select.productSelect').val();
		            if(prdCode != null) {
		                _this.selectedProduct = _this.getProduct(prdCode, products);
		                _this.loadAssetByProductCode(prdCode);
		            } else {
		                alert("Please select a product");
		            }
		        });
		        */
	        
		        _this.createSelectBox(products,optionHtml);
		        
		        //load default product at start
		        var prdCode = $('select.productSelect').val();
		        _this.selectedProduct = _this.getProduct(prdCode, products);
		        $('span.productSelect').text(_this.selectedProduct['productName']);
		        _this.loadAssetByProductCode(prdCode);
	    	} else{
	    		  ED.hideLoading();
	              $('.menu .product_sec').remove();
	              $('.asset_list').remove();
	              $('.info_msg, .warning_msg').remove();
	              $('#asset_part').prepend('<p class="warning_msg">No Products Available</p>');
	              $('.asset_list').remove();
	              
	    	}
    },
    createSelectBox: function(products) {
        var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        if($('select.productSelect').val() != '') {
        	var prdCode = $('select.productSelect').val();
            _this.selectedProduct = _this.getProduct(prdCode, products);
            $('span.productSelect').text(_this.selectedProduct['productName']);
            //com.swaas.hidoctor.edetailing.ui.view.story.selectedProduct = _this.selectedProduct;
            _this.loadAssetByProductCode(prdCode);
        }
        
        $('select.productSelect').unbind('change').bind('change', function(){
            var prdCode = $(this).val();
            if(prdCode != null) {
                if(prdCode == 'show-more') {
            		ED.showLoading();
            		_this.getMoreProducts(products);
                } else {
                    _this.selectedProduct = _this.getProduct(prdCode, products);
                    $('span.productSelect').text(_this.selectedProduct['productName']);
                    //com.swaas.hidoctor.edetailing.ui.view.story.selectedProduct = _this.selectedProduct;
                    _this.loadAssetByProductCode(prdCode);
                }
            } else {
                alert("Please select a product");
            }
        });
    },

    loadAssetByProductCode: function(productCode) {
        var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        var uniqueAsset = {};
        var uniqueAssets = new Array();
        //alert('call ' + _this.assets.length);
        console.log(JSON.stringify(_this.assets));
        $.each(_this.assets, function(i, asset){
            console.log('the da code ' + asset.daCode);
            //if(uniqueAsset[asset.daCode] == null) {
                console.log('asset added ' + asset.daCode);
                console.log(' asset productCode ' + asset.productCode + ' prodcut code ' + productCode);
                if(asset.productCode == productCode) {
                    console.log(productCode);
                    uniqueAssets.push(asset);
                }
                uniqueAsset[asset.daCode] = asset;
            //}
        });
        $('input.product_search').val('');
        console.log(JSON.stringify(uniqueAssets));
        var finalAssets = new Array();
        if(uniqueAssets && uniqueAssets.length > 0) {
            _this.getAssetAnalytics(0, uniqueAssets, finalAssets, function(finalAssets){
            	//alert(finalAssets.length);
                _this.assetTable = new AssetTableNew({
                   assets: finalAssets,
                   product: _this.selectedProduct,
                   container: '#asset_part',
                   tableId: 'asset_list',
                   onAssetClicked: function(assetCode) {
                   
                   },
                   onAssetHold: function(asset){
                   }
               });
            });
        } else {
            $('.asset_list').remove();
            $('.info_msg, .warning_msg').remove();
            $('#asset_part').prepend('<p class="warning_msg">No Assets found for '+_this.selectedProduct['productName']+'</p>');
            $('.asset_list').remove();
        }
    },
    getAssetAnalytics: function(i, uniqueAssets, finalAssets, onSuccess) {
        var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        console.log('the unique assets length ' + uniqueAssets.length);
        var curAst = uniqueAssets[i];
        if(uniqueAssets != null) {
        	var assetCode = parseInt(curAst.daCode,10);
            com.swaas.hidoctor.edetailing.service.AssetService.getAnalyticsForAsset(assetCode, function(analytics){
                $.extend(curAst, analytics);
                finalAssets.push(curAst);
                if(i == (uniqueAssets.length-1)) {
                    if(onSuccess) {
                        onSuccess(finalAssets);
                    }
                } else {
                    _this.getAssetAnalytics(i+1, uniqueAssets, finalAssets, onSuccess);
                }
            });
        } else {
        	if(onSuccess) {
                onSuccess(finalAssets);
            }
        }
    },
    getProduct: function(productCode, products) {
        var currentProduct = null;
        $.each(products, function(i, product){
            if(product.productCode == productCode) {
                currentProduct = product;
            }
        });
        return currentProduct;
    },
    renderStories : function() {
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        /*com.swaas.hidoctor.edetailing.dao.storyLocalDAO.get(function(storyList){
            _this.loadStoryCarousel(storyList);
        });*/
        com.swaas.hidoctor.edetailing.dao.storyLocalDAO.get(_this.afterLoadStory);
    },
	afterLoadStory : function (storyList) {
		var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        $('#story_part').html('');
        $('#story_part').append('<p class="success_msg" style="display:none;">Asset has been added to show list</p><div class="story_slider" id="story_slider"></div>' +
                                '<div class="display_story" id="display_story"></div>'+
                                '<ul class="menu_list" id="menu_list" style="display:none;"></ul>');
        
        if(storyList.length > 0){
        	 //ED.hideLoading();
            var sliderDiv='';
            sliderDiv+='<ul class="story_carousel">';
	            for(var i=0;i<storyList.length;i++){
	            	sliderDiv+='<li id="story_id_' +storyList[i].storyId+ '"><img class="story_frame" src="storycarousel/frame.jpg" /><div class="block" data-story="'+storyList[i].storyId+'"><img class="story_thumb" src="storycarousel/6.jpg" alt=""/><div class="story_detl"><div class="story_left"><p>'+storyList[i].storyName+'</p><p class="des">'+storyList[i].assetCount+' Digital Assets</p></div><div class="story_right"><a href="#"><img id="menu_img" class="menu_img" src="../../hidoctor/images/Expand.png" /><a></div></div></div><div class="story_status"><img class="tickimg" id="not_select" src="../../hidoctor/images/Not_Selected_Asset.png" /><img class="tickimg" id="select" style="display:none" src="../../hidoctor/images/Selected_Asset.png" /></div>';
 	                sliderDiv+='</li>';
	            }
            sliderDiv+='</ul>';
            $('.story_slider').html(sliderDiv);
        }else{
        	 //ED.hideLoading();
        	$('.story_slider').html('<ul class="story_carousel">');
            $('#story_part').append('<div class="no_stories">No Stories Available</div>');
        }
        
        
        _this.slider = $('.story_carousel').bxSlider({ minSlides : 1, maxSlides : 2,
                                                   slideWidth : 350, slideMargin: 10, pager: false,
                                                   infiniteLoop : false, moveSlides: 1
                                                   });
        var fEl = $('.story_carousel li:first-child');
        if(storyList != undefined && storyList.length > 0){
        	_this.populateAssets(fEl,null);
        }
        
        $('li', _this.slider).bind( "click", function(Evt){
              _this.populateAssets($(this),null);
        });
        
        $('li', _this.slider).bind('taphold', _this.selectStory);
        
    },

    populateAssets : function(el,onSuccess){
    	//alert("populate asset " + el.length);
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        $("#menu_list").hide();
        //var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        //$( ".contentHolderUnit").removeClass('current');
        //el.addClass('current');
        var storyCode=$('.block',el).data('story');
        com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.get(storyCode,function(storyObj){
        	 _this.currentStory = storyObj.story;
             _this.currentStoryAssets = new Array();
             if(storyObj.assets && storyObj.assets.length > 0){
                _this.getAssetAnalytics(0, storyObj.assets, _this.currentStoryAssets,function(storyAssets){
                    _this.currentStoryAssets = storyAssets;
                    _this.jqueryContext(el);
                    _this.displayStoryAssetView();
                    if(onSuccess)onSuccess();
                });
                                                                 
             } else{
                 _this.displayStoryAssetView();
                 if(onSuccess)onSuccess();
             }
            /*context menu */
         });
        
    },
    jqueryContext : function(curEl){
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        var contextDiv='#story_id_'+(_this.currentStory.storyId)+' .menu_img';
        var ctxMenu = new ContextMenu();
        ctxMenu.showStoryContext(contextDiv,_this.currentStoryAssets,_this.currentStory);
    },
    selectStory: function( event ){
     var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        var _selItem=this;
        _this.populateAssets($(this),function(){
                             
             var selectedItem=_selItem.id;
             var el=$("#"+_selItem.id);
             if($("img#select",el).is(':visible') == false) {
                 $("img#select",el).show();
                 $("img#not_select",el).hide();
                 if(_this.currentStoryAssets){
                 for(var i=0;i<_this.currentStoryAssets.length;i++){
                 _this.showListAssets.push(_this.currentStoryAssets[i]);
                 $('#story_part .success_msg').text('Story has been added to show list');
                 $('#story_part .success_msg').fadeIn('normal', function() {
                    $(this).delay(700).fadeOut();
                 });
                 }
                 _this.addToShowList(false);
                 }
             } else {
                 if((_this.showListAssets) && (_this.showListAssets.length > 0) ){
                             //alert("if");
                     for(var i=0;i<_this.currentStoryAssets.length;i++){
                         for(var j=0;j<_this.showListAssets.length;j++ ){
                             if((_this.currentStoryAssets[i].daCode == _this.showListAssets[j].daCode) && (_this.currentStoryAssets[i].productCode == _this.showListAssets[j].productCode)){
                             //console.log('s');
                             _this.showListAssets.splice(j, 1);
                             $("img#select",el).hide();
                             $("img#not_select",el).show();
                             $('#story_part .success_msg').text('Story has been removed from show list');
                             $('#story_part .success_msg').fadeIn('normal', function() {
                                    $(this).delay(700).fadeOut();
                             });
                         }
                         
                         }
                     }
                     _this.addToShowList(false);
                 }else{
                             //alert("else");
                     $("img#select",el).hide();
                     $("img#not_select",el).show();
                     $('#story_part .success_msg').text('Asset already removed from show list');
                     $('#story_part .success_msg').fadeIn('normal', function() {
                            $(this).delay(700).fadeOut();
                     });
                 }
             }                
        });   
    },

    displayStoryAssetView: function(){
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
    if(_this.currentStoryAssets){
        
        $("#display_story").empty();
        var storyDisplay='';
        
        storyDisplay+='<div class="story_title"><p>'+_this.currentStory.storyName+'</p><p class="assetCount">'+_this.currentStoryAssets.length+' Digital Assets</p></div><div class="story_sec"><img src="storycarousel/6.jpg" /></div>';
        storyDisplay+='<div class="asset_sec">';
        storyDisplay+='<div class="jcarousel-wrapper">';
        storyDisplay+='<div class="jcarousel">';
        storyDisplay+='<ul id="sortable">';
        
        for(var i=0;i<_this.currentStoryAssets.length;i++){
            storyDisplay+='<li data-assetcode='+_this.currentStoryAssets[i].daCode+ ' ' + 'data-productcode=' + _this.currentStoryAssets[i].productCode + '><img class="close_img" id='+_this.currentStoryAssets[i].daCode+' src="../../hidoctor/images/close.png"  /><div class="asset_div"><img class="assetThumb" src="'+_this.currentStoryAssets[i].thumbnailURL+'"/>';
            if(_this.currentStoryAssets[i].documentType=='IMAGE'){
                storyDisplay+='<div class="player_block"><img class="player_thumb" src="../../hidoctor/images/image.png" /></div>';
            }else if(_this.currentStoryAssets[i].documentType=='DOCUMENT'){
                storyDisplay+='<div class="player_block"><img class="player_thumb" src="../../hidoctor/images/pdf.png" /></div>';
            }else if(_this.currentStoryAssets[i].documentType=='VIDEO'){
                storyDisplay+='<div class="player_block"><img class="player_thumb" src="../../hidoctor/images/playNew.png" /></div>';
            }
            storyDisplay+='<p>'+_this.currentStoryAssets[i].name+'</p></div></li>';
        }
        storyDisplay+='</ul>';
        storyDisplay+='<a href="#" class="jcarousel-control-prev">&lsaquo;</a>';
        storyDisplay+='<a href="#" class="jcarousel-control-next">&rsaquo;</a>';
        storyDisplay+='</div>';
        storyDisplay+='</div>';
        storyDisplay+='</div>';
    }
    $("#display_story").append(storyDisplay);
    /*$('.jcarousel').jcarousel({
     list: '.jcarousel-list'
     });*/
    sliderNew();
    $( "#sortable" ).sortable({
                              update: function( event, ui ) {_this.createPlayOrder(_this.currentStory.storyId);},
                              handle: ".asset_div" /* Use the draggy handle to move, not the whole row */
                              });
    
    
    $( ".close_img").on( "click", function(Evt){
                        var li=$(this).parent();
                        var deleteCode=li.data('assetcode');
                        //var productcode = li.data('productcode');
                        //alert(productcode);
                        for(var i= 0;i<_this.currentStoryAssets.length;i++) {
	                        if(_this.currentStoryAssets[i].daCode == deleteCode) {
	                        _this.currentStoryAssets.splice(i, 1);
	                        }
                       	}
                        com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.remove(_this.currentStory.storyId,deleteCode,function(){
	                    	$(".menu").remove();
	                        _this.createStoryBar();
	                        $(".menu .product_sec").hide();
	                        $('.search_sec').css('visibility', 'hidden');
	                        _this.renderStories();
	                        _this.displayStoryAssetView();
                        },null);
                        
     });
    
},
    
    createPlayOrder: function(storyId){
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        var playOrder=new Array();
        $("#sortable li").each(function(){
            playOrder.push($(this).data('assetcode'));
        });
        for (var i=0;i<playOrder.length;i++){
            com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.updatePlayOrder(_this.currentStory.storyId,playOrder[i],i+1, function(e) {
            	
            });
        }
    },
    
    addToShowList: function(showFlag){
        var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        var doctor=ED.context.request.selectedDoctor;
        /*localstorage */
       /*if(!showFlag){
           alert("showFlag->"+showFlag);
            if(localStorage.getItem("doctorPlayList")){
            var getDoctorPlayLists = JSON.parse(localStorage.getItem("doctorPlayList"));
               // alert(JSON.stringify(getDoctorPlayLists ));
            var doctorPlayList = getDoctorPlayLists[doctor.customerCode];
            if(doctorPlayList && doctorPlayList.length > 0)
                _this.showListAssets = doctorPlayList;
            }
       }else{
           _this.showListAssets=JSON.parse(localStorage.getItem("doctorPlayList"));
           
       }*/
        //alert(_this.showListAssets.length);
        if(_this.showListAssets){
            $("#show_part").empty();
            var originalArray = {};
            /*for ( var i=0; i < _this.showListAssets.length; i++ ){
                originalArray[_this.showListAssets[i]['daCode']] = _this.showListAssets[i];
            }
            _this.showListAssets = new Array();
            for ( var key in originalArray )
                _this.showListAssets.push(originalArray[key]);*/
            var showList='';
            showList+='<div class="show_header"><label>Show List</label><div class="play" id="play_asset">Play</div></div>';
            showList+='<ul>';
            //alert(_this.showListAssets.length);
            if(_this.showListAssets.length>0){
            for(var i=0;i<_this.showListAssets.length;i++){
                showList+='<li data-showcode='+_this.showListAssets[i].daCode+'><div class="asset_name">'+_this.showListAssets[i].name+'</div><div class="asset_type">'+_this.showListAssets[i].documentType+'</div><img class="delete_img" src="../../hidoctor/images/close.png" /></li>';
            }
            }else{
                
                showList+='<li class="no_list">No Assets</li>';
            }
           showList+='</ul>';
            $("#show_part").append(showList);
            $("#menu_list").hide();
            $( ".delete_img").on( "click", function(Evt){
                var li=$(this).parent();
                var deleteCode=li.data('showcode');               
                for(var i= 0;i<_this.showListAssets.length;i++){
                    if(_this.showListAssets[i].daCode == deleteCode){
                        _this.showListAssets.splice(i, 1);
                    }
                }
                _this.addToShowList();
                                
            });
            // var playListArray ={};
            /*alert(JSON.stringify(_this.showListAssets));
            _this.playListArray[doctor.customerCode]=_this.showListAssets;
            //alert(_this.playListArray);
            localStorage.setItem("doctorPlayList",JSON.stringify(_this.playListArray));*/
            //alert(localStorage.getItem("doctorPlayList"));
            
        }
        $("#play_asset").on("click",function(e){
            var iosPlayer1= new iosPlayer({
                  assetLists :  _this.showListAssets,
                  isStory: true,
                  bAssetView: true
            });
            iosPlayer1.show();
        });       
    },
    
        //asset like,dislike and rating
    assetLike: function(currentasset,like) {
    	var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        //alert(like);
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
        daCode: currentasset.daCode,
        doctorCode: doctor.customerCode,
        doctorRegionCode: doctor.regionCode,
        userCode: user.userCode,
        userRegionCode: user.regionCode,
        like: liked,
        dislike: disliked,
        rating: "0",
        dateTime: new Date(),
        tagDescription: "",
            productCode : currentasset.productCode
            
        };
        _this.saveAnalytics(analytics, function(){
			$('.like,.dislike').hide();
			$('#likeDislikeThankyou').show();
			ED.setValue($("#likeDislikeThankyou"), com.swaas.hidoctor.edetailing.ui.view.Resource.story.likeDislikeThankyou);
        });
    },
        
    saveAnalytics: function(analytics, onSuccess){
    	if(analytics != null){
    		com.swaas.hidoctor.edetailing.service.AssetService.persistAnalytics(analytics, onSuccess);
    	}	
    },
    
    insertRatingAnalytics: function(currentasset,rating) {
        //var value = ED.context.dummay.value;
    	var _this=com.swaas.hidoctor.edetailing.ui.view.story;
        var analytics = null;
        var doctor = ED.context.request.selectedDoctor;
        var user = ED.context.currentUser;
        
        analytics = {
        companyCode: user.companyCode,
        daCode: currentasset.daCode,
        doctorCode: doctor.customerCode,
        doctorRegionCode: doctor.regionCode,
        userCode: user.userCode,
        userRegionCode: user.regionCode,
        like: "0",
        dislike: "0",
        rating: rating,
        dateTime: new Date(),
        tagDescription: "",
            productCode : currentasset.productCode
            
        };
        _this.saveAnalytics(analytics, function(analyticsId){
                      //$('#inputRatingDisplay').html('');
                      //$('#inputRatingDisplay').hide();
                      $('#ratingThankyou').show();
                      //com.swaas.hidoctor.edetailing.ui.view.Rating.setRating($('#inputRatingDisplay'), analytics.rating, true);
                      ED.setValue($("#ratingThankyou"), com.swaas.hidoctor.edetailing.ui.view.Resource.story.ratingThankyou);
                      });
    },
    onTagAdded: function(currentasset,tag, assetCode, onSuccess) {
        //var value = ED.context.dummay.value;
    	var _this=com.swaas.hidoctor.edetailing.ui.view.story;
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
            productCode : currentasset.productCode
            
        };
        
        //return
        _this.saveAnalytics(analytics, onSuccess);
    },
    onNewTagAdded: function(tag){
        
        //var value = ED.context.dummay.value;
        if(tag != null && tag != ''){
            com.swaas.hidoctor.edetailing.service.AssetService.persistNewTag(tag);
        }
    },
    
    deleteAnalytics: function(daTagAnalyticId){
        
        //var value = ED.context.dummay.value;
        if(daTagAnalyticId != null){
            com.swaas.hidoctor.edetailing.service.AssetService.deleteAnalytics(daTagAnalyticId);
        }
    },
    backFromDocOpen : function(docOpenDeatils){
        var _this = com.swaas.hidoctor.edetailing.ui.view.story; 
        if(docOpenDeatils.docOpen == true){    
			var d = new Date();
			docOpenDeatils.docOpen = false;
			var documentViewTime =(d.getTime()-docOpenDeatils.openTime);
			console.log(d.getTime()-docOpenDeatils.openTime);
            com.swaas.hidoctor.edetailing.service.AssetService.updateAssetBilling(docOpenDeatils.daBillingId, documentViewTime,function(){
				docOpenDeatils.openTime = 0;
				com.swaas.hidoctor.edetailing.dao.storyAnalyticsLocalDAO.update(docOpenDeatils.storyAnalyticsId, documentViewTime, null, null);
            },null);
			
		}
    },
    
    assetClicked: function(asset, bAssetView, onSuccess) {
    	com.swaas.hidoctor.edetailing.ui.view.story.clickedAsset = asset;
        com.swaas.hidoctor.edetailing.ui.view.story.playOrOpenAsset(bAssetView, onSuccess);
    },
    playOrOpenAsset : function(bAssetView, onPlayOrOpenAsset) {
    	var currentAsset=com.swaas.hidoctor.edetailing.ui.view.story.clickedAsset;
		var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
		var documentType = currentAsset.documentType;
        //alert(documentType);
        if (com.swaas.hidoctor.edetailing.ui.view.story.clickedAsset.downloaded != 'Y' && isConnected == false){
			if(documentType == 'VIDEO'){
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.networkMessage.video);
			}else {
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.networkMessage.document);
			}
			return;
		}
		var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        _this.populateAssetBilling(bAssetView, function(currAsset, daBillingId, storyAnalyticsId){
            _this.populateDCRAnalyticalData(currAsset, function(){
                 onPlayOrOpenAsset(daBillingId,_this.docOpenDeatils, storyAnalyticsId);
            });
        });
        
	},
    populateAssetBilling: function(bAssetView, onGetAssetBillingID){
        //alert('before pouplate asset billing maproductCodein function');
        //var value = ED.context.dummay.value;
    	var _this = com.swaas.hidoctor.edetailing.ui.view.story;
        var billingId = null;
        var currentAsset = com.swaas.hidoctor.edetailing.ui.view.story.clickedAsset;
        var doctor = ED.context.request.selectedDoctor;
        com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser(function(user){
        	com.swaas.hidoctor.edetailing.service.UserService.getUserDivision(user.userCode, function(division){ 
				//com.swaas.hidoctor.edetailing.ui.view.story.selectedProduct={"productCode":null,"productName":null};
				com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(currentAsset.productCode, function(selectedProduct) {
					if(selectedProduct != null && selectedProduct.length > 0) selectedProduct = selectedProduct[selectedProduct.length-1];
					
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
								
					/*if (selectedProduct == null){
						selectedProduct = {};
					}*/
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
						productCode: currentAsset.productCode,
						productName: selectedProduct.productName,
						doctorCode: doctor.customerCode,
						doctorRegionCode: doctor.regionCode,
						latitude : position.coords.latitude,
						longitude : position.coords.longitude,
						geoAddress : position.geoAddress
					};
					
					var analytics = {
						storyName : (bAssetView == true ? 'No Story'
								: _this.currentStory.storyName),
						storyId : (bAssetView == true ? 0
								: _this.currentStory.storyId),
						DACode : currentAsset.daCode,
						DAName : currentAsset.name,
						assetId : currentAsset.daCode,
						assetName : currentAsset.name,
						doctorCode : doctor.customerCode,
						doctorRegionCode : doctor.regionCode,
						productCode : currentAsset.productCode,
						onlinePlay : online,
						offlinePlay : offline,
						playTime : 0,
						transactionTime : new Date()
					};
					
					com.swaas.hidoctor.edetailing.service.AssetService.insertAssetBilling(assetBilling, function(assetBilling){
						billingId = assetBilling.daBillingId;
						//if(onGetAssetBillingID) onGetAssetBillingID(billingId);
						com.swaas.hidoctor.edetailing.dao.storyAnalyticsLocalDAO.insert(analytics, function(storyAnalyticsId){
							if(onGetAssetBillingID) onGetAssetBillingID(currentAsset, billingId, storyAnalyticsId);
						}, null);
					}, null);
				});
			}, null);
        },null);
    },
    populateDCRAnalyticalData: function(currAsset, onPopulatDCRFinish){
        var doctor = ED.context.request.selectedDoctor;
        var dcrActualDate =  new Date();
        doctorVisitTime = new Date();
        dcrActualDate = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(dcrActualDate);
        var analyticsProduct = {
        dcrActualDate: dcrActualDate,
            doctorCode : doctor.customerCode ,
        doctorRegionCode: doctor.regionCode,
        productCode: currAsset.productCode
        };
        com.swaas.hidoctor.edetailing.service.DCRService.saveAnalyticsDetailedData(analyticsProduct, onPopulatDCRFinish);
    }
};

