var globalPlayerSettings = {
	selectedAsset : null,
	selectedDoctor : ED.context.request.selectedDoctor,
	previousUrl : window.location.href
};

window.siteAnalyticsInsert = function(params) {
	//alert('Inside site anal');
	com.swaas.hidoctor.edetailing.dao.SiteAnalyticsLocalDAO.insert(params,
		function(result) {
			//alert('Success');
	}, function(e) {
			//alert('Fail');
	});
	//alert(JSON.stringify(com.swaas.hidoctor.edetailing.dao.SiteAnalyticsLocalDAO.get()));
};

window.siteAssetMasterInsert = function(params, success, failure) {
	//alert('Inside site assetmaster');
	//alert(JSON.stringify(params));
	com.swaas.hidoctor.edetailing.dao.SiteAssetMasterLocalDAO.insert(params,
			function(result) {
				//alert('Success-1');
			}, function(e) {
				//alert('Fail-1');
			});
	//alert(JSON.stringify(com.swaas.hidoctor.edetailing.dao.SiteAssetMasterLocalDAO.get()));
};

function iosPlayer(options) {
	this.container = null;
	this.options = options;
	this.docOpenDeatils = {
		docOpen : false,
		openTime : 0,
		closeTime : 0,
		daBillingId : null
	};
	this.selectedAsset = null;
    this.bAssetView = options.bAssetView;

}

