function CoreTask (options){
	this.settings = $.extend({
		task: function(context, data, success, failure){
			success();
		},
		context: {},
		data: {},
		success: function(){},
		failure: function() {},
		title: options != null && options.task != null ? options.task.name: "Untitled",
		waitPeriod: 100
	}, options);
	
	this.id = com.swaas.hidoctor.edetailing.util.UUIDUtil.getUID();
	this.title = this.settings.title;
	this.context = this.settings.context;
	this.data = this.settings.data;
	this.success = this.settings.success;
	this.failure = this.settings.failure;
	
	this.task = this.settings.task;
	this.waitPeriod = this.settings.waitPeriod;
};

CoreTask.prototype.execute = function(_this){
	if (_this == null){
		_this = this;
	}
	setTimeout(function(){
					_this.executeTask(_this);
				}, _this.waitPeriod);
};

CoreTask.prototype.executeTask = function(_this){
	this.task(_this.context, _this.data, _this.success, _this.failure);
};


function BulkTask (options){
	CoreTask.call(this, options);
	this.tasks = [];
};

BulkTask.prototype = new CoreTask();

BulkTask.prototype.constructor = CoreTask;

BulkTask.prototype.addTask = function(task){
	this.tasks.push(task);
};

BulkTask.prototype.executeTask = function(_this){
	if (_this == null){
		_this = this;
	}
	if (_this.tasks.length > 0){
		var lastIndex = this.tasks.length-1;
		$.each(_this.tasks,  function(index, task){
			task.context = _this.context;
			if (index == lastIndex){
				task.success = function(data){
					_this.success(data);
				};
				task.failure = _this.failure;
			} else {
				task.success = function(data){
					_this.tasks[index+1].data = data;
					_this.tasks[index+1].execute (_this.tasks[index+1]);
				};
				task.failure = _this.failure;
			}
		});
		_this.tasks[0].data = _this.data;
		_this.tasks[0].execute(_this.tasks[0]);
	}
};

function PairTask (options){
	CoreTask.call(this, options);
	this.settings = $.extend({
		firstTask: new CoreTask({}, {}, function(){}, function(){}),
		secondTask:  new CoreTask({}, {}, function(){}, function(){}),
		waitPeriod: 100
	}, options);
	
	this.firstTask = this.settings.firstTask;
	this.secondTask = this.settings.secondTask;
	
};

PairTask.prototype = new CoreTask();

PairTask.prototype.constructor = CoreTask;

PairTask.prototype.executeTask = function(_this){
	if (_this == null){
		_this = this;
	}
	_this.firstTask.context = _this.context;
	_this.firstTask.data = _this.data;
	_this.firstTask.success = function(data){
		_this.secondTask.data = data;
		_this.secondTask.execute(_this.renderTask);
	};
	_this.firstTask.failure = _this.failure;
	
	_this.secondTask.context = _this.context;
	_this.secondTask.data = _this.data;
	_this.secondTask.success = _this.success;
	_this.secondTask.failure = _this.failure;
	
	_this.firstTask.execute(_this.loadTask);
};

function TaskUtil(taskSpecifications){
	this.taskSpecifications = taskSpecifications;
};

TaskUtil.prototype.execute = function(context, data, success, failure){
	if (this.taskSpecifications != null){
		var bulkTask = this._buildTasks(this.taskSpecifications, context, data, success, failure);
		bulkTask.execute();
	}
};

TaskUtil.prototype._buildTasks = function(taskSpecifications, context, data, success, failure){
	var bulkTask = new BulkTask({
		data: data,
		context: context,
		success: success,
		failure: failure
	});
	var _this = this;
	$.each(taskSpecifications, function(index, taskSpecification){
		var task = null;
		if (taskSpecification instanceof Array){
			task = _this._buildTasks(taskSpecification, context, data, success, failure);
		} else if (taskSpecification.firstTask != null) {
			task = new PairTask({
				firstTask: new CoreTask({task: taskSpecification.firstTask, title:taskSpecification.title}),
				secondTask: new CoreTask({task: taskSpecification.secondTask, title:taskSpecification.title}),
				title:taskSpecification.title
				});

		} else {
			task = new CoreTask({task: taskSpecification.task, title:taskSpecification.title});
		}
		bulkTask.addTask(task);
	});
	return bulkTask;
};