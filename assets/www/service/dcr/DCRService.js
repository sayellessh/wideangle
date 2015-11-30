com.swaas.hidoctor.edetailing.service.DCRService = {
		
	getAccompanistOfOtherDoctors: function(dcrCode, doctorVisitCode){
		var uniqueAccompanists = {};
		if (dcrCode != null && dcrCode != ""){
			var allAccompanists = com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.getByDCRCode(dcrCode);
			$.each(allAccompanists, function(index, accompanist){
				if (accompanist.doctorVisitCode != doctorVisitCode){
					uniqueAccompanists[accompanist.accUserName] = accompanist.accUserName;
				}
			});
		}
		return uniqueAccompanists;
	},
	
	getMyDoctors: function(regionCode){
		var doctors =  com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctors(regionCode);
		$.each(doctors, function(index, doctor) {
			var speciality = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(doctor.specialityCode);
			$.extend(doctor, speciality);
		});
		return doctors;
	},
	
	getAccompanistDoctors: function(regionCode){
		return com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getOthersDoctors(regionCode);
	},
	
	saveAnalyticalData: function(analyticsDocVisit){
		var exstistingData = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.get(
				analyticsDocVisit.dcrActualDate, analyticsDocVisit.doctorCode, analyticsDocVisit.doctorRegionCode);
		if (exstistingData == null){
		com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.insert(analyticsDocVisit);
		}
	},
	saveAnalyticsDetailedData:function(analyticsProduct){
		var exstistingData = com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO.get(
				analyticsProduct.dcrActualDate, analyticsProduct.doctorCode, analyticsProduct.doctorRegionCode, analyticsProduct.productCode);
		if (exstistingData == null){
			com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO.insert(analyticsProduct);
		}
	},
	
	getChemists: function(regionCode){
		var chemists = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getChemists(regionCode);
		return chemists;
	},
	
	getAllSpecialities: function(){
		return com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.getAll();
	},
	
	getDCRHeader: function(date, flag, user){
		date = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(date);
		//com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.remove(null, null);
		var dcrHeader = com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.getByDateAndFlag(date, flag);
		if (dcrHeader == null) {
			dcrHeader = {
					dcrEnteredDate : new Date(),
					dcrActualDate: date,
					userCode: user.userCode,
					regionCode: user.regionCode,
					flag: flag,
					sourceOfEntry: "Tablet"
			};
		}
		return dcrHeader;
	},
	
	getConfigSettings : function() {
		return com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO.get();
	},
	
	getDCRPrivilage : function() {
		var privilage = com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO.get();
		return privilage;
	},
	
	getDcrDoctors : function(dcrCode, date, flag) {

		var _this = com.swaas.hidoctor.edetailing.service.DCRService;
		date = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(date);
		var dcrDoctors = [];
		var doctorAddedFlag = {};

		if (dcrCode != null && dcrCode != "") {
			var doctors = com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO
					.getByDcrCode(dcrCode);

			$.each(doctors, function(index, doctor) {
				if (doctor.doctorCode != null && doctor.doctorCode != ""){
					var customer = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctor(doctor.doctorCode, doctor.doctorRegionCode);
					if(customer != null) {
						var category = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get(customer.categoryCode);
						var speciality = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(customer.specialityCode);
						doctor = $.extend({}, doctor, speciality);
						doctor = $.extend({}, doctor, category);				
						doctor = $.extend({}, doctor, customer);
					} else {
						doctor.customerCode = doctor.doctorCode;
						doctor.customerName = doctor.doctorName;
						doctor.categoryCode = "";
						doctor.categoryName = "";
						doctor.mdl = "";
					}
				} else {
					doctor.customerCode = doctor.doctorCode;
					doctor.customerName = doctor.doctorName;
					doctor.categoryCode = "";
					doctor.categoryName = "";
					doctor.mdl = "";
				}
				doctor.dcrActualDate = date;
				doctor.fechedFrom = "DCR";
				doctorAddedFlag[doctor.doctorCode + "|" + doctor.doctorRegionCode] = doctor;
				dcrDoctors.push(doctor);
				
				_this.getDCRStatuses(doctor);
			});
		}
		
		var dcrAnalytics = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.getByDcrDate(date);
		if (dcrAnalytics != null) {
			$.each(dcrAnalytics, function(index, dcrAnalytic) {
				
				if (doctorAddedFlag[dcrAnalytic.doctorCode + "|" + dcrAnalytic.doctorRegionCode] == null) {
					var customer = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctor(dcrAnalytic.doctorCode, dcrAnalytic.doctorRegionCode);
					var category = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get(customer.categoryCode);
					var speciality = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(customer.specialityCode);
					var doctor = $.extend({}, customer, speciality);
					doctor = $.extend({}, doctor, category);
					doctor.modeOfEntry = "A";
					doctor.doctorCode = customer.customerCode;
					doctor.doctorName = customer.customerName;
					doctor.enteredDateTime = dcrAnalytic.doctorVisitTime;
					doctor.doctorVisitTime = (dcrAnalytic.doctorVisitTime != null ? dcrAnalytic.doctorVisitTime.format("hh:MM TT") : "");
					doctor.visitMode = (dcrAnalytic.doctorVisitTime != null? dcrAnalytic.doctorVisitTime.format("TT"):"AM");
					doctor.isAccDoctor = (doctor.accompanistName != null)?"Y":"N";
					doctor.sourceOfEntry = "Tablet";
					doctor.doctorRegionCode = customer.regionCode;
					doctor.dcrActualDate = date;
					doctor.fechedFrom = "Detailing";
					doctor.lattitude = dcrAnalytic.lattitude;
					doctor.lattitude = dcrAnalytic.longitude;
					doctor.geoAddress = dcrAnalytic.geoAddress;
					doctorAddedFlag[doctor.doctorCode + "|" + doctor.doctorRegionCode] = doctor;
					dcrDoctors.push(doctor);
					_this.getDCRStatuses(doctor);
				}
			});
		}
		
		var tpObject = com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.getByTPDate(date);
		if (tpObject != null) {
			var tpId = tpObject.tpId;
			var doctors = com.swaas.hidoctor.edetailing.service.DoctorService.getDoctorByTP(tpId);
			$.each(doctors, function(index, doctor) {
				var customer = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctor(doctor.customerCode, doctor.regionCode);
				if (doctorAddedFlag[customer.customerCode + "|" + customer.regionCode] == null) {
					var category = com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get(customer.categoryCode);
					var speciality = com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(customer.specialityCode);
					var doctor1 = $.extend({}, customer, speciality);
					doctor1 = $.extend({}, doctor, category);
					doctor1 = $.extend({}, doctor1, doctor);
					doctor1.doctorCode = customer.customerCode;
					doctor1.doctorName = customer.customerName;
					doctor1.modeOfEntry = "M";
					doctor1.enteredDateTime = new Date();
					doctor1.isAccDoctor = "N";
					doctor1.doctorVisitTime = "";
					doctor1.visitMode = "";
					doctor1.doctorRegionCode = customer.regionCode;
					doctor1.sourceOfEntry = "Tablet";
					doctor1.dcrActualDate = date;
					doctor1.tpId = tpId;
					doctorAddedFlag[customer.customerCode + "|" + customer.regionCode] = "Yes";
					dcrDoctors.push(doctor1);
					_this.getDCRStatuses(doctor1);
				} else if (doctorAddedFlag[customer.customerCode + "|" + customer.regionCode].fechedFrom != 'DCR'){
					doctorAddedFlag[customer.customerCode + "|" + customer.regionCode].tpId = tpId;
				}
			});
			
		}
	

		return dcrDoctors;
	},
	
	getDcrAccompanists : function(doctorVisitCode, dcrActualDate, doctorCode, doctorRegionCode, tpId) {
		var accompanistsAdded = {};
		var accompanists = [];
		if (doctorVisitCode != null && doctorVisitCode != ""){
			accompanists = com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.get(doctorVisitCode);
			$.each(accompanists, function(index, accompanist){
				accompanistsAdded[accompanist.accUserName] = "Yes";
			});
		}
		
		
		if (doctorCode != null && doctorCode != ""){
			var autoAccompanists = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.getByDcrDate(dcrActualDate, doctorCode, doctorRegionCode);
			$.each(autoAccompanists, function(index, accompanist){
				if (accompanist.accompanistName != null && accompanist.accompanistName != ""){
					if (accompanistsAdded[accompanist.accompanistName] == null){
						accompanistsAdded[accompanist.accompanistName] = "Yes";
						var autoAccompanist = {
								accUserName: accompanist.accompanistName,
								accRegionCode: accompanist.doctorRegionCode,
								isOnlyForDoctor: "N",
								modeOfEntry: "A"
						};
						accompanists.push(autoAccompanist);
					}
				}	
			});				
		}	
		
		if(tpId != null &&  tpId != ""){
			var tpAccompanists = com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.getByTP(tpId, doctorRegionCode);
			$.each(tpAccompanists, function(index, accompanist) {
				if (accompanistsAdded[accompanist.accompnistName] == null){
					accompanistsAdded[accompanist.accompnistName] = "Yes";
					var dcrAccompanist = {
							accUserName: accompanist.accompnistName,
							accRegionCode: accompanist.accompnistRegionCode,
							isOnlyForDoctor: "N",
							modeOfEntry: "A",
							doctorVisitCode : doctorVisitCode,
					};
					accompanists.push(dcrAccompanist);
				}
			});
		}

		return accompanists;		
	},
	
	getDcrRcpa : function(chemistVisitCode) {

		var rcpaDetailsRaw = com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.getByChemistVisitCode(chemistVisitCode);
		var rcpaDetailsMap = {};
		
		$.each(rcpaDetailsRaw, function(index, rcpaDetail){		
			if (rcpaDetail.competitorProductCode == rcpaDetail.salesProductCode){
				var salesProduct = {};
				salesProduct.salesProductCode = rcpaDetail.salesProductCode;
				var product = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(rcpaDetail.salesProductCode);
				salesProduct.salesProductName = product.productName;
				salesProduct.supportQty = rcpaDetail.supportQty;
				salesProduct.competitorProducts = [];
				rcpaDetailsMap[salesProduct.salesProductCode] = salesProduct;
			}
		});
		
		$.each(rcpaDetailsRaw, function(index, rcpaDetail){
			if (rcpaDetail.competitorProductCode != rcpaDetail.salesProductCode){
				var salesProduct = rcpaDetailsMap[rcpaDetail.salesProductCode];
				var competitorProduct = {};
				competitorProduct.competitorProductCode = rcpaDetail.competitorProductCode;
				competitorProduct.competitorProductName = rcpaDetail.competitorProductName;
				competitorProduct.supportQty = rcpaDetail.supportQty;
				salesProduct.competitorProducts.push(competitorProduct);
			}
		});
		
		var rcpaDetails = [];
		for (var key in rcpaDetailsMap) {
		  if (rcpaDetailsMap.hasOwnProperty(key)) {
			  rcpaDetails.push(rcpaDetailsMap[key]);
		  }
		}
		return rcpaDetails;
	},
	
	getCurrentUserProducts : function() {

		var currentUser = com.swaas.hidoctor.edetailing.service.UserService
				.getCurrentUser();
		if (currentUser != null) {
			return com.swaas.hidoctor.edetailing.service.DCRService
					.getUserProducts(currentUser.userCode);
		}
	},

	getUserProducts : function(userCode) {
		var userProducts = [];
		var userProductMap = com.swaas.hidoctor.edetailing.dao.UserProductMappingLocalDAO
				.getByUser(userCode);
		$.each(userProductMap, function(index, productMap) {
			var product = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO
					.get(productMap.productCode);
			if (product != null) {
				userProducts.push(product);
			}
		});
		return userProducts;

	},

	getCurrentUserChemists : function() {
		var currentUser = com.swaas.hidoctor.edetailing.service.UserService
				.getCurrentUser();
		if (currentUser != null) {
			return this.getUserChemists(currentUser.regionCode);
		}
	},

	getUserChemists : function(regionCode) {
		var chemists = [];
		chemists = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO
				.getChemists(regionCode);
		if (chemists.length > 0) {
			return chemists;
		}
	},
	getCompetitorProducts : function(selectedProduct) {

		var competitorProducts = [];
		var compitetorProductsMapping = [];
		compitetorProductsMapping = com.swaas.hidoctor.edetailing.dao.SaleProductMappingLocalDAO
				.getCompetitorProducts(selectedProduct);

		if (compitetorProductsMapping.length > 0) {
			$.each(compitetorProductsMapping, function(i, compitetorProduct) {
				var product = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO
						.get(compitetorProduct.mappingProductCode);
				competitorProducts.push(product);
			});
		}
		return competitorProducts;
	},
	
	getAllAccompanist : function() {
		return com.swaas.hidoctor.edetailing.service.UserService.getAccompanists();
	},
	
	getInputProducts : function(doctorVisitCode, tpDoctorId) {
		var inputProducts = [];
		if (doctorVisitCode != null && doctorVisitCode != ""){
			inputProducts = com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.getByVistCode(doctorVisitCode);
			$.each(inputProducts, function(index, inputProduct){
				var localProduct = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(inputProduct.productCode);
				inputProduct.productName = localProduct.productName;
			});
		}
		
		if (tpDoctorId != null && tpDoctorId != ""){
			var tpProducts = com.swaas.hidoctor.edetailing.dao.TPProductLocalDAO.getByDoctor(tpDoctorId);
			$.each(tpProducts, function(index, tpProduct){
				var localProduct = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(tpProduct.productCode);
				inputProducts.push(localProduct);
			});
			
		}
		return inputProducts;
		
	},
	
	getInputProductsAutocomplete : function(bringType) {
		if(typeof bringType == 'undefined' || bringType == null){
			bringType = 'SALES';
		}
	
		return com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getByProductType(bringType.toUpperCase());
	},
	

	getDetailedProducts: function(doctorVisitCode, dcrActualDate, doctorCode, doctorRegionCode){
		var detailedProductsAdded = {};
		var products = [];
		if (doctorVisitCode != null && doctorVisitCode != ""){
			products = com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.getByDoctorVisitCode(doctorVisitCode);
			$.each(products, function(index, product){
				detailedProductsAdded[product.salesProductCode] = "Yes";
			});
		}
		
		if (doctorCode != null && doctorCode != ''){
			var autoProducts = com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO.getByDcrDate(dcrActualDate, doctorCode, doctorRegionCode);
			$.each(autoProducts, function(index, product){
				if (detailedProductsAdded[product.productCode] == null){
					var autoProduct = {
							salesProductCode: product.productCode,
							modeOfEntry: "A"
					};
					products.push(autoProduct);
				}
					
			});
		}
		
		
		$.each(products, function(index, product){
			var localProduct = com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(product.salesProductCode);
			if(localProduct != null && localProduct != undefined)
				product.salesProductName = localProduct.productName;
		});
		return products;
	},
	
	
	getChemistVisits: function(doctorVisitCode){
		var chemists = [];
		if (doctorVisitCode != null && doctorVisitCode != ""){
			chemists = com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.getByDocVisitCode(doctorVisitCode);
		}
		return chemists;
	},
	
	deleteDCR: function(dcrDoctor){
		if (dcrDoctor.doctorVisitCode != null){
			com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);
			com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);
			com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);	
			com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);
			com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);
			com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.remove(dcrDoctor.doctorVisitCode);
		}
		return true;
	},
	
	saveDCR : function(dcrHeader, dcrDoctor) {
		dcrHeader.flag ="F";
		if (dcrHeader.dcrCode == null || dcrHeader.dcrCode == ""){
			//Save DCR Header
			this._insertDCRHeader(dcrHeader);
		}
		dcrDoctor.dcrCode = dcrHeader.dcrCode;

		if (dcrDoctor.doctorVisitCode == null || dcrDoctor.doctorVisitCode == ""){
			this._insertDoctorVisit(dcrDoctor);
		} else {
			this._updateDoctorVisit(dcrDoctor);
			com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);
			com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);
			com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);	
			com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);
			com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode);
		}
		
		if (dcrDoctor.accompanists != null){
			$.each(dcrDoctor.accompanists, function(i, accompanist){
				accompanist.doctorVisitCode = dcrDoctor.doctorVisitCode;
				accompanist.dcrCode = dcrHeader.dcrCode;
				com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.insert(accompanist);
			});
		}
		
		if (dcrDoctor.inputProducts != null){
			$.each(dcrDoctor.inputProducts, function(i, inputProduct){
				inputProduct.doctorVisitCode = dcrDoctor.doctorVisitCode;
				inputProduct.dcrCode = dcrHeader.dcrCode;
				inputProduct.dcrProductCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
				com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.insert(inputProduct);
			});
		}
		
		
		if (dcrDoctor.detailedProducts != null){
			$.each(dcrDoctor.detailedProducts, function(i, detailedProduct){
				detailedProduct.doctorVisitCode = dcrDoctor.doctorVisitCode;
				detailedProduct.dcrCode = dcrHeader.dcrCode;
				com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.insert(detailedProduct);
			});
		}
		
		if (dcrDoctor.chemists != null){
			$.each(dcrDoctor.chemists, function(i, chemist){
				chemist.doctorVisitCode = dcrDoctor.doctorVisitCode;
				chemist.dcrCode = dcrHeader.dcrCode;
				if (chemist.isAccChemist == null || chemist.isAccChemist ==""){
					chemist.isAccChemist = "N";
				}
				chemist.chemistVisitCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
				com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.insert(chemist);
				
				if (chemist.rcpa != null){
					$.each(chemist.rcpa, function(j, rapaSalesProduct){
						var salesProduct = {
								doctorVisitCode: dcrDoctor.doctorVisitCode,
								dcrCode: dcrHeader.dcrCode,
								chemistVisitCode: chemist.chemistVisitCode,
								dcrRcpaCode: com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID(),
								salesProductCode: rapaSalesProduct.salesProductCode,
								productCode: rapaSalesProduct.salesProductCode,
								supportQty: rapaSalesProduct.supportQty,
								competitorProductCode: rapaSalesProduct.salesProductCode,
								competitorProductName: rapaSalesProduct.salesProductName
						};
						com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.insert(salesProduct);
						if (rapaSalesProduct.competitorProducts != null){
							$.each(rapaSalesProduct.competitorProducts, function(k, rcpaCompetitorProduct){
								var competitorProduct = {
										doctorVisitCode: dcrDoctor.doctorVisitCode,
										dcrCode: dcrHeader.dcrCode,
										chemistVisitCode: chemist.chemistVisitCode,
										dcrRcpaCode: com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID(),
										salesProductCode: rapaSalesProduct.salesProductCode,
										competitorProductCode: rcpaCompetitorProduct.competitorProductCode,
										competitorProductName: rcpaCompetitorProduct.competitorProductName,
										supportQty: rcpaCompetitorProduct.supportQty
								};
								com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.insert(competitorProduct);
							});	
						}
									
					});
				}
				
			});
		}
	},
	
	_insertDCRHeader: function(dcrHeader){
		dcrHeader.dcrCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.insert(dcrHeader);
		return dcrHeader.dcrCode;
	},

	_insertDoctorVisit : function(dcrDoctor) {
		dcrDoctor.doctorVisitCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.insert(dcrDoctor);
		return dcrDoctor.doctorVisitCode;
	},
	
	_updateDoctorVisit : function(dcrDoctor) {
		com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.update(dcrDoctor);
		return dcrDoctor.doctorVisitCode;

	},
	
	getDCRStatuses : function(dcrDoctor){		
		var select = "Select count(*) AS count From ";
		var dcrVisitCodeWhere = " Where Doctor_Visit_Code = '" + dcrDoctor.doctorVisitCode + "'";
		var nondcrVisitCodeWhere = " Where Doctor_Code = '" + dcrDoctor.doctorCode + "' AND Doctor_Region_Code = '" + dcrDoctor.doctorRegionCode + "' AND DCR_Actual_Date = ?";
		var entityclass = {metadata: {columns : [ {name: "count", columnName: "count"}]}};
		var params = [dcrDoctor.dcrActualDate];
		var query = "";
		var result = null;
		
		if (dcrDoctor.doctorVisitCode != null && dcrDoctor.doctorVisitCode != ""){
			query = select + "tbl_DCR_Doctor_Accompanist" + dcrVisitCodeWhere;
			result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query);
			dcrDoctor.accompanistsDone = (result != null && result.length > 0 && result[0].count > 0);
			
			if (dcrDoctor.accompanistsDone == false){
				query = select + "tbl_Analytics_Doctor_Visit" + nondcrVisitCodeWhere + " AND Accompanist_Name IS NOT NULL AND Accompanist_Name != '' ";
				result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, params);
				dcrDoctor.accompanistsDone = (result != null && result.length > 0 && result[0].count > 0);
			}
			
			query = select + "tbl_DCR_Product_Details" + dcrVisitCodeWhere;
			result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query);
			dcrDoctor.inputDone = (result != null && result.length > 0 && result[0].count > 0);
			
			query = select + "tbl_Analytics_Doctor_Visit" + nondcrVisitCodeWhere;
			result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, params);
			dcrDoctor.detailingDone = (result != null && result.length > 0 && result[0].count > 0);
			
			query = select + "tbl_DCR_Chemist_Visit" + dcrVisitCodeWhere;
			result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query);
			dcrDoctor.chemistDone = (result != null && result.length > 0 && result[0].count > 0);
			
			query = select + "tbl_DCR_RCPA_Details" + dcrVisitCodeWhere;
			result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query);
			dcrDoctor.rcpaDone = (result != null && result.length > 0 && result[0].count > 0);			
		} else {
			if (dcrDoctor.doctorCode != null && dcrDoctor.doctorCode != ""){
				query = select + "tbl_Analytics_Doctor_Visit" + nondcrVisitCodeWhere + " AND Accompanist_Name IS NOT NULL AND Accompanist_Name != '' ";
				result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, params);
				dcrDoctor.accompanistsDone = (result != null && result.length > 0 && result[0].count > 0);
				
				query = select + "tbl_Analytics_Doctor_Visit" + nondcrVisitCodeWhere;
				result = com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, params);
				dcrDoctor.detailingDone = (result != null && result.length > 0 && result[0].count > 0);
			}
			
		}
	}
};