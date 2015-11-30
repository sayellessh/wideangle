com.swaas.hidoctor.edetailing.dao.ProductLocalDAO = {
    
		metadata: {
			"tableName" : "tbl_Product_Master",
			"columns": [
                {name: "productCode", columnName:"Product_Code", pk:true},
                {name: "productName", columnName:"Product_Name"},
                {name: "productTypeName", columnName:"Product_Type_Name"},
                {name: "brandCode", columnName: "Brand_Code"},
                {name: "specialityCode", columnName: "Speciality_Code"},
                {name: "productCategoryCode", columnName: "Product_Category_Code"},
                {name: "productCategoryName", columnName:"Product_Category_Name"},
                {name: "hasDigitalAssets", columnName:"Has_Digital_Assets"}
            ]
		},
		
		insert: function(product){
			if (product.hasDigitalAssets == null){
				product.hasDigitalAssets = false;
			}
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, product, function(){ console.log('the product isnerted'); }, null);
		},
		
		update: function(product){
            com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, product);
		},
		
		remove: function(productCode, onRemove){
			var criteria = {};
			criteria.productCode = productCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onRemove, null);
		},
		
		get: function(productCode, onCodeGet){
            var criteria = {};
            criteria.productCode = productCode;
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, function(results){
                if(results.length > 0)
                    onCodeGet(results);
                else
                    onCodeGet(null);
            }, null);
		},
		
		getAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			return result;
		},
		
		getBySpeciality: function(specialityCode){
			var criteria = {};
			criteria.specialityCode = specialityCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
			
		},
		
		getByProductType: function(productTypeName,onSuccess,onFailure){
			var criteria = {};
			criteria.productTypeName = productTypeName;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria,onSuccess,onFailure);
			
			
		},
		
		getBySpecialityAndHasAssets: function(specialityCode){
			var criteria = {};
			criteria.specialityCode = specialityCode;
			criteria.hasDigitalAssets = true;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
			
		},
		
		getAllProductsHasAssets: function(onSuccess, onFailure){
			var criteria = {};
			criteria.hasDigitalAssets = true;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, onSuccess, onFailure);
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(isEraseAndClean, context, onRemove){
			this.remove(null, onRemove);
		},
    
		getProductsHasAssets : function(productCodes) {
			var productQuery = 'Select * from tbl_Product_Master where Product_Code IN (';
			$.each(productCodes, function(index, productCode) {
				productQuery+= '"'+productCode+'"';
				if(index+1 <productCodes.length){
					productQuery+= ',';
				}
			});
			productQuery= productQuery+ ") AND Has_Digital_Assets = "+'"'+"true"+'"';
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO
					.executeCustomQuery(this, productQuery);
			return result;
		},
    
		getProductsByOfflineAssets : function(){
			//this can be reused for fetching data from one table using any child table e.g tbl_Product_Master
			var productQuery ="Select * from tbl_Product_Master where Product_Code IN(select distinct Product_Code from tbl_DIGASSETS_MASTER where Downloaded = 'Y' Order By Product_Code)";
			var response = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this,productQuery);
			return response;
		},
		
		getAllProductsHasDownloadableAssets : function(){
			//this can be reused for fetching data from one table using any child table e.g tbl_Product_Master
			var productQuery ="Select * from tbl_Product_Master where Product_Code IN(select distinct Product_Code from tbl_DIGASSETS_MASTER where IsDownloadable = 'Y' Order By Product_Code)";
			var response = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this,productQuery);
			return response;
		},
		
		getAllProductsForDoctorProfile : function(categoryCode, specialityCode){
			//this can be reused for fetching data from one table using any child table e.g tbl_Product_Master
			var productQuery ="Select * from tbl_Product_Master where Product_Code IN(select distinct Product_Code from tbl_DIGASSETS_RESULTS where DA_Metadata LIKE '%" + categoryCode + "%' AND DA_Metadata LIKE '%" + specialityCode + "%' Order By Product_Code)";
			var response = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this,productQuery);
			return response;
		},
    
		getProductsHasAssetsAndDoctorMapping : function(doctorCode, regionCode, onSuccess) {
			// get mapped product for doctor-product mapping for doctor code and region code
			var productQuery = "SELECT product.* FROM tbl_Product_Master  as product INNER JOIN tbl_Doctor_Product_Mapping as mapping  ON product.Product_Code = mapping.Product_Code where Customer_Code = '" 
				+ doctorCode + "' AND Region_Code = '" + regionCode + "' AND Has_Digital_Assets ='true' order by case when Product_Priority_No  is null then 1 else 0 end, Product_Priority_No";
			//return
            com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this,productQuery,null, onSuccess, function(e) {alert(JSON.stringify(e));});
		}
};