var _globalActivityManager = null;
var _globalAMTimerId = null;
ED.downloading = false;
function ActivityManager(options) {

	this.settings = $.extend({
		progressManipulation : function(asset, status) {
			console.log("Activity done : " + JSON.stringify(asset)
					+ ", Status : " + status);
		}
	}, options);

	this.currentCounter = 0;
	this.activityId = 1000;
	this.timerId = null;
	_globalActivityManager = this;
	this._activities = [];
	this.lastUnscheduleActivity = null;

}
ActivityManager.prototype.scheduleActivity = function(selectedAsset) {
	this.activityId++;
	var activity = {
		asset : selectedAsset,
		activityId : this.activityId,
		status : "NEW",
		_activity : null
	};
	if (selectedAsset.action === "delete") {
		activity._activity = new RemoveActivity(activity, this);
	}
	if (selectedAsset.action === "download") {
		activity._activity = new DownloadActivity(activity, this);
	}

	this._activities.push(activity);
};

ActivityManager.prototype.unscheduleActivity = function(selectedAsset) {
	var _this = this;
	
	$.each(_this._activities, function(i, activityTobeUnscheduled){
		if (activityTobeUnscheduled != this.lastUnscheduleActivity  && selectedAsset.daCode == activityTobeUnscheduled.asset.daCode) {
			_this._activities.splice($.inArray(activityTobeUnscheduled, _this._activities), 1);
			_this.lastUnscheduleActivity = activityTobeUnscheduled;
		}
	});
};
ActivityManager.prototype.start = function() {
	_startGlobalActivityManager();
};

ActivityManager.prototype._executeTask = function() {
	ED.downloading = true;	
	if (this.currentCounter >= this._activities.length) {
		ED.downloading = false;
		return null;
	}

	var currentActivity = this._activities[this.currentCounter];
	if (currentActivity.status == "DONE" || currentActivity.status == "FAILED") {
		this.currentCounter++;
	} else {
		currentActivity._activity.run();
		this.settings.onActivityProgress(currentActivity.asset,
				currentActivity.status);
	}
	return "continue";

};
function _startGlobalActivityManager() {

	var status = _globalActivityManager._executeTask();
	if (status != null) {

		if (_globalAMTimerId != null) {
			clearInterval(_globalAMTimerId);
		}

		_globalAMTimerId = setInterval(_startGlobalActivityManager, 300);
	} else {

		if (_globalAMTimerId != null) {
			clearInterval(_globalAMTimerId);
		}
		_globalActivityManager.currentCounter = 0;
		return;
	}
}

ActivityManager.prototype.getActivityStatus = function(asset) {
	var activities = this._activities;
	var assetDACode = asset.daCode;
	var status = null;
	$.each(activities, function(index, activity) {
		var daCode = activity.asset.daCode;
		if (assetDACode == daCode) {
			status = activity.status;
		}
	});
	return status;
};