iosPlayer.prototype.init = function() {
	var _this = this;
	$('.ui-page').eq(0)
			.append('<div class="container player_container" style="position: absolute; width: 100%; height: 100%; margin: 0px; padding: 0px; Z-index:999999"></div>');
	this.container = $('.container');
	this.createTab();
	/*
	 * document.addEventListener("backbutton", function(){
	 * com.swaas.hidoctor.edetailing.ui.view.story.backFromDocOpen(_this.docOpenDeatils);
	 * $('.player_container').remove(); }, false);
	 */
	document.addEventListener("resume", function() {
		com.swaas.hidoctor.edetailing.ui.view.story
				.backFromDocOpen(_this.docOpenDeatils);
		// $('.player_container').remove();
	}, false);
};
iosPlayer.prototype.createTab = function() {
	var _this=this;
	// alert("1");
    var panel='';
    //panel+='<div class="close-button" id="close-button" onclick="return false;">Back</div>';
    panel+='<div class="panel">';
    //panel+='<div class="close-button" id="close-button" onclick="return false;"></div>';
    panel+='<ul class="tabs-nav">';
  //panel+='<li class="tab-2"><a href="#tab-2" rel="nofollow">Reviews</a></li>';
    panel+='</ul>' + this.tabContainer();
    panel+='</div>';
    
    this.container.html(panel);
    com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntry(com.swaas.hidoctor.edetailing.ui.view.Resource.download.edFolder + '/logo/logo.jpg', function(fileEntry) {
    	companyLogo = fileEntry.fullPath;
    	var logo ='<li class="brand-logo"><img src="' + companyLogo + '" alt="" height="50px"/></li>';
    	$('.tabs-nav').append(logo);
    }, function(e) {
    });
    
    $('.tabs-nav a').bind('click', function (event) {
        $('.tab-active').removeClass('tab-active');
        $(this).parent().addClass('tab-active');
        if($(this).parent().hasClass("tab-2")){
            com.swaas.hidoctor.edetailing.ui.view.story.backFromDocOpen(_this.docOpenDeatils);
        }else{
            //_this.showFrame(_this.selectedasset);
        }
        $('.tabs-stage > div').hide();
        $($(this).attr('href')).show();
    });
};
iosPlayer.prototype.tabContainer = function() {
	var tabContainer='';
    tabContainer+='<div class="tabs-stage"><div id="tab-1" class="tabs-cont" style="display: block;">';
    tabContainer+='<iframe id="myIframe" style="display:none;background:#fff;" frameborder="0" scrolling="auto" ></iframe>';
    tabContainer+='<div id="divFrame" style="display:none;"></div>';
    tabContainer+='</div>';
    tabContainer+='<div id="tab-2" class="tabs-cont" style="display:none">';
    //tabContainer+=this.ratingCount();
    
    tabContainer+='</div>';
    tabContainer+='</div>';
    
    return tabContainer;
};
iosPlayer.prototype.show = function() {
	var _this = this;
	this.init();
	$('.tabs-nav li:first a').trigger('click');
	this.createTray();
	_this.currentasset = (_this.currentasset != null) ? _this.currentasset
			: this.options.assetLists[0];
	_this.index = 0;
	this.showFrame(_this.currentasset);
};
iosPlayer.prototype.createTray = function() {
	var _this = this;
	var trayHtml = '';
	var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version + '.' + com.swaas.hidoctor.edetailing.ui.view.Resource.application.release;
	trayHtml += '<div class="tray"><div class="asset_action"><div onclick="return false" id="player_back"></div><div onclick="return false" id="tab_flip"></div></div><div class="asset_slider"><ul class="item_div"></ul></div><div class="asset_navg"><div class="prev" onclick="return false" id="prev"></div><div class="next" onclick="return false" id="next"></div></div><span class="toggle-tray"></span><p class="copy_right"> &copy; Powered by SwaaS - v' + version + '</p></div>';
	this.container.append(trayHtml);
	this.displayTray();

	$('#prev').unbind('click').bind('click', function(event) {
		$('#tab-1').show();
		$('#tab-2').hide();
		_this.changeAsset(true);
	});
	$('#next').unbind('click').bind('click', function(event) {
		$('#tab-1').show();
		$('#tab-2').hide();
		_this.changeAsset(false);
	});
	 $('#player_back').bind('click',function (event) {
         _this.closeFun();
         _this.container.remove();
         com.swaas.hidoctor.edetailing.ui.view.story.backFromDocOpen(_this.docOpenDeatils);
        $("#asset_part").show();
        $('.menu .product_sec').show();
        $('.search_sec').css('visibility', 'visible');
        $('.product_search').val('');
        $('#story_part, #show_part').hide();
        $('.slide_menu li').removeClass('active');
        $('.slide_menu li').first().addClass('active');

     });
	$('#tab_flip').unbind('click').bind('click',function() {
		var actEl = $('.tabs-cont:visible'), nxtEl = $('.tabs-cont:hidden');
		if (nxtEl.attr('id') == 'tab-2') {
			com.swaas.hidoctor.edetailing.ui.view.story.backFromDocOpen(_this.docOpenDeatils);
		}
		actEl.hide();
		nxtEl.show();
	});
	$('.toggle-tray').bind('click', function() {
		var hgt = $('.tabs-stage').outerHeight();
		if (!$('.tray').hasClass('tray_hide')) {
			$('.tray').animate({
				'bottom' : '-80px'
			}, 400, function() {
				// $('.tabs-stage, .tabs-cont, #divFrame').css('height',
				// (hgt+100)+'px');
				$(this).addClass('tray_hide');
			});
		} else {
			$('.tray').animate({
				'bottom' : '0px'
			}, 400, function() {
				// $('.tabs-stage, .tabs-cont, #divFrame').css('height',
				// (hgt-100)+'px');
				$(this).removeClass('tray_hide');
			});
		}
		return false;
	});

};
iosPlayer.prototype.displayTray = function() {
	var _this = this;
	var assetLists = this.options.assetLists;
	var html = '';
	for ( var i = 0; i < assetLists.length; i++) {
		// $(".item_div").append('<li class="item" id='+assetLists[i].daCode+'
		// onclick="return false"><img class="asset_thumb"
		// src='+assetLists[i].thumbnailURL+' /></div>');
		// alert(i==0?'active':'');
		if (i == 0) {
			html += '<li class="item active" id=' + assetLists[i].daCode
					+ ' onclick="return false"><img class="asset_thumb" src='
					+ assetLists[i].thumbnailURL + ' /></li>';
		} else {
			html += '<li class="item" id=' + assetLists[i].daCode
					+ ' onclick="return false"><img class="asset_thumb" src='
					+ assetLists[i].thumbnailURL + ' /></li>';
		}
		// html += '<li class="item '+(i==0?'active':'')+'"
		// id='+assetLists[i].daCode+' onclick="return false"><img
		// class="asset_thumb" src='+assetLists[i].thumbnailURL+' /></li>';

	}
	// alert(html);
	$(".item_div").html(html);
	var slider = $('.item_div').bxSlider({
		minSlides : 1,
		maxSlides : 6,
		slideWidth : 100,
		slideMargin : 10,
		pager : false,
		infiniteLoop : false,
		moveSlides : 1
	});

	$('.item').unbind('click').bind('click', function(event) {
		$('#tab-1').show();
		$('#tab-2').hide();
		$('.item').removeClass("active");
		$(this).addClass("active");
		var index = $(this).index();
		_this.index = index;
		_this.currentasset = assetLists[index];
		_this.showFrame(assetLists[index]);
	});
};
iosPlayer.prototype.changeAsset = function(bPrev) {
	var _this = this;
	var curIndex = _this.index;
	// alert(curIndex);
	if (bPrev) {
		curIndex = (curIndex == 0) ? 0 : curIndex - 1;
	} else {
		curIndex = (curIndex == this.options.assetLists.length - 1) ? curIndex
				: curIndex + 1;
	}
	_this.index = curIndex;
	$('.item').removeClass("active");
	$('.item').eq(_this.index).addClass("active");
	// alert(_this.index);
	_this.showFrame(this.options.assetLists[_this.index]);

};
iosPlayer.prototype.showFrame = function(currentasset) {
//alert("show frame");
	var _this = this;
	
	_this.currentasset = currentasset;
	com.swaas.hidoctor.edetailing.ui.view.story.clickedAsset = currentasset;
	globalPlayerSettings.selectedAsset = currentasset;
	if(currentasset.offLineURL.endsWith('.zip') && currentasset.downloaded == 'N') {
    	alert(com.swaas.hidoctor.edetailing.ui.view.Resource.messages.downloadAssetToPlay);
		return;
    }
	$("#divFrame").html("");
	$("#myIframe").show();
	_this.resetFunction();
	var documentType = currentasset.documentType;
	this.ratingCount();
	$('.tabs-nav li:first a').trigger('click');
	var tabheight = $(".tabs-nav").height();
	var trayheight = $(".tray").height();
	var panelheight = $(".panel").height();
	var windowheight = $(window).height();
	var contentheight = (windowheight - (tabheight + trayheight)) + 'px';
	$("#divFrame").css({
		"height" : contentheight,
		"line-height" : contentheight
	});
	//alert(_this.docOpenDeatils);
	com.swaas.hidoctor.edetailing.ui.view.story.backFromDocOpen(_this.docOpenDeatils);
	//alert(_this.bAssetView);
	com.swaas.hidoctor.edetailing.ui.view.story.assetClicked(currentasset, _this.bAssetView,function(daBillingId, docOpenDeatils, storyAnalyticsId) {
	//alert(storyAnalyticsId);
		_this.docOpenDeatils = docOpenDeatils;
		var isAssetDownloaded = currentasset.downloaded;
		com.swaas.hidoctor.edetailing.ui.view.CoreViewIos.getAssetVideoURL(currentasset,function(assetURL) {
			var ext = assetURL.substr(assetURL.lastIndexOf('.') + 1,assetURL.length - 1);
			if (documentType == 'VIDEO') {
				_this.docOpenDeatils.daBillingId = daBillingId;
				_this.docOpenDeatils.storyAnalyticsId = storyAnalyticsId;
				_this.docOpenDeatils.openTime = (new Date()).getTime();
				_this.docOpenDeatils.docOpen = true;
				$("#myIframe").hide();
				$("#divFrame").show();
				$("#divFrame").append("<img src='../../hidoctor/images/fileType/video.jpg' id="+ assetURL+ " onclick='videoFunction(assetURL)' />");
				//window.plugins.videoPlayer.play([ assetURL, null ]);
				window.plugins.fileOpener.open(assetURL);
			} else {
				_this.docOpenDeatils.daBillingId = daBillingId;
				_this.docOpenDeatils.storyAnalyticsId = storyAnalyticsId;
				if (isAssetDownloaded == 'Y') {
				//alert(1);
					var d = new Date();
					_this.docOpenDeatils.openTime = d.getTime();
					_this.docOpenDeatils.docOpen = true;
                    if ((ext == 'ppt')|| (ext == 'pdf')|| (ext == 'pptx') || (ext == 'xls') || (ext == 'xlsx') || (ext == 'doc') || (ext == 'docx') || (ext == 'bmp') || (ext == 'tif') || (ext == 'tiff') || (ext == 'swf')) {
						$("#myIframe").hide();
						$("#divFrame").show();
						if (ext == 'pdf') {
							$("#divFrame").append("<img src='../../hidoctor/images/fileType/pdf.png'/>");
						} else if ((ext == 'ppt')|| (ext == 'pptx')) {
							$("#divFrame").append("<img src='../../hidoctor/images/fileType/ppt.png'/>");
						} else  {
							$("#divFrame").append("<img src='../../hidoctor/images/fileType/doc.jpg' />");
						}
						window.plugins.fileOpener.open(assetURL);
					} else {
						if (ext == 'tif'|| ext == 'tiff')
							window.plugins.fileOpener.open(assetURL);
						else if (ext == 'html') {
							$("#divFrame").hide();
							_this.container.hide();
							$('#page-story, p.copy_right').hide();
							$('#html_viewer').show().attr('src', assetURL);
							$('#html_viewer').load(function(){
								$('#html_viewer').contents().find('.obj-string').text(JSON.stringify(globalPlayerSettings));
								$('#html_viewer').contents().find('body').addClass('loaded');
							});
						} else {
							$("#myIframe").show();
							$("#divFrame").hide();
							$("#myIframe").attr("src",assetURL);
						}
					}
				} else {
				//alert(2);
					var ext = "";
					var assetURLSplit = assetURL.split(".");
					if (assetURLSplit != null && assetURLSplit.length > 0) {
						ext = assetURLSplit.pop();
						ext = "." + ext;
					}
					//alert(ext);
					var assetCode = currentasset.daCode;
					var fileName = assetCode + ext;
					var tempFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.tempFolder;
					var downloadedFileName = "file:///sdcard/"+ tempFolder+ "/"+ fileName;
					com.swaas.hidoctor.edetailing.util.FileUtil.checkIfFileExists(downloadedFileName,function(isFileExist) {
						if (!isFileExist) {
							var firstOpen = true;
							ED.showLoading();
							var downloaderUtil = new Downloader();
							var context = _this;
							downloaderUtil.downloadFile(assetURL,tempFolder,fileName,{},function(progressStatus) {
								if (progressStatus.status == -1) {
									ED.logError(com.swaas.hidoctor.edetailing.ui.view.eDetailing,progressStatus,com.swaas.hidoctor.edetailing.ui.view.story.clickedAsset,"playOrOpenAsset");
								}
								if (progressStatus.progress == 100 && firstOpen) {
									firstOpen = false;
									ED.hideLoading();
									var d = new Date();
									_this.docOpenDeatils.openTime = d.getTime();
									_this.docOpenDeatils.docOpen = true;
									ext = ext.replace('.','');
									if ((ext == 'ppt') || (ext == 'pdf') || (ext == 'pptx') || (ext == 'xls') || (ext == 'xlsx') || (ext == 'doc') || (ext == 'docx') || (ext == 'bmp') || (ext == 'tif') || (ext == 'tiff') || (ext == 'swf')) {
										$("#myIframe").hide();
										$("#divFrame").show();
										if (ext == 'pdf') {
											$("#divFrame").append("<img src='../../hidoctor/images/fileType/pdf.png'/>");
										} else if ((ext == 'ppt') || (ext == 'pptx')) {
											$("#divFrame").append("<img src='../../hidoctor/images/fileType/ppt.png'/>");
										} else {
											$("#divFrame").append("<img src='../../hidoctor/images/fileType/doc.jpg' />");
										}
										    // $("#divFrame").append("<img src=""/>");
										window.plugins.fileOpener.open(downloadedFileName);
									} else {
									
									//alert(downloadedFileName);
										$("#myIframe").show();
										$("#divFrame").hide();
										$("#myIframe").attr("src",downloadedFileName);
									}
								}
							});
						} else {
						//alert(3);
							_this.docOpenDeatils.openTime = d.getTime();
							_this.docOpenDeatils.docOpen = true;
							if ((ext == 'ppt') || (ext == 'pdf') || (ext == 'pptx') || (ext == 'xlsx') || (ext == 'xls') || (ext == 'doc') || (ext == 'docx') || (ext == 'bmp') || (ext == 'tif') || (ext == 'tiff') || (ext == 'swf')) {
								$("#myIframe").hide();
								$("#divFrame").show();
								if (ext == 'pdf') {
								   $("#divFrame").append("<img src='../../hidoctor/images/fileType/pdf.png'/>");
								} else if ((ext == 'ppt') || (ext == 'pptx')) {
									$("#divFrame").append("<img src='../../hidoctor/images/fileType/ppt.png'/>");
								} else {
									$("#divFrame").append("<img src='../../hidoctor/images/fileType/doc.jpg' />");
								}
								// $("#divFrame").append("<img src=""/>");
								window.plugins.fileOpener.open(downloadedFileName);
							} else if(ext == 'html') {
								alert(downloadedFileName);
								location.href = downloadedFileName;
							} else {
								$("#myIframe").show();
								$("#divFrame").hide();
								$("#myIframe").attr("src",downloadedFileName);
							}
						}
					});
				}
			}
		$("#myIframe").unbind('load').load(function() {
			if (ext == 'ppt') {
				$(".panel").css("position","static");
			} else if (ext == 'mp4') {
				$(".panel").css("position","fixed");
			} /*else if (ext == 'html') {
				$(".panel").css("position","static");
			}*/
			var bdy = $(this).contents().find('body');
			bdy.append("<style>.inner > img{max-width:100%;} .inner-ppt {padding-bottom:100px; position:relative;} .slide{ left: 50% !important; margin-left: -360px ; } </style>");
			var cont = bdy.html();
			var html = '<div id="a" class="inner inner-ppt">' + cont + '</div>';
			bdy.html(html);
		});

		$(document).on('click','#like_button',function(event) {
			com.swaas.hidoctor.edetailing.ui.view.story.assetLike(currentasset,true);
		});
	
		$(document).on('click','#dislike_button',function(event) {
			com.swaas.hidoctor.edetailing.ui.view.story.assetLike(currentasset,false);
		});
	
		$(document).on('click','.rate-div ul li a',function(event) {
			var rateValue = ($(this).parent().index() + 1);
			$('.rate-div ul li a').removeClass('full-img');
			for ( var i = 0; i < rateValue; i++) {
				console.log($('.rate-div ul li').eq(i));
				$('a',$('.rate-div ul li').eq(i))
				.addClass("full-img");
			}
			com.swaas.hidoctor.edetailing.ui.view.story.insertRatingAnalytics(currentasset,rateValue);
		});
	
		$(document).on('click','.rate-div ul li a',function(event) {
			return false;
		});
	});
});
};
iosPlayer.prototype.checkVideo = function(assetURL) {
	var _this = this;
	_this.docOpenDeatils.daBillingId = daBillingId;
	_this.docOpenDeatils.storyAnalyticsId = storyAnalyticsId;
	_this.docOpenDeatils.openTime = (new Date()).getTime();
	_this.docOpenDeatils.docOpen = true;
	$("#myIframe").show();
	$("divFrame").hide();
	$("#myIframe").attr("src", assetURL);
	$("#myIframe")
			.unbind('load')
			.load(
					function() {
						var bdy = $(this).contents().find('body');
						bdy
								.append("<style>.inner > img{max-width:100%;} .inner-ppt {padding-bottom:100px; position:relative;} .slide{ left: 50% !important; margin-left: -360px ; } </style>");
						var cont = bdy.html();
						var html = '<div id="a" class="inner inner-ppt">'
								+ cont + '</div>';
						bdy.html(html);
					});
}

