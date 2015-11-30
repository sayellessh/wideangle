
/*** context menu class ***/
function ContextMenu(options) {
	
}

ContextMenu.prototype.show = function(assetId, asset, storyList) {
    //alert(asset.length);
    //alert(storyList.length);
    var _this = this;
    $.contextMenu('destroy' , assetId );
    _this.curAsset = asset;
    var subMenu = { "new": { "name": "Create a new Story", "icon": "show" } };
    for(var i=0;i<3;i++){
        if(storyList[i]!== undefined){
            var curStory = storyList[i];
            subMenu["story_id_"+curStory.storyId]={"name": curStory.storyName,"id":curStory.storyId};
        }
    }
    
    if(storyList.length > 3){
        subMenu['more'] = {"name": "More..."};
    }
     
    if(_this.items == null) {
    	//alert("items null");
    	_this.items = {
    	        "title": {name: asset.name, icon: ""},
    	        "play": {name: "Play", icon: "play"},
    	        "show": {name: "Add to Show List", icon: "show"},
    	        "story": {name: "Add to a Story",icon: "show", items: subMenu }
    	      };
    }

	$.contextMenu({
		selector : assetId,
		trigger : 'left',
		// show: function(opt){console.log(opt); },
		callback : function(key, options) {
			// alert(storyList.length);
			_this.menuActions(asset, storyList, key, options);
		},
		build : function($triger, e) {
			console.log(e);
			return {
				callback : function(key, options) {
					var m = "clicked" + key;
					console.log(m);
					_this.menuActions(asset, storyList, key, options);
				},
				items : _this.items
			};
		}
	});
   
}
ContextMenu.prototype.hide = function() {
}
ContextMenu.prototype.menuActions = function(asset, storyList, key, options) {
    var _this = this;
    
    if(key=='play'){
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
    }else if(key=='show'){
        //$('p.success_msg').remove();
        com.swaas.hidoctor.edetailing.ui.view.story.showListAssets.push(asset);
        com.swaas.hidoctor.edetailing.ui.view.story.addToShowList(false);
        $('#asset_id_' + asset.daCode + ' .success_msg').text('Asset has been added to show list');
        $('#asset_id_' + asset.daCode + ' .success_msg').fadeIn('normal', function() {
            $(this).delay(700).fadeOut();
        });
        $(".context-menu-list").contextMenu("hide");
        return false;
    }else if(key=='new'){
    	
        _this.showModal(function(storyName, onSuccess, onFailure){
            _this.createStory(storyName, onSuccess, onFailure);
        }, null);
        return false;
    }else if(key=='more'){
        _this.listPopup(storyList, function(storyId){
            $('#story_modal_wrapper').hide();
        });
        return false;
    }else if(key.indexOf("story_id_") > -1){
        var storyId=key.replace("story_id_",'');
        var asset = _this.curAsset;
        _this.insertAsset(storyId, asset);
    }
}
ContextMenu.prototype.showModal = function(onClickOK, onClickCancel) {
    var _this = this;
    $('#story_modal_wrapper').remove('');
    var html = '<div id="story_modal_wrapper"><div id="story_modal">'+
        //'<form onsubmit="return false;" method="post">'+
            '<label>Enter the story name</label><input type="text" class="popup_input" name="story_name" value="" placeholder="Enter the story name"/>'+
            '<div class="modal_action"><a href="#" class="modal_button save">Create Story</a>'+
            '<a href="#" class="modal_button cancel">Cancel</a></div>' +
    		//'</form>' +		
    		'</div></div>';
    
    
    $('body').append(html);
    $('#story_modal_wrapper').show();
    $('.story_name').textinput('destroy');
    
    $('#story_modal_wrapper').bind('click', function(evt){
        if($(evt.target).attr('id') == 'story_modal_wrapper')
            $(this).remove();
    });
    
    $('.save.modal_button').bind('click', function(){
        var storyName = $('.popup_input').val();
        if(storyName == '' || storyName == null) {
            alert('Please enter the story name');
            return false;
        }
        //alert(onClickOK);
        if(onClickOK)
            onClickOK(storyName, function(){
            	//com.swaas.hidoctor.edetailing.ui.view.story.assetTable.init();
            	/*setTimeout(function() {
            		$('#show_asset').trigger('click');
            	}, 500);*/
            	var prdCode = $('select.productSelect').val();
                com.swaas.hidoctor.edetailing.ui.view.story.loadAssetByProductCode(prdCode);
                $('#story_modal_wrapper').hide();
            }, function(){
                alert('Error in inserting Story');
                $('#story_modal_wrapper').hide();
            });
        return false;
    });
    $('.cancel.modal_button').bind('click', function(){
        $('#story_modal_wrapper').hide();
        if(onClickCancel) onClickCancel();
        return false;
    });
}

