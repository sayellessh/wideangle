com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_TP_Doctors",
			"columns": [
						{name: "tpId", columnName: "TP_Id"},
						{name: "tpDoctorId", columnName: "TP_Doctor_Id", pk:true},
						{name: "doctorCode", columnName: "Doctor_Code"},
						{name: "doctorRegionCode", columnName:"Doctor_Region_Code"}
			            ]
		},
		
		insert: function(tpDoctor){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, tpDoctor);
		},
		
		update: function(tpDoctor){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, tpDoctor);
		},
		
		remove: function(tpDoctorId){
			var criteria = {};
			criteria.tpDoctorId = tpDoctorId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(tpDoctorId){
			var criteria = {};
			criteria.tpDoctorId = tpDoctorId;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getAllByTP: function(tpId){
			var criteria = {};
			criteria.tpId = tpId;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		getAllByRegionCode: function(doctorRegionCode){
			var criteria = {};
			criteria.doctorRegionCode = doctorRegionCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
				return result;
			
		},
		
		syncPut: function(params){
			this.insert(params);
		},
		
		clean: function(){
			this.remove(null);
		}
		
		
};
