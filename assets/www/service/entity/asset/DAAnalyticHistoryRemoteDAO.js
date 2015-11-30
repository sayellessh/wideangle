com.swaas.hidoctor.edetailing.dao.DAAnalyticHistoryRemoteDAO = {
		metadata: {
			"service" : "HDTagService",
			"properties": [
						{name: "companyCode", inProperty: "Company_Code", outProperty: "Company_Code"},
						{name: "daCode", inProperty: "DA_ID", outProperty: "DA_ID"},
						{name: "totalViewsCount", inProperty: "TotalViewsCount", outProperty: "TotalViewsCount"},
						{name: "totalLikesCount", inProperty: "TotalLikesCount", outProperty: "TotalLikesCount"},
						{name: "totalDislikesCount", inProperty: "TotalDislikesCount", outProperty: "TotalDislikesCount"},
						{name: "starValue", inProperty: "StarValue", outProperty: "StarValue"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "GetTagHistory", data);
			return result;
		},
		
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};