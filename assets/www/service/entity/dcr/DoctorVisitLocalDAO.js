com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DCR_Doctor_Visit",
			"columns": [
						{name: "doctorVisitCode", columnName:"Doctor_Visit_Code",pk:true},
						{name: "dcrCode", columnName:"DCR_Code"},
						{name: "doctorCode", columnName:"Doctor_Code"},
						{name: "doctorName", columnName:"Doctor_Name"},
						{name: "categoryCode", columnName:"Category_Code"},
						{name: "specialityName", columnName:"Speciality_Name"},
						{name: "doctorRegionCode", columnName:"Doctor_Region_Code"},
						{name: "enteredDateTime", columnName:"Entered_DateTime", isDate:true},
						{name: "doctorVisitTime", columnName:"Doctor_Visit_Time"},
						{name: "visitMode", columnName:"Visit_Mode"},
						{name: "remarksByUser", columnName:"Remarks_By_User"},
						{name: "poAmount", columnName:"PO_Amount"},
						{name: "lattitude", columnName:"Lattitude"},
						{name: "longitude", columnName:"Longitude"},					
						{name: "sourceOfEntry", columnName:"Source_Of_Entry"},					
						{name: "isAccDoctor", columnName: "Is_Acc_Doctor"},
						{name: "modeOfEntry", columnName: "Mode_Of_Entry"},
						{name: "dcrCodeFormatted", columnName:"DCR_Code_Formatted"},
						{name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code_Formatted"},
						{name: "geoAddress", columnName:"GEO_Address"}
			           ]
		},
		
		insert: function(doctor){
			com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true);
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this,doctor);
		},
		
		update: function(doctor){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this,doctor);
		},
		
		remove: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode = doctorVisitCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		getAll: function(){
			var criteria = {};
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		get: function(doctorVisitCode){
			var criteria = {};
			criteria.doctorVisitCode =doctorVisitCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},
		
		getByDoctor : function(doctorCode,doctorRegionCode) {
			 var criteria = {};
			 criteria.doctorCode = doctorCode;
			 criteria.doctorRegionCode = doctorRegionCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			 if (result.length > 0){
					return result[0];
				} else {
					return null;
				}
			 
			 },
			
		
		getByDcrCode: function(dcrCode){
			var criteria = {};
			criteria.dcrCode =dcrCode;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			return result;
		},
		
		fomateForSync: function(doctorVisit){
			var formatedData =  ED.formatDataForSync(doctorVisit, this.metadata.columns);
			return formatedData;
		},
		
		syncGet: function(params){
			var columns = [
						{name: "doctorVisitCodeFormatted", columnName:"Doctor_Visit_Code",pk:true},
						{name: "dcrCodeFormatted", columnName:"DCR_Code"},
						{name: "doctorCode", columnName:"Doctor_Code"},
						{name: "doctorName", columnName:"Doctor_Name"},
						{name: "categoryCode", columnName:"Category_Code"},
						{name: "specialityName", columnName:"Speciality_Name"},
						{name: "doctorRegionCode", columnName:"Doctor_Region_Code"},
						{name: "enteredDateTime", columnName:"Entered_DateTime", isDate:true, isTime:true},
						{name: "doctorVisitTime", columnName:"Doctor_Visit_Time"},
						{name: "visitMode", columnName:"Visit_Mode"},
						{name: "remarksByUser", columnName:"Remarks_By_User"},
						{name: "poAmount", columnName:"PO_Amount"},
						{name: "lattitude", columnName:"Lattitude"},
						{name: "longitude", columnName:"Longitude"},					
						{name: "sourceOfEntry", columnName:"Source_Of_Entry"},					
						{name: "isAccDoctor", columnName: "Is_Acc_Doctor"},
						{name: "modeOfEntry", columnName: "Mode_Of_Entry"},             
						{name: "geoAddress", columnName:"GEO_Address"}
				               ];
				
				var doctors = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
				if (doctors.length == 0){
					return [];
				}
				$.each(doctors, function(i, doctor){
					doctor.poAmount = ((doctor.poAmount == null || doctor.poAmount == "")?doctor.poAmount="0":doctor.poAmount);
					doctor.isAccDoctor = (doctor.isAccDoctor == "Y"?"1":"0");
					if (doctor.visitMode == null ||  doctor.visitMode == ""){
						if (doctor.doctorVisitTime != null){
							doctor.visitMode = (doctor.doctorVisitTime.indexOf("PM") > 0)?"PM":"AM";
						}
					}
					if (doctor.doctorVisitTime != null){
						doctor.doctorVisitTime = doctor.doctorVisitTime.replace(" PM", "");
						doctor.doctorVisitTime = doctor.doctorVisitTime.replace(" AM", "");
					}
				});
				var outRecords = new Array();
				var nullCounts = 0;
				if(doctors != null && doctors.length > 0) {
					for(var i=0;i<=doctors.length-1;i++) {
						if(doctors[i].doctorVisitCodeFormatted != null
								&& doctors[i].doctorVisitCodeFormatted != '') {
							outRecords.push(doctors[i]);
						} else {
							nullCounts++;
						}
					}
				}
				var doctorVisitString = ED.formatDataForSyncTwo(outRecords, columns);
				return [{
						correlationId: params.correlationId,
						subDomainName: params.subDomainName,
						companyCode: params.companyCode ,
						userCode: params.userCode ,
						checkSumId : params.checkSumId,
						doctorVisitString: doctorVisitString
					}];
			},
			
			clean: function(params){
				if (params == null){
					params = {};
				}
				var criteria = {};
				return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);	
			},
			eraseAndClean : function(isEraseAndClean){
				var params = {};
				com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.clean(params);
			}
};
