com.swaas.hidoctor.edetailing.dao.TPHeaderRemoteDAO = {
		metadata: {
			"service" : "HDProductservice",
			"properties": [
						{name: "tpId", inProperty: "TP_Id", outProperty: "TP_Id"},
						{name: "callObjective", inProperty: "Call_Objective", outProperty: "Call_Objective"},
						{name: "tpDate", inProperty: "TP_Date", outProperty: "TP_Date", isDate: true},
						{name: "cpName", inProperty: "CP_name", outProperty: "CP_name"},
						{name: "workCategoryName", inProperty: "Work_Category_Name", outProperty: "Work_Category_Name"},
						{name: "workPlace", inProperty: "Work_Place", outProperty: "Work_Place"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invoke(this, "GetTPHeader", data);
			var unmarshalled = {};
			if (result.Tables != null){
				if (result.Tables.length > 0){
					var tpHeaders = com.swaas.hidoctor.edetailing.dao.CoreSOAP.unmarshallJSON(this, result.Tables[0].Rows);
					
					unmarshalled.tpHeaders = tpHeaders;
					if (result.Tables.length > 1){
						var tpAccompanists = com.swaas.hidoctor.edetailing.dao.CoreSOAP.unmarshallJSON(
								com.swaas.hidoctor.edetailing.dao.TPAccompanistRemoteDAO, result.Tables[1].Rows);
						unmarshalled.tpAccompanists = tpAccompanists;
					}
				}
			}
			return unmarshalled;			
		},
		
		syncGet: function(params){
			var remoteObjects = [];
			remoteObjects.push(this.get(params.correlationId, params.companyCode, params.userCode));
			return remoteObjects;
		}
};