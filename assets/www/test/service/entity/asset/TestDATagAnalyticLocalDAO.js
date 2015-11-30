com.swaas.hidoctor.edetailing.dao.TestDATagAnalyticLocalDAO = {
		
		testInsert: function(da){
			alert('testInsert');
			var analyticsIn = {
					daCode: da,
					doctorCode: "CUS001",
					doctorRegionCode: "15",
					userCode: "USR001",
					starValue: "4",
					like: "1",
					dislike: "15",
					starValue: "4",
					rating: "1",
					dateTime: new Date(),
					tagDescription: "Good Tag"
					
			};
			var analyticsOut = com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.insert(analyticsIn);
			alert(JSON.stringify(analyticsOut));
		},
		
		testGet: function(){
			alert('testGet');
			var analyticsOut = com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.getByAsset("DA00001");
			alert(JSON.stringify(analyticsOut));
		},
		
		testRemove: function(){
			alert('testRemove');
			var analyticsOut = com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.remove("DA00001");
			alert(JSON.stringify(analyticsOut));
		},
		
		testRemoveAll: function(){
			alert('testRemoveAll');
			var analyticsOut = com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO.remove(null);
			alert(JSON.stringify(analyticsOut));
		}
};

