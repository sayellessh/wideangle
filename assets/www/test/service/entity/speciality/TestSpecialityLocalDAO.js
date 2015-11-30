com.swaas.hidoctor.edetailing.dao.TestSpecialityLocalDAO = {
		
		testInsert: function(){
			var speciality = {
					specialityCode: "Speciality One",
					specialityName: "Opthalmologist"
						
			};
			var result = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.insert(speciality);
			alert(JSON.stringify(result));
		},
		
		testUpdate: function(){
			var speciality = {
					specialityCode: "EYE001",
					specialityName: "Super Opthalmologist"
			};
			var result = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.update(speciality);
			alert(JSON.stringify(result));
		},
		
		testGet: function(){
			var specialityOut = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get("Speciality One");
			alert(JSON.stringify(specialityOut));
		},
		
		testRemove: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.remove("Speciality One");
			alert(JSON.stringify(result));
		},
		
		testRemoveAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.remove(null);
			alert(JSON.stringify(result));
		}
};