ContextMenu.prototype.listPopup = function(stories, onSelect) {
    var _this = this;
    $('#story_modal_wrapper').remove('');
    //var html = '<div id="story_modal_wrapper"><div id="story_modal" class="list_popup">';
    var html = '<div id="story_modal_wrapper"><div id="story_modal" class="list_popup"><div class="close_btn" id="close_btn">X</div>';
    var listHtml = '<ul class="story_popup">';
    for(var i = 0; i < stories.length; i++) { var curStory = stories[i];
        listHtml += '<li><a id="' + curStory.storyId + '" href="#">' + curStory.storyName + '</a></li>';
    }
    html += listHtml + '</ul>';
    html += '</div></div>';
    
    $('body').append(html);
    $('#story_modal_wrapper').show();
    
    $('#story_modal_wrapper').bind('click', function(evt){
        if($(evt.target).attr('id') == 'story_modal_wrapper')
            $(this).remove();
    });
    $('.story_popup li a').bind('click', function(){
        var storyId = $(this).attr('id');
        var asset = _this.curAsset;
        _this.insertAsset(storyId, asset);
        return false;
    });
}

ContextMenu.prototype.insertAsset = function(storyId, asset,onSuccess) {
    var _this=this;
    com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.insertAsset(storyId, asset, function(isAvail){
	if(isAvail) {
	    $('#asset_id_'+asset.daCode+' .success_msg').text('The asset already present in this story');
	 $('#asset_id_'+asset.daCode+' .success_msg').fadeIn('normal', function() {
	    $(this).delay(700).fadeOut();
	 });
	} else {
		com.swaas.hidoctor.edetailing.ui.view.story.assetTable.init();
	    $('#story_modal_wrapper').hide();
	    _this.hide();
	    com.swaas.hidoctor.edetailing.dao.storyLocalDAO.getByStoryCode(storyId,function(curStry){
			$('#asset_id_'+asset.daCode+' .success_msg').text('Asset added to '+curStry.storyName);
			$('#asset_id_'+asset.daCode+' .success_msg').fadeIn('normal', function() {
		         $(this).delay(700).fadeOut();
		    });
	    });
	}
}, function() {
	com.swaas.hidoctor.edetailing.ui.view.story.renderStories();
    	$('#story_modal_wrapper').hide();
    	if(onSuccess) onSuccess();
	}, null);
};
/*ContextMenu.prototype.insertAsset = function(storyId, asset,onSuccess) {
    var _this=this;
    com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.insertAsset(storyId, asset, function(isAvail){
        if(isAvail) {
            alert('The asset already present in this story');
        } else {
            $('#story_modal_wrapper').hide();
            _this.hide();
        }
    }, function(){
        com.swaas.hidoctor.edetailing.ui.view.story.renderStories();
        $('#story_modal_wrapper').hide();
        if(onSuccess) onSuccess();
    }, null);
}*/

