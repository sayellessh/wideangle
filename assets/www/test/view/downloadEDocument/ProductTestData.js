var products = [
	              { "productCode":"PDC00000001",
	            	  "productName":"ACNE MOIST 50g FMS",
	            	  "productTypeName":"Dermatology",
	            	  "brandCode":"BRC00000001",
	            	  "specialityCode":"SPC00000001",
	            	  "productCategoryName":"CREAM",
	            	  "specialityName":"DERMA",
	            	  "brandName":"ACNEMOIST"},
          	  { "productCode":"PDC00000003",
          		  "productName":"ALLDRY lotion 100ML",
          		  "productTypeName":"Dermatology",
          		  "brandCode":"BRC00000001",
          		  "specialityCode":"SPC00000001",
          		  "productCategoryName":"Lotion",
	            	  "specialityName":"DERMA",
	            	  "brandName":"ALDRY"},
	              { "productCode":"PDC00000002",
	            	  "productName":"ANDROANAGEN Tablets",
	            	  "productTypeName":"Dermatology",
	            	  "brandCode":"BRC00000001",
	            	  "specialityCode":"SPC00000001",
	            	  "productCategoryName":"Tablet",
	            	  "specialityName":"DERMA",
	            	  "brandName":"ANEGEN"},
      		  { "productCode":"PDC00000004",
          		  "productName":"Atogla Gel 50ml",
          		  "productTypeName":"Dermatology",
          		  "brandCode":"BRC00000001",
          		  "specialityCode":"SPC00000001",
          		  "productCategoryName":"Gel",
	            	  "specialityName":"DERMA",
	            	  "brandName":"SPONGY"},
      		  { "productCode":"PDC00000005",
          		  "productName":"RITCH CREMY LOTION",
          		  "productTypeName":"Dermatology",
          		  "brandCode":"BRC00000001",
          		  "specialityCode":"SPC00000001",
          		  "productCategoryName":"Lotion",
	            	  "specialityName":"DERMA",
	            	  "brandName":"RITCH"},
          	  { "productCode":"PDC00000006",
	            	  "productName":"Atogla crean 100g",
	            	  "productTypeName":"Dermatology",
	            	  "brandCode":"BRC00000001",
	            	  "specialityCode":"SPC00000001",
	            	  "productCategoryName":"CREAM",
	            	  "specialityName":"DERMA",
	            	  "brandName":"ACNEMOIST"}
          	  ]
	;

com.swaas.hidoctor.edetailing.ui.view.ProductTestData = {
	create: function(){
		var currentUser = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
		//alert(JSON.stringify(currentUser));
		$.each(products, function(i, product){
			//alert(JSON.stringify(product));
			var result = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.insert(product);
			//alert("Product Insert: " + JSON.stringify(result));
			result = com.swaas.hidoctor.edetailing.dao.BrandLocalDAO.insert(product);
			//alert("Brand Insert: " + JSON.stringify(result));
			result = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.insert(product);
			//alert("Speciality Insert: " + JSON.stringify(result));
			product.userCode = currentUser.userCode;
			result = com.swaas.hidoctor.edetailing.dao.UserProductMappingLocalDAO.insert(product);
			//alert("UserProductMapping Insert: " + JSON.stringify(result));
		});
		alert(products.length + " Products added");
	}
};
