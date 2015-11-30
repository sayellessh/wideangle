com.swaas.hidoctor.edetailing.dao.DCRHeaderAccompanistLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Header_Accompanist",
			"columns": [
						{name: "dcrCode", columnName:"DCR_Code",pk:true},
						{name: "accUserName", columnName:"Acc_User_Name",pk:true},
						{name: "accUserTypeName", columnName:"Acc_User_Type_Name"},
						{name: "accRegionCode", columnName:"Acc_Region_Code"},
						{name: "startTime", columnName:"Start_Time"},
						{name: "endTime", columnName:"End_Time"},
						{name: "onlyForDoctor", columnName:"Only_For_Doctor"},
						{name: "modeOfEntry", columnName:"Mode_Of_Entry"}
			           ]
		},
		
		insert: function(accompanist){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, accompanist);
		},
		
		update: function(accompanist){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, accompanist);
		},
		
		get: function(dcrCode){
			var criteria = {};
			criteria.dcrCode = dcrCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);		
			return result;
		},
		
		remove: function(dcrCode){
			var criteria = {};
			criteria.dcrCode = dcrCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		clean: function(){
			this.remove(null);
		}
};