iosPlayer.prototype.resetFunction = function() {
	$('.rate-div ul li a').removeClass('full-img');
	$('#comments').val('');
}
iosPlayer.prototype.closeFun = function() {
	// alert("close");
}
iosPlayer.prototype.ratingCount = function(onSuccess) {
	var _this = this;
	// var currentasset=this.options.currentAsset;
	// alert(JSON.stringify(currentasset));
	// alert(currentasset.daCode);
	$('#tab-2').empty();
	com.swaas.hidoctor.edetailing.service.AssetService
			.getAllTags(
					function(tags) {
						// alert(JSON.stringify(tags));
						// com.swaas.hidoctor.edetailing.ui.view.Rating.setRating($('#tab-2'),
						// analytics.starValue);
						var ratingContainer = '';
						ratingContainer += '<div class="top-div">';
						ratingContainer += '<div class="sec1"><p>'
								+ _this.currentasset.name
								+ '</p><div class="thumb_url"><img src="'
								+ _this.currentasset.thumbnailURL
								+ '" /></div></div>';
						ratingContainer += '<div class="sec2"><div class="rating">Average Rating: '
								+ _this.currentasset.starValue
								+ '</div><div class="myRating">Your Rating:</br>';
						ratingContainer += '<div class="rate-div" id="inputRatingDisplay">';
						ratingContainer += '<ul>';
						ratingContainer += '<li><a href="#" id="rate1"></a></li>';
						ratingContainer += '<li><a href="#" id="rate2"></a></li>';
						ratingContainer += '<li><a href="#" id="rate3"></a></li>';
						ratingContainer += '<li><a href="#" id="rate4"></a></li>';
						ratingContainer += '<li><a href="#" id="rate5"></a></li>';
						ratingContainer += '</ul>';
						ratingContainer += '</div>';
						ratingContainer += '<div class="rate-div" id="ratingThankyou" style="display:none" >Thanks for rating</div>';
						ratingContainer += '</div>';
						ratingContainer += '<div class="like-div">';
						ratingContainer += '<a class="like" href="#" id="like_button" onclick="return false"></a>';
						ratingContainer += '<a class="dislike" href="#" id="dislike_button" onclick="return false"></a>';
						ratingContainer += '<a href="#" id="likeDislikeThankyou" class="likeDislikeThankyou" style="display:none">Thanks for like/dislike</a>';
						ratingContainer += '</div>';
						ratingContainer += '</div>';

						ratingContainer += '<div class="sec3"><div id="watch7-views-info"><div class="watch-view-count">'
								+ _this.currentasset.totalViewsCount + '</div>';
						ratingContainer += '<div class="video-extras-sparkbars">';
						ratingContainer += '<div style="width: 100%" class="video-extras-sparkbar-likes"></div>';
						ratingContainer += '<div  class="video-extras-sparkbar-dislikes"></div>';
						ratingContainer += '</div>';
						ratingContainer += '<span class="video-extras-likes-dislikes">';
						ratingContainer += '<img title="Like" class="icon-watch-stats-like yt-sprite" src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">';
						ratingContainer += '<span class="likes-count">'
								+ _this.currentasset.totalLikesCount
								+ '</span>&nbsp;&nbsp;&nbsp;<img title="Dislike" class="icon-watch-stats-dislike yt-sprite" src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"><span class="dislikes-count">'
								+ _this.currentasset.totalDislikesCount
								+ '</span></span>';
						ratingContainer += '</div>';
						ratingContainer += '</div>';
						ratingContainer += '</div>';
						ratingContainer += '<div class="border"></div>';
						ratingContainer += '<div class="share">Share us your Views</div>';

						ratingContainer += '<div class="right-sec">';
						ratingContainer += '<ul id="mytags"></ul>';
						ratingContainer += '</div>';

						/*ratingContainer+='<ul>';
						 ratingContainer+='<li class="rating"><ul>';
						 starValue=_this.currentasset.starValue;
						 var decValue,oriValue;
						 starValue = starValue.toString();
						 posValue= starValue.indexOf('.');
						 if(posValue > -1){
						 decValue=starValue.substr(posValue+1,starValue.length);
						 }
						 oriValue = parseInt(starValue,10);
						 var rate='';
						 for(var i=1;i<=5;i++){
						 if(i<=oriValue){
						 rate+='<li><a href="#" class="full-img" ></a></li>';
						 }else{
						 rate+='<li><a href="#"  ></a></li>';
						 }
						 }
						 //alert(JSON.stringify(analytics));
						 ratingContainer+=rate+'</ul></li>';


						 ratingContainer+='<li class="rating-count"><label>'+_this.currentasset.starValue+'</label> Stars</li>';
						 ratingContainer+='<li class="total-views"><label>'+_this.currentasset.totalViewsCount+'</label> Views</li>';
						 ratingContainer+='<li class="total-like"><label>'+_this.currentasset.totalLikesCount+'</label> Likes</li>';
						 ratingContainer+='<li class="total-dislike"><label>'+_this.currentasset.totalDislikesCount+'</label> Dislikes</li>';
						 ratingContainer+='</ul>';
						 ratingContainer+='</div>';
						 ratingContainer+='<div class="bottom-div">';
						 ratingContainer+='<div class="left-sec">';
						 ratingContainer+='<div class="like-div">';
						 ratingContainer+='<a class="like" href="#" id="like_button" onclick="return false"></a>';
						 ratingContainer+='<a class="dislike" href="#" id="dislike_button" onclick="return false"></a>';
						 ratingContainer+='<a href="#" id="likeDislikeThankyou" class="likeDislikeThankyou" style="display:none">Thanks for like/dislike</a>';
						 ratingContainer+='</div>';
						 ratingContainer+='<div class="rate-div" id="inputRatingDisplay">';
						 ratingContainer+='<ul>';
						 ratingContainer+='<li><a href="#" id="rate1"></a></li>';
						 ratingContainer+='<li><a href="#" id="rate2"></a></li>';
						 ratingContainer+='<li><a href="#" id="rate3"></a></li>';
						 ratingContainer+='<li><a href="#" id="rate4"></a></li>';
						 ratingContainer+='<li><a href="#" id="rate5"></a></li>';
						 ratingContainer+='</ul>';
						 ratingContainer+='</div>';
						 ratingContainer+='<div class="rate-div" id="ratingThankyou" style="display:none" >Thanks for rating</div>';
						 ratingContainer+='</div>';
						 ratingContainer+='<div class="right-sec">';
						 ratingContainer+='<ul id="mytags"></ul>';
						 ratingContainer+='</div>';
						 ratingContainer+='</div>';*/

						$("#tab-2").prepend(ratingContainer);
						var availableTags = [];
						$.each(tags, function(id, tag) {
							if (tag.tagDescription != null
									&& tag.tagDescription.length > 1) {
								availableTags.push(tag.tagDescription);
							}
						});
						var options2 = {};

						options2["availableTags"] = availableTags;
						//alert(options2["availableTags"]);
						//$("#mytags").tagSelect(options2);
						$("#mytags").tagit(options2);
						var list = $('#listViewTag');
						list
								.bind(
										'liAdded',
										function(event, li) {
											var enteredTag = $(li).text();
											//alert(enteredTag);
											if (enteredTag.length > 2) {
												enteredTag = enteredTag
														.substring(
																0,
																enteredTag.length - 2); //removing space and X
											}

											enteredTag = enteredTag.trim();
											com.swaas.hidoctor.edetailing.ui.view.story
													.onTagAdded(
															_this.currentasset,
															enteredTag,
															_this.currentasset.daCode,
															function(
																	daTagAnalyticId) {
																com.swaas.hidoctor.edetailing.service.AssetService
																		.getAllTags(
																				function(
																						savedTags) {
																					$(
																							li)
																							.attr(
																									"id",
																									daTagAnalyticId);
																					var defaultTags = [];
																					$
																							.each(
																									savedTags,
																									function(
																											i,
																											tagSaved) {
																										defaultTags
																												.push(tagSaved.tagDescription);
																									});
																					if ($
																							.inArray(
																									enteredTag,
																									defaultTags) < 0) {
																						com.swaas.hidoctor.edetailing.ui.view.story
																								.onNewTagAdded(enteredTag);
																						//$('div.ui-input-search').blur()
																					}

																				},
																				null);
															});
										});
						list.bind('liRemoved', function(event, li) {
							var tag = $(li).text();
							tag = tag.trim();
							var daTagAnalyticId = li.id;
							com.swaas.hidoctor.edetailing.ui.view.story
									.deleteAnalytics(daTagAnalyticId);
						});

						//return ratingContainer;
					}, null);
}
iosPlayer.prototype.selectRate = function(onSelect) {
	$(document).on('click', '.rate-div ul li a', function(event) {
		var rateValue = ($(this).parent().index() + 1);
		$('.rate-div ul li a').removeClass('full-img');
		for ( var i = 0; i < rateValue; i++) {
			$('a', $('.rate-div ul li').eq(i)).addClass("full-img");
		}
		onSelect(rateValue);
	});
}