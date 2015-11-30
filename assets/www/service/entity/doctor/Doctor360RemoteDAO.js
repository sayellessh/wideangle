com.swaas.hidoctor.edetailing.dao.Doctor360RemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": []
		},
		
		get: function(correlationId, companyCode, doctorCode, regionCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					doctorCode: doctorCode,
					regionCode:regionCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetDoctor360", data);
			return result;
		}
};