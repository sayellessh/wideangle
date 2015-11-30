var EdtAnalysisService = {
	
		globalSettings : null,
		
		show : function(url) {
			var _this = this;
			location.href = url + "?globalSettings=" + (JSON.stringify(_this.globalSettings));
		},
		
		Initialize : function(onSuccess, onFail){
			var _this = this;
			_this.globalSettings = JSON.parse(_this.parse('globalSettings'));
			if(onSuccess) onSuccess();
		},
		
		parse: function(val) {
		    var result = "Not found",
		        tmp = [];
		    location.search
		    //.replace ( "?", "" ) 
		    // this is better, there might be a question mark inside
		    .substr(1)
		        .split("&")
		        .forEach(function (item) {
		        tmp = item.split("=");
		        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
		    });
		    return result;
		},
		
		AssetRegister: function(assetId,assetName,assetPosition){
			var _this = this.globalSettings;
			var params = {
				originalAssetId: _this.selectedAsset.daCode,
				assetId: assetId,
				assetName: assetName,
				assetPosition: assetPosition
			};
			window.parent.siteAssetMasterInsert(params);
		},
		
		TrackEvent:function(assetId, productCode, categoryValue, actionValue, labelValue){
			var _this = this.globalSettings;
			var params = {
				originalAssetId: _this.selectedAsset.daCode,
				doctorCode: _this.selectedDoctor.customerCode,
				doctorRegionCode: _this.selectedDoctor.regionCode,
				assetId : assetId,
				productCode : productCode,
				categoryValue : categoryValue,
				actionValue : actionValue,
				labelValue : labelValue,
				eventDate : this.formatLocalDate()
			};
			alert(JSON.stringify(params));
			window.parent.siteAnalyticsInsert(params);
		},
		
		formatLocalDate : function(){
		    var now = new Date(),
		        tzo = -now.getTimezoneOffset(),
		        dif = tzo >= 0 ? '+' : '-',
		        pad = function(num) {
		            norm = Math.abs(Math.floor(num));
		            return (norm < 10 ? '0' : '') + norm;
		        };
		    return now.getFullYear() 
		        + '-' + pad(now.getMonth()+1)
		        + '-' + pad(now.getDate())
		        + 'T' + pad(now.getHours())
		        + ':' + pad(now.getMinutes()) 
		        + ':' + pad(now.getSeconds());
		        //+ dif + pad(tzo / 60) 
		        //+ ':' + pad(tzo % 60);
		}
};