/*** store story name to dao ***/
ContextMenu.prototype.createStory = function(storyName, onSuccess, onFailure) {
    var _this = this;
    var doctor = ED.context.request.selectedDoctor;
    var story = {
        storyName : storyName,
        doctorCode : doctor.customerCode,
        doctorRegionCode : doctor.regionCode,
        createdDate : new Date(),
        storyStatus : '1',
        isSyncedWithHiDoctor : '0'
    };
    
    com.swaas.hidoctor.edetailing.dao.storyLocalDAO.insert(story, function(response, bPresent){
        if(bPresent) {
        	alert("Story name already exists.Create story with different name");
            $('#story_modal_wrapper').hide();
        	return false;
        } else {
        	var insertId=response.result.insertId;        
            if(insertId && insertId > 0){
                $('.asset_part .menu_list').hide();
                _this.insertAsset(insertId,_this.curAsset,function(){
                     if(onSuccess) onSuccess();
                 });
            }else{
                alert('Story has not been created');
                if(onSuccess) onSuccess();
            }
        }
    }, onFailure);
}

/*story context menu */
ContextMenu.prototype.showStoryContext = function(assetId, assets, storyList) {
    var _this = this;
    $.contextMenu('destroy', assetId);
    _this.curAssets = assets;
    $.contextMenu({
                  selector: assetId,
                  trigger: 'left',
                  //show: function(opt){console.log(opt); },
                  callback: function(key, options) {
                  _this.menuActionsStory(_this.curAssets, storyList, key, options);
                  },
                  items: {
                  "title": {name: storyList.storyName, icon: ""},
                  "playstory": {name: "Play this Story", icon: "play"},
                  "showstory": {name: "Add to Show List", icon: "show"},
                  "delete": {name: "Delete",icon: "story"}
                  }
                  });
}

ContextMenu.prototype.menuActionsStory = function(assets, storyList, key, options) {
    var _this = this;
    //alert(assets.length);
    if(key=='playstory'){
        var assetAry = new Array();
        for(var i=0;i<assets.length;i++)
        assetAry.push(assets[i]);
        var iosPlayer1= new iosPlayer({
              assetLists :  assetAry
        });
        iosPlayer1.show();
        return false;
    }else if(key=='showstory'){
        //$('p.success_msg').remove();
        for(var i=0;i<assets.length;i++){
            com.swaas.hidoctor.edetailing.ui.view.story.showListAssets.push(assets[i]);
        }
        
        com.swaas.hidoctor.edetailing.ui.view.story.addToShowList(false);
        $('.success_msg').text('Asset has been added to show list');
        $('p.success_msg').fadeIn('normal', function() {
            $(this).delay(700).fadeOut();
        });
        $(".context-menu-list").contextMenu("hide");
        return false;
    } else if(key == 'delete') {
    	/*com.swaas.hidoctor.edetailing.dao.storyLocalDAO.get(function(stories) {
    		alert(JSON.stringify(stories));
    		var returnvar = com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.getUnsynced(function(assets) {
    			//alert(JSON.stringify(assets));
    		});
    		alert(JSON.stringify(returnvar));
    	});*/
    	/*var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO, { });
    	alert(JSON.stringify(out));
    	var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, { });
    	alert(JSON.stringify(out));
    	var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyAnalyticsLocalDAO, { });
    	alert(JSON.stringify(out));
    	var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.CustomerLocalDAO, {  });
    	alert(JSON.stringify(out));
    	var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.DATagAnalyticLocalDAO, {  });
    	alert(JSON.stringify(out));*/
    	/*var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO, {  });
    	alert(JSON.stringify(out));*/
    	/*var uniqueAss = {};
    	var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO, {  });
    	for(var i=0;i<=out.length-1;i++) {
    		if(uniqueAss[out[i].daCode] == null) {
    			uniqueAss[out[i].daCode] = out[i];
    			if(out[i].marketingCampaign == true || out[i].marketingCampaign == "true")
        			alert(JSON.stringify(out[i]));	
    		}	
    	}*/
    	var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyAnalyticsLocalDAO, { });
    	alert("Story Analytics: " + JSON.stringify(out));
    	
    	var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.DoctorVisitLocalDAO, { });
    	alert("Doctor Visit: " + JSON.stringify(out));
    	
    	var out = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.ChemistVisitLocalDAO, { });
    	alert("Chemist Visit: " + JSON.stringify(out));
    	
    }
}

