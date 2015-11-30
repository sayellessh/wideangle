com.swaas.hidoctor.edetailing.dao.TestSaleProductMappingRemoteDAO = {
		testGet: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SaleProductMappingRemoteDAO.get("1", "COM00000068", "USC00000045");
			alert(JSON.stringify(result));
		}
};