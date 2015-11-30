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
	
	getProductsHasAssets: function(){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		var products = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getAllProductsHasAssets();
		$.each(products, function(index, product){
			_this._appendBrandAndSpeciality(product);
		});
		
		return products;
	},
	
	getDoctorProductsHasAssets: function(doctor){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		var products = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getProductsHasAssetsAndDoctorMapping(doctor.customerCode, doctor.regionCode);
		_this.populateBrandAndSpeciality(products);
		return products;
	},
	
	getProductsHasDownloadableAssets: function(){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		var products = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getAllProductsHasDownloadableAssets();
		$.each(products, function(index, product){
			_this._appendBrandAndSpeciality(product);
		});
		
		return products;
	},
	
	populateBrandAndSpeciality : function(products){
		
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		$.each(products, function(index, product){
			_this._appendBrandAndSpeciality(product);
		});		
	},
	_appendBrandAndSpeciality: function(product){
		var speciality = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(product.specialityCode);
		if (speciality != null){
			$.extend(product, speciality);					
		} else {
			product.specialityName = "Unknown";
		}
		
		var brand = com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.get(product.brandCode);
		if (brand != null){
			$.extend(product, brand);					
		}else {
			product.brandName = "Unknown";
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
	
	getProduct: function(productCode){
		var _this = com.swaas.hidoctor.edetailing.service.ProductService;
		var product = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(productCode);
		if (product != null){
			_this._appendBrandAndSpeciality(product);			
		} else {
			console.log("Invalid Product Code:[" + productCode + "]" );
		}
		return product;
	}
};