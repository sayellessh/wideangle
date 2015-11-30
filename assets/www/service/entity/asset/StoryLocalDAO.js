com.swaas.hidoctor.edetailing.dao.storyLocalDAO = {
		
		storyArray : null,
		storyAssetsArray : null,
		
        metadata: {
            "tableName" : "tbl_Story_Header",
            "columns": [
                        {name: "storyId", columnName: "Story_Id", isInt: true, pk:true},
                        {name: "storyName", columnName: "Story_Name"},
                        {name: "doctorCode", columnName: "Doctor_Code"},
                        {name: "doctorRegionCode", columnName: "Doctor_Region_Code"},
                        {name: "createdDate", columnName: "Created_Date"},
                        {name: "disabledDate", columnName: "Disabled_Date"},
                        {name: "storyStatus", columnName: "Story_Status"},
                        {name: "isSyncedWithHiDoctor", columnName:"Is_Synced_With_HiDoctor"}
                        ]
        },
        
        insert: function(createstory, onSave,onFailure) {
            //alert(JSON.stringify(createstory));
            var _this = this;
               var doctor = ED.context.request.selectedDoctor;
               var criteria = {};
               criteria.storyName = createstory.storyName,
               criteria.doctorCode= doctor.customerCode,
               criteria.doctorRegionCode= doctor.regionCode,
               com.swaas.hidoctor.edetailing.dao.CoreDAO.getLike(this, criteria, function(results){
               //alert(JSON.stringify(results));
               if(results && results.length > 0 ){
                  alert("Story name already exists.Create story with different name");
                  onSave(null,true);
                  //return false;                  
               }else{
               //alert('else');
            	   var time = createstory.createdDate;
                   var zone = -time.getTimezoneOffset(), dif = zone >= 0 ? '+' : '-';
                   var pad = function(num) {
                       norm = Math.abs(Math.floor(num));
                       return (norm < 10 ? '0' : '') + norm;
                   };
                   var timeString = time.getFullYear() + '-' + pad(time.getMonth()+1) + '-' + pad(time.getDate())
                       + 'T' + pad(time.getHours()) + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds());
                   createstory.createdDate = timeString;
                   
               com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, createstory, function() {
              // alert('insert');
                com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(_this, [], function(stories){
                //alert(stories.length);
                      var len = stories.length;
                      createstory = stories[len-1];
                      var id = createstory.storyId;
                      var response = {result: {insertId: id}};
                      console.log(' is is ' + id);
                      onSave(response,false);
                    });
               }, function(error){ console.log(JSON.stringify(error)); });
               }
               },onFailure);
           },
        /*insert: function(cstory, onSave) {
        	_this = this;
            //com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, story, onSave, function(error){ console.log(JSON.stringify(error)); });
        	com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, cstory, function() {
    		 com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(_this, [], function(stories){
    			 alert(JSON.stringify(stories));
                 var len = stories.length;
                 cstory = stories[len-1];
                 var id = cstory.storyId;
                 var response = {result: {insertId: id}};
                 console.log(' is is ' + id);
                 onSave(response, false);
             });
        	}, function(error){ console.log(JSON.stringify(error)); });
        },*/
            
        get: function(onGet, onFailure){
        	var _this = this;
        	var doctor = ED.context.request.selectedDoctor;
        	var criteria = {};
        	criteria.doctorCode= doctor.customerCode;
            criteria.doctorRegionCode= doctor.regionCode;
            criteria.storyStatus = 1;
            //alert(JSON.stringify(doctor));
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(_this, criteria, function(stories){
            	if(stories && stories.length > 0) {
            		var assetAry = new Array();
            		_this.getAssets(0, stories, assetAry, onGet);
            	} else {
            		var storyList = []; 
                	onGet(storyList);
            	}
            }, function(e) {
            	alert(JSON.stringify(e));
            });
        },
  
        getAssets: function(index, stories, assetAry, onGet) {
        	var _this = this;
        	if(index < stories.length) {
        		//var countQuery = 'SELECT * FROM tbl_Story_DA_Mapping WHERE Story_Id = "' + stories[index].storyId + '"';
        		var countQuery = 'SELECT dam.DA_Code FROM tbl_DIGASSETS_MASTER AS dm INNER JOIN tbl_Story_DA_Mapping as dam ON dm.DA_Code = dam.DA_Code AND dm.Product_Code = dam.Product_Code AND Story_id = "' + stories[index].storyId + '";';
            	com.swaas.hidoctor.edetailing.dao.CoreDAO.executeCustomQuery(com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO, countQuery, null, 
            		function(results){
            		if(results && results.length > 0)
            			stories[index].assetCount = results.length;
                    else
                    	stories[index].assetCount = 0;
            		assetAry.push(stories[index]);
            		if(index  >= (stories.length - 1)){
                    	var storyList = assetAry;
                    	//alert(JSON.stringify(storyList))
                    	onGet(storyList);
                    } else {
                    	index++;
                    	_this.getAssets(index, stories, assetAry, onGet);
                    }
            	});
        	}
        },
    
        getByStoryCode: function(storyCode, onGet, onFailure) {
            var criteria = {};
			criteria.storyId = storyCode;
            com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria, function(results){
                if(results && results.length > 0) {
                    if(onGet) onGet(results[0]);
                } else {
                    if(onGet) onGet(null);
                }
            }, onFailure);
        },
        
        remove: function(daCode, productCode){
			var criteria = {};
			criteria.daCode = daCode;
			criteria.productCode = productCode;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		syncPut: function(params){
			var _this = com.swaas.hidoctor.edetailing.dao.storyLocalDAO;
			var storyAssetMapping = params.Story_Asset_Mapping;
			var storyAsset = {
				storyId: params.Story_Id,
				storyName: params.Story_Name,
				doctorCode: params.Doctor_Code,
				doctorRegionCode: params.Doctor_Region_Code,
				createdDate: params.Created_Date,
				disabledDate: params.Disabled_Date,
				storyStatus: (params.Story_Status?1:0),
				isSyncedWithHiDoctor: 1
			};
			com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(_this, storyAsset);
			if(storyAssetMapping != null) {
				_this.insertStoryMapping(0, storyAssetMapping, function(ast) {
					var assetMap = {
						storyDetailId: ast.Story_Detail_Id,
						storyId: ast.Story_Id,
						productCode: ast.Product_Code,
						DACode: ast.DA_Code.toString(),
						playOrder: ast.Play_Order,
						is_Synced_With_HiDoctor: 1
					};
					com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO, assetMap);
				});
			}
		},
		
		insertStoryMapping: function(index, array, onGet) {
			var _this = com.swaas.hidoctor.edetailing.dao.storyLocalDAO;
			if(index < array.length) {
				var ast = array[index];
				if(index  >= (array.length - 1)){
					if(onGet) onGet(ast);
				} else {
					if(onGet) onGet(ast);
					index++;
					_this.insertStoryMapping(index, array, onGet);
				}
			}
		},
		
        clean: function(isEraseAndClean, context) {
        	this.remove(null, null);
        	com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO.remove(null, null);
		},
		
		updateFlag: function() {
			var _this = com.swaas.hidoctor.edetailing.dao.storyLocalDAO;
			var storyArray = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(_this, { isSyncedWithHiDoctor: 0 });
			$.each(storyArray, function(ind, obj) {
				obj.isSyncedWithHiDoctor = 1;
				com.swaas.hidoctor.edetailing.dao.CoreDAO.update(_this, obj);
			});
		},
		
		syncGet: function(params) {
			var _this = com.swaas.hidoctor.edetailing.dao.storyLocalDAO;
			var version = com.swaas.hidoctor.edetailing.ui.view.Resource.application.version;
			var storycolumns = [
                {name: "storyId", columnName: "Story_Id", isInt: true, pk:true},
                {name: "storyName", columnName: "Story_Name"},
                {name: "doctorCode", columnName: "Doctor_Code"},
                {name: "doctorRegionCode", columnName: "Doctor_Region_Code"},
                {name: "createdDate", columnName: "Created_Date"},
                {name: "disabledDate", columnName: "Disabled_Date"},
                {name: "storyStatus", columnName: "Story_Status"}
                ];
			var storyassetcolumns = [
	            {name: "storyDetailId", columnName: "Story_Detail_Id", pk: true, isInt: true},
	            {name: "storyId", columnName: "Story_Id"},
				{name: "productCode", columnName: "Product_Code"},
				{name: "DACode", columnName:"DA_Code"},
                {name: "playOrder", columnName:"Play_Order"}
            ];
			
			_this.storyArray = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, { isSyncedWithHiDoctor: 0});
			_this.storyAssetsArray = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(com.swaas.hidoctor.edetailing.dao.storyAssetLocalDAO, { is_Synced_With_HiDoctor: 0});
			/*var assetanalytics =  [{originalAssetId: 55, assetId: 3, productCode : 'PDC00000001',
				categoryValue: 'VIEW', actionValue :'HOW VICKS WORKS',labelValue :'GRAPH WITH DATA',
				eventDate :'2014-08-30 16:20:10',doctorCode : 'DOC000000D20',doctorRegionCode : 'REC00000020'}];
			*/
			
			var storyHeaderData = ED.formatDataForSyncTwo(_this.storyArray, storycolumns);
			var storyAssetMappingData = ED.formatDataForSyncTwo(_this.storyAssetsArray, storyassetcolumns);
			
			var result = {
					corrlId: params.correlationId,
					companyCode: params.companyCode ,
					userCode: params.userCode ,
					regionCode : ED.context.currentUser.regionCode,
					storyHeaderData : storyHeaderData,
					storyAssetMappingData : storyAssetMappingData,
					appSuiteId : com.swaas.hidoctor.edetailing.ui.view.Resource.application.appSuiteId,
					appId :com.swaas.hidoctor.edetailing.ui.view.Resource.application.appId ,
					appVersion : version	
			};
			return result;
		}
};
