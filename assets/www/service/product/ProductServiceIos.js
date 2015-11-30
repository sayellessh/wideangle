com.swaas.hidoctor.edetailing.service.ProductService = {
	getCurrentUserProducts: function(){
		var currentUser = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
		if (currentUser != null){
			return this.getUserProducts(currentUser.userCode);
		}
	},
	
	getAllProducts: function(){
		return com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getAll();
	},
	
	getByProductType : function(productTypeName){
		return com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getByProductType(productTypeName);
	},
	
	getUserProducts: function(userCode){
		var userProducts = [];
		var userProductMap = com.swaas.hidoctor.edetailing.dao.UserProductMappingLocalDAO.getByUser(userCode);
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		$.each(userProductMap, function(index, productMap){
			var product = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(productMap.productCode);
			if (product != null){
				_this._appendBrandAndSpeciality(product);
				userProducts.push(product);
			}
		});
		return userProducts;
	},
	
	getProductsBySpeciality: function(specialityCode){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		var products = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getBySpeciality(specialityCode);
		$.each(products, function(index, product){
			_this._appendBrandAndSpeciality(product);
		});
		
		return products;
	},
	
	getProductsHasAssetsBySpeciality: function(specialityCode){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		var products = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getBySpecialityAndHasAssets(specialityCode);
		$.each(products, function(index, product){
			_this._appendBrandAndSpeciality(product);
		});
		
		return products;
	},
	
	getProductsHasAssets: function(onGetAssets, onFailure){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getAllProductsHasAssets(function(products){
            $.each(products, function(index, product){
                   var bLast = (index == (products.length-1)) ? true : false;
                _this._appendBrandAndSpecialityAlt(product, products, onGetAssets, bLast);
            });
        },null);
	},
	
	getDoctorProductsHasAssets: function(doctor, onSuccess){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
        com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getProductsHasAssetsAndDoctorMapping(doctor.customerCode, doctor.regionCode, function(products){
            _this.populateBrandAndSpeciality(products, function(products){
            	if(onSuccess) onSuccess(products);
             });
        });
	},
	
	getProductsHasDownloadableAssets: function(){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		var products = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getAllProductsHasDownloadableAssets();
		$.each(products, function(index, product){
			_this._appendBrandAndSpeciality(product);
		});
		
		return products;
	},
	
	populateBrandAndSpeciality : function(products, onSuccess){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
        if(products && products.length > 0) {
            $.each(products, function(index, product){
                var bLast = (index == (products.length-1)) ? true : false;
                console.log('the last value ')
                _this._appendBrandAndSpecialityAlt(product, products, onSuccess, bLast);
            });
        } else {
            //_this._appendBrandAndSpecialityAlt(product, products, onSuccess, true);
            if(onSuccess) onSuccess(products);
        }
	},
	_appendBrandAndSpecialityAlt: function(product, products, onSuccess, bLast){
		com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(product.specialityCode, function(speciality){
            if (speciality != null){
                $.extend(product, speciality);					
            } else {
                product.specialityName = "Unknown";
            }

            com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.get(product.brandCode, function(brand){
                if (brand != null){
                    $.extend(product, brand);
                }else {
                    product.brandName = "Unknown";
                }
                if(bLast && typeof onSuccess == 'function') onSuccess(products);
            }, null);
                                                                 
        }, null);
				
	},
    _appendBrandAndSpeciality: function(product, onSuccess){
        if(product && product.length > 0) {
            com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(product.specialityCode, function(speciality){
                if (speciality != null){
                    $.extend(product, speciality);					
                } else {
                    product.specialityName = "Unknown";
                }

                com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.get(product.brandCode, function(brand){
                    if (brand != null){
                        $.extend(product, brand);
                    }else {
                        product.brandName = "Unknown";
                    }
                    
                    if(typeof onSuccess == 'function') { onSuccess(product); }
                }, null);
                                                                     
            }, null);
        } else {
            if(typeof onSuccess == 'function') { onSuccess(product); }
        }
				
	},
	getProductsByOfflineAssets : function(){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		var results = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getProductsByOfflineAssets();
		var productswithDetails=[];
		$.each(results,function(i,product){
			_this._appendBrandAndSpeciality(product);
			productswithDetails.push(product);
		});
		
		return productswithDetails;
	},
	
	getProduct: function(productCode, onSuccess, onFailure){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(productCode, function(product) {
            if (product != null){
                _this._appendBrandAndSpeciality(product, onSuccess);
            } else {
                console.log("Invalid Product Code:[" + productCode + "]" );
            }
        });
	}
};