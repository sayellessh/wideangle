com.swaas.hidoctor.edetailing.dao.SynchronizeRemoteDAO = {
		metadata: {
			"service" : "HDInfrastructureService"
		},
		
		startSync: function(companyCode, userCode){
			var data = {
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "StartSync", data, 'text');
			return result;
		},
		
		endSync: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "EndSync", data, 'text');
			return eval(result);
		}
};