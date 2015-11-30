com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_Story_DA_Mapping",
			"columns": [
			            {name: "storyDetailId", columnName: "Story_Detail_Id", pk: true, isInt: true},
						{name: "storyId", columnName: "Story_Id"},
						{name: "productCode", columnName: "Product_Code"},
						{name: "DACode", columnName:"DA_Code"},
                        {name: "playOrder", columnName:"Play_Order"},
                        {name: "is_Synced_With_HiDoctor", columnName:"Is_Synced_With_HiDoctor"}
            ]
		},
		
		
    insertAsset: function(storyCode, asset, onCheck, onSuccess) {
    	var _this = com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO;
    	com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true, function() {
    		if(asset.is_Synced_With_HiDoctor == undefined 
            		|| asset.is_Synced_With_HiDoctor == null
            		|| asset.is_Synced_With_HiDoctor == "") {
            	asset.is_Synced_With_HiDoctor = 0;
            }
            if(asset.playOrder == undefined 
            		|| asset.playOrder == null
            		|| asset.playOrder == "") {
            	asset.playOrder = "0";
            }
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, {storyId: storyCode}, function(existingStories) {
            	if(existingStories != null && existingStories.length > 0) {
            		var existingStory = existingStories[0];
            		var oldStoryId = existingStory.storyId;
            		if(existingStory.isSyncedWithHiDoctor == 1) {
            			//alert(isSyncedWithHiDoctor);
            			existingStory.isSyncedWithHiDoctor = 0;
            			existingStory.storyStatus = 0;
            			com.swaas.hidoctor.edetailing.dao.CoreDAO.update(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, existingStory, function() {
            				//alert(isSyncedWithHiDoctor);
            				existingStory.isSyncedWithHiDoctor = 0;
                			existingStory.storyStatus = 1;
                			existingStory.storyId = null;
                			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, existingStory, function() {
                				//alert(existingStory);
            					com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, [], function(stories){
            						var len = stories.length;
        							var createstory = stories[len-1];
        							// got updated story id 
        							var id = createstory.storyId;
        							com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(_this, {storyId: oldStoryId}, function(oldassets) {
        								var oAssets = oldassets;
        								$.each(oldassets, function(ind, oasset) {
        									oasset.is_Synced_With_HiDoctor = 0;
        									com.swaas.hidoctor.edetailing.dao.CoreDAO.update(_this, oasset, function() {
        										oasset.storyDetailId = null;
        										oasset.storyId = id;
        										com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, oasset, function() {
        											if(ind == (oAssets.length - 1)) {
        												var checkQuery = 'SELECT * FROM tbl_Story_DA_Mapping WHERE Story_Id = "' + id + '" AND DA_Code = "' + asset.daCode + '"';
        							        	        com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this, checkQuery, null, function(storyAsset){
        							        	            if(storyAsset && storyAsset.length > 0) {
        							        	                if(onCheck) onCheck(true);
        							        	            } else {
        							        	            	if(onCheck) onCheck(false);
        							        	                var insAsset = {
        							        						storyId : id,
        							        						productCode : asset.productCode,
        							        						DACode : asset.daCode,
        							        						playOrder : asset.playOrder,
        							        						is_Synced_With_HiDoctor : asset.is_Synced_With_HiDoctor
        							        					};
        							        	                 //alert(JSON.stringify(insAsset));
        							        	                if(insAsset.DACode != null) {
        							        	                	com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, insAsset, function(){
            							        	                	if(onSuccess) onSuccess();
            							        	                }, function(err){
            							        	                    alert(JSON.stringify(err));
            							        	                });	
        							        	                } else {
        							        	                	alert("Cannot add asset to story, Invalid asset details.");
        							        	                }
        							        	            }
        							        	        }, function(e) {
        							        	        	alert('ex ' + JSON.stringify(e));
        							        	        });
        											}
        										}, function(e) { alert('asset insert ' + JSON.stringify(e)); });
        									}, function(e) { alert('old asset update ' + JSON.stringify(e)); });
        								});
        							}, function(e) { alert('get old assets ' + JSON.stringify(e)); });
        						}, function(e) { alert('get last insert story ' + JSON.stringify(e)); });
            				}, function(e) { alert('insert new story ' + JSON.stringify(e)); });
            			}, function(e) { alert('update existing story ' + JSON.stringify(e)); });
            		} else {
            			var checkQuery = 'SELECT * FROM tbl_Story_DA_Mapping WHERE Story_Id = "' + storyCode + '" AND DA_Code = "' + asset.daCode + '"';
            	        com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this, checkQuery, null, function(storyAsset){
            	            if(storyAsset && storyAsset.length > 0) {
            	                if(onCheck) onCheck(true);
            	            } else {
            	            	if(onCheck) onCheck(false);
            	                var insAsset = {
            						storyId : storyCode,
            						productCode : asset.productCode,
            						DACode : asset.daCode,
            						playOrder : asset.playOrder,
            						is_Synced_With_HiDoctor : asset.is_Synced_With_HiDoctor
            					};
            	                 //alert(JSON.stringify(insAsset));
            	                if(insAsset.DACode != null) {
            	                	com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, insAsset, function(){
                	                	if(onSuccess) onSuccess();
                	                }, function(err){
                	                    alert(JSON.stringify(err));
                	                });	
            	                } else {
            	                	alert("Cannot add asset to story, Invalid asset details.");
            	                }
            	            }
            	        }, function(e) {
            	        	alert('ex ' + JSON.stringify(e));
            	        });
            		}
            	}
            }, function(e) { alert(JSON.stringify(e)); });
    	});
    },
    
    get:function(storyCode,onSuccess,onFailure){
        var _this = com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO;
        var result = {};
        var assetsList = [];
        var criteria = {};
        criteria.storyId = storyCode;
        var query = 'SELECT * FROM tbl_Story_DA_Mapping WHERE Story_Id ="'+storyCode+'" AND DA_Code IS NOT NULL AND DA_Code != \'\' AND DA_Code != 0 ORDER BY Play_Order';
        //alert(JSON.stringify(query));
        
        com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(this, query,null,function(storyAssets){
        	if(storyAssets.length > 0)
        		_this.getAssetDetails(0, storyCode, storyAssets, assetsList, onSuccess);
        }, function(e) {
        	alert(JSON.stringify(e));
        });
    },
    
    updateFlag: function() {
		var _this = com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO;
		var storyArray = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(_this, { is_Synced_With_HiDoctor: 0 });
		$.each(storyArray, function(ind, obj) {
			obj.is_Synced_With_HiDoctor = 1;
			com.swaas.hidoctor.edetailing.dao.CoreDAO.update(_this, obj);
		});
	},
    
    /*getUnsynced:function(onSuccess, onFailure){
        var _this = com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO;
        var assetList = [];
        var query = 'SELECT * FROM tbl_Story_DA_Mapping';
        //alert(query);
        
        com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this, query, null, function(assetsList){
        	assetList = assetsList;
        	if(onSuccess) onSuccess(assetsList);
        }, function(e) {
        	alert(JSON.stringify(e));
        });
        return assetList;
    },*/
    
    getAssetDetails: function(index, storyCode, storyAssets, assetsList, onSuccess) {
    	
        var result = {};
        // alert('index' + index);
        var _this = com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO;
        if(storyAssets && storyAssets.length > 0) {
			var curAst = storyAssets[index];
			var assetCode = curAst.DACode.toString();
			com.swaas.hidoctor.edetailing.dao.DigitalAssetLocalDAO.get(assetCode, curAst.productCode, function(assets){
				if(assets != null) assetsList.push(assets);
				
				$.extend(assets, curAst);
				if(index == (storyAssets.length -1)) {
				   // alert("s");
					com.swaas.hidoctor.edetailing.dao.storyLocalDAO.getByStoryCode(storyCode, function(story){
					   result.story = story;
					   result.assets = assetsList;
					   if(onSuccess) onSuccess(result);
					}, null);
			   } else {
				   _this.getAssetDetails(index+1, storyCode, storyAssets, assetsList, onSuccess);
			   }
			});
		}        
    },
    updatePlayOrder : function(storyId,assetCode,playOrder,onSuccess,onFailure){
    	/*var _this = com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO;
    	com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true, function() {
    		if(asset.is_Synced_With_HiDoctor == undefined 
            		|| asset.is_Synced_With_HiDoctor == null
            		|| asset.is_Synced_With_HiDoctor == "") {
            	asset.is_Synced_With_HiDoctor = 0;
            }
            if(asset.playOrder == undefined 
            		|| asset.playOrder == null
            		|| asset.playOrder == "") {
            	asset.playOrder = "0";
            }
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, {storyId: storyCode}, function(existingStories) {
            	if(existingStories != null && existingStories.length > 0) {
            		// is existing story
            		var existingStory = existingStories[0];
            		var oldStoryId = existingStory.storyId;
            		if(existingStory.isSyncedWithHiDoctor == 1) {
            			// existing story already synced
            			//alert(isSyncedWithHiDoctor);
            			existingStory.isSyncedWithHiDoctor = 0;
            			existingStory.storyStatus = 0;
            			com.swaas.hidoctor.edetailing.dao.CoreDAO.update(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, existingStory, function() {
            				// story updated status as deactive
            				//alert(isSyncedWithHiDoctor);
            				existingStory.isSyncedWithHiDoctor = 0;
                			existingStory.storyStatus = 1;
                			existingStory.storyId = null;
                			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, existingStory, function() {
                				// inserted new story
                				//alert(existingStory);
            					com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, [], function(stories){
            						// getting all story to get last inserted story id
            						var len = stories.length;
        							var createstory = stories[len-1];
        							// got updated story id 
        							var id = createstory.storyId;
        							com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(_this, {storyId: oldStoryId}, function(oldassets) {
        								// getting old assets for deactivating
        								var oAssets = oldassets;
        								$.each(oldassets, function(ind, oasset) {
        									oasset.is_Synced_With_HiDoctor = 0;
        									com.swaas.hidoctor.edetailing.dao.CoreDAO.update(_this, oasset, function() {
        										// updating old asset and inserting new asset
        										oasset.storyDetailId = null;
        										oasset.storyId = id;
        										com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, oasset, function() {
        											if(ind == (oAssets.length - 1)) {
        												var checkQuery = 'SELECT * FROM tbl_Story_DA_Mapping WHERE Story_Id = "' + id + '" AND DA_Code = "' + asset.daCode + '"';
        							        	        com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this, checkQuery, null, function(storyAsset){
        							        	            if(storyAsset && storyAsset.length > 0) {
        							        	                if(onCheck) onCheck(true);
        							        	            } else {
        							        	            	if(onCheck) onCheck(false);
        							        	                var insAsset = {
        							        						storyId : id,
        							        						productCode : asset.productCode,
        							        						DACode : asset.daCode,
        							        						playOrder : asset.playOrder,
        							        						is_Synced_With_HiDoctor : asset.is_Synced_With_HiDoctor
        							        					};
        							        	                 //alert(JSON.stringify(insAsset));
        							        	                com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, insAsset, function(){
        							        	                	if(onSuccess) onSuccess();
        							        	                }, function(err){
        							        	                    alert(JSON.stringify(err));
        							        	                });
        							        	            }
        							        	        }, function(e) {
        							        	        	alert('ex ' + JSON.stringify(e));
        							        	        });
        											}
        										}, function(e) { alert('asset insert ' + JSON.stringify(e)); });
        									}, function(e) { alert('old asset update ' + JSON.stringify(e)); });
        								});
        							}, function(e) { alert('get old assets ' + JSON.stringify(e)); });
        						}, function(e) { alert('get last insert story ' + JSON.stringify(e)); });
            				}, function(e) { alert('insert new story ' + JSON.stringify(e)); });
            			}, function(e) { alert('update existing story ' + JSON.stringify(e)); });
            		} else {
            			// existing story but not synced
            			var query = 'UPDATE '+ _this.metadata.tableName + ' SET Play_Order="'+playOrder + '", Is_Synced_With_HiDoctor="0" WHERE DA_Code = "'+assetCode+'" AND Story_Id="'+storyCode +'"' ;
                		alert(query);
                		com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this, query,null,onSuccess);
            		}
            	}
            }, function(e) { alert(JSON.stringify(e)); });
    	});*/
    	
    	var _this = this;
    	com.swaas.hidoctor.edetailing.dao.storyLocalDAO.getByStoryCode(storyId, function(story) {
    		if(story.isSyncedWithHiDoctor == 1) {
    			story.isSyncedWithHiDoctor = 0;
        		com.swaas.hidoctor.edetailing.dao.CoreDAO.update(com.swaas.hidoctor.edetailing.dao.storyLocalDAO,story);
    		}
    		var query = 'UPDATE '+ _this.metadata.tableName + ' SET Play_Order="'+playOrder + '", Is_Synced_With_HiDoctor="0" WHERE DA_Code = "'+assetCode+'" AND Story_Id="'+storyId +'"' ;
    		com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(_this, query,null, onSuccess);
    	}, function(e) {});
    },	
        						
    
    remove: function(storyId, daCode,onSuccess,onFailure){
    	//alert('rem');
    	var _this = com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO;
    	com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true, function() {
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, {storyId: storyId}, function(existingStories) {
            	if(existingStories != null && existingStories.length > 0) {
            		var existingStory = existingStories[0];
            		var oldStoryId = existingStory.storyId;
            		if(existingStory.isSyncedWithHiDoctor == 1) {
            			//alert(isSyncedWithHiDoctor);
            			existingStory.isSyncedWithHiDoctor = 0;
            			existingStory.storyStatus = 0;
            			com.swaas.hidoctor.edetailing.dao.CoreDAO.update(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, existingStory, function() {
            				//alert(isSyncedWithHiDoctor);
            				existingStory.isSyncedWithHiDoctor = 0;
                			existingStory.storyStatus = 1;
                			existingStory.storyId = null;
                			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, existingStory, function() {
                				//alert(existingStory);
            					com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, [], function(stories){
            						var len = stories.length;
        							var createstory = stories[len-1];
        							// got updated story id 
        							var id = createstory.storyId;
        							com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(_this, {storyId: oldStoryId}, function(oldassets) {
        								var oAssets = oldassets;
        								$.each(oldassets, function(ind, oasset) {
        									oasset.is_Synced_With_HiDoctor = 0;
        									com.swaas.hidoctor.edetailing.dao.CoreDAO.update(_this, oasset, function() {
        										oasset.storyDetailId = null;
        										oasset.storyId = id;
        										com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, oasset, function() {
        											if(ind == (oAssets.length - 1)) {
        												var criteria = {};
        										        criteria.storyId = id;
        										        criteria.DACode = daCode;
        										        //alert('insert');
        										        com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(_this, criteria, onSuccess, onFailure);
        											}
        										}, function(e) { alert('asset insert ' + JSON.stringify(e)); });
        									}, function(e) { alert('old asset update ' + JSON.stringify(e)); });
        								});
        							}, function(e) { alert('get old assets ' + JSON.stringify(e)); });
        						}, function(e) { alert('get last insert story ' + JSON.stringify(e)); });
            				}, function(e) { alert('insert new story ' + JSON.stringify(e)); });
            			}, function(e) { alert('update existing story ' + JSON.stringify(e)); });
            		} else {
            			var criteria = {};
            	        criteria.storyId = storyId;
            	        criteria.DACode = daCode;
            	        //alert(onSuccess);
            	        com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(_this, criteria,onSuccess,onFailure);
            		}
            	}
            }, function(e) { 
            	alert(JSON.stringify(e)); 
                });
    	});
	},
	
    removeAll: function(storyId,daCode){
        com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, [],onSuccess,onFailure);
        
    },
    
    syncGet: function(params){
    	return [];
	},
	
    syncPut: function(params){
    	if(params != null) {
    		var columns = {
    			storyId: params.Story_Id,
    			storyStatus: 0
    		};
    		//alert(query);
    		com.swaas.hidoctor.edetailing.dao.CoreDAO.update(com.swaas.hidoctor.edetailing.dao.storyLocalDAO, columns);
    	}
	},
	
    clean: function(isEraseAndClean, context) {
    	//this.remove(null, null);
	}
    
};
