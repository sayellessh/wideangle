com.swaas.hidoctor.edetailing.ui.view._PrepareMyTablet = {
		 progressBarMASTER: null,
		 progressBarUSER: null,
		 progressBarTP: null,
		 progressBarDOCTOR: null,
		 progressBarALL: null,
		 accompanists: null,
		 selectedRegionCodes: {},
		 context: null,
		 init: function(){
			ED.pageContext.pageName = com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.prapareMyTabletCaption;
			var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			//ED.includeHeader($("#header"), true);
			ED.includeNewHeader($("#header"), com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.prapareMyTabletCaption, true, true, true, true, true, true);
		    /*ED.setValue($("#prepareMyTabletCaption"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.prapareMyTabletCaption);*/
			_this.progressBarMASTER = TolitoProgressBar('progressbarMASTER').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarUSER = TolitoProgressBar('progressbarUSER').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarTP = TolitoProgressBar('progressbarTP').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarDOCTOR = TolitoProgressBar('progressbarDOCTOR').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarDOCUMENT = TolitoProgressBar('progressbarDOCUMENT').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();
			_this.progressBarALL = TolitoProgressBar('progressbarALL').setOuterTheme('b').setInnerTheme('e').isMini(true).setMax(100).setStartFrom(0).showCounter(true).logOptions().build();

			ED.setValue($("#downloadEDocumentCaption"), com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.downloadEdocuments.alertCaption);
			ED.setValue($("#downloadEdocumentDearLbl"), com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.downloadEdocuments.dear + " " + ED.context.currentUser.userName + ",");
			ED.setValue($("#downloadEdocumentMessage"), com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.downloadEdocuments.message);
			ED.setValue($("#downloadEDocumentOKBtn"), com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.downloadEdocuments.okButtonLabel);
			ED.setValue($("#downloadEDocumentCancelBtn"), com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.downloadEdocuments.cancelButtonLabel);
			$("#downloadEDocumentDiv").screenCenter();
			
			_this.resetProgress();
			
			setTimeout(function(){
				_this.downloadLogo();
				_this.syncData();
			},5000);
			
			
			ED.setValue($("#selectAccompanistCaption"), com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.accompanistsSelection.selectAccompanistCaption);
			$("#progressDiv").width($("#pageDiv").width()-40);
			
		 },
		 
		 syncData: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			com.swaas.hidoctor.edetailing.service.DownSynchronizeService.syncData(_this.setProgress, _this.onSyncComplete, _this.onSynchBatchComplete);
		 },
		 
		 onSyncComplete: function(status){
			 //ED.context.configuration = null;
			 $("#buttonDiv").show();

		 },
		 
		 onSynchBatchComplete: function(batchId, context){
			 if (batchId == 'MASTER'){
				 // Master is completed, The doctor synch is going to start
				 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
				 _this.context = context;
				 _this.showAccompanistsConfirmationDialog();
			 } else {
				 com.swaas.hidoctor.edetailing.service.DownSynchronizeService.resumeSync();
			 }
		 },
		 
		 resetProgress: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			 _this.progressBarMASTER.setValue(0);
			 _this.progressBarUSER.setValue(0);
			 _this.progressBarTP.setValue(0);
			 _this.progressBarDOCUMENT.setValue(0);
			 _this.progressBarALL.setValue(0);
			 ED.setValue($("#progressStatusALL"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.overAllProgressLabel);
			 ED.setValue($("#progressStatusMASTER"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.masterDataNotStartedLabel);
			 ED.setValue($("#progressStatusUSER"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.userDataNotStartedLabel);
			 ED.setValue($("#progressStatusTP"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.tpDataNotStartedLabel);
			 ED.setValue($("#progressStatusDOCTOR"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.doctorDataNotStartedLabel);
			 ED.setValue($("#progressStatusDOCUMENT"), 
					 com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.documentDataNotStartedLabel);
			 $("#progressDiv").show();
			 $("#buttonDiv").hide();
			 $("#progressDivUSER").show();
			 $("#progressDivTP").hide();
			 $("#progressDivMASTER").hide();
			 $("#progressDivDOCTOR").hide();
			 $("#progressDivDOCUMENT").hide();
			 $("#accompanistsConfirmationDiv").hide();
			 $("#accompanistsSelectionDiv").hide();
			 selectedRegionCodes = {};
		 },
		 
		 setProgress: function(status){
			var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			var resource = com.swaas.hidoctor.edetailing.ui.view.Resource;
			if (status.batchId == "MASTER"){
				_this.progressBarMASTER.setValue(status.value);
				$("#progressDivMASTER").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusMASTER"), 
							resource.prepareMyTablet.masterDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusMASTER"), 
							resource.prepareMyTablet.masterDataProgressLabelPrefix + " " + 
							resource.prepareMyTablet.entities[status.label] + " " +
							resource.prepareMyTablet.pleaseWait);
				}
				
			} else if (status.batchId == "USER"){
				_this.progressBarUSER.setValue(status.value);
				$("#progressDivUSER").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusUSER"), 
							resource.prepareMyTablet.userDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusUSER"),
							resource.prepareMyTablet.userDataProgressLabelPrefix + " " + 
							resource.prepareMyTablet.entities[status.label] + " " +
							resource.prepareMyTablet.pleaseWait);
				}
			} else if (status.batchId == "DOCTOR"){
				_this.progressBarDOCTOR.setValue(status.value);
				$("#progressDivDOCTOR").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusDOCTOR"), 
							resource.prepareMyTablet.doctorDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusDOCTOR"),
							resource.prepareMyTablet.doctorDataProgressLabelPrefix + " " + 
							resource.prepareMyTablet.entities[status.label] + " " +
							resource.prepareMyTablet.pleaseWait);
				}
				
			} else if (status.batchId == "TP"){
				_this.progressBarTP.setValue(status.value);
				$("#progressDivTP").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusTP"), 
							resource.prepareMyTablet.tpDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusTP"),
							resource.prepareMyTablet.tpDataProgressLabelPrefix + " " + 
							 resource.prepareMyTablet.entities[status.label] + " " +
							resource.prepareMyTablet.pleaseWait);
				}
			} else {
				_this.progressBarDOCUMENT.setValue(status.value);
				$("#progressDivDOCUMENT").show();
				if (status.label == "Done" || status.value == 100){
					ED.setValue($("#progressStatusDOCUMENT"), 
							resource.prepareMyTablet.documentDataDoneLabel);
				} else {
					ED.setValue($("#progressStatusDOCUMENT"),
							resource.prepareMyTablet.documentDataProgressLabelPrefix + " " + 
							 resource.prepareMyTablet.entities[status.label] + " " +
							resource.prepareMyTablet.pleaseWait);
				}
			}
			_this.progressBarALL.setValue(status.grandValue);	
		 },
		 
		 addUserAccompanistsOptions: function(dropdownId){
			 if (this.accompanists == null){
				 this.accompanists = com.swaas.hidoctor.edetailing.service.UserService.getAccompanists();
			 }
			 
			 var dropdown = $("#" + dropdownId);
			 var dropdownShow = $("#" + dropdownId + "_show");
			 
			 $.each(this.accompanists, function(index, accompanist){
				 var option = "<option value='" + accompanist.userName + "'>" + accompanist.userName + "</option>";
				 dropdown.append(option);
				 dropdownShow.append(option);
			 });
		 },
		 
		 showAccompanistsConfirmationDialog: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			 $("#progressDivDOCTOR").hide();
			 var currentUser = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
			 var resource = com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet;
			 var dialog = "<span style='font-size: large'>" + resource.accompanistsDialog.alert + "</span><br/><br/>";
			 var tpAccompanistsString = "";
			 var tpAccompanistsSubject = "";
			 dialog += (resource.accompanistsDialog.dear + " " + currentUser.userName + ",<br/><br/>");
			 var tpAccompanists = com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.getAll();
			 if (tpAccompanists.length > 0){
				 dialog += resource.accompanistsDialog.subjectHasAccompanist + "<br/>";
				 tpAccompanistsSubject += resource.accompanistsSelection.subject + "<br/>";
				 $.each(tpAccompanists, function(index, accompanist){
					 tpAccompanistsString += ((index+1) + ". " + accompanist.accompnistName + "<br/>");
					  _this.addSelectedRegionCode(accompanist.accompnistRegionCode);
				 });
			 } else {
				 dialog += resource.accompanistsDialog.subjectNoAccompanist;
			 }

			 dialog += tpAccompanistsString + "<br/>" + resource.accompanistsDialog.confirmationMessage;
			 tpAccompanistsString = tpAccompanistsSubject + tpAccompanistsString; 
			 $("#accompanistsConfirmationDialog").html(dialog);
			 $("#tpAccompanistDiv").html(tpAccompanistsString);
			 $("#accompanistsConfirmationDiv").show();
		 },
		 
		 addAccompanistsToContext: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			 for (var regionCode in _this.selectedRegionCodes) {
				 if (_this.selectedRegionCodes.hasOwnProperty(regionCode)) {
					 _this.context.regionCodes.push(regionCode);
				 }
			 }
		 },
		 
		 accompanistsConfirmation: function(confirmation){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			 $("#accompanistsConfirmationDiv").hide();
			 $("#progressDivDOCTOR").show();
			 if (confirmation == true){
				 this.addUserAccompanistsOptions("selectTP1");
				 this.addUserAccompanistsOptions("selectTP2");
				 this.addUserAccompanistsOptions("selectTP3");
				 this.addUserAccompanistsOptions("selectTP4");
				 this.showSmallCalendar();
				 $("#accompanistsSelectionDiv").show();
			 } else {
				 _this.resumeSyncProcess();
			 }
		 },
		 
		 processSelectedAccompanists: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			 var uniqueValues = {};
			 for (var i = 1; i < 5; i++){
				 var value = $('#selectTP' + i).val();
				 if (value != null && value != ""){
					 if (uniqueValues[value] != null){
						 alert(value + com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.multipleSelection);
						 return;
					 } else {
						 uniqueValues[value] = value;
					 }
				 }
			 }

			 $("#accompanistsSelectionDiv").hide();
			 _this.resumeSyncProcess();
			 
		 },
		 
		 addSelectedRegionCode: function(regionCode){
			 if (regionCode != null && regionCode != ''){
				 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
				  _this.selectedRegionCodes[regionCode] = true;
			 }
		 },
		 
		 addAdditionallySelectedAccompanist: function(selectTP){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			 var value = selectTP.val();
			 if (value != null && value != ""){
				 for (var index = 0; index < this.accompanists.length; index++){
					 if (this.accompanists[index].userName == value){
						 _this.addSelectedRegionCode(this.accompanists[index].regionCode);
						 com.swaas.hidoctor.edetailing.dao.SelectedAccompanistLocalDAO.syncPut({
							 accompnistName:value,
							 accompnistRegionCode:this.accompanists[index].regionCode
						 });
						 break;
					 }
				 }
			 }
		 },
		 
		 resumeSyncProcess: function(){
			 var _this = com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet;
			 _this.addAdditionallySelectedAccompanist($("#selectTP1"));
			 _this.addAdditionallySelectedAccompanist($("#selectTP2"));
			 _this.addAdditionallySelectedAccompanist($("#selectTP3"));
			 _this.addAdditionallySelectedAccompanist($("#selectTP4"));
			 _this.addAccompanistsToContext();
			 com.swaas.hidoctor.edetailing.service.DownSynchronizeService.resumeSync();
		 },
		 
		 confirmationDownloadEDocuments: function(){
			 var syncContext = com.swaas.hidoctor.edetailing.service.DownSynchronizeService.context;
			 $("#retiredAssettable").find('tbody').html('');
			 if(syncContext.retiredAssetNames != null &&  syncContext.retiredAssetNames.length > 0){
				 $("#retiredAssettable").find('tbody').append($('<tr>').append($('<td>').append($('<label>').text(com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.downloadEdocuments.retiredLabel))));
				 $("#retiredAssettable").find('tbody').append($('<tr>').append($('<td>').append($('<label>').text(com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.downloadEdocuments.retiredList))));
				 $.each(syncContext.retiredAssetNames, function(i, retiredAssetName) {
					 $("#retiredAssettable").find('tbody').append($('<tr>').append($('<td>').append($('<label>').text((i+1)+'. '+retiredAssetName))));
				});
			 }
			 $("#downloadEDocumentDiv").show();
		 },
		 
		 downloadEDocumentConfirmation: function(confirmation){
			 if (confirmation == true){
				 ED.redirect("view/downloadedocument/downloadEDocument.html", {noBack: true});
			 } else {
				 ED.redirectToHome({noBack: true});
			 }
			 
		 },
		 showSmallCalendar: function(){
			 var configuration =  com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
			 var numberOfDays = configuration.syncNoOfDays;
			 var dateCounter = new Date();
			 var weeklyClanderTable =  $("#smallCalendar");
			 ED.clearTable(weeklyClanderTable);
			 var row='<tr>';
			 var columns=null;
			 for(var i=0;i<numberOfDays;i++){
				 columns +='<td  bgcolor="#203764" align="center" ><font color="white">'+dateCounter.getDate()+'</font></td><td  bgcolor="#305496"  align="center" ><font color="white">'+dateCounter.format('ddd')+'<br>'+dateCounter.format('mmmm')+'</font></td><td width="1px"></td>';
				 dateCounter.setDate(dateCounter.getDate()+1);
			 }
			 row +=columns;
			 row +='</tr>';
			 weeklyClanderTable.append(row);
			 
		 },
		 
		downloadLogo : function(){
			var currentUser = ED.context.currentUser;
			var logoName = com.swaas.hidoctor.edetailing.ui.view.Resource.logo.logoName;
			var logoUrl = com.swaas.hidoctor.edetailing.service.DownloadLogoService.getRemoteLogoUrl(1, currentUser.companyCode, currentUser.userCode, currentUser.url);
			var logoDownloader = new Downloader();
			logoDownloader.downloadFile(logoUrl, com.swaas.hidoctor.edetailing.ui.view.Resource.logo.applicationLogoFolder, logoName);
			
		}

};
com.swaas.hidoctor.edetailing.ui.view.PrepareMyTablet = createProxy(com.swaas.hidoctor.edetailing.ui.view._PrepareMyTablet, com.swaas.hidoctor.edetailing.ui.view.ErrorLogger);


