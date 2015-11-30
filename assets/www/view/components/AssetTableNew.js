function AssetTableNew(options) {
    this.options = $.extend(null, options);

    this.ctxMenu = null;
    this.container = options.container;
    this.$container = $(options.container);
    this.tableId = options.tableId;
    this.$tableId = null;
    this.assets = options.assets;
    this.product = options.product;
    this.onAssetClicked = options.onAssetClicked;
    this.init();
}

AssetTableNew.prototype.init = function() {
	//alert("init");
    var _this=this;
    $('p.warning_msg, p.info_msg').remove();
    $('.' + this.tableId).remove();
    if(this.container) {
        //this.$container.append('');
        this.$container.append('<ul class="' + this.tableId + '"></ul>');
        this.$tableId = $('.' + this.tableId);
    }
    $('.menu_list').hide();
    com.swaas.hidoctor.edetailing.dao.storyLocalDAO.get(function(storyList){ _this.afterLoadStory(storyList); });
};
AssetTableNew.prototype.afterLoadStory = function(storyList) {
	var _this = this; 
	_this.storyList=storyList;
     _this.display();
};

AssetTableNew.prototype.display = function() {
    var _this = this;
    $.each(this.assets, function(i, asset){
    	asset.productCode = _this.product.productCode;
    	asset.productName = _this.product.productName;
        _this.addColumn(asset);
    });
    
    if($('.info_msg').length>0){
    	$('.info_msg').remove();
	}
    this.$container.prepend('<p class="info_msg">Total Assets found : ' + this.assets.length + '</p>');
};

AssetTableNew.prototype.addColumn = function(asset) { 
    var _this = this;
    var curEl = $('<li id="asset_id_'+asset.daCode+'"></li>');
    curEl.append('<img class="tickimg" id="not_select" src="../../hidoctor/images/Not_Selected_Asset.png" /><img class="tickimg" id="select" style="display:none" src="../../hidoctor/images/Selected_Asset.png" /><p class="success_msg" style="display:none;">Asset has been added to show list</p>');
    
    var thumbHtml = '';
    
    com.swaas.hidoctor.edetailing.ui.view.CoreViewIos.getThumbnailURL(asset, function(thumbnailURL){
    	thumbHtml += '<div class="assetimg_div">' +
            '<img class="thumb_img" src="' + thumbnailURL + '" /></div>';
        console.log(curEl);                                                           
        curEl.append(thumbHtml);
        
        var detailHtml = $('<div class="bottom_div"></div>');
        var assetType = '<div class="doc_type">';
        if(asset.documentType == 'VIDEO')
            assetType += '<img class="player_thumb" src="../../hidoctor/images/playNew.png" />';
        else if(asset.documentType == 'IMAGE')
            assetType += '<img class="player_thumb" src="../../hidoctor/images/image.png" />';
        else if(asset.documentType == 'DOCUMENT')
            assetType += '<img class="player_thumb" src="../../hidoctor/images/pdf.png" />';
        else if(asset.documentType == 'ZIP')
        	assetType += '<img class="player_thumb" src="../../hidoctor/images/zip.png" />';
        assetType += '</div>';
                                                                   
        detailHtml.append(assetType);
        
        var assetFeat = '<div class="asset_name"><div class="asset_div"><p class="name">' + asset.name + '</p>';
        assetFeat += '<p class="status">' + (asset.downloaded == 'Y' ? 'Offline' : 'Online') + '</p></div>';
        assetFeat += '<img class="expand" src="../../hidoctor/images/Expand.png" onclick="return false" />';
        
        var assetRating = '<div class="rating_div"><div class="rating_stars" id="rating_star_'+ asset.daCode+'"></div>';
            assetRating += '<div style="width: 50%; float: right;"><div  style="float: right; width: 50%;" class="views">' + asset.totalViewsCount + '</div><div style="float: right; width: 30%;" class="like">' + asset.totalLikesCount + '</div></div>';
            assetRating += '</div>';
        
        assetFeat = assetFeat + assetRating + '</div>';
        detailHtml.append(assetFeat);
        curEl.append(detailHtml);
        _this.$tableId.append(curEl);
        _this.jqueryContext(curEl,asset);
        
                          
        $('.thumb_img', curEl).unbind('click').bind('click', function(){
            if(asset.offLineURL.endsWith('.zip') && asset.downloaded == 'N') {
            	alert(com.swaas.hidoctor.edetailing.ui.view.Resource.messages.downloadAssetToPlay);
        		return;
            }
        	var assetAry = new Array();
            assetAry.push(asset);
            var iosPlayer1= new iosPlayer({
                assetLists :  assetAry,
                bAssetView: true
            });
            iosPlayer1.show();
            return false;
        });
        
       curEl.bind('taphold', function(e){
             var curElement = $(e.target);
             
             if(!curElement.hasClass('expand')){
                     var bAdded = $(this).hasClass('added');
                     $('.menu_list').hide();
                     
                     var playList = com.swaas.hidoctor.edetailing.ui.view.story.showListAssets;
                     if(bAdded) {
                         $(this).removeClass('added');
                         if(playList && playList.length > 0){
                             for( var i=0;playList.length;i++){
                                 if((playList[i].daCode == asset.daCode) && (playList[i].productCode == asset.productCode)){
                                 playList.splice(i, 1);
                                 $('#asset_id_'+asset.daCode+' .success_msg').text('Asset has been removed from show list');
                                 $('#asset_id_'+asset.daCode+' .success_msg').fadeIn('normal', function() {
                                        $(this).delay(700).fadeOut();
                                  });
                                 }
                             }
                         }
                     
                     } else {
                           $(this).addClass('added');
                           playList.push(asset);
                           $('#asset_id_'+asset.daCode+' .success_msg').text('Asset has been added to show list');
                           $('#asset_id_'+asset.daCode+' .success_msg').fadeIn('normal', function() {
                                   $(this).delay(700).fadeOut();
                           });
                         com.swaas.hidoctor.edetailing.ui.view.story.addToShowList(false);
                         return false;
                     
                     }
                     return false;
             }
             
            
        });
                                                                   
        com.swaas.hidoctor.edetailing.ui.view.Rating.setRating($('#rating_star_'+ asset.daCode), asset.starValue);
    });
}

AssetTableNew.prototype.contextMenu = function(type, obj) {
    var menuHtml = '<div class="arrow-left"></div>';
    if(type == 'assets') {
        menuHtml += '<p>' + obj.name + '</p>';
        menuHtml += '<li class="list1"><a>Play</a></li>';
        menuHtml += '<li class="list2"><a>Add to Show List</a></li>';
        menuHtml += '<li class="list3"><a>Add to Story</a></li>';
    } else {
        
    }
    $('.menu_list').html(menuHtml);
    $('.menu_list').show();
}

AssetTableNew.prototype.jqueryContext = function(curEl,asset){
    var _this=this;
    //alert("context");
    var contextDiv='#asset_id_'+asset.daCode+' .expand';
    _this.ctxMenu = new ContextMenu();
    _this.ctxMenu.show(contextDiv, asset, _this.storyList);
}
