com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO = {
		
		metadata: {
			"tableName" : "tbl_DA_Itemized_Billing",
			"columns": [
			            {name: "daBillingId", columnName: "DA_Billing_Id", pk:true},
			            {name: "companyCode", columnName: "Company_Code"},
						{name: "daCode", columnName: "DA_id"},
						{name: "userCode", columnName: "User_Code"},
						{name: "userName", columnName: "User_Name"},
						{name: "regionCode", columnName: "Region_Code"},
						{name: "regionName", columnName: "Region_Name"},
						{name: "divisionCode", columnName: "Division_Code"},
						{name: "divisionName", columnName: "Division_Name"},
						{name: "dateTime", columnName: "DateTime", isDate:true},
						{name: "offlineClick", columnName: "Offline_Click"},
						{name: "downloaded", columnName: "Downloaded"},
						{name: "onlinePlay", columnName: "Online_Play"},
						{name: "dcrActualDate", columnName: "DCR_Actual_Date", isDate:true},
						{name: "productCode", columnName: "Product_Code"},
						{name: "productName", columnName: "Product_Name"},
						{name: "doctorCode", columnName: "Doctor_Code"},
						{name: "doctorRegionCode", columnName: "Doctor_Region_Code"},
						{name: "longitude", columnName: "Longitude"},
						{name: "latitude", columnName: "Latitude"},
						{name: "playTime", columnName: "Play_Time"},
						{name: "geoAddress", columnName: "Geolocation_Address"}
						]
		},
		
		insert: function(digitalAssetBilling){
			com.swaas.hidoctor.edetailing.dao.SynchronizeLocalDAO.updateUpSyncRequired(true);
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.insert(this, digitalAssetBilling);
		},
		
		remove: function(daBillingId){
			var criteria = {};
			criteria.daBillingId = daBillingId;
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);			
		},
		
		get: function(daBillingId){
			var criteria = {};
			criteria.daBillingId = daBillingId;
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, criteria);
			if (result.length > 0){
				return result[0];
			} else {
				return null;
			}
		},

		getAll: function(){
			var result = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, null);
			return result;
		},
		
		syncGet: function(params){
			var daBillingRecords = [];
			var columns = [{name: "companyCode", columnName: "Company_Code"},
							{name: "daCode", columnName: "DA_id"},
							{name: "userCode", columnName: "User_Code"},
							{name: "userName", columnName: "User_Name"},
							{name: "regionCode", columnName: "Region_Code"},
							{name: "regionName", columnName: "Region_Name"},
							{name: "divisionCode", columnName: "Division_Code"},
							{name: "divisionName", columnName: "Division_Name"},
							{name: "dateTime", columnName: "DateTime"},
							{name: "offlineClick", columnName: "Offline_Click"},
							{name: "downloaded", columnName: "Downloaded"},
							{name: "onlinePlay", columnName: "Online_Play"},
							{name: "dcrActualDate", columnName: "DCR_Actual_Date"},
							{name: "productCode", columnName: "Product_Code"},
							{name: "productName", columnName: "Product_Name"},
							{name: "doctorCode", columnName: "Doctor_Code"},
							{name: "doctorRegionCode", columnName: "Doctor_Region_Code"},
							{name: "latitude", columnName: "Latitude"},
							{name: "longitude", columnName: "Longitude"},
							{name: "playTime", columnName: "Play_Time"},
							{name: "geoAddress", columnName: "Geolocation_Address"}
							];
			
			var daBillings = com.swaas.hidoctor.edetailing.dao.CoreDAO.getEquals(this, {});
			$.each(daBillings, function (index, daBilling){				
				if(daBilling.geoAddress == null){
					var address  = ED.getGeoLocationAddress(daBilling.latitude, daBilling.longitude);
					if(address != null){
						daBilling.geoAddress = address;
					} else {
						daBilling.geoAddress = "NULL";
					}
				}
				var daItemizedDetails = ED.formatDataForSync(daBilling, columns);
				var daBillingRecord = {
						daBillingId: daBilling.daBillingId,
						correlationId: params.correlationId,
						companyCode: params.companyCode,
						userCode: params.userCode,
						daItemizedDetails: daItemizedDetails
					};
				daBillingRecords.push(daBillingRecord);
			});
			
			return daBillingRecords;
		},
		
		clean: function(params){
			if (params == null){
				params = {};
			}
			var criteria = {
					daBillingId: params.daBillingId
				};
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.remove(this, criteria);	
		},
		eraseAndClean : function(isEraseAndClean){
			var params = {};
			com.swaas.hidoctor.edetailing.dao.DigitalAssetBillingLocalDAO.clean(params);
		},
		update : function(daBillingId, documentViewTime){
			return com.swaas.hidoctor.edetailing.dao.CoreDAO.update(this, {daBillingId : daBillingId, playTime : documentViewTime});
		}
};
