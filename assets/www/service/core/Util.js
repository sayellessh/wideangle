/**
 * 
 * @author saravanan.ramaswamy@landqtech.com
 */
com.swaas.hidoctor.edetailing.util.StringUtil = {
	isString : function(value)	{
		var type = typeof bhRequest;
		return type.toUpperCase() == 'STRING';
	}
};
com.swaas.hidoctor.edetailing.util.DateUtil = {
				
	scrapTime: function(date){
		return  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
	},
		
	getFirstDayOfMonth: function(date){
		var firstDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
		return firstDate;
	},
	getLastDayOfMonth: function(date){
		var lastDate = new Date(date.getFullYear(), date.getMonth()+1, 0, 23, 59, 59, 999);
		return lastDate;
	},
	
	getFirstDayOfCurrentMonth: function(){
		return getFirstDayOfMonth(new Date());
	},

	getLastDayOfCurrentMonth: function(){
		return getLastDayOfMonth(new Date());
	},
	
	getFirstWeekday : function (date){
	  	var firstDayOfMonth = this.getFirstDayOfMonth(date);
	  	return firstDayOfMonth.getDay();
    },
    
	getMonthSize: function(date){
		var lastDayOfMonth = this.getLastDayOfMonth(date);
		return lastDayOfMonth.getDate();
	},
	
	isToday: function(date){
		var today = new Date();
		
		return (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear());
	},
	
	toSQLiteFormat: function(date){
		return date.format("yyyy-mm-ss");
	},
	
	addDays: function (date, noOfDays){
		return new Date(date.getFullYear(), date.getMonth(), date.getDate()+(noOfDays-1), 23, 59, 59, 999);
	},
	getLastDateOfWeek : function(date){
		var firstDate=new Date(date);
		var lastDate= new Date(firstDate.getFullYear(),firstDate.getMonth(),firstDate.getDate()+6,23,59,59,999);
	
		return lastDate;
	}
};

com.swaas.hidoctor.edetailing.util.DocumentUtil = {
		getDocumenType : function(url)	{
			var type = null;
			if (url.toLowerCase().indexOf(".ppt") >= 0){
				type = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType.ppt;
			}else if (url.toLowerCase().indexOf(".doc") >= 0) {
				type = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType.doc;
			}else if (url.toLowerCase().indexOf(".pdf") >= 0) {
				type = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType.pdf;
			}else if (url.toLowerCase().indexOf(".flv") >= 0) {
				type = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType.flv;
			}else if (url.toLowerCase().indexOf(".mp4") >= 0) {
				type = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType.mp4;
			}else if (url.toLowerCase().indexOf(".xls") >= 0) {
				type = com.swaas.hidoctor.edetailing.ui.view.Resource.documentType.xls;
			}			
			return type;
		},
		getFileName : function(url){
			if(url != null && url !=''){
				var name=url.split("/");
				var fileName=name.pop();
				return fileName;
			}else {
				return null;
			}
		}

};
com.swaas.hidoctor.edetailing.util.FileUtil = {
		fileObject : null,	
		deleteDirectory : function(directoryName){
			var directoryEntry = com.swaas.hidoctor.edetailing.util.FileUtil.getDirectoryEntry(directoryName);
			if (directoryEntry != null){
				directoryEntry.removeRecursively(successCallback, errorCallback);
				function successCallback(){
				}
				function errorCallback(FileError){
				}
			}
			
		},

		getDirectoryEntry : function(directoryName){
			var dirEntry = null;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		    function gotFS(fileSystem) {
		    	fileSystem.root.getDirectory(directoryName, {create: false, exclusive: false}, onGetDirectorySuccess, function(){});
		    }
		    function onGetDirectorySuccess(dir){
		    	if(dir.isDirectory){
					   dirEntry=dir;
				}
		    }

		   function fail(){
		   }

		   return dirEntry;

		},	
	    getFileSize : function(fileName){
	    	var fileEntry=this.getFileEntry(fileName); 
	    	var file = this.getFileFromFileEntry(fileEntry);
	    	if(file != null){
	    		var size=0;
	    		size=(file.size/1024);
	    		size = size/1024;
	    		return size.toFixed(2);
	    	}else{
	    		return 0;
	    	}
	    	
	    },
	 
	    deleteFile : function(fileName){
			var fileEntry=this.getFileEntry(fileName); 
	    	if (fileEntry != null) {
				fileEntry.remove();
	    	}
			
			return true;
		 },
		 checkIfFileExists: function(path){
			 if((typeof path == 'undefined')){
				 path = '';
			 }
			 	var fileExists = false;
			 	try {
			 		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
					        fileSystem.root.getFile(path, { create: false }, function(fileEntry){
					        	fileExists = true;
					        }, function (fileEntry){
					        	fileExists = false;
					        });
					    }, function (fileEntry){
				        	fileExists = false;
				        }); 
			 		 } catch (e) {
					// TODO: handle exception
				}
			   
			    return fileExists;
			},
		 
		 
		 getFileEntry : function(filePath){
			 var fileEntryForUse = null;
			 function getFilePath(){
				// "dam/"+fileName;
				 return filePath;
			 }

			 function fail(){
				 //alert('getting fileEntry failed');
			 }
			
			 
			 function gotFileEntry(fileEntry) {
				 fileEntryForUse = fileEntry;
			 }
			 
			 function gotFS(fileSystem) {
				 var filePath=getFilePath();
				 fileSystem.root.getFile(filePath, {create: false}, gotFileEntry, fail);
			 }
			 
			 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
			 return fileEntryForUse;
		 },
		 
		 getFileEntryCB : function(filePath, success, fail){
			 var fileEntryForUse = null;
			 function getFilePath(){
				// "dam/"+fileName;
				 return filePath;
			 }
			 
			 function gotFileEntry(fileEntry) {
				 fileEntryForUse = fileEntry;
				 success(fileEntryForUse);
			 }
			 
			 function gotFS(fileSystem) {
				 var filePath=getFilePath();
				 fileSystem.root.getFile(filePath, {create: false}, gotFileEntry, fail);
			 }
			 
			 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		 },
		 
		 getFileFromFileEntry : function(fileEntry){
			 var fileTobeReturn=null;
			 if(fileEntry != null){
				 fileEntry.file(gotFile, fail);
			 }
			
			 function gotFile(file){
				 fileTobeReturn = file;
				 
			 }
			 function fail(){
			 }
		    	
			 return fileTobeReturn;
		 }
	
};

