com.swaas.hidoctor.edetailing.dao.TestDAAnalyticHistoryLocalDAO = {
		
		testInsert: function(){
			alert('testInsert');
			var tagIn = {
					daCode: "DA00001",
					totalViewsCount: "25",
					totalLikesCount: "15",
					totalDislikesCount: "1",
					starValue: "4"
					
			};
			alert(JSON.stringify(tagIn));
			var tagOut = com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO.insert(tagIn);
			alert(JSON.stringify(tagOut));
		},
		
		testGet: function(){
			alert('testget');
			var tagOut = com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO.getByAsset("DA00001");
			alert(JSON.stringify(tagOut));
		},
		
		testRemove: function(){
			alert('testRemove');
			var tagOut = com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO.remove("DA00001");
			alert(JSON.stringify(tagOut));
		},
		
		testRemoveAll: function(){
			alert('testRemoveAll');
			var tagOut = com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryLocalDAO.remove(null);
			alert(JSON.stringify(tagOut));
		}
		
};
