com.swaas.hidoctor.edetailing.dao.TestTPHeaderLocalDAO = {
		
		testInsert: function(){
			var tpHeader = {
					tpId: "TP001",
					callObjective: "Insert",
					tpDate: new Date(),
					cpName: "CP001",
					workCategoryName: "MR",
					workPlace: "Chenai-1"
						
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.insert(tpHeader);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var tpHeader = {
					tpId: "TP001",
					callObjective: "Update",
					tpDate: new Date(),
					cpName: "CP001",
					workCategoryName: "MR",
					workPlace: "Chenai-1"
			};
			var result = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.update(tpHeader);
			alert(JSON.stringify(result));
			
			var tpHeaderOut = com.swaas.hidoctor.edetailing.dao.TPHeaderDAO.get("TP001");
			alert(JSON.stringify(tpHeaderOut));
		},
		
		testGet: function(){
			var tpHeaderOut = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.get("TP001");
			alert(JSON.stringify(tpHeaderOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.remove("TP001");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
		
};