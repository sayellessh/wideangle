var ZipUtil = function(workDir) {
	this.edFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.edFolder;
	this.astFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.astFolder;
	this.damFolder = com.swaas.hidoctor.edetailing.ui.view.Resource.download.damFolder;
};

ZipUtil.prototype = {
	downloadFile: function(params, success, fail) {
		var _this = this;
		var uri = params.onlineURL;
		ED.showLoading("Extracting Zip Files, Please wait...");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			fileSystem.root.getDirectory(_this.edFolder, {create : true, exclusive : false}, function(edDir) {
				edDir.getDirectory(_this.astFolder, {create : true, exclusive : false}, function(gotDir) {
					gotDir.getDirectory(params.daCode, {create: true, exclusive: false}, function(gotAssetDir) {
						var fileTransfer = new FileTransfer();
						var indexPath = gotAssetDir.fullPath;
						var zipFile = indexPath + '/index.zip';
						var thumbFileURL = indexPath + '/index.png';
						var edtJS = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get().htmlSiteEdatanalysisJsURL;
						fileTransfer.download(uri, zipFile, function(theFile){
							console.log('Done file Transfer');
							var thumbTrans = new FileTransfer();
							thumbTrans.download(params.thumbnailURL, thumbFileURL, function(thumbFile) {
								zip.unzip(zipFile, indexPath, thumbFile, function(zipFile, thumbFile) {
									var req = new XMLHttpRequest(); 
									req.onreadystatechange = function() {
									    if (req.readyState == 4) {
									        if( (req.status == 200) || (req.status == 0) ) {
									        	var writer = new FileWriter(indexPath + "/EdtAnalysisService.js");
									        	writer.onwrite = function(evt) {
								        	        console.log("write success");
								        	        if(success) success(zipFile, thumbFileURL);
								        	    };
								        	    writer.write(req.responseText);
									        } else {
									            console.log("Error talking to server");
									        }
									    }
									};
									req.open('GET', edtJS, true);
									req.send();
								}, fail);
							}, fail);
						}, function(error) {
		                    console.log("download error source " + error.source);
		                    console.log("download error target " + error.target);
		                    console.log("upload error code: " + error.code);
		                });
					});
				}, fail);
			}, fail);
		}, fail);
	},
	
	extract: function(asset, success, fail) {
		var _this = this;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			fileSystem.root.getDirectory(_this.edFolder, {create : true, exclusive : false}, function(edDir) {
				edDir.getDirectory(_this.astFolder, {create : true, exclusive : false}, function(gotDir) {
					gotDir.getDirectory(asset.daCode, {create: true, exclusive: false}, function(gotAssetDir) {
						com.swaas.hidoctor.edetailing.util.FileUtil.getFileEntryCB(asset.downloadedFileName, function(downloadedFileEntry) {

							var downloadedFileName = _this.damFolder + '/' + asset.daCode + '/index.html';
							var edtJS = com.swaas.hidoctor.edetailing.dao.ConfigurationLocalDAO.get().htmlSiteEdatanalysisJsURL;
							//  start of unzip
							zip.unzip(downloadedFileEntry.fullPath, gotAssetDir.fullPath, '', function(zipFile, thumbFile) {
								var req = new XMLHttpRequest(); 
								req.onreadystatechange = function() {
								    if (req.readyState == 4) {
								        if( (req.status == 200) || (req.status == 0) ) {
								        	var writer = new FileWriter(gotAssetDir.fullPath + "/EdtAnalysisService.js");
								        	writer.onwrite = function(evt) {
							        	        console.log("write success");
							        	        if(success) success(downloadedFileName);
							        	    };
							        	    writer.write(req.responseText);
								        } else {
								            console.log("Error talking to server");
								            alert('Unable to download Analytics script. Please delete and download again to capture analytics for HTML Asset Name: ' + asset.name);
								            if(success) success(downloadedFileName);
								        }
								    }
								};
								req.open('GET', edtJS, true);
								req.send();
							}, fail);
							// end of unzip
							
						}, fail); 
					}, fail);
				}, fail);
			}, fail);
		}, fail);
	},
	
	deleteFile: function(params) {
		var _this = this;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			fileSystem.root.getDirectory(_this.edFolder, {create : true, exclusive : false}, function(edDir) {
				edDir.getDirectory(_this.astFolder, {create : true, exclusive : false}, function(gotDir) {
					gotDir.getDirectory(params.daCode, {create: true, exclusive: false}, function(gotAssetDir) {
						com.swaas.hidoctor.edetailing.util.FileUtil.deleteFile(gotAssetDir.fullPath);
					});
				});
			});
		});
	},
	
	load : function(uri, folderName, fileName, progress, success, fail) {
		var that = this;
		that.progress = progress;
		that.success = success;
		that.fail = fail;
		filePath = "";

		that.getFilesystem(function(fileSystem) {
			console.log("GotFS");
			that.getFolder(fileSystem, folderName, function(folder) {
				filePath = folder.toURL() + "/" + fileName;
				that.transferFile(uri, filePath, progress, success, fail);
			}, function(error) {
				console.log("Failed to get folder: " + error.code);
				typeof that.fail === 'function' && that.fail(error);
			});
		}, function(error) {
			console.log("Failed to get filesystem: " + error.code);
			typeof that.fail === 'function' && that.fail(error);
		});
	},

	getFilesystem : function(success, fail) {
		window.requestFileSystem = window.requestFileSystem
				|| window.webkitRequestFileSystem;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, success, fail);
	},

	getFolder : function(fileSystem, folderName, success, fail) {
		fileSystem.root.getDirectory(folderName, {
			create : true,
			exclusive : false
		}, success, fail)
	},

	transferFile : function(uri, filePath, progress, success, fail) {
		var that = this;
		that.progress = progress;
		that.success = success;
		that.fail = fail;

		var transfer = new FileTransfer();
		transfer.onprogress = function(progressEvent) {
			if (progressEvent.lengthComputable) {
				var perc = Math.floor(progressEvent.loaded
						/ progressEvent.total * 100);
				typeof that.progress === 'function' && that.progress(perc); // progression on scale 0..100 (percentage) as number
			} else {
			}
		};

		transfer.download(uri, filePath, function(entry) {
			console.log("File saved to: " + entry.toURL());
			typeof that.success === 'function' && that.success(entry);
		}, function(error) {
			console.log("An error has occurred: Code = " + error.code);
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("download error code " + error.code);
			typeof that.fail === 'function' && that.fail(error);
		});
	},

	unzip : function(folderName, fileName, success, fail) {
		var that = this;
		that.success = success;
		that.fail = fail;
		alert(folderName);

		zip
				.unzip(
						"cdvfile://localhost/persistent/" + folderName + "/"
								+ fileName,
						"cdvfile://localhost/persistent/" + folderName,
						function(code) {
							console.log("result: " + code);
							that
									.getFilesystem(
											function(fileSystem) {
												console.log("gotFS");
												that
														.getFolder(
																fileSystem,
																folderName
																		+ "/ftpack",
																function(folder) {
																	// document.getElementById("imgPlace").src = folder.nativeURL + "/img.jpg";
																	folder
																			.getFile(
																					"text.html",
																					{
																						create : false
																					},
																					function(
																							fileEntry) {
																						fileEntry
																								.file(
																										function(
																												file) {
																											var reader = new FileReader();
																											reader.onloadend = function(
																													evt) {
																												console
																														.log("Read as text");
																												console
																														.log(evt.target.result);
																												$(
																														'#myIframe')
																														.show();
																												$(
																														'#myIframe')
																														.attr(
																																'src',
																																"cdvfile://localhost/persistent/"
																																		+ folderName
																																		+ "/ftpack/index.html");

																												//document.getElementById("txtPlace").innerHTML = evt.target.result;
																												typeof that.success === ' function && that.success();'
																											};
																											reader
																													.readAsText(file);
																										},
																										function(
																												error) {
																											console
																													.log("Failed to get file");
																											typeof that.fail === 'function'
																													&& that
																															.fail(error);
																										});
																					},
																					function(
																							error) {
																						console
																								.log("failed to get file: "
																										+ error.code);
																						typeof that.fail === 'function'
																								&& that
																										.fail(error);
																					});
																},
																function(error) {
																	console
																			.log("failed to get folder: "
																					+ error.code);
																	typeof that.fail === 'function'
																			&& that
																					.fail(error);
																});
											},
											function(error) {
												console
														.log("failed to get filesystem: "
																+ error.code);
												typeof that.fail === 'function'
														&& that.fail(error);
											});
						});
	}
};

String.prototype.hashCode = function() {
	var hash = 0, i, chr, len;
	if (this.length == 0)
		return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var objToString = function(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
};