com.swaas.hidoctor.edetailing.service.DCRService = {
	
		
	getChemists: function(regionCodes){
		var chemists = [
		                {
		                	customerCode: "CH001",
		                	regionCode: "R001",
		                	customerName: "Chemist 1"
		                },
		                {
		                	customerCode: "CH002",
		                	regionCode: "R001",
		                	customerName: "Chemist 2"
		                },
		                {
		                	customerCode: "CH003",
		                	regionCode: "R001",
		                	customerName: "Chemist 3"
		                },
		                {
		                	customerCode: "CH004",
		                	regionCode: "R001",
		                	customerName: "Chemist 4"
		                },
		                {
		                	customerCode: "CH005",
		                	regionCode: "R001",
		                	customerName: "Chemist 5"
		                },
		                {
		                	customerCode: "CH006",
		                	regionCode: "R001",
		                	customerName: "Chemist 6"
		                },
		                {
		                	customerCode: "CH007",
		                	regionCode: "R001",
		                	customerName: "Chemist 7"
		                },
		                {
		                	customerCode: "CH008",
		                	regionCode: "R001",
		                	customerName: "Chemist 8"
		                },
		                {
		                	customerCode: "CH009",
		                	regionCode: "R001",
		                	customerName: "Chemist 9"
		                },
		                {
		                	customerCode: "CH0010",
		                	regionCode: "R001",
		                	customerName: "Chemist 10"
		                }
		                ];
		return chemists;
	},
	

	getAllSpecialities: function(){
		var specialities = [ {
			specialityName : "Eye Surgery",
			specialityCode : 'specod1'
		}, {
			specialityName : "Medicine",
			specialityCode : 'specod2'
		},{
			specialityName : "Medicine 1",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 2",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 3",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 4",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 5",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 6",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 8",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 8",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 9",
			specialityCode : 'specod3'
		},{
			specialityName : "Medicine 10",
			specialityCode : 'specod3'
		}, {
			specialityName : "GP",
			specialityCode : 'specod4'
		} ];
		
		return specialities;
		
	},

	getDCRHeader: function(date, flag){
		var dcrHeader = {
				dcrCode: "dcr1",
				dcrEnteredDate : date,
				dcrActualDate: date
		};
		
		return dcrHeader;
	},

	getConfigSettings : function() {
		var configDCR = {
				"dcrDocVisitTimeEntryMode" : "MANUAL",
				//"dcrDocVisitTimeEntryMode" : "SERVER_TIME",
				"dcrEntryTimeGap" : "5",
				"leaveEntryMode" : "HALF_A_DAY",
				"geoLocationSupport" : "TRUE",
				"dateDisplayFormat" : "dd/mm/yyyy",
				"restrictedSpecialCharacters":",/"
			};
		
		return configDCR;
	},
	
	getDCRPrivilage: function() {
		var privilage = {
				"rigidDoctorEntry" : "YES",
				"sfcValidation" : "HQ,EX HQ,Out Station,HQ Admin,Out Station NW",
				"dcrProductBringType" : "Sample,Gift,Input",
				//"dcrDoctorVisitMode" :  "AM_PM",
				"dcrDoctorVisitMode" :  "VISIT_TIME",
				"dcrInputMandatoryNumber" : "1",
				"dcrChemistMandatoryNumber" : "1",
				"rcpaMandatoryDoctorCategory" : "C,SC",
				"dcrDoctorPobAmount":"YES",
				"showAccompanistData": "YES"
			};
		return privilage;
	},
	
	getDcrDoctors : function(dcrCode, date, flag) {
		var dcrDoctors = [ {
			doctorVisitCode: "dvc1",
			doctorCode : "cus1",
			doctorName : "Vijay",
			regionCode : "",
			mdl : "",
			categoryCode : "",
			specialityCode : "",
			customerEntityType : "",
			categoryName : "",
			specialityName : "",
			accompanistsDone: true,
			inputDone: true,
			detailingDone: true,
			chemistDone: true,
			rcpaDone: true,
			doctorVisitTime: '09:30 AM',
			visitMode: 'AM',
			modeOfEntry: "M",
			poAmount: 100
		}, {
			doctorVisitCode: "dvc2",
			doctorCode : null,
			doctorName : "Sunil",
			regionCode : "REG 2",
			mdl : 515,
			categoryCode : "CAT01",
			specialityCode : "SPE01",
			customerEntityType : "",
			categoryName : "Core",
			specialityName : "Heart Surgery",
			accompanistsDone: false,
			inputDone: true,
			detailingDone: true,
			chemistDone: true,
			rcpaDone: true,
			doctorVisitTime: '10:35 AM',
			modeOfEntry: "M",
			visitMode: 'AM',
			poAmount: 200
		}, {
			doctorVisitCode: "dvc3",
			doctorCode : "cus3",
			doctorName : "Jeet",
			regionCode : "REG 2",
			mdl : 545,
			categoryCode : "CAT01",
			specialityCode : "SPE01",
			customerEntityType : "",
			categoryName : "Core",
			specialityName : "Eye Surgery",
			accompanistsDone: true,
			inputDone: false,
			detailingDone: true,
			chemistDone: true,
			modeOfEntry: "M",
			rcpaDone: false,
			doctorVisitTime: '01:50',
			visitMode: 'PM',
			poAmount: 300
		}, {
			doctorVisitCode: "dvc4",
			doctorCode : "cus4",
			doctorName : "Krishnan",
			regionCode : "REG 1",
			mdl : 555,
			categoryCode : "CAT01",
			specialityCode : "SPE01",
			customerEntityType : "",
			categoryName : "Core",
			specialityName : "Eye Surgery",
			accompanistsDone: true,
			inputDone: true,
			detailingDone: true,
			chemistDone: false,
			rcpaDone: true,
			doctorVisitTime: '02:50 AM',
			visitMode: 'PM',
			poAmount: 400
		} ];
		
		return dcrDoctors;
	},
	
	getDcrAccompanists : function(doctorVisitCode, dcrActualDate) {

		var accompanists = [ {
			accUserName : "Accompanist 1  dkjfdk skjdfk kjdfk",
			accRegionCode : "REG 1",
			accUserCode : "USR001",
			isOnlyForDoctor: "Y",
			modeOfEntry: "A"
		}, {
			accUserName : "Accompanist 2  dkjfdk skjdfk kjdfk",
			accRegionCode : "REG 1",
			accUserCode : "USR002",
			isOnlyForDoctor: "N",
			modeOfEntry: "M"
		}, {
			accUserName : "Accompanist 3  dkjfdk skjdfk kjdfk",
			accRegionCode : "REG 2",
			accUserCode : "USR002",
			isOnlyForDoctor: "N",
			modeOfEntry: "A"
		}, {
			accUserName : "Accompanist 4",
			accRegionCode : "REG 2",
			accUserCode : "USR001",
			isOnlyForDoctor: "N",
			modeOfEntry: "A"
		} ];
		return accompanists;
		

	},

	getDcrWideAngle : function(doctorCode,regionCode,selectedDate) {
		
		var analytics = com.swaas.hidoctor.edetailing.dao.AnalyticsDoctorVisitLocalDAO.get(selectedDate);
		var isWA = false;
		if(analytics != null){
		$.each(analytics,function(index,analytic){
			if(analytic.doctorCode == doctorCode && analytic.doctorRegionCode == regionCode){
				isWA = true;
			}
		});
		return isWA;
		}
	},

	getDcrRcpa : function(chemistVisitCode) {

		var rcpaDetails = [ {
			salesProductName : "Product1",
			salesProductCode : "prd0001",
			supportQty : 5,
			competitorProducts : [ {
				competitorProductName : "Comp Product 1",
				competitorProductCode : "prd0011",
				supportQty : 2
			}, {
				competitorProductName : "Comp Product 2",
				competitorProductCode : "prd0012",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 3",
				competitorProductCode : "prd0013",
				supportQty : 3
			}, {
				competitorProductName : "Comp Product 4",
				competitorProductCode : "prd0014",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 5",
				competitorProductCode : "prd0015",
				supportQty : 4
			} ]
		}, {
			salesProductName : "Product 2",
			salesProductCode : "prd0021",
			supportQty : 5,
			competitorProducts : [ {
				competitorProductName : "Comp Product 1",
				competitorProductCode : "prd0016",
				supportQty : 2
			}, {
				competitorProductName : "Comp Product 2",
				competitorProductCode : "prd0017",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 3",
				competitorProductCode : "prd00771",
				supportQty : 3
			}, {
				competitorProductName : "Comp Product 4",
				competitorProductCode : "prd0401",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 5",
				competitorProductCode : "prd001",
				supportQty : 4
			} ]
		}, {
			salesProductName : "Product 3",
			salesProductCode : "prd0031",
			supportQty : 5,
			competitorProducts : [ {
				competitorProductName : "Comp Product 1",
				competitorProductCode : "prd04401",
				supportQty : 2
			}, {
				competitorProductName : "Comp Product 2",
				competitorProductCode : "prd01201",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 3",
				competitorProductCode : "prd12001",
				supportQty : 3
			}, {
				competitorProductName : "Comp Product 4",
				competitorProductCode : "prd05501",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 5",
				competitorProductCode : "prd00341",
				supportQty : 4
			} ]
		}, {
			salesProductName : "Product 4",
			salesProductCode : "prd0041",
			supportQty : 5,
			competitorProducts : [ {
				competitorProductName : "Comp Product 1",
				competitorProductCode : "prd005561",
				supportQty : 2
			}, {
				competitorProductName : "Comp Product 2",
				competitorProductCode : "prd00091",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 3",
				competitorProductCode : "prd004561",
				supportQty : 3
			}, {
				competitorProductName : "Comp Product 4",
				competitorProductCode : "prd003451",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 5",
				competitorProductCode : "prd00134",
				supportQty : 4
			} ]
		}, {
			salesProductName : "Product 5",
			salesProductCode : "prd0051",
			supportQty : 5,
			competitorProducts : [ {
				competitorProductName : "Comp Product 1",
				competitorProductCode : "prd001344",
				supportQty : 2
			}, {
				competitorProductName : "Comp Product 2",
				competitorProductCode : "prd005441",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 3",
				competitorProductCode : "prd00221",
				supportQty : 3
			}, {
				competitorProductName : "Comp Product 4",
				competitorProductCode : "prd00111",
				supportQty : 5
			}, {
				competitorProductName : "Comp Product 5",
				competitorProductCode : "prd02401",
				supportQty : 4
			} ]
		} ];
		
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

		var competitorProducts = [
		                     {
		                    	 productCode: "Comp1",
		                    	 productName: "Comp Product 1"
		                     },
		                     {
		                    	 productCode: "Comp2",
		                    	 productName: "Comp Product 2"
		                     },
		                     {
		                    	 productCode: "Comp3",
		                    	 productName: "Comp Product 3"
		                     }
		                     ];
		return competitorProducts;
	},

	
	getAllAccompanist : function() {
		var accompanists = [
		                    {userName: "Saravanan", regionCode: "REG1", userCode: "UC01"},
		                    {userName: "Sunil", regionCode: "REG1", userCode: "UC02"},
		                    ];
		return accompanists;
	},

	
	getInputProducts : function(doctorVisitCode) {
		var inputProducts = [
		                     {
		                    	 productCode: "Prod1",
		                    	 productName: "Product 1 dkjfdk skjdfk kjdfk",
		                    	 qtyGiven : 10,
		                    	 isDetailed: 1
		                     },
		                     {
		                    	 productCode: "Prod2",
		                    	 productName: "Product 2 dkjfdk skjdfk kjdfk",
		                    	 qtyGiven : 1,
		                    	 isDetailed: 0
		                     },
		                     {
		                    	 productCode: "Prod3",
		                    	 productName: "Product 3 dkjfdk skjdfk kjdfk",
		                    	 qtyGiven : 5,
		                    	 isDetailed: 1
		                     }
		                     ];
		
		return inputProducts;
	},

	
	getInputProductsAutocomplete : function(bringType) {
		var userProducts = [
		                     {
		                    	 productCode: "Prod1",
		                    	 productName: "Product 1"
		                     },
		                     {
		                    	 productCode: "Prod2",
		                    	 productName: "Product 2"
		                     },
		                     {
		                    	 productCode: "Prod3",
		                    	 productName: "Product 3"
		                     }
		                     ];
		return userProducts;
	},
	
	
	getDetailedProducts: function(doctorVisitCode, dcrActualDate){
		var detailedProducts = [
		                        {
		                        	salesProductCode: "SP01",
		                        	salesProductName: "Sale Product 1",
		                        	modeOfEntry: "A"
		                        },
		                        {
		                        	salesProductCode: "SP02",
		                        	salesProductName: "Sale Product 2",
		                        	modeOfEntry: "A"
		                        },
		                        {
		                        	salesProductCode: "SP03",
		                        	salesProductName: "Sale Product 3",
		                        	modeOfEntry: "M"
		                        },
		                        ];
		return detailedProducts;
	},

	getChemistVisits: function(doctorVisitCode){
		
		var chemists = [
		                {
		                	chemistVisitCode: 'cv01',
		                	chemistCode: "C001",
		                	chemistName: "Chemist 1",
		                	poAmount: 100,
		                	isAccChemist: '1'
		                },
		                {
		                	chemistVisitCode: 'cv02',
		                	chemistCode: "C002",
		                	chemistName: "Chemist 2",
		                	poAmount: 200,
		                	isAccChemist: '1'
		                },
		                {
		                	chemistVisitCode: 'cv03',
		                	chemistCode: "C003",
		                	chemistName: "Chemist 3",
		                	poAmount: 300,
		                	isAccChemist: '1'
		                },
		                {
		                	chemistVisitCode: 'cv04',
		                	chemistCode: "C004",
		                	chemistName: "Chemist 4",
		                	poAmount: 300,
		                	isAccChemist: '1'
		                },
		                {
		                	chemistVisitCode: 'cv05',
		                	chemistCode: "C005",
		                	chemistName: "Chemist 5",
		                	poAmount: 300,
		                	isAccChemist: '1'
		                },
		                
		                ];
		return chemists;
	},
	
	saveDCR : function(dcrDetails) {
		var visitPK = this._saveDoctorVisitHeader(dcrDetails);
		this._saveDoctorVisitProduct(dcrDetails, visitPK);
		this._saveDoctorVisitChemist(dcrDetails, visitPK);
	},

	_saveDoctorVisitHeader : function(dcrDetails) {

		var pk = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();

		var doctorVisitIn = {
			companyCode : dcrDetails.companyCode,
			userCode : dcrDetails.userCode,
			dcrActualDate : dcrDetails.dcrActualDate,
			doctorVisitCode : pk,
			dcrEnteredDate : dcrDetails.dcrEnteredDate,
			doctorCode : dcrDetails.doctorCode,
			doctorRegionCode : dcrDetails.doctorRegionCode,
			doctorVisitTime : dcrDetails.doctorVisitTime,
			isAccompanistDoctor : dcrDetails.isAccompanistDoctor,
			remarks : dcrDetails.remarks,
			latitude : dcrDetails.latitude,
			longitude : dcrDetails.longitude
		};

		com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO
				.insert(doctorVisitIn);
		return pk;

	},
	_saveDoctorVisitProduct : function(dcrDetails, visitPK) {

		if (dcrDetails.products != null) {
			$.each(dcrDetails.products, function(i, product) {
				var pk = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();

				var productCode = null;
				if (product.product['productCode'] != null) {
					productCode = product.product['productCode'];
				}

				if (productCode != null) {
					var detailIn = {
						companyCode : dcrDetails.companyCode,
						dcrProductDetailCode : pk,
						doctorVisitCode : visitPK,
						productCode : productCode,
						qtyGiven : product.qty,
						isDetailed : product.detailed
					};
					com.swaas.hidoctor.edetailing.dao.DCRProductDetailsLocalDAO
							.insert(detailIn);
				}

			});

		}
	},

	_saveDoctorVisitChemist : function(dcrDetails, visitPK) {

		if (dcrDetails.chemists != null) {
			$.each(dcrDetails.chemists, function(i, chemist) {
				var pk = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();

				var chemistCode = null;
				var chemistName = null;
				if (chemist.chemist['customerCode'] != null) {
					chemistCode = chemist.chemist['customerCode'];
					chemistName = chemist.chemist['customerName'];
				} else {
					chemistName = chemist.chemist;
				}

				var chemistVisitIn = {
					companyCode : dcrDetails.companyCode,
					dcrChemistVisit : pk,
					doctorVisitCode : visitPK,
					chemistCode : chemistCode,
					chemistName : chemistName,
					pob : chemist.qty
				};
				com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO
						.insert(chemistVisitIn);
				com.swaas.hidoctor.edetailing.service.DCRService
						._saveDoctorChemistSales(chemist.products, visitPK, pk,
								dcrDetails);
			});
		}
	},

	_saveDoctorChemistSales : function(saleProducts, visitPK, chemistPK,
			dcrDetails) {

		if (saleProducts != null) {
			$
					.each(
							saleProducts,
							function(i, saleProduct) {
								var productCode = null;

								if (saleProduct.product['productCode'] != null) {
									productCode = saleProduct.product['productCode'];
								}
								if (productCode != null) {
									var rcpaIn = {
										companyCode : dcrDetails.companyCode,
										dcrChemistVisit : chemistPK,
										doctorVisitCode : visitPK,
										rcpaDetailCode : com.swaas.hidoctor.edetailing.util.UUIDUtil
												.getUID(),
										saleProductCode : productCode,
										supportQty : saleProduct.qty,
										competitorProductName : null,
										competitorProductCode : null
									};
									com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO
											.insert(rcpaIn);
									if (saleProduct.compitetors != null) {
										$
												.each(
														saleProduct.compitetors,
														function(i, compitetor) {

															var compitetorCode = null;
															var compitetorName = null;

															if (compitetor.compitetor['productCode'] != null) {
																compitetorCode = compitetor.compitetor['productCode'];
															} else {
																compitetorName = compitetor.compitetor;
															}

															var rcpaIn = {
																companyCode : dcrDetails.companyCode,
																dcrChemistVisit : chemistPK,
																doctorVisitCode : visitPK,
																rcpaDetailCode : com.swaas.hidoctor.edetailing.util.UUIDUtil
																		.getUID(),
																saleProductCode : productCode,
																supportQty : compitetor.qty,
																competitorProductName : compitetorName,
																competitorProductCode : compitetorCode,
															};
															com.swaas.hidoctor.edetailing.dao.RcpaDetailsLocalDAO
																	.insert(rcpaIn);
														});
									}
								}
							});
		}
	}
};