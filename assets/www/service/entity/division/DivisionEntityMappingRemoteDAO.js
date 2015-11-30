com.swaas.hidoctor.edetailing.dao.DivisionEntityMappingRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "divisionCode",  inProperty: "DivisionCode", outProperty: "DivisionCode"},
						{name: "entityCode",  inProperty: "EntityCode", outProperty: "EntityCode"},
						{name: "entityType",  inProperty: "EntityType", outProperty: "EntityType"}
			            ]
		},
		
		get: function(correlationId,subDomainName, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					subDomainName : subDomainName,
					companyCode:companyCode,
					userCode: userCode,
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetDivisionEntityMapping", data);
			result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.unmarshallJSON(this, result);
           return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId,params.subDomainName, params.companyCode, params.userCode);
		}
};