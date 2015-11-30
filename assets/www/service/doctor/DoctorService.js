com.swaas.hidoctor.edetailing.service.DoctorService={
		_category: {},
		_speciality:{},
		
		_addCategoryAndSpeciality: function(doctor){
			
			if (doctor.categoryCode == null){
				doctor.categoryCode = "UNKNOWN";
			}
			
			var category = this._category[doctor.categoryCode];
			if (category == null){
				category = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get(doctor.categoryCode);
				if (category == null){
					category = {
							categoryCode: doctor.categoryCode,
							categoryName: "Unknown"
					};
				}
				this._category[doctor.categoryCode] = category;
			}
			$.extend(doctor, category);
			
			
			var speciality = this._speciality[doctor.specialityCode];
			if (speciality == null){
				speciality = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(doctor.specialityCode);
				this._speciality[doctor.specialityCode] = speciality;
			}
			
			$.extend(doctor, speciality);	
		},
		
		getDoctorByTP: function(tpId){
			var doctors = [];
			var tourPlan = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.get(tpId);
			if(tourPlan != null){
				var tpDoctors = com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO.getAllByTP(tourPlan.tpId);
				var _this = com.swaas.hidoctor.edetailing.service.DoctorService;
				$.each(tpDoctors, function(i, tpDoctor){
					 //get the doctor for given tpDoctors.doctorCode, and regionCode
					var doctor = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctor(tpDoctor.doctorCode, tpDoctor.doctorRegionCode);
					doctor.tpDoctorId = tpDoctor.tpDoctorId;
					doctor.tpId = tpId;
					_this._addCategoryAndSpeciality(doctor);
					doctors.push(doctor);
				});
			}
			return doctors;
		},
		
		getDoctorsForCurrentUser:function(){
			var doctors = [];
			var currentUser = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
			if (currentUser != null){
				var currentUserDoctors = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctors(currentUser.regionCode);
				var _this = com.swaas.hidoctor.edetailing.service.DoctorService;
				$.each(currentUserDoctors, function(i, doctor){
					_this._addCategoryAndSpeciality(doctor);
					doctors.push(doctor);
				});
			}
			return doctors;
		},
		
		getDoctorsForAccompanist:function(userName){
			var _this = com.swaas.hidoctor.edetailing.service.DoctorService;
			var doctors = [];
			var accompanist = com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.get(userName);
			if (accompanist != null){
				var accompanistDoctors = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctors(accompanist.accompnistRegionCode);
				$.each(accompanistDoctors, function(i, doctor){
					_this._addCategoryAndSpeciality(doctor);
					doctors.push(doctor);
				});
			}
			return doctors;
		},
		
		getDoctor: function(customerCode, regionCode){
			var _this = com.swaas.hidoctor.edetailing.service.DoctorService;
			var doctor = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctor(customerCode, regionCode);
			_this._addCategoryAndSpeciality(doctor);
			return doctor;
		},
		
		getDoctor360: function(correlationId, companyCode, doctorCode, regionCode, userCode){
			var doctor360 = com.swaas.hidoctor.edetailing.dao.Doctor360RemoteDAO.get(correlationId, companyCode, doctorCode, regionCode, userCode);
			return doctor360;
		},
		
		getAllTags : function() {
			var tags = com.swaas.hidoctor.edetailing.dao.DoctorTagMasterLocalDAO.getAll();
			return tags;
		},
		addTag : function(tagDescription, user, doctor) {
			if(tagDescription != null && tagDescription.length > 1){
				var doctorTag = {
						tagId : com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID(),
						companyCode : user.companyCode,					
						userCode : user.userCode,					
						userRegionCode : user.regionCode,
						customerCode : doctor.customerCode,					
						customerRegionCode : doctor.regionCode,
						tagDescription : tagDescription,
						tagDate : new Date()
						};
				var tagOut = com.swaas.hidoctor.edetailing.dao.DoctorTagLocalDAO.insert(doctorTag);
				return tagOut.tagId;
			}else{
				return 0 ;
			}
		},
		removeTag : function(tagId) {
			var tagOut = com.swaas.hidoctor.edetailing.dao.DoctorTagLocalDAO.remove(tagId);
			return tagOut;		
			}
		
};

    