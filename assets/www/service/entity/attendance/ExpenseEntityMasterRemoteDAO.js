com.swaas.hidoctor.edetailing.dao.ExpenseEntityMasterRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "expenseEntityCode",  inProperty: "ExpenseEntityCode", outProperty: "ExpenseEntityCode"},
						{name: "expenseEntityName",  inProperty: "ExpenseEntityName", outProperty: "ExpenseEntityName"}
			            ]
		},
		
		get: function(correlationId,subDomainName, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					subDomainName : subDomainName,
					companyCode:companyCode,
					userCode: userCode,
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetExpenseEntity", data);
			result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.unmarshallJSON(this, result);
         	return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId,params.subDomainName, params.companyCode, params.userCode);
		}
};