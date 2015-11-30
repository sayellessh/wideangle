var tp={
		"tpId": "TP001",
		"callObjective": "Insert",
		"tpDate": new Date(),
		"cpName": "CP001",
		"workCategoryName": "MR",
		"workPlace": "Chenai-1"
	};

var tpDoctors=[
               {
            	   "tpId": "TP001",
				   "tpDoctorId": "1",
				   "doctorCode": "DOC00000043D120",
				   "doctorRegionCode": "REC00000043"
               },
               {
            	   "tpId": "TP001",
				   "tpDoctorId": "2",
				   "doctorCode": "DOC00000043D307",
				   "doctorRegionCode": "REC00000043"
               },
               {
            	   "tpId": "TP001",
				   "tpDoctorId": "3",
				   "doctorCode": "DOC00000043D308",
				   "doctorRegionCode": "REC00000043"
               },
               {
            	   "tpId": "TP001",
				   "tpDoctorId": "4",
				   "doctorCode": "DOC00000043D309",
				   "doctorRegionCode": "REC00000043"
               },
               {
            	   "tpId": "TP001",
				   "tpDoctorId": "5",
				   "doctorCode": "DOC00000043D310",
				   "doctorRegionCode": "REC00000043"
               },
               {
            	   "tpId": "TP001",
				   "tpDoctorId": "6",
				   "doctorCode": "DOC00000043D311",
				   "doctorRegionCode": "REC00000043"
               },
               {
            	   "tpId": "TP001",
				   "tpDoctorId": "7",
				   "doctorCode": "DOC00000043D312",
				   "doctorRegionCode": "REC00000043"
               },
               {
            	   "tpId": "TP001",
				   "tpDoctorId": "8",
				   "doctorCode": "DOC00000043D313",
				   "doctorRegionCode": "REC00000043"
               }
           ];

com.swaas.hidoctor.edetailing.ui.view.DoctorTestData={

		create : function(){
			//var currentUser = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
			com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.insert(tp);
			$.each(tpDoctors, function(i, tpDoctor){
				com.swaas.hidoctor.edetailing.dao.TPDoctorLocalDAO.insert(tpDoctor);
			});
			alert(tpDoctors.length +"tp doctors added");
			
		}
};







