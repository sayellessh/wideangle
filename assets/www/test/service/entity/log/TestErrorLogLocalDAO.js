com.swaas.hidoctor.edetailing.dao.TestErrorLogLocalDAO = {
		
		testInsert : function() {
			
			var errorInfo = {
				
			    deviceId : 123-456-987,	
			    userName : "User123",
			    errorTime: new Date(),
				error : {
					     pageName : "ED.pageContext.pageName",
					     errorAt : "page one two",
					     error : "err",
					     context : "context"		
					    }
			    
				};
				
			var result = com.swaas.hidoctor.edetailing.dao.ErrorLogsLocalDAO.insert(errorInfo);
			alert(JSON.stringify(result));
			
		},
		
      testGetAll : function() {
    	  
	   var result = com.swaas.hidoctor.edetailing.dao.ErrorLogsLocalDAO.getAll();
	   alert(JSON.stringify(result));
	   
       },
		
       testGet: function(){
    	   
			var result = com.swaas.hidoctor.edetailing.dao.ErrorLogsLocalDAO.getBy("123-456-987");
			alert(JSON.stringify(result));
			
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
};