com.swaas.hidoctor.edetailing.util.UUIDUtil = {
		 s4 : function() {
			  return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		},
		
		getUID : function() {
			var _i = com.swaas.hidoctor.edetailing.util.UUIDUtil;
		return _i.s4() + _i.s4() + '-' + _i.s4() + '-' + _i.s4() + '-' +
		_i.s4() + '-' + _i.s4() + _i.s4() + _i.s4();
		}
};

function Downloader() {};

Downloader.prototype.downloadFile = function(downloadURL, directoryName, fileName, params, progressCallBack) {
	if (params == null){
		params = {};
	}
	params.dirName = directoryName;
	params.fileName = fileName;
	
	var win = function(progressStatus){
		if (progressCallBack != null){
			progressCallBack(progressStatus);
		}
	};
	
	var fail = function(progressFailed){
		console.log(JSON.stringify(progressFailed));
		if(progressFailed == null){
			progressFailed = {};
		} 
		if (progressCallBack != null){
			progressFailed.status = -1;
			progressFailed.progress = 0;
			progressCallBack(progressFailed);
		}
	};
	
	PhoneGap.exec(win, fail, "Downloader", "downloadFile", [downloadURL, params]);
};


function FileOpener() {
};

FileOpener.prototype.open = function(url) {
    cordova.exec(null, null, "FileOpener", "openFile", [url]);
};
com.swaas.hidoctor.edetailing.util.DeviceInfo = {
		
		getDeviceId : function(){
			return device.uuid;
		}
};

function LocationPlugin(){

};

LocationPlugin.prototype.getCurrentPosition = function(){
		var result = {};
		var win = function(obj){
			alert(JSON.stringify(obj));
		};
		
		var fail = function(obj){
			alert(JSON.stringify(obj));
		};
		
		PhoneGap.exec(win, fail, "LocationPlugin", "getCurrentPosition", []);		
};

/* Start - Plugin added by Vinoth Kannah MP */
var zip = { 
	unzip: function(fileName, outputDirectory, thumbnail, callback, progressCallback) {
		var win = function(result) {
	    	if (result && typeof result.loaded != "undefined") {
	            if (progressCallback) {
	                return progressCallback(newProgressEvent(result));
	            }
	        } else if (callback) {
	            callback(result, thumbnail);
	        }
	    };
	    var fail = function(result) {
	        if (callback) {
	            callback(-1);
	        }
	    };
	    PhoneGap.exec(win, fail, 'Zip', 'unzip', [fileName, outputDirectory]);
	}
};
/* End - Plugin added by Vinoth Kannah MP */

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.fileOpener) {
    window.plugins.fileOpener = new FileOpener();
}

if (!window.plugins.locationPlugin) {
    window.plugins.locationPlugin = new LocationPlugin();
}