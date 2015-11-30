com.swaas.hidoctor.edetailing.dao.McDoctorsLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_MC_Doctors",
			"columns": [
						
						{name: "mcCode", columnName:"MC_Code", pk:true},
						{name: "doctorCode", columnName:"Doctor_Code",pk:true},
						{name: "regionCode", columnName:"Region_Code",pk:true}
						
			            ]
		},
		
		insert: function(mcDoctor){
            console.log('tbl mc doctors');
            console.log(mcDoctor);
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, mcDoctor);
		},
		remove: function(mcCode, doctorCode, regionCode, onSuccess, onFailure){
			var criteria = {};
			criteria.mcCode = mcCode;
			criteria.doctorCode = doctorCode;
			criteria.regionCode = regionCode;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria, onSuccess, onFailure);
		},
		
		get: function(mcCode, doctorCode, regionCode){
			var criteria = {};
			criteria.mcCode = mcCode;
			criteria.doctorCode = doctorCode;
			criteria.regionCode = regionCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getByDoctor: function(doctorCode, regionCode, onSuccess, onFailure){
			var criteria = {};
			criteria.doctorCode = doctorCode;
			criteria.regionCode = regionCode;
			//var result =
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, onSuccess, onFailure);
			//return result;
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(isEraseAndClean, context, onSuccess){
			this.remove(null, null, null, onSuccess, null);
		}
};