com.swaas.hidoctor.edetailing.ui.view._EraseAndClean = {
		 progressBarMASTER: null,
		 progressBarUSER: null,
		 progressBarTP: null,
		 progressBarDOCTOR: null,
		 progressBarDOCUMENT: null,
		 progressBarDCR_ANALYTICAL: null,
		 progressBarALL: null,
		 accompanists: null,
		 init: function(){
			var _this = com.swaas.hidoctor.edetailing.ui.view.EraseAndClean;
			//ED.includeHeader($("#header"), true);
			ED.includeNewHeader($("#header"), com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.eraseAndCleanCaption, true, true, true, true, true, true);
			/*ED.handleBackButton();			
			ED.setValue($("#eraseAndCleanCaption"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.eraseAndCleanCaption);*/
			_this.progressBarMASTER = TolitoProgressBar('progressbarMASTER').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarUSER = TolitoProgressBar('progressbarUSER').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarTP = TolitoProgressBar('progressbarTP').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarDOCTOR = TolitoProgressBar('progressbarDOCTOR').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarDOCUMENT = TolitoProgressBar('progressbarDOCUMENT').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarDCR_ANALYTICAL = TolitoProgressBar('progressbarDCR_ANALYTICAL').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarALL = TolitoProgressBar('progressbarALL').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();

			_this.resetProgress();
			_this.eraseAndCleanData();
			
			$("#progressDiv").width($("#pageDiv").width()-40);
		 },
		 
		 eraseAndCleanData: function(){
			 // var value = ED.context.dummay.value;
			 var _this = com.swaas.hidoctor.edetailing.ui.view.EraseAndClean;
			 com.swaas.hidoctor.edetailing.service.EraseAndCleanService.eraseAndCleanData(_this.setProgress, _this.onEraseAndCleanComplete, _this.onEraseAndCleanBatchComplete);
			 com.swaas.hidoctor.edetailing.service.EraseAndCleanService.removeTempFolder();
		 },
		 
		 onEraseAndCleanComplete: function(status){
			 
			 $("#buttonDiv").show();

		 },
		 
		 onEraseAndCleanBatchComplete: function(batchId, context){
			 com.swaas.hidoctor.edetailing.service.EraseAndCleanService.resumeEraseAndClean();
		 },
		 
		 resetProgress: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.EraseAndClean;
			 _this.progressBarMASTER.setValue(10);
			 _this.progressBarUSER.setValue(0);
			 _this.progressBarTP.setValue(0);
			 _this.progressBarDOCUMENT.setValue(0);
			 _this.progressBarDCR_ANALYTICAL.setValue(0);
			 _this.progressBarALL.setValue(0);
			 ED.setValue($("#progressStatusALL"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.overAllProgressLabel);
			 ED.setValue($("#progressStatusMASTER"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.masterDataNotStartedLabel);
			 ED.setValue($("#progressStatusUSER"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.userDataNotStartedLabel);
			 ED.setValue($("#progressStatusTP"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.tpDataNotStartedLabel);
			 ED.setValue($("#progressStatusDOCTOR"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.doctorDataNotStartedLabel);
			 ED.setValue($("#progressStatusDOCUMENT"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.documentDataNotStartedLabel);
			 ED.setValue($("#progressStatusDCR_ANALYTICAL"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.documentDataNotStartedLabel);
			 $("#progressDiv").show();
			 $("#buttonDiv").hide();
			 $("#progressDivUSER").hide();
			 $("#progressDivTP").hide();
			 $("#progressDivMASTER").hide();
			 $("#progressDivDOCTOR").hide();
			 $("#progressDivDOCUMENT").show();
			 $("#progressDivDCR_ANALYTICAL").hide();

		 },
		 
		 setProgress: function(status){
			var _this = com.swaas.hidoctor.edetailing.ui.view.EraseAndClean;
			var resource = com.swaas.hidoctor.edetailing.ui.view.Resource;
			if (status.batchId == "MASTER"){
				_this.progressBarMASTER.setValue(status.value);
				$("#progressDivMASTER").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusMASTER"), 
							resource.eraseAndClean.masterDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusMASTER"), 
							resource.eraseAndClean.masterDataProgressLabelPrefix + " " + 
							resource.eraseAndClean.entities[status.label] + " " +
							resource.eraseAndClean.pleaseWait);
				}
				
			} else if (status.batchId == "USER"){
				_this.progressBarUSER.setValue(status.value);
				$("#progressDivUSER").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusUSER"), 
							resource.eraseAndClean.userDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusUSER"),
							resource.eraseAndClean.userDataProgressLabelPrefix + " " + 
							resource.eraseAndClean.entities[status.label] + " " +
							resource.eraseAndClean.pleaseWait);
				}
			} else if (status.batchId == "DOCTOR"){
				_this.progressBarDOCTOR.setValue(status.value);
				$("#progressDivDOCTOR").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusDOCTOR"), 
							resource.eraseAndClean.doctorDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusDOCTOR"),
							resource.eraseAndClean.doctorDataProgressLabelPrefix + " " + 
							resource.eraseAndClean.entities[status.label] + " " +
							resource.eraseAndClean.pleaseWait);
				}
				
			} else if (status.batchId == "TP"){
				_this.progressBarTP.setValue(status.value);
				$("#progressDivTP").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusTP"), 
							resource.eraseAndClean.tpDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusTP"),
							resource.eraseAndClean.tpDataProgressLabelPrefix + " " + 
							 resource.eraseAndClean.entities[status.label] + " " +
							resource.eraseAndClean.pleaseWait);
				}
			} else if (status.batchId == "DCR_ANALYTICAL"){
				_this.progressBarDCR_ANALYTICAL.setValue(status.value);
				$("#progressDivDCR_ANALYTICAL").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusDCR_ANALYTICAL"), 
							resource.eraseAndClean.dcrAnalyticalDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusDCR_ANALYTICAL"),
							resource.eraseAndClean.dcrAnalyticalDataProgressLabelPrefix + " " + 
							 resource.eraseAndClean.entities[status.label] + " " +
							resource.eraseAndClean.pleaseWait);
				}
			} else {
				_this.progressBarDOCUMENT.setValue(status.value);
				$("#progressDivDOCUMENT").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusDOCUMENT"), 
							resource.eraseAndClean.documentDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusDOCUMENT"),
							resource.eraseAndClean.documentDataProgressLabelPrefix + " " + 
							 resource.eraseAndClean.entities[status.label] + " " +
							resource.eraseAndClean.pleaseWait);
				}
			}
			_this.progressBarALL.setValue(status.grandValue);	
		 }
		 
};

com.swaas.hidoctor.edetailing.ui.view.EraseAndClean = createProxy(com.swaas.hidoctor.edetailing.ui.view._EraseAndClean, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);

