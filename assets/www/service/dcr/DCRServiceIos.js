com.swaas.hidoctor.edetailing.service.DCRService = {
		
    getAccompanistOfOtherDoctors: function(dcrCode, doctorVisitCode, onSuccess, onFailure){
		var uniqueAccompanists = {};
		if (dcrCode != null && dcrCode != ""){
            com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.getByDCRCode(dcrCode,function(allAccompanists){
                $.each(allAccompanists, function(index, accompanist){
                    if (accompanist.doctorVisitCode != doctorVisitCode){
                       uniqueAccompanists[accompanist.accUserName] = accompanist.accUserName;
                    }
                });
                onSuccess(uniqueAccompanists);
            },null);
			
		}else{
            onSuccess(uniqueAccompanists);
        }
	},
	
	getMyDoctors: function(regionCode, onSuccess, onFailure){
        com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctors(regionCode,function(doctors){
            if(doctors) {
                $.each(doctors, function(index, doctor) {
                    // var speciality =
                    com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(doctor.specialityCode,function(speciality){
                        $.extend(doctor, speciality);
                        if(index==(doctors.length-1))
                            onSuccess(doctors);
                    },null);
                });
            } else {
                onSuccess(doctors);
            }
        },null);
	},
	
	getAccompanistDoctors: function(regionCode){ //alert('dcrservice getaccompdoc');
		return com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getOthersDoctors(regionCode);
	},
	
	saveAnalyticalData: function(analyticsDocVisit){ //alert('dcrservice analytical');
		var exstistingData = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.get(
				analyticsDocVisit.dcrActualDate, analyticsDocVisit.doctorCode, analyticsDocVisit.doctorRegionCode);
		if (exstistingData == null){
            com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.insert(analyticsDocVisit);
		}
	},
	saveAnalyticsDetailedData:function(analyticsProduct, onSuccess, onFailure){ //alert('dcrservice saveanalytical');
		//var exstistingData =
        com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO.get(analyticsProduct.dcrActualDate, analyticsProduct.doctorCode, analyticsProduct.doctorRegionCode, analyticsProduct.productCode, function(exstistingData){
            if (exstistingData == null){
            	com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO.insert(analyticsProduct, function(){
                   if(onSuccess) onSuccess();
                }, null);
            } else {
                if(onSuccess) onSuccess();
            }
        });
	},
	
	getChemists: function(regionCode,onSuccess,onFailure){ //alert('dcrservice getchemists');
        com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getChemists(regionCode,onSuccess,onFailure);
	},
	
	getAllSpecialities: function(onSuccess,onFailure){ //alert('dcrservice getallspecialities');
		com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.getAll(onSuccess,onFailure);
	},
	
	getDCRHeader: function(date, flag, user, onSuccess, onFailure){
		date = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(date);
        com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.getByDateAndFlag(date, flag, function(dcrHeader){
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
             if(onSuccess) onSuccess(dcrHeader);
        });
	},
	
	getConfigSettings : function(onSuccess, onFailure) {
		com.swaas.hidoctor.edetailing.dao.DCRConfigSettingsLocalDAO.get(onSuccess, onFailure);
	},
	
	getDCRPrivilage : function(onSuccess, onFailure) {
        com.swaas.hidoctor.edetailing.dao.DCRPrivilegeLocalDAO.get(onSuccess, onFailure);
	},
	/* ---------- merged above / to be merged below functions ----------- */
	getDcrDoctors : function(dcrCode, date, flag,onSuccess,onFailure) { //alert('dcrservice getdcrdoct');

		var _this = com.swaas.hidoctor.edetailing.service.DCRService;
        date = com.swaas.hidoctor.edetailing.util.DateUtil.scrapTime(date);
        var dcrDoctors = [];
        var doctor = [];
		var doctorAddedFlag = {};
        if ((dcrCode) && (dcrCode != null)) {
            com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.getByDcrCode(dcrCode,function(doctors){
                $.each(doctors, function(index, doctor) {
				if (doctor.doctorCode != null && doctor.doctorCode != ""){
                    com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctor(doctor.doctorCode, doctor.doctorRegionCode,function(customer){
                        com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get(customer.categoryCode,function(category){
                            com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(customer.specialityCode,function(speciality){
                                 doctor = $.extend({}, doctor, speciality);
                                 doctor = $.extend({}, doctor, category);
                                 doctor = $.extend({}, doctor, customer);
                                 doctor.dcrActualDate = date;
                                 doctor.fechedFrom = "DCR";
                                 doctorAddedFlag[doctor.doctorCode + "|" + doctor.doctorRegionCode] = doctor;
                                 dcrDoctors.push(doctor);
                                if(index ==(doctors.length-1)){
                                     _this.getDCRStatuses(dcrDoctors,doctor, function(){
                                         _this.DCRAnalytics(dcrDoctors,doctor,date,doctorAddedFlag,onSuccess,onFailure);
                                    },null);
                                } else {
									_this.getDCRStatuses(dcrDoctors,doctor, null,null);								
                                }
                                                                                 
                            },null);
                        },null);
                     },null);
				} else {
					doctor.customerCode = doctor.doctorCode;
					doctor.customerName = doctor.doctorName;
					doctor.categoryCode = "";
					doctor.categoryName = "";
					doctor.mdl = "";
                    doctor.dcrActualDate = date;
                    doctor.fechedFrom = "DCR";
                    doctorAddedFlag[doctor.doctorCode + "|" + doctor.doctorRegionCode] = doctor;
                    dcrDoctors.push(doctor);
                    _this.getDCRStatuses(dcrDoctors,doctor, function(){
                        _this.DCRAnalytics(dcrDoctors,doctor,date,doctorAddedFlag,onSuccess,onFailure);
                    },null);

				}
			});
                
            },null);

        }else{
            //_this.getDCRStatuses(dcrDoctors,doctor, function(){
            _this.DCRAnalytics(dcrDoctors,doctor,date,doctorAddedFlag,onSuccess,onFailure);
            //},null);
        }
    },
    
    DCRAnalytics: function(dcrDoctors,doctor,date,doctorAddedFlag,onSuccess,onFailure){
        var _this = com.swaas.hidoctor.edetailing.service.DCRService;
        com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.getByDcrDate(date,null,null,function(dcrAnalytics){
            if ((dcrAnalytics != null) && (dcrAnalytics.length > 0) ) {
            $.each(dcrAnalytics, function(index, dcrAnalytic) {
                var tempVar = dcrAnalytic.doctorCode + "|" + dcrAnalytic.doctorRegionCode;
                if (!doctorAddedFlag && doctorAddedFlag[tempVar] == null) {
                   com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctor(dcrAnalytic.doctorCode, dcrAnalytic.doctorRegionCode,function(customer){
                         com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get(customer.categoryCode,function(category){
                               com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(customer.specialityCode,function(speciality){
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
                                    if(index == (dcrAnalytics.length - 1))	
										_this.getDCRStatuses(dcrDoctors,doctor,function() {
											_this.tpObject(dcrDoctors,doctor,date,doctorAddedFlag,onSuccess,onFailure);
										},onFailure);								
									else 										    
										_this.tpObject(dcrDoctors,doctor,date,doctorAddedFlag,null,null);
                                                                                        
                                },null);
                         },null);
                   },null);
               } else {
                   if(index == (dcrAnalytics.length-1)){
                        //_this.getDCRStatuses(dcrDoctors,doctor, function(){
                            _this.tpObject(dcrDoctors,doctor,date,doctorAddedFlag,onSuccess,onFailure);
                        //},null);
                    }
               }
            });
            }else{
                 _this.tpObject(dcrDoctors,doctor,date,doctorAddedFlag,onSuccess,onFailure);
            }

                                                                                    
         },null);
    },
    
    tpObject: function(dcrDoctors,doctor,date,doctorAddedFlag,onSuccess,onFailure){
        var _this = com.swaas.hidoctor.edetailing.service.DCRService;
        com.swaas.hidoctor.edetailing.dao.TPHeaderLocalDAO.getByTPDate(date.toJSON(),function(tpObject){ 
           if (tpObject != null) {
               var tpId = tpObject.tpId;
               com.swaas.hidoctor.edetailing.service.DoctorService.getDoctorByTP(tpId,function(doctors){
                  $.each(doctors, function(index, doctor) {
                        com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO.getDoctor(doctor.customerCode, doctor.regionCode,function(customer){
                            var tempVar = customer.customerCode + "|" + customer.regionCode;
                            if (doctorAddedFlag[tempVar] == null) {
                                com.swaas.hidoctor.edetailing.dao.DoctorCategoryLocalDAO.get(customer.categoryCode,function(category){
                                    com.swaas.hidoctor.edetailing.dao.SpecialityLocalDAO.get(customer.specialityCode,function(speciality){
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
										if(index == (doctors.length - 1))	
											_this.getDCRStatuses(dcrDoctors,doctor1,function(dcrDoctor) {
												onSuccess(dcrDoctors);
											},onFailure);								
										else 										    
											_this.getDCRStatuses(dcrDoctors,doctor1,null,null);
                                    },null);
                                },null);
                             } else if (doctorAddedFlag[customer.customerCode + "|" + customer.regionCode].fechedFrom != 'DCR'){
                                 doctorAddedFlag[customer.customerCode + "|" + customer.regionCode].tpId = tpId;
                                 if(index == (doctors.length - 1))
									 onSuccess(dcrDoctors);
                             }
                        },null);
                    });
                },null);
             }else{
                onSuccess(dcrDoctors);
             }
                                                                           
        },null);
        
    },
	
	getDcrAccompanists : function(doctorVisitCode, dcrActualDate, doctorCode, doctorRegionCode, tpId,onSuccess,onFailure) {
        var _this = com.swaas.hidoctor.edetailing.service.DCRService;
		var accompanistsAdded = {};
		var accompanists = [];
		if (doctorVisitCode != null && doctorVisitCode != ""){
            com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.get(doctorVisitCode,function(accompanists){
               $.each(accompanists, function(index, accompanist){
                      accompanistsAdded[accompanist.accUserName] = "Yes";
               });
               _this.autoAccompanists(accompanistsAdded,accompanists,dcrActualDate, doctorCode, doctorRegionCode,function(){
                      _this.tpAccompanists(accompanistsAdded,accompanists,tpId, doctorRegionCode,onSuccess,null);
              },null);
                
            },null);
			
		}else{
           // alert("else");
            _this.autoAccompanists(accompanistsAdded,accompanists,dcrActualDate, doctorCode, doctorRegionCode,function(){
                       _this.tpAccompanists(accompanistsAdded,accompanists,tpId, doctorRegionCode,onSuccess,null);
             },null);
        }

		
	},
	
	getDcrRcpa : function(chemistVisitCode,onSuccess,onFailure) { //alert('dcrservice getdcrrpa');

		var rcpaDetailsRaw;
        var rcpaDetailsMap = {};
        var _this=com.swaas.hidoctor.edetailing.service.DCRService;
        //alert("getDcrRcpa");
       // alert(chemistVisitCode);
        com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.getByChemistVisitCode(chemistVisitCode,function(rcpaDetailsRaw){
            //alert("rcpaDetailsRaw");
            //alert(JSON.stringify(rcpaDetailsRaw));
             // alert(rcpaDetailsRaw.length);
                if(rcpaDetailsRaw && rcpaDetailsRaw.length > 0){
                    //alert(JSON.stringify(rcpaDetailsRaw));
                    //alert(alert(rcpaDetailsRaw.length));
                    
                    $.each(rcpaDetailsRaw, function(index, rcpaDetail){
                           //alert("rcpaDetail.salesProductCode->"+rcpaDetail.salesProductCode);
                           //alert("rcpaDetail.competitorProductCode->"+rcpaDetail.competitorProductCode);
                           
                          // alert("salesProduct.salesProductCode->"+salesProduct.salesProductCode);
                          // alert("rcpaDetail.salesProductCode->"+rcpaDetail.salesProductCode);
                           com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(rcpaDetail.salesProductCode,function(product){
                           var salesProduct = {};                                                     // alert("product");
                               // alert(JSON.stringify(product));
                             if (rcpaDetail.competitorProductCode == rcpaDetail.salesProductCode){
                              
                             salesProduct.salesProductCode = rcpaDetail.salesProductCode;
                              // alert(salesProduct.salesProductCode);
                                if(product  && product.length >0 ){
                                    product=product[0];
                                 }
                                 //alert(JSON.stringify(product[0]));
                                //alert(product.productName);
                                 salesProduct.salesProductName = product.productName;
                                
                                 salesProduct.supportQty = rcpaDetail.supportQty;
                                 salesProduct.competitorProducts = [];
                                 rcpaDetailsMap[salesProduct.salesProductCode] = salesProduct;
                                                                                
                                  
                                }
                             if(index==(rcpaDetailsRaw.length-1)){
                             //alert(" salesProduct.salesProductName->"+salesProduct.salesProductName);
                             _this.rcpaDetails(rcpaDetailsMap,rcpaDetailsRaw,onSuccess,onFailure);
                             }
                               },null);
                           
                           
                    });
                }else{
                                                                                   // alert("else");
                    _this.rcpaDetails(rcpaDetailsMap,rcpaDetailsRaw,onSuccess,onFailure);
                }
                                                                                    
            },null);
	

	},
	rcpaDetails:function(rcpaDetailsMap,rcpaDetailsRaw,onSuccess,onFailure){
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
        onSuccess(rcpaDetails);
        
    },
    
	getCurrentUserProducts : function() { //alert('dcrservice getcuurentuserprod');

		var currentUser = com.swaas.hidoctor.edetailing.service.UserService
				.getCurrentUser();
		if (currentUser != null) {
			return com.swaas.hidoctor.edetailing.service.DCRService
					.getUserProducts(currentUser.userCode);
		}
	},

	getUserProducts : function(userCode) { //alert('dcrservice getuserprod');
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

	getCurrentUserChemists : function() { //alert('dcrservice getcurrentuserchem');
		var currentUser = com.swaas.hidoctor.edetailing.service.UserService
				.getCurrentUser();
		if (currentUser != null) {
			return this.getUserChemists(currentUser.regionCode);
		}
	},

	getUserChemists : function(regionCode) { //alert('dcrservice getuserchemists');
		var chemists = [];
		chemists = com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO
				.getChemists(regionCode);
		if (chemists.length > 0) {
			return chemists;
		}
	},
	getCompetitorProducts : function(selectedProduct,onSuccess,onFailure) { alert('dcrservice getcompettiroprod');

		var competitorProducts = [];
		var compitetorProductsMapping = [];
        com.swaas.hidoctor.edetailing.dao.SaleProductMappingLocalDAO
        .getCompetitorProducts(selectedProduct,function(compitetorProductsMapping){
               if (compitetorProductsMapping.length > 0) {
                $.each(compitetorProductsMapping, function(i, compitetorProduct) {
                      com.swaas.hidoctor.edetailing.dao.ProductLocalDAO
                       .get(compitetorProduct.mappingProductCode,function(product){
                            if(product)
                            competitorProducts.push(product);
                            if(i ==(compitetorProductsMapping.length -1))
                            onSuccess(competitorProducts);
                      },null);
                      
                });
                }else{
                            onSuccess(competitorProducts);
                }
           
           },null);

		
	//	return competitorProducts;
	},
	
	getAllAccompanist : function(onSuccess,onFailure) { //alert('dcrservice getAllAccompanist');
		com.swaas.hidoctor.edetailing.service.UserService.getAccompanists(onSuccess,onFailure);
	},
	
	getInputProducts : function(doctorVisitCode, tpDoctorId,onSuccess,onFailure) { alert('dcrservice getInputProducts');
        var _this=com.swaas.hidoctor.edetailing.service.DCRService;
        var inputProducts=new Array();
		if (doctorVisitCode != null && doctorVisitCode != ""){
            com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.getByVistCode(doctorVisitCode,function(inputProducts){
                $.each(inputProducts, function(index, inputProduct){
                    // alert("inputProductcode"+inputProduct.productCode);
                    com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(inputProduct.productCode,function(localProduct){
                        if(localProduct && localProduct.length > 0) {
                            localProduct=localProduct[0];
                        }
                        //alert("localproduct name");
                        //alert(localProduct.productName);
                        inputProduct.productName = localProduct.productName;
                        //alert("product name->"+inputProduct.productName);
                        //products.push(inputProduct);
                        if(index==(inputProducts.length-1))
                            _this.tpProducts(inputProducts,tpDoctorId,onSuccess,onFailure);
                    },null);
                });
            },null);
		}else{
            //alert("else");
            _this.tpProducts(inputProducts,tpDoctorId,onSuccess,onFailure);
        }
	},
	
	getInputProductsAutocomplete : function(bringType,onSuccess,onFailure) { //alert('dcrservice getInputProductsAutocomplete');
		if(typeof bringType == 'undefined' || bringType == null){
			bringType = 'SALES';
		}
		com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.getByProductType(bringType.toUpperCase(),onSuccess,onFailure);
	},
	

	getDetailedProducts: function(doctorVisitCode, dcrActualDate, doctorCode, doctorRegionCode,onSuccess,onFailure){ alert('dcrservice getDetailedProducts');
        var _this=com.swaas.hidoctor.edetailing.service.DCRService;
		var detailedProductsAdded = {};
		var products = [];
        
		if (doctorVisitCode != null && doctorVisitCode != ""){
			com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.getByDoctorVisitCode(doctorVisitCode,function(products){
                   $.each(products, function(index, product){
                          detailedProductsAdded[product.salesProductCode] = "Yes";
                   });
                   _this.autoProducts(products,dcrActualDate, doctorCode, doctorRegionCode,detailedProductsAdded, function(products){
                       if(products && products.length >0){
                            var newProducts  = new Array();     
                            $.each(products, function(index, product){
                                   com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(product.salesProductCode,function(localProduct){
                                         
                                         if(localProduct && localProduct.length > 0){
                                             localProduct=localProduct[0];
                                         }
                                                                                         
                                        product.salesProductName = localProduct.productName;
                                        newProducts.push(product);
                                        if(onSuccess)
                                        onSuccess(newProducts);
                                   },null);
                               
                            });
                        }else{
                              onSuccess(products);
                        }
                                      
                    },null);
                                                                                               
            },null);
			
		}else{ alert(41);
            _this.autoProducts(products,dcrActualDate, doctorCode, doctorRegionCode,detailedProductsAdded,function(products){
                if(products && products.length >0){ alert(40);
                $.each(products, function(index, product){
                  // var localProduct =
                  com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(product.salesProductCode,function(localProduct){
                        product.salesProductName = localProduct.productName;
                            if(onSuccess)
                            onSuccess(products);
                   },null);
                  
                });
               }else{
                            onSuccess(products);

               }

            },null);

            
        }

	},
	
	
	getChemistVisits: function(doctorVisitCode,onSuccess,onFailure){ alert('dcrservice getChemistVisits');
		var chemists = [];
		if (doctorVisitCode != null && doctorVisitCode != ""){
            com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.getByDocVisitCode(doctorVisitCode,onSuccess,onFailure);
		}else{
           // alert(" doc visit else");
           // alert(chemists);
            onSuccess(chemists);
            
        }
		//return chemists;
	},
	
	deleteDCR: function(dcrDoctor,onSuccess,onFailure){ //alert('dcrservice deleteDCR');
		if (dcrDoctor.doctorVisitCode != null){
			com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
               com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                   com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                         com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                                com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                                      com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.remove(dcrDoctor.doctorVisitCode,onSuccess,onFailure);                                                                        
                                },null);
                                
                                                                                                        
                         },null);
                                                                                 
                   },null);
                                                                                   
                },null);
                                                                                                   
            },null);
			
		}
		//return true;
	},
	
	saveDCR : function(dcrHeader, dcrDoctor,onSuccess,onFailure) { alert('dcrservice saveDCR');
        var _this=com.swaas.hidoctor.edetailing.service.DCRService;
		dcrHeader.flag ="F";
		if (dcrHeader.dcrCode == null || dcrHeader.dcrCode == ""){
			//Save DCR Header
			this._insertDCRHeader(dcrHeader,function(){
                _this.saveInsertDCR(dcrDoctor,dcrHeader,onSuccess,onFailure);
                                  
            },null);
		}else{
            _this.saveInsertDCR(dcrDoctor,dcrHeader,onSuccess,onFailure);
        }
		
	},
    saveInsertDCR:function(dcrDoctor,dcrHeader,onSuccess,onFailure){
        var _this=com.swaas.hidoctor.edetailing.service.DCRService;
        //alert("save insert dcr");
        dcrDoctor.dcrCode = dcrHeader.dcrCode;
        //alert(dcrDoctor.dcrCode);
        if (dcrDoctor.doctorVisitCode == null || dcrDoctor.doctorVisitCode == ""){
            this._insertDoctorVisit(dcrDoctor,function(){
               _this.insertAccompanists(dcrDoctor,dcrHeader,onSuccess,onFailure);
            },null);
        } else {
            this._updateDoctorVisit(dcrDoctor,function(){
                com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                       com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                               com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                                     com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                                            com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.removeByDoctorVisitCode(dcrDoctor.doctorVisitCode,function(){
                                                  _this.insertAccompanists(dcrDoctor,dcrHeader,onSuccess,onFailure);
                                                 },null);
                                    },null);
                                },null);
                           },null);
                                                                                                  
                      },null);
                               
               },null);
            
        }
  
    },
    insertAccompanists:function(dcrDoctor,dcrHeader,onSuccess,onFailure){
        var _this=com.swaas.hidoctor.edetailing.service.DCRService;
        if (dcrDoctor.accompanists != null){
            $.each(dcrDoctor.accompanists, function(i, accompanist){
                   accompanist.doctorVisitCode = dcrDoctor.doctorVisitCode;
                   accompanist.dcrCode = dcrHeader.dcrCode;
                   com.swaas.hidoctor.edetailing.dao.DCRDoctorAccompanistLocalDAO.insert(accompanist,function(){
                          _this.insertInput(dcrDoctor,dcrHeader,onSuccess,onFailure);
                       },null);
                   });
        }

    },
    insertInput:function(dcrDoctor,dcrHeader,onSuccess,onFailure){
        var _this=com.swaas.hidoctor.edetailing.service.DCRService;
        if (dcrDoctor.inputProducts != null){
            $.each(dcrDoctor.inputProducts, function(i, inputProduct){
                   inputProduct.doctorVisitCode = dcrDoctor.doctorVisitCode;
                   inputProduct.dcrCode = dcrHeader.dcrCode;
                   inputProduct.dcrProductCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
                   com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO.insert(inputProduct,function(){
                          _this.insertDetailedProducts(dcrDoctor,dcrHeader,onSuccess,onFailure);
                    },null);
                   });
        }
        
    },
    insertDetailedProducts:function(dcrDoctor,dcrHeader,onSuccess,onFailure){
         var _this=com.swaas.hidoctor.edetailing.service.DCRService;
        if (dcrDoctor.detailedProducts != null){
            $.each(dcrDoctor.detailedProducts, function(i, detailedProduct){
                   detailedProduct.doctorVisitCode = dcrDoctor.doctorVisitCode;
                   detailedProduct.dcrCode = dcrHeader.dcrCode;
                   com.swaas.hidoctor.edetailing.dao.DCRDetailedProductsLocalDAO.insert(detailedProduct,function(){
                        _this.insertChemist(dcrDoctor,dcrHeader,onSuccess,onFailure);
                   },null);
                   });
        }
    
    },
    insertChemist:function(dcrDoctor,dcrHeader,onSuccess,onFailure){
        var _this=com.swaas.hidoctor.edetailing.service.DCRService;
        if (dcrDoctor.chemists != null){
            $.each(dcrDoctor.chemists, function(i, chemist){
                   chemist.doctorVisitCode = dcrDoctor.doctorVisitCode;
                   chemist.dcrCode = dcrHeader.dcrCode;
                   if (chemist.isAccChemist == null || chemist.isAccChemist ==""){
                   chemist.isAccChemist = "N";
                   }
                   chemist.chemistVisitCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
                       com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO.insert(chemist,function(){
                         if(i==(dcrDoctor.chemists.length-1)){
                         //alert(dcrDoctor.chemists.length);
                          if (chemist.rcpa != null){
                         // alert(chemist.rcpa);
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
                                com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO.insert(salesProduct,function(){
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
                                                onSuccess();
                                         }else{
                                           //alert("else");
                                          onSuccess();
                                         
                                         }

                                    },null);
                                
                                });
                         }
                       }
                       },null);
                   
                   });
        }

        
    },
	_insertDCRHeader: function(dcrHeader,onSuccess,onFailure){ alert('dcrservice _insertDCRHeader');
		dcrHeader.dcrCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.insert(dcrHeader,onSuccess,onFailure);
		//return dcrHeader.dcrCode;
	},

	_insertDoctorVisit : function(dcrDoctor,onSuccess,onFailure) { alert('dcrservice _insertDoctorVisit');
		dcrDoctor.doctorVisitCode = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
		com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.insert(dcrDoctor,onSuccess,onFailure);
		//return dcrDoctor.doctorVisitCode;
	},
	
	_updateDoctorVisit : function(dcrDoctor,onSuccess,onFailure) { alert('dcrservice _updateDoctorVisit');
		com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO.update(dcrDoctor,onSuccess,onFailure);
		//return dcrDoctor.doctorVisitCode;

	},
	
	getDCRStatuses : function(dcrDoctors,dcrDoctor,onSuccess,onFailure){		
		var select = "Select count(*) AS count From ";
		var dcrVisitCodeWhere = " Where Doctor_Visit_Code = '" + dcrDoctor.doctorVisitCode + "'";
		var nondcrVisitCodeWhere = " Where Doctor_Code = '" + dcrDoctor.doctorCode + "' AND Doctor_Region_Code = '" + dcrDoctor.doctorRegionCode + "' AND DCR_Actual_Date = ?";
		var entityclass = {metadata: {columns : [ {name: "count", columnName: "count"}]}};
		var params = [dcrDoctor.dcrActualDate];
		var query = "";
		var result = null;
		var _this = this;
		
		if (dcrDoctor.doctorVisitCode != null && dcrDoctor.doctorVisitCode != ""){
			query = select + "tbl_DCR_Doctor_Accompanist" + dcrVisitCodeWhere;
			//result = 
			com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, null, function(result){			
				dcrDoctor.accompanistsDone = (result != null && result.length > 0 && result[0].count > 0);
				if (dcrDoctor.accompanistsDone == false){
					query = select + "tbl_Analytics_Doctor_Visit" + nondcrVisitCodeWhere + " AND Accompanist_Name IS NOT NULL AND Accompanist_Name != '' ";
					com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, params, function(result){
						dcrDoctor.accompanistsDone = (result != null && result.length > 0 && result[0].count > 0);
						_this.getDcrStatusDetails(entityclass, query, select, params, dcrDoctor, dcrVisitCodeWhere, nondcrVisitCodeWhere, onSuccess);
					});
				} else {
					_this.getDcrStatusDetails(entityclass, query, select, params, dcrDoctor, dcrVisitCodeWhere, nondcrVisitCodeWhere, onSuccess);
				}
				
			});			
		} else {
			if (dcrDoctor.doctorCode != null && dcrDoctor.doctorCode != ""){
				query = select + "tbl_Analytics_Doctor_Visit" + nondcrVisitCodeWhere + " AND Accompanist_Name IS NOT NULL AND Accompanist_Name != '' ";
				com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, params, function(result){
					dcrDoctor.accompanistsDone = (result != null && result.length > 0 && result[0].count > 0);
				
					query = select + "tbl_Analytics_Doctor_Visit" + nondcrVisitCodeWhere;
					com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, params, function(result2){
						dcrDoctor.detailingDone = (result != null && result.length > 0 && result[0].count > 0);
						if(onSuccess) onSuccess(dcrDoctor);
					});
									
				});
			}
			
		}
	},
	getDcrStatusDetails: function(entityclass, query, select, params, dcrDoctor, dcrVisitCodeWhere, nondcrVisitCodeWhere, onSuccess) {
		query = select + "tbl_DCR_Product_Details" + dcrVisitCodeWhere;
		com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, null, function(result){
			dcrDoctor.inputDone = (result != null && result.length > 0 && result[0].count > 0);
			query = select + "tbl_Analytics_Doctor_Visit" + nondcrVisitCodeWhere;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, params, function(result1){
				dcrDoctor.detailingDone = (result1 != null && result1.length > 0 && result1[0].count > 0);
				query = select + "tbl_DCR_Chemist_Visit" + dcrVisitCodeWhere;
				com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, null, function(result2){
					dcrDoctor.chemistDone = (result2 != null && result2.length > 0 && result2[0].count > 0);
					query = select + "tbl_DCR_RCPA_Details" + dcrVisitCodeWhere;
					com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(entityclass, query, null, function(result3){
						dcrDoctor.rcpaDone = (result3 != null && result3.length > 0 && result3[0].count > 0);	
						if(onSuccess) onSuccess(dcrDoctor);		
					});
				});		
			});
		});
		
		
			
	},
	
    autoAccompanists : function(accompanistsAdded,accompanists,dcrActualDate, doctorCode, doctorRegionCode,onSuccess,onFailure) {
        //alert("doctorCode->"+doctorCode);
        if (doctorCode != null && doctorCode != ""){
            var autoAccompanists = [];
            com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.getByDcrDate(dcrActualDate, doctorCode, doctorRegionCode,function(autoAccompanists){
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
                onSuccess(accompanists);
            },null);
        }else{
            onSuccess(accompanists);
        }
        
    },
    tpAccompanists : function(accompanistsAdded,accompanists,tpId, doctorRegionCode,onSuccess,onFailure) {
        //alert("tpId"+tpId);
        if(tpId != null &&  tpId != ""){
            var tpAccompanists = [];
            com.swaas.hidoctor.edetailing.dao.TPAccompanistLocalDAO.getByTP(tpId, doctorRegionCode,function(tpAccompanists){
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
                onSuccess(accompanists);
            },null);
        }else{
            onSuccess(accompanists);
        }
    },
    tpProducts :function(inputProducts,tpDoctorId,onSuccess,onFailure){
        if (tpDoctorId != null && tpDoctorId != ""){
        //var tpProducts = [];
            com.swaas.hidoctor.edetailing.dao.TPProductLocalDAO.getByDoctor(tpDoctorId,function(tpProducts){
                if(tpProducts && tpProducts.length > 0){
                    $.each(tpProducts, function(index, tpProduct){
                        com.swaas.hidoctor.edetailing.dao.ProductLocalDAO.get(tpProduct.productCode,function(localProduct){
                            inputProducts.push(localProduct);
                            if(index==(tpProducts.length-1))
                                onSuccess(inputProducts);
                        },null);
                    });
                }else{
                    onSuccess(inputProducts);
                }
            },null);
        }else{
            onSuccess(inputProducts);
        }
    },
    autoProducts: function(products,dcrActualDate, doctorCode, doctorRegionCode,detailedProductsAdded,onSuccess,onFailure){
        //alert("autoProducts");
        if (doctorCode != null && doctorCode != ''){
            com.swaas.hidoctor.edetailing.dao.AnalyticsDetailedProductsLocalDAO.getByDcrDate(dcrActualDate, doctorCode, doctorRegionCode,function(autoProducts){
                $.each(autoProducts, function(index, product){
                    if (detailedProductsAdded[product.productCode] == null){
                        var autoProduct = {
                            salesProductCode: product.productCode,
                            modeOfEntry: "A"
                        };
                        products.push(autoProduct);
                    }
                });
                onSuccess(products);

            },null);

        }else{
            //alert("autoElse");
            onSuccess(null);
        }
    }
};