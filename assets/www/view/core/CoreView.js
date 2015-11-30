var backButtonEventListner=function(){
	console.log('backButtonEventListner');
	var downloadInProgress = ED.downloading;
	if(typeof downloadInProgress=== "undefined" || downloadInProgress == null){
		downloadInProgress = false;
	}
	var noBack = ED.context.request.noBack;
	console.log(noBack);
	if(typeof noBack=== "undefined" || noBack == null){
		noBack = false;
	}
	if (!noBack && !downloadInProgress) {
		if (typeof (navigator) != 'undefined'
				&& typeof (navigator.app) != 'undefined'
				&& typeof (navigator.app.backHistory) == 'function') {
			navigator.app.backHistory();
		} else {
			history.go(-1);
		}
	}
};
com.swaas.hidoctor.edetailing.ui.view.ErrorLogger = {
		
		execute : function(source, func, arguments, methodName) {

			try {
				return func.apply(source, arguments);				
			} catch (err) {	
				//alert(err);
				ED.logError(source, err, arguments, methodName);
				throw err;
			}
		}
};

com.swaas.hidoctor.edetailing.ui.view.CoreView = {
	longitude: 0,
	latitude: 0,
	geoAddress : null,
	geoLocationInitialized: false,
	logError: function (source, err, arguments, methodName){
		if (ED.context.currentUser == null){
			ED.context.currentUser = {};
		}
		var errorOccuringTime = new Date();
		var errorInfo = {
			"User_Code" : ED.context.currentUser.userCode,
			"Company_Code": ED.context.currentUser.companyCode,
			"User_Name": ED.context.currentUser.userName,
			"Page_Name" : ED.pageContext.pageName,
			"Error_At" : (/(\w+)\(/.exec(source.constructor.toString())[1]) + "." + methodName,
			"Arguments": arguments,
			"Error" : err,
			"Additional_Context" : ED.pageContext.context						
		};
		var currentUserName = ED.context.currentUser.userName;
		var errorText = JSON.stringify(errorInfo);
		console.log("debugging..."+errorText);
		var errorLog = {
				errorID : com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID(), 
				deviceID : com.swaas.hidoctor.edetailing.util.DeviceInfo.getDeviceId(),
				userName : currentUserName,
				errorTime : errorOccuringTime,
				error : errorText
			};
		com.swaas.hidoctor.edetailing.dao.ErrorLogsLocalDAO.insert(errorLog);		
	},
		
	pageContext : {
		pageName : null,
		context : {}		
	},
	init: function(){
		document.title = com.swaas.hidoctor.edetailing.ui.view.Resource.application.title;
	},
	
	setValue:function(object, value){
		
		var type = '';
		try {
			type = object.get(0).tagName;
		} catch(e) {
			
		}
		if (type == 'INPUT'){
			type = object.attr('type').toUpperCase();
			if (type == 'SUBMIT' || type == 'RESET'){
				type = "BUTTON";
			}
			
			if (type == 'PASSWORD'){
				type = 'TEXT';
			}
		}
		
		if (type == 'BUTTON'){
			object.prev('span').find('span.ui-btn-text').text(value);			
		} else if (type == 'LABEL'){
			object.text(value);
			
		} else if (type == 'TEXT'){
			object.val(value);
		} else if (type == 'NUMBER'){
			object.val(value);
		} else if (type == 'SPAN'){
			object.text(value);
		} else {
			object.text(value);
		}
	},
	
	getValue: function(object){
		//console.log(objToString(object.get(0)));
		var type = '';
		try {
			type = object.get(0).tagName;
		} catch(e) {
			
		}
		if (type == 'INPUT'){
			type = object.attr('type').toUpperCase();
			if (type == 'SUBMIT' || type == 'RESET'){
				type = "BUTTON";
			}
			
			if (type == 'PASSWORD'){
				type = 'TEXT';
			}
		}
		var value = null;
		if (type == 'BUTTON'){
			value = object.prev('span').find('span.ui-btn-text').text();			
		} else if (type == 'LABEL'){
			value = object.text();
			
		} else if (type == 'TEXT'){
			value = object.val();
		}
		return value;
	},
	
	bindSubmit: function(form, callBack){	
		jQuery(function($) {
			form.submit(submitFunction);
		    function submitFunction(){
		    	callBack();
		    	return false;
		    }
		});	
	},
	
	showLoading: function(message) {
		//alert("incore");
		if(message == null){
			message = 'Loading...';
		}
		var div = $("#loading");
		if (div == null || div.length == 0){
			//div = $("<div id='loading' style='opacity: 0.3; padding-top: 29%; background-color:white;color:black;position: absolute; width:100%; height: 100%; text-align:center;z-index:9990;display:none'>"+message+"</div>");
			div = $("<div id='loading' style='opacity: 0.6; padding-top: 29%; background-color:white;color:black;position: fixed; width:100%; height: 100%; text-align:center;z-index:9999999;display:none'></div>");
			$(document.body).append(div);			
		}
		div.screenCenter();
		div.show();
		$.mobile.showPageLoadingMsg("b", message);
	},
	
	hideLoading: function() {
		$("#loading").hide();
		$.mobile.hidePageLoadingMsg();
	},
	
	showEmptyList: function(message) {
		var emptyMessage = $('#emptyMessage');
		var msgTag = emptyMessage.find('h4');
		msgTag.empty().append(message);
		var msgTagTPadding = parseInt(msgTag.css('padding-top').replace('px', ''));
		var msgTagBPadding = parseInt(msgTag.css('padding-bottom').replace('px', ''));
		var headerHeight = $('#header').height();
		var docHeight = $(document).height();
		var bodyHeight = docHeight - headerHeight;
		var h4Height = msgTag.height() + msgTagTPadding + msgTagBPadding;
		var h4Margin = (bodyHeight / 2) - h4Height - 50;
		msgTag.css('text-align', 'center');
		msgTag.css('margin-top', h4Margin);
		emptyMessage.show();
	}, 
	
	hideEmptyList: function(message) {
		var emptyMessage = $('#emptyMessage');
		emptyMessage.hide();
	}, 
	
	redirect: function (uri, parameters){
		    
		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		_this.parameters = parameters;
		_this.uri = uri;
		_this.showLoading();
			
		setTimeout(_this.navigate, 100);
		
	},
	
	navigate: function(){
		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		var url = window.location.href.substring(0, window.location.href.indexOf("www"));
		url += "www/" + _this.uri + "?";
		_this._tempURL = "";
		_this._tempKey = "";
		_this._tempKeys = [];
		_this._addParamsToUrl("_g_", _this.context);
		_this._tempKey = "";
		_this._tempKeys = [];
		_this._addParamsToUrl("", _this.parameters);
		navigator.app.loadUrl((url + _this._tempURL), {wait:1000, loadingDialog:"HiDoctor, please wait", loadUrlTimeoutValue: 1200000});
		
	},
		
	_addParamsToUrl: function(url, params){
		if (ED.context != null){
			
		}
	},
	_tempURL: "",
	_tempKey: "",
	_tempKeys: [],
	_addParamsToUrl: function(prefix, params, index){
		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		if (params === null) {
	        //return url;
	    }
	    else if (params === undefined) {
	        //return url;
	    }
	    else if (typeof params === 'object' && params.constructor === [].constructor) {
	    	$.each(params, function(index, element){
	    		_this._addParamsToUrl(prefix, element, index);
	    	});
	    }
	    else if (typeof params === 'object' && params.constructor === {}.constructor) {
	    	for (var objKey in params){
	    		if (params.hasOwnProperty(objKey)){
	    			if (objKey != 'request'){
	    				if (params[objKey] != null){
	    					_this._tempKey = objKey;
			    			var pushed = false;
			    			if (typeof params[_this._tempKey] === 'object' && 
			    					params[_this._tempKey].constructor === {}.constructor){
			    				_this._tempKeys.push(_this._tempKey);
			    		    	pushed = true;
			    			}
			    			_this._addParamsToUrl(prefix, params[objKey]);
			    			if (pushed == true){
			    				_this._tempKeys.pop();
			    			}	    					
	    				}
	    			}
	    			
	    		}
	    	}	    	
	    } else {
	    	var parameterName = "";
	    	if (prefix != null){
	    		parameterName += prefix;
	    	}
	    	$.each(_this._tempKeys, function(i, element){
	    		parameterName += (element + ".");
	    	});
	    	if (params instanceof Date){
	    		parameterName += ("_date_" + _this._tempKey);
	    		params = params.getFullYear() +"." + (params.getMonth() +1)+ "." + params.getDate();
	    	} else {
	    		parameterName += _this._tempKey;
	    		params = params + ""; //Converting to String
	    		if (params.indexOf(":") > 0){
	    			params = params.replace(":", "()");
	    		}
	    	}
	    	
	    	if (index != null){
	    		parameterName += "[" + index + "]";
	    	}
	    	_this._tempURL += (parameterName +  "=" + encodeURI(params) + "&");	    	
	    }
	},
	
	includeHTML: function(object, htmlURI){
		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		var htmlURL = _this.rootFolder();
		htmlURL +=  htmlURI;
		object.load(htmlURL);
		object.trigger('create');
	},
	
	rootFolder: function(){
		var htmlURL = window.location.href.substring(0, window.location.href.indexOf("www"));
		htmlURL += "www/";
		return htmlURL;
	},
	
	includeHeader: function(object, noMenu, companyLogoRequired, isGeoAddressRequired){
		
		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		_this.initializeGeoLocation(isGeoAddressRequired);
		
		if(_this.configuration == null){
			_this.configuration =  com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
		}

		ED.handleBackButton();

		if (noMenu == null){
			noMenu = false;
		}
		
		if(companyLogoRequired == null){
			companyLogoRequired == false;
		}
		
		var user = _this.context.currentUser;
		if (user == null){
			user = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
			_this.context.currentUser = user;
		}
		var userInfo1 = user.userName + " | " + user.userTypeName;
		var userInfo2 = user.regionName;
		
		var logoFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.logo.applicationLogoFolder;
		var logoSrcPath = logoFolder+'/'+com.swaas.hidoctor.edetailing.ui.view.Resource.logo.logoName;
		var fileEntry = com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(logoSrcPath);
		if (fileEntry != null && companyLogoRequired == true){
			logoSrcPath = com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(logoSrcPath).fullPath;
		} else {
			logoSrcPath = "../../hidoctor/images/wide-angle-logo.png";
		}
		var headerHTML = '<table width="100%"> ' +
							'<tr> ' + 
								'<td rowspan = "2" align="left" valign="top" width="40%">' +
								'<div id="imgLogo" style="position: relative; display: inline-block;">'+
								'<a href="#left-panel" data-theme="d" data-icon="arrow-r" ' +
								'data-iconpos="notext" data-shadow="false" data-iconshadow="false" ' +
								'class="ui-icon-nodisc ui-btn-left ui-btn ui-btn-corner-all ui-btn-icon-notext ui-btn-up-d" ' +
								'data-corners="true" data-wrapperels="span" title="Open left panel"></a>' +
								'<img height="90px"; width="128px" src="'+logoSrcPath+'" /> '+
								'<span id="versionText" style="position: absolute; bottom: 10px; right: 10px; color: White; font-size:12px;">Version '+
									com.swaas.hidoctor.edetailing.ui.view.Resource.application.version + "." + com.swaas.hidoctor.edetailing.ui.view.Resource.application.release+
								'</span></div></td> ' +
								'<td align="center" width="20%"></td>'+
								' <td align="right" width="40%"> ' +
									' <table data-role="table" class="ui-responsive"> ' +
										' <tr> ' +
											' <td align="right"><label id="headerUserInfo1">' + userInfo1 + '</label><br>' + 
												'<label id="headerUserInfo2">' + userInfo2 + '</label>' +
											' </td> ' +
											' <td width="50px" valign="top"><img height="50px" ' +
												' src="../../hidoctor/images/human.png"></td> ' +
										' </tr> ';
										headerHTML +=  ' </table> ' +
									' </td> ' +
								' </tr> ';
								if (noMenu == false){
									var toolbarWidth = "25%";
									var isErrorPushRequired = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getErrorPushRequired();
									var upgradeRequired = true;
									if(isErrorPushRequired && upgradeRequired){
										toolbarWidth = "16.65%";
									}else if(isErrorPushRequired || upgradeRequired){
										toolbarWidth = "20%";
									}
									
									headerHTML += ' <tr> ' +
									'<td>&nbsp;</td>' +
										' <td align="right"> ' + 
												'<div id="headerNavbar" data-role="navbar" data-mini="true">' +
													'<ul>' +
														'<li id="homeLI" data-theme="b" style="clear:none!important;width: ' + toolbarWidth + '!important;"><a id="home" data-icon="custom" onclick="ED.redirectToHome()"></a></li>' +
														'<li id="enterDCRLI" data-theme="b" style="clear:none!important;width: ' + toolbarWidth + '!important;"><a id="enterDCR" data-icon="custom" ></a></li>' +
														'<li id="settingLI" data-theme="b" style="clear:none!important;width: ' + toolbarWidth + '!important;"><a href="#settingsPopupMenu" data-rel="popup" id="setting" data-icon="custom" ></a></li>' +
														'<li id="upgradeLI" data-theme="b" style="clear:none!important;width: ' + toolbarWidth + '!important;"><a id="upgradeLink" data-icon="custom" onclick="ED.upgradeAPK(false);"></a></li>' +
														'<li id="powerOffLI" data-theme="b" style="clear:none!important;width: ' + toolbarWidth + '!important;"><a id="powerOff" data-icon="custom" onclick="ED.quit()"></a></li>';
									
									if (isErrorPushRequired == true){
										headerHTML += '<li id="errorPushLI" data-theme="a" style="clear:none!important;width: ' + toolbarWidth + '!important;"><a id="errorPush" data-icon="custom" onclick="ED.submitErrors();"></a></li>';
									}
									headerHTML += '</ul>' +
												'</div>' +
												'<div data-role="popup" id="settingsPopupMenu"  data-position-to="#powerOff">' +
												'<table id="settingsTab" width="240px" align="left" data-role="table" class="ui-table ui-responsive" data-theme="b" style="background-color : #1589FF">' +
													'<tr>' +
														'<td width="17%" id="prepareMyTableBtn" data-theme="b" ><table cellspacing="0" cellpadding="0"><tr><td><img src="../../hidoctor/images/prepareMyTablet.png"></td></tr><tr><td><span>' + 
															com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.prapareMyTabletCaption + '</span></td></tr></table></td>' +
														'<td width="17%" id="downloadBtn" data-theme="b"><table cellspacing="0" cellpadding="0"><tr><td><img src="../../hidoctor/images/download.png"></td></tr><tr><td><span>' + 
															com.swaas.hidoctor.edetailing.ui.view.Resource.download.header + '</span></td></tr></table></td>' +
														'<td width="17%" id="makeSpaceBtn" data-theme="b" ><table cellspacing="0" cellpadding="0"><tr><td><img src="../../hidoctor/images/makeSpace.png"></td></tr><tr><td><span>' + 
															com.swaas.hidoctor.edetailing.ui.view.Resource.makeDiskspace.header + '</span></td></tr></table></td>' +
														'<td width="16%" id="updateHiDoctorBtn" data-theme="b"><table cellspacing="0" cellpadding="0"><tr><td><img src="../../hidoctor/images/syncUp.png"></td></tr><tr><td><span>' + 
															com.swaas.hidoctor.edetailing.ui.view.Resource.sendDataToHiDoctor.sendDataToHiDoctorCaption + '</span></td></tr></table></td>' +
														'<td width="17%" id="eraseBtn" data-theme="b" ><table cellspacing="0" cellpadding="0"><tr><td><img src="../../hidoctor/images/eraseAndClean.png"></td></tr><tr><td><span>' + 
															com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.eraseAndCleanCaption + '</span></td></tr></table></td>'+	
														'<td width="16%" id="upsyncDCRBtn" data-theme="b" ><table cellspacing="0" cellpadding="0"><tr><td><img src="../../hidoctor/images/syncUp.png"></td></tr><tr><td><span>' + 
															com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.upSyncDCR + '</span></td></tr></table></td>'+	
													'</tr>	' +						
												'</table>' +
											'</div>' +
										'</td>' +
									'</tr>';
									
								}								
								headerHTML +=  ' </table><div id="eraseconfirmationDiv"  style="position:absolute;padding:10px;z-index:9900; width : 60%;display:none" ></div>';
								headerHTML +=  ' <div id="syncConfirmationDiv"  style="position:absolute;padding:10px;z-index:9900; width : 60%;display:none" ></div>';
								headerHTML += "<div id='loading' style='background-color:white;color:black;width:100px;text-align:center;z-index:9990;display:none'>" +
									"<span style='font-size: 1em;font-weight: bold;'>" + 
									com.swaas.hidoctor.edetailing.ui.view.Resource.application.loading + "</span></div>";
								if (isErrorPushRequired == true){
									headerHTML += "<div id='submitErrors' style='background-color:white;color:black;width:100px;text-align:center;z-index:9990;display:none'>" +
									"<span style='font-size: 1em;font-weight: bold;'>" + 
									com.swaas.hidoctor.edetailing.ui.view.Resource.error.submitErrorCapton + "</span></div>";	
								}
								
		object.html(headerHTML);
		$("#headerNavbar").navbar();
		$("#settingsPopupMenu").popup();
		$("#settingsPopupMenu").css("width", "60%");
		
		$('#enterDCRLI').click(function(){
       		var valid = true;
			if((ED.context.selectedDate > new Date())){
				valid = false;
				alert('User cannot enter DCR for future Date!!');
                    return;
			}else{
				valid = true;
	        	ED.redirect("view/dcr/dcrNew.html");
			}
			
		});
		
		$("#prepareMyTableBtn").click(function(){
			$("#settingsPopupMenu").popup("close");
			var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
			if(isConnected){
				var syncDiv = com.swaas.hidoctor.edetailing.ui.view.CoreView.getConfirmPrepareMyTablet($('#syncConfirmationDiv'));
			
			
			}else{
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
				return;
			}
		});
		$("#downloadBtn").click(function(){
			$("#settingsPopupMenu").popup("close");
			ED.redirect("view/downloadedocument/downloadEDocument.html");
		});

		$("#eraseBtn").click(function(){
			$("#settingsPopupMenu").popup("close");
			var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
			var eraseCleanDiv = com.swaas.hidoctor.edetailing.ui.view.CoreView.getConfirmEraseAndClean($('#eraseconfirmationDiv'), isConnected);
			
			$('#upSynchData').click(function(){
				eraseCleanDiv.hide();
				ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "eraseAndClean", "nonDCRSync" : true, "dcrSync": true});	
				
			});
			$('#yesToEraseClean').click(function(){
				eraseCleanDiv.hide();
				ED.redirect("view/eraseAndClean/eraseAndClean.html");
				
			});
			$('#noToEraseClean').click(function(){
				eraseCleanDiv.hide();
			});

		});
		
		$("#makeSpaceBtn").click(function(){
			$("#settingsPopupMenu").popup("close");
			ED.redirect("view/makespace/makespace.html");
		});
		
		$("#updateHiDoctorBtn").click(function(){
			$("#settingsPopupMenu").popup("close");
			var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
			if(isConnected){
				var availabeDetail = ED.isNewVersionAvailable();
					
				if(availabeDetail.isNewAvailabe == true){
					alert(com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeMessage);
				}
				ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "settingsSync", "nonDCRSync" : true, "dcrSync": false});
			} else {
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
				return;
			}
		});
		$("#upsyncDCRBtn").click(function(){
			$("#settingsPopupMenu").popup("close");
			var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
			if(!isConnected){
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
				return;
			}
			var availabeDetail = ED.isNewVersionAvailable();
			
			if(availabeDetail.isNewAvailabe == true){
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeMessage);
			}
			var syncDataDiv = com.swaas.hidoctor.edetailing.ui.view.CoreView.getConfirmDCRUpsync($('#eraseconfirmationDiv'));
			$('#upSynchData').click(function(){
				syncDataDiv.hide();
				var result = ED.checkDCRData();
				if(result == true){
					ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "dcrUpSync", "nonDCRSync" : false, "dcrSync": true});
				} else {
					alert(com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.noDCR); 
				}
			});
			$('#yesToEraseClean').click(function(){
				syncDataDiv.hide();
				ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "dcrUpSync", "nonDCRSync" : false, "dcrSync": true});				
			});
			$('#noToEraseClean').click(function(){
				syncDataDiv.hide();
			});
		});
	},
	
	includeStoryHeader: function(doctor){
      // alert("s");
		var user = ED.context.currentUser;

		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		_this.initializeGeoLocation(true);
		if(_this.configuration == null){
			_this.configuration =  com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
		}
		ED.handleBackButton();
		
		var storyHeader='';
		storyHeader+='<div class="top_sec">';
		storyHeader+='<div class="user_sec"><ul><li><p class="name">' + user.userName + '</p><p class="city">' + user.regionName + '</p></li><li class="profile_img"><img class="image" src="storycarousel/1.jpg" /></li><li><img class="logout" src="../../hidoctor/images/Logout.png" /></li></ul></div>';

		storyHeader+='<div class="menu_sec"><ul><li class="list1"><a>Home</a></li><li class="listBell"><a>Bell</a></li><li class="list2"><a>Settings</a></li><li class="list3"><a>DCR</a></li><li class="list4"><a>Friend</a></li><li class="list5"><a>Chat</a></li><ul></div>';

		storyHeader+='</div>';
		storyHeader+='<div class="bottom_sec">';
		storyHeader+='<div class="doctor_img"><img id="companyLogo" /></div>' +
			'<div class="user_sec doc_sec"><ul><li class="profile_img"><img class="image" src="storycarousel/1.jpg" /></li>' +
			'<li class="doc_name"><p class="name">' + doctor.customerName + '</p><p class="city">'+ doctor.specialityName +'</p></li></ul></div>' +
			'<div class="home_icon"><a href="#" title="Home"></a></div>' + 
			'<div class="bell_icon"><a href="#" title="Bell" id="bell-anchor"><span id="notificationCount" class="notificationCount"></span></a></div>';
		storyHeader+='</div>';
		$("#header").html(storyHeader);
		
		com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(com.swaas.hidoctor.edetailing.ui.view.Resource.download.edFolder + '/logo/logo.jpg', function(fileEntry) {
	    	companyLogo = fileEntry.fullPath;
	    	$('#companyLogo').attr('src', companyLogo);
	    }, function(e) {
	    });
		$('.home_icon a').bind('click', function(){
			ED.redirect('view/doctor/myDoctorsView.html');
			return false;
		});
		
		//document.addEventListener("resume", ED.configureAutosyncNotification, false);
		
		$('.copy_right').remove();
		var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version + '.' + com.swaas.hidoctor.edetailing.ui.view.Resource.application.release;
		$('body').append('<p class="copy_right">&copy; Powered by SwaaS - v' + version + '</p>');
		
		//ED.configureAutosyncNotification();
		if(_this.configuration != null)
			ED.bindNotificationEvents(_this.configuration.toDownloadCnt);
    },
	
	includeNewHeader: function(object, title, noLeftOpt, /*noMenu, companyLogoRequired, isGeoAddressRequired, */noHome, noSettings, noBack, noSearch, noRightOpt, showAssetNotification){
		console.log("Inside includeNewHeader()");
		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		
		_this.initializeGeoLocation(true);
		
		if(_this.configuration == null){
			_this.configuration =  com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
		}

		ED.handleBackButton();

		var numbOfCols = 0; 
		if (noSearch == undefined || noSearch == null){
			noSearch = false;
		} else numbOfCols++;
		/*if (noMenu == undefined || noMenu == null){
			noMenu = false;
		} else numbOfCols++;*/
		if (noHome == undefined || noHome == null){
			noHome = false;
		} else numbOfCols++;
		if (noSettings == undefined || noSettings == null){
			noSettings = false;
		} else numbOfCols++;
		if (noBack == undefined || noBack == null){
			noBack = false;
		} else numbOfCols++;
		if (noLeftOpt == undefined || noLeftOpt == null){
			noLeftOpt = false;
		} else numbOfCols++;
		if (noRightOpt == undefined || noRightOpt == null){
			noRightOpt = false;
		} else numbOfCols++;
		
		var headerHTML = '<div class="ui-grid-b">';
		headerHTML += '<div class="ui-block-a">';
		if(!noLeftOpt) {
			/*headerHTML += '<a href="#left-panel" style="border: none; background: none; width: 50px;" data-theme="d" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-icon-nodisc ui-btn-left ui-btn ui-btn-corner-all ui-btn-icon-notext ui-btn-up-d" data-corners="true" data-wrapperels="span" title="Open left panel">';
			headerHTML += '<span id="swipe-icon-img" style="background-image: url(\'img/menu-opt.png\'); background-size: 100% auto; width: 32px; height: 32px; float: left;"></span>';
			headerHTML += '</a>';*/
			headerHTML += '<a href="#left-panel"><span id="panel-leftopt-btn"></span></a>';
		}
		if(!noHome) {
			/*headerHTML += '<a href="#left-panel" style="border: none; background: none; width: 50px;" data-theme="d" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-icon-nodisc ui-btn-left ui-btn ui-btn-corner-all ui-btn-icon-notext ui-btn-up-d" data-corners="true" data-wrapperels="span" title="Open left panel">';
			headerHTML += '<span id="swipe-icon-img" style="background-image: url(\'img/menu-opt.png\'); background-size: 100% auto; width: 32px; height: 32px; float: left;"></span>';
			headerHTML += '</a>';*/
			headerHTML += '<a href="#"><span id="panel-home-btn"></span></a>';
		}
		if(!noBack) {
			/*headerHTML += '<a href="#left-panel" style="border: none; background: none; width: 50px;" data-theme="d" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-icon-nodisc ui-btn-left ui-btn ui-btn-corner-all ui-btn-icon-notext ui-btn-up-d" data-corners="true" data-wrapperels="span" title="Open left panel">';
			headerHTML += '<span id="swipe-icon-img" style="background-image: url(\'img/menu-opt.png\'); background-size: 100% auto; width: 32px; height: 32px; float: left;"></span>';
			headerHTML += '</a>';*/
			headerHTML += '<a href="#"><span id="panel-back-btn"></span></a>';
		}
		if(!noSettings) {
			/*headerHTML += '<a href="#left-panel" style="border: none; background: none; width: 50px;" data-theme="d" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-icon-nodisc ui-btn-left ui-btn ui-btn-corner-all ui-btn-icon-notext ui-btn-up-d" data-corners="true" data-wrapperels="span" title="Open left panel">';
			headerHTML += '<span id="swipe-icon-img" style="background-image: url(\'img/menu-opt.png\'); background-size: 100% auto; width: 32px; height: 32px; float: left;"></span>';
			headerHTML += '</a>';*/
			headerHTML += '<a href="#left-panel"><span id="panel-settings-btn"></span></a>';
		}
		headerHTML += '</div>';
		headerHTML += '<div class="ui-block-b" style="text-align: center;">';
		headerHTML += '<h4>' + title + '</h4>';
		headerHTML += '</div>';
		headerHTML += '<div class="ui-block-c">';
		headerHTML += '<div class="ui-grid-a">';
		headerHTML += '<div class="ui-block-a" style="width: 70%;">';
		
		if(!noSearch) {
			headerHTML += '<form id="searchForm" method="post">';
			headerHTML += '<input type="text" placeholder="Search" data-type="search" id="searchInput" />';
			headerHTML += '</form>';
		}
		headerHTML += '</div>';
		headerHTML += '<div class="ui-block-b" style="width: 30%;">';
		
		if(!noRightOpt) {
			/*headerHTML += '<a href="#left-panel" style="border: none; background: none; width: 50px;" data-theme="d" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-icon-nodisc ui-btn-left ui-btn ui-btn-corner-all ui-btn-icon-notext ui-btn-up-d" data-corners="true" data-wrapperels="span" title="Open left panel">';
			headerHTML += '<span id="swipe-icon-img" style="background-image: url(\'img/menu-opt.png\'); background-size: 100% auto; width: 32px; height: 32px; float: left;"></span>';
			headerHTML += '</a>';*/
			headerHTML += '<a href="#md-right-panel"><span id="panel-rightopt-btn"></span></a>';
		}
		if(showAssetNotification)
			headerHTML += '<a href="#" id="bell-anchor"><span id="panel-rightbell-btn"></span><span id="notificationCount" class="notificationCount"></span></a>';
		headerHTML += '</div>';
		headerHTML += '</div>';
		
		
		headerHTML += '</div>';
		headerHTML += '</div>';
		
		/*if(companyLogoRequired == null){
			companyLogoRequired == false;
		}*/
		
		/*var logoFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.logo.applicationLogoFolder;
		var logoSrcPath = logoFolder+'/'+com.swaas.hidoctor.edetailing.ui.view.Resource.logo.logoName;
		var fileEntry = com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(logoSrcPath);
		if (fileEntry != null && companyLogoRequired == true){
			logoSrcPath = com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(logoSrcPath).fullPath;
		} else {
			logoSrcPath = "../../hidoctor/images/wide-angle-logo.png";
		}*/
		
		/*var headerHTML = '';
		if(noSearch) {
			headerHTML += '<h1 class="ui-title" role="heading" aria-level="1">' + title + '</h1>';
		} else {
			headerHTML += '<div class="ui-block-a">';
			headerHTML += '<h4 style="margin-top: 20px;">' + title + '</h4>';
			headerHTML += '</div>';
			headerHTML += '<div class="ui-block-b">';
			headerHTML += '<form id="searchForm" method="post">';
			headerHTML += '<input type="text" placeholder="Search" data-type="search" id="searchInput" />';
			headerHTML += '</form>';
			
			headerHTML += '<a href="#md-right-panel" id="right-panel-btn" style="border: none; background: none; width: 50px;" data-theme="d" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-icon-nodisc ui-btn-right ui-btn ui-btn-corner-all ui-btn-icon-notext ui-btn-up-d" data-corners="true" data-wrapperels="span" title="Open left panel">';
			headerHTML += '<span id="swipe-icon-img" style="background-image: url(\'img/menu-opt.png\'); background-size: 100% auto; width: 32px; height: 32px; float: right;"></span>';
			headerHTML += '</a>';
			
			headerHTML += '</div>';
		}
		
		headerHTML += '<a href="#" style="margin-left: 50px;" onclick="ED.redirectToHome();" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-f" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="f" title="Home"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Home</span><span class="ui-icon ui-icon-home ui-icon-shadow">&nbsp;</span></span></a>';*/
		object.html(headerHTML);
		object.trigger('create');
		
		$('#panel-home-btn').bind('click', function(e) {
			ED.redirectToHome();
		});
		
		$('#panel-back-btn').bind('click', function(e) {
			backButtonEventListner();
		});
		
		var user = _this.context.currentUser;
		if (user == null){
			user = com.swaas.hidoctor.edetailing.service.UserService.getCurrentUser();
			_this.context.currentUser = user;
		}
		/*$("#headerNavbar").navbar();
		$("#settingsPopupMenu").popup();
		$("#settingsPopupMenu").css("width", "60%");
		
		$('#enterDCRLI').click(function(){
       		var valid = true;
			if((ED.context.selectedDate > new Date())){
				valid = false;
				alert('User cannot enter DCR for future Date!!');
                    return;
			}else{
				valid = true;
	        	ED.redirect("view/dcr/dcrNew.html");
			}
			
		});*/
		
		$('.copy_right').remove();
		var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version + '.' + com.swaas.hidoctor.edetailing.ui.view.Resource.application.release;
		$('body').append('<p class="copy_right">&copy; Powered by SwaaS - v' + version + '</p>');
		
		//ED.configureAutosyncNotification();
		if(showAssetNotification) {
			document.addEventListener("resume", ED.autoCheck, false);
			
			if(_this.configuration != null && (_this.configuration.toDownloadCnt == null || _this.configuration.toDownloadCnt <= 0)) {
				var downloadAssets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAll();
				var downAssets = _this.getUniqueAssetsBy(downloadAssets, 'daCode');
				var toDownload = new Array();
				for(var j=0;j<=downAssets.length-1;j++) {
					if(downAssets[j].downloadable == 'Y' && downAssets[j].downloaded == 'N')
						toDownload.push(downAssets[j]);
				}
				
				_this.configuration.toDownloadCnt = toDownload.length;
				com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.update(_this.configuration);
			}
			ED.autoAssetCheckStarted = false;
			ED.autoCheck();
			if(_this.configuration != null)
				ED.bindNotificationEvents(_this.configuration.toDownloadCnt);
		}
	},
	_previousSelectedTool: null,
	_previousSelectedToolBackground: null,
	_selectTool: function(toolId){
		if (this._previousSelectedTool != null){
			this._previousSelectedTool.css("background-color", this._previousSelectedToolBackground);
		}
		this._previousSelectedTool = $("#" + toolId);
		this._previousSelectedToolBackground = this._previousSelectedTool.css("background-color");
		$("#" + toolId).css("background-color", "#5589CA");
	},
	
	setFooter: function() {
		$('.copy_right').remove();
		var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version + '.' + com.swaas.hidoctor.edetailing.ui.view.Resource.application.release;
		$('body').append('<p class="copy_right">&copy; Powered by SwaaS - v' + version + '</p>');
	},
	
	autoCheck: function() {
		ED.configureAutosyncNotification();
		ED.configureAutoAssetCheck();
	},
	configureAutosyncNotification: function() {
		var cld = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO;
		if(cld.isAutoSyncRequired()) {
			if(com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()) {
				var $dialog = $('<div id="dialog-confirm" title="User Sync" style="background-color: white; font-size: 14px;">' +
						'<p style="background-color: white;"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;">' +
						'</span>' + com.swaas.hidoctor.edetailing.ui.view.Resource.messages.assetUpdateConfirm + '</p></div>');
				$('body').prepend($dialog);
				$dialog.trigger('create');
				$("#dialog-confirm").dialog({
					resizable : false,
					height : 140,
					modal : true,
					buttons : {
						"Yes" : function() {
							var cfg = cld.get();
							cfg.lastSyncCheck = (new Date()).getTime();
							cld.update(cfg);
							var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
							if(isConnected){
								var availabeDetail = ED.isNewVersionAvailable();
									
								if(availabeDetail.isNewAvailabe == true){
									alert(com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeMessage);
								}
								ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "settingsSync", "nonDCRSync" : true, "dcrSync": false});
							} else {
								alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
								return;
							}
							$(this).dialog("close");
						},
						"No" : function() {
							var cfg = cld.get();
							cfg.lastSyncCheck = (new Date()).getTime();
							cld.update(cfg);
							$(this).dialog("close");
						}
					}
				});
				/*var $dialog = $('<div data-role="page" id="dialog"><div data-role="header"><h1>Your Message</h1></div><div data-role="content" id="text"></div></div>')
				$('body').append($dialog);
				$dialog.trigger('create');
				$dialog.dialog();*/
				/*var cfm = confirm(com.swaas.hidoctor.edetailing.ui.view.Resource.messages.assetUpdateConfirm);
				if(cfm == true) {
					var cfg = cld.get();
					cfg.lastSyncCheck = (new Date()).getTime();
					cld.update(cfg);
					var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
					if(isConnected){
						var availabeDetail = ED.isNewVersionAvailable();
							
						if(availabeDetail.isNewAvailabe == true){
							alert(com.swaas.hidoctor.edetailing.ui.view.Resource.application.upgradeMessage);
						}
						ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "settingsSync", "nonDCRSync" : true, "dcrSync": false});
					} else {
						alert(com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.cannotPerformOperation);
						return;
					}
				} else {
					var cfg = cld.get();
					cfg.lastSyncCheck = (new Date()).getTime();
					cld.update(cfg);
				}	*/
			} else {
				alert(com.swaas.hidoctor.edetailing.ui.view.Resource.messages.noInternetAutoSync);
				var cfg = cld.get();
				cfg.lastSyncCheck = (new Date()).getTime();
				cld.update(cfg);
			}
		}
	},
	
	configureAutoAssetCheck: function() {
		var _this = this;
		var cld = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO;
		if(cld.isAutoAssetCheckRequired()) {
			if(ED.autoAssetCheckStarted != true) {
				ED.autoAssetCheckStarted = true;
				ED.showLoading('Searching Asset Updates... Please wait. This may take few minutes.');
				_this.autoCheckIntervalID = setInterval(function() {
					if(com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()) {
						ED.showLoading('Searching Asset Updates... Please wait. This may take few minutes.');
						_this.autoUpdateAssets(function(newDownload, toDownload) {
							ED.showLoading('Updating database ');
							_this.updateDatabase(toDownload, function() {
								if(ED.hasAssetCheckError) {
									alert(com.swaas.hidoctor.edetailing.ui.view.Resource.messages.assetCheckError());	
								}
								ED.updateToDownloadConfig();
								//com.swaas.hidoctor.edetailing.ui.view.Calendar.bindNotificationEvents(cfg.toDownloadCnt);
								ED.hideLoading();
								ED.autoAssetCheckStarted = false;
							});
						});
					} else {
						clearInterval(ED.autoCheckIntervalID);
						alert(com.swaas.hidoctor.edetailing.ui.view.Resource.messages.noInternetAutoAssetCheck);
						//ED.updateToDownloadConfig();
						ED.hideLoading();
						ED.autoAssetCheckStarted = false;
					}
				}, 5000);
			}	
		}
	},
	
	bindNotificationEvents: function(toDownloadCnt) {
		if(toDownloadCnt > 0) {
			$('#notificationCount').html(toDownloadCnt).show();
		} else {
			$('#notificationCount').html('').hide();
		}
		$( '#bell-anchor' ).on( "click", function( e ) {
			ED.redirect("view/downloadedocument/downloadAssetUpdates.html");
		});
	},
	
	autoUpdateAssets: function(success) {
		clearInterval(ED.autoCheckIntervalID);
		
		var _this = this;
		var user = ED.context.currentUser;
		var params = {
				userCode: user.userCode,
				companyCode: user.companyCode,
				correlationId: 1
		};
		//ED.showLoading();
		var newOnlineAssets = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO.updateSyncGet(params);
		
		var downloadAssets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAll();
		var outPutIds = [];
		$.each(downloadAssets, function(id, asset) {
			if ($.inArray(asset.onLineOutPutId, outPutIds) == -1){
				outPutIds.push(asset.onLineOutPutId);
			}
		});
		if(outPutIds != null && outPutIds.length > 0) {
			var retiredoutPutIds = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO.getRetired(1, user.companyCode, user.userCode, outPutIds);
			if(retiredoutPutIds != null && retiredoutPutIds.length > 0) {
				// to do if having reitred assets
				var retiredAssetNames = [];
				$.each(retiredoutPutIds, function(id, outPutId) {
					var assets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getByOutputId(outPutId);
					$.each(assets, function(id, asset) {
						com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(asset.downloadedFileName);
						com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(asset.downloadedThumbnail);
						if(asset.documentType == 'ZIP') {
							var zipUtil = new ZipUtil();
							zipUtil.deleteFile(asset);
						}
						com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.remove(asset.daCode, asset.productCode);
						retiredAssetNames.push(asset.name);
					});
				});
			}
		}
		
		var toDownload = new Array();
		var newDownload = new Array();
		var uOnlineAssets = _this.getUniqueAssetsBy(newOnlineAssets, 'daCode');
		var downAssets = _this.getUniqueAssetsBy(downloadAssets, 'daCode');
		
		for(var j=0;j<=uOnlineAssets.length-1;j++) {
			var offlineAsset = _this.getLocalAsset(downAssets, 'daCode', uOnlineAssets[j].daCode);
			if(offlineAsset != null) {
				if(offlineAsset.downloadable == 'Y' && offlineAsset.downloaded == 'N')
					toDownload.push(uOnlineAssets[j]);
			} else {
				toDownload.push(uOnlineAssets[j]);
				newDownload.push(uOnlineAssets[j]);					
			}
		}
		success(newDownload, toDownload);
	},
	
	updateDatabase: function(newDownload, success) {
		for(var i=0;i<=newDownload.length-1;i++) {
			com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.syncPut(newDownload[i]);
		}
		success();
	},
	
	autoDownloadZip: function(newDownload, success) {
		for(var i=0;i<=newDownload.length-1;i++) {
			com.swaas.hidoctor.edetailing.dao.ZipAssetLocalDAO.autoSyncZip(newDownload[i]);
		}
		success();
	},
	
	updateToDownloadConfig: function() {
		var _this = this;
		var downloadAssets = com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.getAll();
		var downAssets = _this.getUniqueAssetsBy(downloadAssets, 'daCode');
		var toDownload = new Array();
		for(var j=0;j<=downAssets.length-1;j++) {
			if(downAssets[j].downloadable == 'Y' && downAssets[j].downloaded == 'N')
				toDownload.push(downAssets[j]);
		}
		var cld = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO;
		var cfg = cld.get();
		cfg.lastAssetCheck = (new Date()).getTime();
		cfg.toDownloadCnt = toDownload.length;
		cld.update(cfg);
		com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.update(cfg);
		ED.bindNotificationEvents(cfg.toDownloadCnt);
	},
	
	/*bindNotificationEvents: function(toDownloadCnt) {
		if(toDownloadCnt > 0) {
			$('#retiredAssetsCnt span').html('Click here to download ' + toDownloadCnt + ' online assets').show();
		} else {
			$('#retiredAssetsCnt span').html(toDownloadCnt).hide();
		}
		$( '#retiredAssetsCnt span' ).on( "click", function( e ) {
			ED.redirect("view/downloadedocument/downloadAssetUpdates.html");
		});
	},*/
	
	getUniqueAssetsBy: function(assets, key) {
		var uniqueAssetsArray = new Array();
		if(assets != null && assets.length > 0) {
			var uniqueAssets = {};
			for(var i=0;i<=assets.length-1;i++) {
				if(uniqueAssets[assets[i][key]] == null) {
					uniqueAssets[assets[i][key]] = assets[i];
					uniqueAssetsArray.push(assets[i]);
				}
			}
		}
		return uniqueAssetsArray;
	},
	
	isAssetPresent: function(assets, key, value) {
		if(assets != null && assets.length > 0) {
			for(var i=0;i<=assets.length-1;i++) {
				if(assets[i][key] == value) {
					return true;
				}
			}
		}
		return false;
	},
	
	getLocalAsset: function(assets, key, value) {
		if(assets != null && assets.length > 0) {
			for(var i=0;i<=assets.length-1;i++) {
				if(assets[i][key] == value) {
					return assets[i];
				}
			}
		}
		return null;
	}, 
	
	matchesOutputId: function(outPutId, retiredAssets) {
		for(var i=0;i<=retiredAssets.length-1;i++) {
			if(retiredAssets[i] == outPutId) {
				return true;
			}
		}
		return false;
	},
	
	quit: function(){
		 navigator.app.exitApp();
	},
	
	redirectToHome: function(requestParams){
		//ED.redirect("test/index.html");
		//ED.redirect("view/downloadedocument/downloadEDocument.html", requestParams);
	    ED.redirect("view/calendar/calendar.html", requestParams);

		//ED.redirect("view/synchronize/sendDataToHiDoctor.html");
		//ED.context.selectedDate = new Date();
		//ED.redirect("view/dcr/attendance.html", requestParams);
		//ED.redirect("view/dcr/dcrNew.html", requestParams);
	    //ED.redirect("view/synchronize/prepareMyTablet.html", requestParams);
		//ED.redirect("view/doctor/tpDoctorsView.html?tpId=TP001");
	},
	
	clearTable: function(tableObject){
		tableObject.find('tr').remove();
	},
	
	removeTableRow: function(tableRowElement) {
		tableRowElement.remove();
	},
	context: {
		request:{}
	},
	
	formatDataForSync: function(data, columns){
		var dataArray = null;
		if (data instanceof Array){
			dataArray = data;
		} else {
			dataArray = [];
			dataArray.push(data);
		}
	
		var formatedData = "";
		
		var dateFormat = "dd/mm/yyyy";
		var configuration =  com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get();
		if (configuration != null && configuration.dateSettings != null){
			dateFormat = configuration.dateSettings;
		}
		
		for(var index = 0; index < dataArray.length; index++){
			var element = dataArray[index];
			if (index > 0){
				formatedData += "#"; //row delimiter
			}
			for (var jndex = 0; jndex < columns.length; jndex++){
				var name = columns[jndex].name;
				
				if (jndex > 0){
					formatedData += "^"; //column delimiter
				}
				var value = element[name];
				if (value == null){
					value = "";
				}
				if (value instanceof Date){
					value = value.format(dateFormat);
				}
				formatedData += value;
			}
		}
		
		return formatedData;
		
	},
	
	formatDataForSyncTwo: function(data, columns){
		var dataArray = null;
		if (data instanceof Array){
			dataArray = data;
		} else {
			dataArray = [];
			dataArray.push(data);
		}
	
		var formatedData = "";
		
		var dateFormat = "yyyy-mm-dd";
		var dateTimeFormat = "yyyy-mm-dd HH:MM:ss";
		
		for(var index = 0; index < dataArray.length; index++){
			var element = dataArray[index];
			if (index > 0){
				formatedData += "^"; //row delimiter changed for phase-2
			}
			for (var jndex = 0; jndex < columns.length; jndex++){
				var name = columns[jndex].name;
				
				if (jndex > 0){
					formatedData += "~"; //column delimiter changed for phase-2
				}
				var value = element[name];
				if (value == null || value == ""){
					value = "NULL";
				}
				if (value instanceof Date){
					if (columns[jndex].isTime != null && columns[jndex].isTime == true){
						value = value.format(dateTimeFormat);
					} else {
						value = value.format(dateFormat);
					}
					//alert(name + ": " + value + ", isTimeFormatted:" +  columns[jndex].isTime);
				}
				formatedData += value;
			}
		}
		console.log(formatedData);
		return formatedData;
		
	},
	
	checkDCRData : function() {
		var dcrVaules = com.swaas.hidoctor.edetailing.dao.DCRHeaderLocalDAO.getAll();
		var result = false;
		if(dcrVaules != null && dcrVaules.length > 0){
			result = true;
		} 
		return result;
	},
	getConfirmDCRUpsync : function(divId){
		var row = '';
		var confirmMessage=null;
		var Buttons = null;
		var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
		
		if(isConnected == true){
			Buttons = '<tr><td align="right"><input type="button" id="upSynchData" data-corners="false" data-inline="true" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.yesButtonMessage+'">&nbsp;' + 
			'<input type="button" data-inline="true" data-corners="false" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.cancelButtonMessage+'" id="noToEraseClean"></td></tr>';
			confirmMessage = com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.upSyncDCRMessage;
		}else{
			return divIdIn;
		}
		
	    var divIdIn = $(divId);
		var userName = ED.context.currentUser.userName;
		row +='<table cellspacing="0" cellpadding="0" width="100%" height="100%"><tr><td width="25%" height="230px">';
		row +='<table width="100%"  bgcolor="#1F4E79" height="100%"><tr><td align="center" valign="bottom"><img src="../../hidoctor/images/syncUp.png"></td></tr><tr><td align="center" valign="top"><font color="white" ><b>'+com.swaas.hidoctor.edetailing.ui.view.Resource.dcr.upSyncDCR+'</b></font></td></tr></table></td><td >';
		row +='<table width="100%"  bgcolor="#1589FF" height="100%" ><tr><td><font color="white" size="8px">'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.subject+'</font></td></tr><tr><td><font color="white">'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.dear+'&nbsp;'+userName+'</font></td></tr>';
		row +='<tr><td><font color="white" >'+confirmMessage+'</td></tr>';
		row +=Buttons;
		row +='</table></td></tr></table>';
		divIdIn.html('');
		divIdIn.append(row);
		
		if(isConnected == true){
			$("#upSynchData").button();
		}	
		
		$("#yesToEraseClean").button();
		$("#noToEraseClean").button();
		
		
		divIdIn.screenCenter();
		divIdIn.show();
		return divIdIn;
		
},
	getConfirmEraseAndClean : function(divId, isConnected){
			var row = '';
			var isUpSynchRequired = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getUpSyncRequired();
				//
			var confirmMessage=null;
			var Buttons = null;
			
			if(isUpSynchRequired ){
				if(isConnected == true){
					Buttons = '<tr><td align="right"><input type="button" id="upSynchData" data-corners="false" data-inline="true" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.yesButtonMessage+'">&nbsp;' + 
					//'<input type="button" data-inline="true" data-corners="false" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.continueWithoutUpSynch+'" id="yesToEraseClean"/>&nbsp;' + 
					'<input type="button" data-inline="true" data-corners="false" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.cancelButtonMessage+'" id="noToEraseClean"></td></tr>';
					confirmMessage = com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.messageUpSynchOnline;
				}else{
					Buttons = '<tr><td align="right">'+
					//'<input type="button" data-inline="true" data-corners="false" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.continueWithoutUpSynch+'" id="yesToEraseClean"/>&nbsp;'+
					'<input type="button" data-inline="true" data-corners="false" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.cancelButtonMessage+'" id="noToEraseClean"></td></tr>';
					confirmMessage = com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.messageUpSynchOffline;
				}
			}else{
				Buttons = '<tr><td align="right"><input type="button" data-inline="true" data-corners="false" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.yesButtonMessage+'" id="yesToEraseClean"/>&nbsp;<input data-inline="true" data-corners="false" type="button" value="'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.noButtonMessage+'" id="noToEraseClean"></td></tr>';
				confirmMessage = com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.message;
			}
			
		    var divIdIn = $(divId);
			var userName = ED.context.currentUser.userName;
			row +='<table cellspacing="0" cellpadding="0" width="100%" height="100%"><tr><td width="25%" height="230px" style="background-color: #1F4E79;">';
			row +='<table width="100%"  bgcolor="#1F4E79" height="100%"><tr><td align="center" valign="bottom"><img src="../../hidoctor/images/eraseAndClean.png"></td></tr><tr><td align="center" valign="top"><font color="white" ><b>'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.eraseClean+'</b></font></td></tr></table></td><td height="230px">';
			row +='<table width="100%"  bgcolor="#1589FF" height="100%" ><tr><td><font color="white" size="8px">'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.subject+'</font></td></tr><tr><td><font color="white">'+com.swaas.hidoctor.edetailing.ui.view.Resource.eraseAndClean.confirmationBox.dear+'&nbsp;'+userName+'</font></td></tr>';
			row +='<tr><td><font color="white" >'+confirmMessage+'</td></tr>';
			row +=Buttons;
			row +='</table></td></tr></table>';
			divIdIn.html('');
			divIdIn.append(row);
			
			if(isConnected == true){
				$("#upSynchData").button();
			}	
			
			$("#yesToEraseClean").button();
			$("#noToEraseClean").button();
			
			
			divIdIn.screenCenter();
			divIdIn.show();
			return divIdIn;
			
	},
	
	getConfirmPrepareMyTablet : function(divId){
		var row = '';
		var isUpSynchRequired = false;
		isUpSynchRequired = com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.getUpSyncRequired();
		var isConnected = com.swaas.hidoctor.edetailing.net.CoreNET.isConnected();
			//
		var confirmMessage=null;
		
		var Buttons = '<tr><td align="right"><input type="button" id="yesToPrepareMyTablet" data-inline="true" data-corners="false" value="'+
		com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.confirmation.yes+'"><input data-inline="true" data-corners="false" type="button" value="'+
		com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.confirmation.no+
		'" id="noToPrepareMyTablet"/>';
		
		if(isUpSynchRequired == true){
			confirmMessage =com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.confirmation.messageWithUpSync;
		} else {
			confirmMessage =com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.confirmation.message;
		}
		var divIdIn = $(divId);
		var userName = ED.context.currentUser.userName;
		row +='<table cellspacing="0" cellpadding="0" width="100%" height="100%"><tr><td width="25%" height="230px;">';
		row +='<table width="100%"  bgcolor="#1F4E79" height="100%"><tr><td align="center" valign="bottom">'+
			'<img src="../../hidoctor/images/prepareMyTablet.png"></td></tr><tr><td align="center" valign="top"><font color="white" ><b>'+
			com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.prapareMyTabletCaption+'</b></font></td></tr></table></td><td >';
		row +='<table width="100%"  bgcolor="#1589FF" height="100%" ><tr><td><font color="white" size="8px">'+
				com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.confirmation.subject+'</font></td></tr><tr><td><font color="white">'+
				com.swaas.hidoctor.edetailing.ui.view.Resource.prepareMyTablet.confirmation.dear+'&nbsp;'+userName+'</font></td></tr>';
		row +='<tr><td><font color="white" >'+confirmMessage+'</td></tr>';
		row +=Buttons;
		row +='</table></td></tr></table>';
		divIdIn.html('');
		divIdIn.append(row);
		$("#yesToPrepareMyTablet").button();
		$("#noToPrepareMyTablet").button();
		
		$('#yesToPrepareMyTablet').click(function(){
			divIdIn.hide();
			if(isUpSynchRequired == true){
				ED.redirect("view/synchronize/sendDataToHiDoctor.html", {"invokedFrom": "prepareMyTable", "nonDCRSync" : true, "dcrSync": false});
			} else {
				ED.redirect("view/synchronize/prepareMyTablet.html");	
			}
		});

		$('#noToPrepareMyTablet').click(function(){
			divIdIn.hide();						
		});	
		
		divIdIn.screenCenter();
		divIdIn.show();
		return divIdIn;
		
	},
	
	initializeGeoLocation : function(isAddressRequired) {
		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		navigator.geolocation.getCurrentPosition(successFunction,
				errorFunction, {
					enableHighAccuracy : true,
					maximumAge : 30000
				});
		function successFunction(position) {
			_this.latitude = position.coords.latitude;
			_this.longitude = position.coords.longitude;
			if(_this.latitude != null && _this.longitude != null ){
				if(isAddressRequired == true){
					var address = _this.getGeoLocationAddress(_this.latitude, _this.longitude);
					if(address != null && address != "undefined"){
						_this.geoAddress = address;
					}
				}
			}
		}
		function errorFunction(position) {
			_this.longitude = 0;
			_this.latitude = 0;
			_this.geoAddress = null;
		}
	},
	
	getGeoLocation: function(){
		var _this = com.swaas.hidoctor.edetailing.ui.view.CoreView;
		var position = {
				coords: {
					longitude:  _this.longitude,
					latitude: _this.latitude,
				},
				geoAddress : _this.geoAddress
		};
		return position;
	},
	
	getGeoLocationAddress : function(latitude, longitude){
		var _that = {
				metadata: {
					"server" : "https://maps.googleapis.com/maps/api/geocode/json",
					"properties": [
								{name: "latlng", inProperty: "latlng"},
								{name: "sensor", inProperty: "sensor"},
								{name : "results", outProperty : "results"}
								]
				}
		};
		
		var latlng = latitude+','+longitude;
		var params = {
				latlng : latlng,
				sensor : false
		};
		var resultDetails = null;
		if(latitude != 0 && longitude != 0){
			resultDetails = com.swaas.hidoctor.edetailing.dao.CoreREST.get(_that, null, params);
		}
		var address = null;
		if(resultDetails instanceof Array){
			var result = resultDetails[0].results;
			if(result != null && result instanceof Array){
				address = result[0].formatted_address;
			}
		}
		return address;
	},

	getAssetURL : function(asset) {
		var assetURL = '';
		if (asset.downloaded == 'Y'){
			var fileEntry = com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(asset.downloadedFileName);
			if (fileEntry != null){
				assetURL = fileEntry.fullPath;
			} else {
				asset.downloaded = 'N';
			}
		} else {
			var networkType = com.swaas.hidoctor.edetailing.net.CoreNET.getNetworkType();
			var user = com.swaas.hidoctor.edetailing.ui.view.CoreView.context.currentUser;
			if(networkType != null && networkType != '' && user != null && asset.documentType == 'VIDEO'){
				assetURL = com.swaas.hidoctor.edetailing.dao.DigitalAssetRemoteDAO.getAssetURL('1', user.companyCode, user.userCode, asset.onlineURL, networkType);
			}else{
				assetURL = asset.onlineURL;
			}
		}
		return assetURL;
	},
	
	getThumbnailURL : function(asset) {
		var thumbnailURL = '';
		if (asset.downloaded == 'Y'){
			if(asset.documentType == 'ZIP')
				return asset.thumbnailURL;
			var fileEntry = com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(asset.downloadedThumbnail);
			if (fileEntry != null){
				thumbnailURL = fileEntry.fullPath;
			} else {
				asset.downloaded = 'N';
			}			
		}
		
		if (asset.downloaded != 'Y'){
			if (com.swaas.hidoctor.edetailing.net.CoreNET.isConnected()){
				thumbnailURL = asset.thumbnailURL;
			} else {
				if (asset.documentType == 'VIDEO'){
					thumbnailURL = "../../hidoctor/images/offlineThumnailVideo.png";
				} else {
					thumbnailURL = "../../hidoctor/images/offlineThumnail.png";
				}
			}
			
		}
		return thumbnailURL;
	},
	
	//
	// Handle the back button
    //
	handleBackButton : function() {
		//Back button event listner
		document.addEventListener('backbutton', function(){ 
			if($('#page-story').size() > 0 && $('#html_viewer:visible')) {
				$('#html_viewer').hide();//.attr('src', '');
				$('#page-story, p.copy_right, .container').show();
			} else if ($('#page-download').size() > 0 && $('#html_viewer:visible')) {
				$('#html_viewer').hide();//.attr('src', '');
				$('#page-download, p.copy_right').show();
			} else {
				backButtonEventListner();
			}
		}, false);
	},
	
	submitErrors : function() {
		var div = $("#submitErrors");
		div.screenCenter();
		div.show();
		ED.showLoading(com.swaas.hidoctor.edetailing.ui.view.Resource.error.submitErrorCapton);
		ED.intervalId = setInterval(ED._submitErrors, 300);
	},
	
	isNewVersionAvailable : function(isAutoUpgrade){
		var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version + '.' + com.swaas.hidoctor.edetailing.ui.view.Resource.application.release;
		var currentAppDetilas = {
				correlationId : "1",
				appSuiteId : com.swaas.hidoctor.edetailing.ui.view.Resource.application.appSuiteId,
				appId :com.swaas.hidoctor.edetailing.ui.view.Resource.application.appId ,
				platform : com.swaas.hidoctor.edetailing.ui.view.Resource.application.platform,
				currentVersionNumber : version
		};
		
		var autoUpgradeDetails = com.swaas.hidoctor.edetailing.dao.UpgradeRemoteDAO.get(currentAppDetilas, ED.context.currentUser);
		var newVersion = {};
		//console.log('AutoUpgradeDetails : '+JSON.stringify(autoUpgradeDetails));
		newVersion.isNewAvailabe = false;
		newVersion.AlertMsgToUser = autoUpgradeDetails.AlertMsgToUser;  
		if(isAutoUpgrade)
		{
			if(autoUpgradeDetails != null 
					&& autoUpgradeDetails.IsNewVersionAvailable == true 
					&& autoUpgradeDetails.IsAutoUpgradeRequired == true)
			{
				if(autoUpgradeDetails.DownloadUrl.indexOf('http') == 0){
					newVersion.apkURL = autoUpgradeDetails.DownloadUrl;
					newVersion.isNewAvailabe = true;
				}
			}
		}else {
			if(autoUpgradeDetails.IsNewVersionAvailable == true){
				if(autoUpgradeDetails.DownloadUrl.indexOf('http') == 0){
					newVersion.isNewAvailabe = true;
					newVersion.apkURL = autoUpgradeDetails.DownloadUrl;
				}
			}
		}

		return newVersion;

	},
	
	upgradeAPK : function(isAutoUpgrade) {
		if(isAutoUpgrade == false){
			ED.showLoading('Checking latest Version...');
		}
		var availabeDetail = ED.isNewVersionAvailable(isAutoUpgrade);
		ED.hideLoading();
		if(isAutoUpgrade == false && availabeDetail.AlertMsgToUser != null){
			alert(availabeDetail.AlertMsgToUser);
		}
		
		if(isAutoUpgrade == true && availabeDetail.isNewAvailabe == true && availabeDetail.AlertMsgToUser != null){
			alert(availabeDetail.AlertMsgToUser);
		}
		if(availabeDetail.isNewAvailabe == true){
			ED.showLoading('Downloadig New Version...');
			var fileName = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID() + ".apk"; 
			var tempFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.tempFolder;
			var downloadedFileName = "file:///sdcard/" + tempFolder + "/" + fileName;
			var downloaderUtil = new Downloader();
			var apkURL  = availabeDetail.apkURL;
			downloaderUtil.downloadFile(apkURL, tempFolder, fileName, {}, function(progressStatus){
				if (progressStatus.status == -1){
					ED.hideLoading();
	            	ED.logError(com.swaas.hidoctor.edetailing.ui.view.Upgrade, progressStatus, 
	            			{fileName : fileName, tempFolder : tempFolder, version : version, platform :platform }, "upgradeAPK");
				}
				ED.showLoading('Downloadig New Version ' + progressStatus.progress + '%');
				if(progressStatus.progress >= 100){
					ED.hideLoading();
					console.log('Opening file: ' + downloadedFileName);
					window.plugins.fileOpener.open(downloadedFileName);	
				}
			});	
		} 
		
		return availabeDetail.isNewAvailabe;
	},

	_submitErrors: function(){
		clearInterval(ED.intervalId);
		var result = com.swaas.hidoctor.edetailing.service.ErrorSynchronizeService.syncError();
		var div = $("#submitErrors");
		div.hide();
		ED.hideLoading();
		if (result == "SUCCESS"){
			//$("#errorPushLI").remove();
			//$("#errorLogBtn").remove();
			com.swaas.hidoctor.edetailing.ui.view.Calendar.init();
			//$("#headerNavbar").navbar();
			//$("#settingsList").reload();
		} else {
			alert(com.swaas.hidoctor.edetailing.ui.view.Resource.messages.errorLogFail);
		}
	},
	
	getUniqueAssetsBy: function(assets, key) {
		var uniqueAssetsArray = new Array();
		if(assets != null && assets.length > 0) {
			var uniqueAssets = {};
			for(var i=0;i<=assets.length-1;i++) {
				if(uniqueAssets[assets[i][key]] == null) {
					uniqueAssets[assets[i][key]] = assets[i];
					uniqueAssetsArray.push(assets[i]);
				}
			}
		}
		return uniqueAssetsArray;
	},
};

ED =  com.swaas.hidoctor.edetailing.ui.view.CoreView;

//INITIALIZE PARAMETERS

var currentURL = decodeURI(window.location.href);
currentURL.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
	var attributeName = key;
	var currentObject = null;
	if (key.indexOf("_g_") == 0){
		attributeName = key.substring(3, key.length);
		currentObject = ED.context;
	} else {
		currentObject = ED.context.request;
	}
	
	var subAttributeNames = attributeName.split('.');
	$.each(subAttributeNames, function(index, subAttributeName){
		if (index == (subAttributeNames.length-1)){
			if (subAttributeName.indexOf("_date_") == 0){
				subAttributeName = subAttributeName.substring(6, subAttributeName.length);
				currentObject[subAttributeName] = new Date(value);
			} else {
				if (value.indexOf("()") > 0){
					value = value.replace("()", ":");
				}
				currentObject[subAttributeName] = value;
			}
		} else {
			if (currentObject[subAttributeName] == null){
				currentObject[subAttributeName] = {};
			}
			currentObject = currentObject[subAttributeName];
		}
	});
});


jQuery.fn.screenCenter = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
};




function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
