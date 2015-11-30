com.swaas.hidoctor.edetailing.dao.TestDATagMasterLocalDAO = {
		
		testInsert: function(){
			var tagIn = {
					tagId: "DA001",
					tagDescription: "Test Tag",
					tagUsedCount: "5"					
			};
			var tagOut = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.insert(tagIn);
			alert(JSON.stringify(tagOut));
		},
		
		testUpdate: function(){
			var tagIn = {
					tagId: "DA001",
					tagDescription: "Test Update Tag",
					tagUsedCount: "5"	
			};
			var tagOut = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.update(tagIn);
			alert(JSON.stringify(tagOut));
		},
		
		testGet: function(){
			var tagOut = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.get("DA001");
			alert(JSON.stringify(tagOut));
		},
		
		testRemove: function(){
			var tagOut = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.remove("DA001");
			alert(JSON.stringify(tagOut));
		},
		
		testRemoveAll: function(){
			var tagOut = com.swaas.hidoctor.edetailing.dao.DATagMasterLocalDAO.remove(null);
			alert(JSON.stringify(tagOut));
		}
		
};

