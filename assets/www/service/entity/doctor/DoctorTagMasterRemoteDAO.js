com.swaas.hidoctor.edetailing.dao.DoctorTagMasterRemoteDAO = {
		metadata: {
			"service" : "HDTagService",
			"properties": [
						{name: "companyCode", inProperty: "Company_Code", outProperty: "Company_Code"},
						{name: "tagId", inProperty: "Tag_ID", outProperty: "Tag_ID"},
						{name: "tagDescription", inProperty: "Tag_Description", outProperty: "Tag_Description"},
						{name: "tagUsedCount", inProperty: "Tag_Used_Count", outProperty: "Tag_Used_Count"}
			            ]
		},
		
		get: function(correlationId, companyCode, userCode){
			var data = {
					correlationId:correlationId,
					companyCode:companyCode,
					userCode: userCode
			};
			var result = com.swaas.hidoctor.edetailing.dao.CoreSOAP.invokeGet(this, "PullDoctorTag", data);
			return result;
		},
				
		syncGet: function(params){
			return this.get(params.correlationId, params.companyCode, params.userCode);
		}
};