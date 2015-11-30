com.swaas.hidoctor.edetailing.ui.view._SendDataToHiDoctor = {
		 progressBarMAIN: null,
		 progressBarALL: null,
		 context: null,
		 init: function(){
			var _this = com.swaas.hidoctor.edetailing.ui.view.SendDataToHiDoctor;
			//ED.includeHeader($("#header"), true);
			if(ED.context.request.dcrSync == false || ED.context.request.dcrSync == 'false')
				ED.includeNewHeader($("#header"), com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.sendDataToHiDoctorCaption, true, true, true, true, true, true);
			else
				ED.includeNewHeader($("#header"), com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.upSyncDCR, true, true, true, true, true, true);
			/*ED.setValue($("#sendDataToHiDoctorCaption"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.sendDataToHiDoctorCaption);*/
			_this.progressBarMAIN = TolitoProgressBar('progressbarMAIN').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarDCR = TolitoProgressBar('progressbarDCR').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarALL = TolitoProgressBar('progressbarALL').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();

			_this.resetProgress();
			_this.syncData();
			
			$("#progressDiv").width($("#pageDiv").width()-40);
			
		 },
		 
		 syncData: function(){
			 //var value = ED.context.dummay.value;
			 var _this = com.swaas.hidoctor.edetailing.ui.view.SendDataToHiDoctor;
			 var error = com.swaas.hidoctor.edetailing.service.UpSynchronizeService.syncData(_this.setProgress, _this.onSyncComplete, _this.onSynchBatchComplete, ED.context.request);
				if(error != null){
					ED.redirect("view/calendar/calendar.html", {noBack : true});
				}
		 },
		 
		 onSyncComplete: function(status){
			 $("#buttonDiv").show();

		 },
		 
		 onSynchBatchComplete: function(batchId, context){
			 com.swaas.hidoctor.edetailing.service.UpSynchronizeService.resumeSync();
		 },
		 
		 resetProgress: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.SendDataToHiDoctor;
			 _this.progressBarMAIN.setValue(0);
			 _this.progressBarDCR.setValue(0);
			 _this.progressBarALL.setValue(0);
			 ED.setValue($("#progressStatusALL"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.overAllProgressLabel);
			 ED.setValue($("#progressStatusMAIN"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.mainDataNotStartedLabel);
			 ED.setValue($("#progressStatusDCR"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.dcrDataNotStartedLabel);
			 if (ED.context.request.invokedFrom == "prepareMyTable" || ED.context.request.invokedFrom == "settingsSync"){
				 $("#progressbarDCR").css("display" , "none");
				 $("#progressStatusDCR").css("display" , "none");
			 }


			 $("#progressDiv").show();
			 $("#buttonDiv").hide();
			 $("#progressDivMAIN").show();
		 },
		 
		 setProgress: function(status){
			var _this = com.swaas.hidoctor.edetailing.ui.view.SendDataToHiDoctor;
			var resource = com.swaas.hidoctor.edetailing.ui.view.Resource;
			if (status.batchId == "MAIN"){
				_this.progressBarMAIN.setValue(status.value);
				$("#progressDivMAIN").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusMAIN"), 
							resource.sendDataToHiDoctor.mainDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusMAIN"), 
							resource.sendDataToHiDoctor.mainDataProgressLabelPrefix + " " + 
							resource.sendDataToHiDoctor.entities[status.label] + " " +
							resource.sendDataToHiDoctor.pleaseWait);
				}
			} else if (status.batchId == "DCR"){
				_this.progressBarDCR.setValue(status.value);
				$("#progressDivDCR").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusDCR"), 
							resource.sendDataToHiDoctor.dcrDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusDCR"), 
							resource.sendDataToHiDoctor.dcrDataProgressLabelPrefix + " " + 
							resource.sendDataToHiDoctor.entities[status.label] + " " +
							resource.sendDataToHiDoctor.pleaseWait);
				}
			}
			_this.progressBarALL.setValue(status.grandValue);	
		 },
		 
		 goNext: function(){
			 var invokedFrom = ED.context.request.invokedFrom;
			 if (invokedFrom == "prepareMyTable"){
				 ED.redirect("view/synchronize/prepareMyTablet.html", {noBack : true});
			 } else  if (invokedFrom == "eraseAndClean"){
					ED.redirect("view/eraseAndClean/eraseAndClean.html", {noBack : true});
			 } else {
				 ED.redirect("view/calendar/calendar.html", {noBack : true});
			 }
		 }
};

com.swaas.hidoctor.edetailing.ui.view.SendDataToHiDoctor = createProxy(com.swaas.hidoctor.edetailing.ui.view._SendDataToHiDoctor, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);