com.swaas.hidoctor.edetailing.ui.view.Resource = {
		favAssetCnt : 1,
		application: {
					title: 'Wide Angle',
					welcome: "Welcome to",
					loading : "Loading.....",
					version : "5",
					release : "0",
					upToDate : "Already you have a updated APK",//before used in upgrade app not used now
					appSuiteId : 1,
					appId : 1,
					platform : "android",
					upgradeDatabase : "Upgrading Database",
					updateTables : "Upgrading, Please wait..",
					tablesUpdated : "Database upgraded successfully",
					upgradeMessage : "You have a new version to upgrade. Please click the Version upgrade option to get the new version"
		},
		messages: {
			downloadAssetToPlay: 'Please download to preview this asset.',
			noInternetAutoSync: 'Please connect to internet to check User Sync',
			noInternetAutoAssetCheck: 'Please connect to internet to check asset updates',
			assetCheckError: function() {
				return 'Unable to connect to internet. Latest assets information may be partial ' +
				'or unavailable at the moment. System will try to update the info in ' + 
				(ED.configuration!=null?ED.configuration.assetCheckInterval:'few') +
				' hours. Alternatively, you can use ‘Prepare my tablet’ option to update your asset information';
			},
			errorLogFail: 'Error sending logs, please check your network connection',
			
			assetUpdateConfirm: 'It\'s been long time you synced your data. Do you wish to continue?'
		},
		dcr: {			
			visitTime: 'Visit Time',
			remarks : 'Customer Remarks',
			inputs : 'Inputs',
			chemists : 'Chemists',
			submit : 'Save Customer Visit', 
			detail : ' Detailed',
			doctorVisitTimeMandatory: "Visit Time is a Mandatory Field",
			productNotValid: "Please choose the valid Product",
			dcrSaved: "DCR Saved succesfully",
			upSyncDCRMessage: "You can do up sync only once for a day",
			upSyncDCR: "DCR Sync",
			upgradeApk:"Update Version",
			errorLog:"Error Message",
			noDCR:"You have not entered any DCR data. Please enter DCR data before uploading.",
			dcrHeadMessage : "Kindly save all the detailed customer visit information in DCR page for every customer"	
		},
		
		login: {
			userId: 'User ID',
			password: 'Password',
			url:  '@',
			userIdExample: '(Example: ajai822, kumar2329)',
			urlExample: '(Example: abcd.hidoctor.in)',
			signIn: "Sign In",
			reset: 'Reset',
			failed: 'Login failed, please try again!'
		},
		
		download: {
			header: "Download Digital Assets",
			headerNoProduct: "Download Digital Asset (Not Categorized by Product)",
			productList: "Product List",
			assetList: "Digital Assets for ",
			downloadList: "Download List" ,
			emptyList: "No Digital Asset is selected",
			addToList: "Add to download List",
			previewAsset: "Preview Asset",
			edFolder : "eDetailing",
			astFolder : "assets",
			damFolder: "eDetailing/assets",
	    	tempFolder : "eDetailing/temp",
			productCategoryFolder: "eDetailing/productCategory",
			alreadyDownloaded: " already downloaded",
    		assetadded:"Asset already added to ",
    		list: " list",
    		removeFromList:"Remove From List",
    		pleaseWait: "Please wait while Assets are downloading"
		},
		
		logo : {
				applicationLogoFolder : "eDetailing/logo",
		    	logoName : "logo.jpg"
		},
		
		documentType : {
			mp4 : "Product Video",
			flv : "Product Video",
			doc : "Product Document",
			pdf : "Product Document",
			xls : "Product Statistics",
			ppt : "Product Statistics",
		},		

		assetLocation : {
			online : "Online",
			offline : "Offline"
		},

		networkMessage : {
			video : "Video cannot be played as the internet connection is not available",
			document : "Document cannot be opened as the internet connection is not available",
			download: {
				video : "Video cannot be downloaded as the internet connection is not available",
				document : "Document cannot be downloaded as the internet connection is not available",
			}
		},
		
		tpDoctorsView: {
			doctorTableCaption: "Customers covered in this tour plan",
			doctorTableCaptionforNoDoctors : "No Customers found for this TourPlan",
			tpWeekCaption: "Tour Plan for the week",
			today: "Today",
			later: "Later"
	    },
		
		myDoctorsView: {
			header: 'My Customers',
			mine: "Me",
			doctorTableCaption: "Customers mapped to you",
			tpWeekCaption: "Tour Plan for the week"
	    },

		accompanistDoctorsView: {
			doctorTableCaption: "Customers mapped to ",
			tpWeekCaption: "Tour Plan for the week",
			noDoctors: "No Customers found for "
	    },
	    
	    calendar: {
	    	calendarMonthCaption: "DCR Month - ",
	    	tpWeekCaption: "Tour Plan for the week",
	    	calendarCaption: "Home"
	    },
	    
	    prepareMyTablet: {
	    	otherError : "There is an unknown error while Synchronizing",
	    	networkError : "There is an network error while Synchronizing", 
	    	errorMessageCaption : "Error Message",
	    	prapareMyTabletCaption: "Prepare my Tablet",
	    	multipleSelection     : "selected multiple times",
	    	masterDataProgressLabelPrefix: "System updates the master information",
	    	tpDataProgressLabelPrefix: "System updates your",
	    	userDataProgressLabelPrefix: "System updates your",
	    	doctorDataProgressLabelPrefix: "System updates your",
	    	documentDataProgressLabelPrefix: "System getting your",
	    		    	
	    	overAllProgressLabel: "Over all progress",
	    	pleaseWait: "please wait",
	    	masterDataDoneLabel: "System completed updating the master information",
	    	tpDataDoneLabel: "System completed updating your tour plan information",
	    	userDataDoneLabel: "System completed updating your information",
	    	doctorDataDoneLabel: "System completed updating your customers information",
	    	documentDataDoneLabel: "System completed getting your digital assets",
	    	
	    	masterDataNotStartedLabel: "System will update the master information",
	    	tpDataNotStartedLabel: "System will update your tour plan information",
	    	userDataNotStartedLabel: "System will update your information",
	    	doctorDataNotStartedLabel: "System will update your customers information",
	    	documentDataNotStartedLabel: "System will get your digital assets",
	    	
	    	entities: {
	    		UserDivision: "division information",
	    		Configuration: "configuration data",
	    		DCRMaster: "DCR calendar",
	    		DCRConfigSettings :"DCR Config Settings",
	    		DCRPrivilege : "DCR Privilige",
	    		DivisionEntityMapping : "Division Entity Mapping",
	    		ActivityMaster : "Activity Master",
	    		ExpenseEntityMaster : "Expense Entity Master",
	    		Accompanist: "accompanists",
	    		TPHeader: "tour plan information",
	    		TPDoctor: "tour plan information (customers)",
	    		TPProduct: "tour plan information (products)",
	    		TPSFC: "tour plan information (SFCs)",
	    		Brand: "(brands)",
	    		DoctorCategory: "(customer categories)",
	    		Speciality: "(specialities)",
	    		Customer: "customers & chemists information",
	    		McDoctors: "customers additional information",
	    		Product: "(products)",
	    		SaleProductMapping: "(product mapping - sales)",
	    		UserProductMapping: "(product mapping - yours)",
	    		DenormAssetQueryInputs: "customers additional information",
	    		story: "Story",
	    		storyAsset: "Story Asset",
	    		storyAnalytics: "Story Analytics",
	    		DigitalAsset: "Digital Asset",
	    		ZipAsset: "Zip Assets",
	    		DAAnalyticHistory: "Digital Asset metadata",
	    		DATagMaster: "Digital Asset metadata",
	    		ProductCategory: "(product category icons)",
	    		DoctorProductMapping : "(product mapping - customer)"
	    	},
	    	
	    	accompanistsDialog: {
	    		alert: "Alert",
	    		dear: "Dear",
	    		subjectHasAccompanist: "Following Accompanists are part of your Tour Plan",
	    		subjectNoAccompanist: "No Accompanists are part of your Tour Plan",
	    		confirmationMessage: "Do you wish to add any accompanist for the period?"
	    	},
	    	
	    	accompanistsSelection: {
	    		subject: "Your TP Accompanist List",
	    		selectAccompanistCaption: "Please select your accompaniest details for the week"
	    	},
	    	
	    	downloadEdocuments:{
	    		alertCaption: "Alert",
	    		dear: "Dear",
	    		message: "Your tablet is ready now... If you are going to use the tablet without internet, please click on download digital assets to download the assets to your local storage",
	    		okButtonLabel: "Download Digital Assets",
	    		cancelButtonLabel: "Cancel",
	    		retiredLabel: "The following assets have been removed from the system because they have been either retired or has a newer version",
	    		retiredList: "List of assets that were removed:"
	    	},
	    	
	    	confirmation: {
	    		subject: "Alert",
	    		dear: "Dear",
	    		messageWithUpSync: "There are some data found that you have not uploaded yet, and the system will upload those data before prepare your tablet. Please confirm to proceed",
	    		yes: "Yes",
	    		no: "No",
	    		message: "Please confirm to proceed."
	    	}
	    },
	    
	    error: {
	    	networkUnavailable : {
	    		caption: "Error",
	    		message: "You must be connected to the network to proceed further.",
	    		cannotPerformOperation: "You must be connected to internet to continue this operation."
	    	},
	    	submitErrorCapton: "Sending logs"
	    },
	    
	    tpDeails : {
	    	doctorCovered : "Customers Covered : ",
	    	covered : " ",
	    	noTPAvailabe : "No TP Available"
	    },
	    
		eDetailing: {
			eDetailing: "E-Detailing",
			buttonCaption: "Wide Angle", 
			doctor360Btn: "Customer 360",
			tagDoctorBtn: "Tag Customer",
			productList: "Product List",
			noProducts: "No products",
			assetList: "List of digital assets available for ",
			emptyList: "No Digital Asset available for ",
			downloadable: "Downloadable",
			online: "Online",
			spotlightYes: "Spotlight Assets",
			spotlightNo: "No Spotlight Assets Available",
			likeQuestion: "Do you like this Asset?",
			rateQuestion: "Please rate this Asset",
			updateBtnCaption: "Enter DCR",
			noAssets: "No Digital Asset found for Dr. ",
			likeDislikeThankyou: "Thanks for like/dislike",
			ratingThankyou: "Thanks for rating",
			shareYourComments: "Share your comments",
			moreButtonCaption: "More ..."
		},		
	    makeDiskspace : {
	    	header : "Make space",
	    	selectedAssets : "List of Digital assets to be removed",
	    	emptyList: "No Digital Assets found "	,
	    	assetCaption : "List of Digital Assets For",
			addToList: "Add to delete List",
	    	assetFolder : "eDetailing/assets",
	    	alreadyDeleted: "This asset is already deleted"
	    },
	    
	    documentType : {
	    	"VIDEO" : "Product Video",
	    	"DOCUMENT": "Product Document",
	    	"IMAGE": "Product Image",
	    	"EXCEL": "Product Statistics",
	    	"UNKNOWN": "Product Docutment"
	    },
	    
	    eraseAndClean: {
	    	eraseAndCleanCaption: "Format Device",
	    	masterDataProgressLabelPrefix: "System deleting the master information",
	    	tpDataProgressLabelPrefix: "System deleting your",
	    	userDataProgressLabelPrefix: "System deleting your",
	    	doctorDataProgressLabelPrefix: "System deleting your",
	    	documentDataProgressLabelPrefix: "",
	    	dcrAnalyticalDataProgressLabelPrefix: "System deleting your",
	    	
	    	overAllProgressLabel: "Over all progress",
	    	pleaseWait: "please wait",
	    	masterDataDoneLabel: "System completed deleting the master information",
	    	tpDataDoneLabel: "System completed deleting your tour plan information",
	    	userDataDoneLabel: "System completed deleting your information",
	    	doctorDataDoneLabel: "System completed deleting your customers information",
	    	documentDataDoneLabel: "System completed deleting your Digital Asset",
	    	dcrAnalyticalDataDoneLabel: "System completed deleting your dcr and analytical data",
	    	
	    	masterDataNotStartedLabel: "System will delete the master information",
	    	tpDataNotStartedLabel: "System will delete your tour plan information",
	    	userDataNotStartedLabel: "System will delete your information",
	    	doctorDataNotStartedLabel: "System will delete your customers information",
	    	documentDataNotStartedLabel: "System will erase your Digital Asset",
	    	dcrAnalyticalDataNotStartedLabel: "System will erase your dcr and analytical data",
	    	
	    	entities: {
	    		User: "information",
	    		UserDivision: "division information",
	    		Configuration: "configuration data",
	    		DCRMaster: "DCR calendar",
	    		Accompanist: "accompanists",
	    		TPHeader: "tour plan information",
	    		TPDoctor: "tour plan information (customers)",
	    		TPProduct: "tour plan information (products)",
	    		TPSFC: "tour plan information (SFCs)",
	    		Brand: "(brands)",
	    		DoctorCategory: "(customer categories)",
	    		Speciality: "(specialities)",
	    		Customer: "customers & chemists information",
	    		McDoctors: "customers additional information",
	    		Product: "(products)",
	    		SaleProductMapping: "(product mapping - sales)",
	    		DoctorProductMapping : "(product mapping - customer)",
	    		UserProductMapping: "(product mapping - yours)",
	    		DenormAssetQueryInputs: "customers additional information",
	    		DigitalAsset: "System erasing your Digital Asset",
	    		DAAnalyticHistory: "System deleting your Digital Asset metadata",
	    		DATagMaster: "System deleting your Digital Asset metadata",
	    		ProductCategory: "(product category icons)",
	    		Synchronize: "information",
	    		DoctorVisit: "DCR",
	    		DATagAnalytic: "Analytical data",
	    		DigitalAssetBilling: "Analytical data",
	    		DCRHeader : "DCR Header",
	    		
	    		story: "Story",
	    		storyAsset: "Story Asset",
	    		storyAnalytics: "Story Analytics",
	    		
	    		DCRDoctorAccompanist : "DCR Customer Accompanist",
	    		DCRDetailedProducts :"DCR Detailed Products",
	    		DCRProductDetails :"DCR Product Details",
	    		ChemistVisit :"Chemist Vist",
	    		RcpaDetails : "Rcpa Details",
	    		TimeSheetEntry : "Time Sheet Entry",
	    		CheckSum : "Check Sum",
	    		DoctorTagMaster : "customers additional information"
	    	},

	    	confirmationBox: {
	    		message : "This action will erase all the digital assets that you have downloaded and stored in your memory card. If you need the digital assets you should download them again. Do you want to continue?", //As per CR Jul 10.
	    		messageUpSynchOnline : "You have some important data not uploaded to central data center, Do you want to Upload those data before you do Format Device ?",
	    		messageUpSynchOffline : "You have some important data not uploaded to central data center and your  not in online also.So you are not able to upload those data. Please connect to the internet and upload the data before Format Device",
	    		dear:"Dear",
	    	    subject: "Alert",
	    	    eraseClean: "Erase & Clean",
	    	    yesButtonMessage : "Yes",
	    	    cancelButtonMessage : "Cancel",
	    	    noButtonMessage : "No",
	    	    continueWithoutUpSynch :"Continue without uploading",
	    	    
	    	}
	    },
	    
	    sendDataToHiDoctor: {
	    	sendDataToHiDoctorCaption: "Usage Sync",
	    	mainDataProgressLabelPrefix: "System sending",
	    	dcrDataProgressLabelPrefix: "System sending",
	    	
	    	overAllProgressLabel: "Over all progress",
	    	pleaseWait: "please wait",
	        //mainDataDoneLabel: "System sent Analyical, Billing and logs data to HiDoctor",	    	
	    	mainDataDoneLabel: "System sent Analyical, Billing and logs data to WideAngle",
	    	//mainDataNotStartedLabel: "System will send Analytical, Billing and logs data to HiDoctor",
	    	mainDataNotStartedLabel: "System will send Analytical, Billing and logs data to WideAngle",

	        //dcrDataDoneLabel: "System sent DCR data to HiDoctor",	    	
	    	dcrDataDoneLabel: "System sent DCR data to WideAngle",
	        //dcrDataNotStartedLabel: "System will send DCR data to HiDoctor",
	    	dcrDataNotStartedLabel: "System will send DCR data to WideAngle",
	    	networkErrorMessage : "An unexpected error occurred, please ensure you are connected to the internet. You will be now be redirected to the home page. Please retry after some time",
	    	invalidUserErrorMessage : "Authentication failed. You will be now be redirected to the login page. Please provide your credentials",
	    	
	    	entities: {
	    		DoctorVisit: "DCR Data",
	    		DATagAnalytic: "Analytical Data",
	    		DigitalAssetBilling: "Access Data",
	    		DoctorTag : "Customer Analytical Data",
	    		ErrorLogs: "Log Data",
	    		AnalyticsDoctorVisit: "DCR Analyical Data",
	    		AnalyticsDetailedProducts: "DCR Analyical Data",
	    		SiteAnalytics : "Site Analytics Data",
	    		SiteAssetMaster : "Site Asset Master Data",
	    		CheckSum: "DCR Verification",
	    		DCRHeader: "DCR Header",
	    		
	    		story: "Story",
	    		storyAsset: "Story Asset",
	    		storyAnalytics: "Story Analytics",
	    		
	    		DoctorVisit: "Customer Visits",
	    		DCRDoctorAccompanist: "Customer Accompanists",
	    		DCRDetailedProducts: "Detailed Product",
	    		DCRProductDetails: "DCR Products",
	    		ChemistVisit: "Chemist Visits",
	    		RcpaDetails: "RCPA Details",
	    		CheckSumVerify: "DCR Verification",
	    		TimeSheetEntry: "Timesheet"
	    	}	    	
	  }	    
};

       