/*
 * Base JS file.
 * @author saravanan.ramaswamy@landqtech.com
 */
SwaaS = {
	version : '1.0',
	namespace : function() {
		var a = arguments, o = null, i, j, d, rt;
		for (i = 0; i < a.length; ++i) {
			d = a[i].split(".");
			rt = d[0];
			eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = '
					+ rt + ';');
			for (j = 1; j < d.length; ++j) {
				o[d[j]] = o[d[j]] || {};
				o = o[d[j]];
			}
		}
	}
};

function $A(iterable) {
	if (!iterable)
		return [];
	if (iterable.toArray)
		return iterable.toArray();
	var length = iterable.length || 0, results = new Array(length);
	while (length--)
		results[length] = iterable[length];
	return results;
}

var Class = {
	create : function() {
		var parent = null, properties = $A(arguments);
		if (Object.isFunction(properties[0]))
			parent = properties.shift();

		function klass() {
			this.initialize.apply(this, arguments);
		}

		Object.extend(klass, Class.Methods);
		klass.superclass = parent;
		klass.subclasses = [];

		if (parent) {
			var subclass = function() {
			};
			subclass.prototype = parent.prototype;
			klass.prototype = new subclass;
			parent.subclasses.push(klass);
		}

		for ( var i = 0; i < properties.length; i++)
			klass.addMethods(properties[i]);

		if (!klass.prototype.initialize)
			klass.prototype.initialize = Prototype.emptyFunction;

		klass.prototype.constructor = klass;

		return klass;
	}
};

Class.Methods = {
	addMethods : function(source) {
		var ancestor = this.superclass && this.superclass.prototype;
		var properties = Object.keys(source);

		if (!Object.keys({
			toString : true
		}).length)
			properties.push("toString", "valueOf");

		for ( var i = 0, length = properties.length; i < length; i++) {
			var property = properties[i], value = source[property];
			if (ancestor && Object.isFunction(value)
					&& value.argumentNames().first() == "$super") {
				var method = value, value = Object.extend((function(m) {
					return function() {
						return ancestor[m].apply(this, arguments);
					};
				})(property).wrap(method), {
					valueOf : function() {
						return method;
					},
					toString : function() {
						return method.toString();
					}
				});
				this.prototype[property] = value;
			}
		}

		return this;
	}
};

var Abstract = {};

Object.extend = function(destination, source) {
	for ( var property in source)
		destination[property] = source[property];
	return destination;
};

Object.extend(Object, {
	inspect : function(object) {
		try {
			if (Object.isUndefined(object))
				return 'undefined';
			if (object === null)
				return 'null';
			return object.inspect ? object.inspect() : String(object);
		} catch (e) {
			if (e instanceof RangeError)
				return '...';
			throw e;
		}
	},

	toJSON : function(object) {
		var type = typeof object;
		switch (type) {
		case 'undefined':
		case 'function':
		case 'unknown':
			return;
		case 'boolean':
			return object.toString();
		}

		if (object === null)
			return 'null';
		if (object.toJSON)
			return object.toJSON();
		if (Object.isElement(object))
			return;

		var results = [];
		for ( var property in object) {
			var value = Object.toJSON(object[property]);
			if (!Object.isUndefined(value))
				results.push(property.toJSON() + ': ' + value);
		}

		return '{' + results.join(', ') + '}';
	},

	toQueryString : function(object) {
		return $H(object).toQueryString();
	},

	toHTML : function(object) {
		return object && object.toHTML ? object.toHTML() : String
				.interpret(object);
	},

	keys : function(object) {
		var keys = [];
		for ( var property in object)
			keys.push(property);
		return keys;
	},

	values : function(object) {
		var values = [];
		for ( var property in object)
			values.push(object[property]);
		return values;
	},

	clone : function(object) {
		return Object.extend({}, object);
	},

	isElement : function(object) {
		return object && object.nodeType == 1;
	},

	isArray : function(object) {
		return object != null && typeof object == "object"
				&& 'splice' in object && 'join' in object;
	},

	isHash : function(object) {
		return object instanceof Hash;
	},

	isFunction : function(object) {
		return typeof object == "function";
	},

	isString : function(object) {
		return typeof object == "string";
	},

	isNumber : function(object) {
		return typeof object == "number";
	},

	isUndefined : function(object) {
		return typeof object == "undefined";
	}
});

/**
 * Reserve Name spaces for packaging/organising the classes.
 */
SwaaS.namespace("ED", "com", "com.swaas", "com.swaas.hidoctor",
		"com.swaas.hidoctor.edetailing", "com.swaas.hidoctor.edetailing.core",
		"com.swaas.hidoctor.edetailing.util",
		"com.swaas.hidoctor.edetailing.service",
		"com.swaas.hidoctor.edetailing.ui",
		"com.swaas.hidoctor.edetailing.ui.controller",
		"com.swaas.hidoctor.edetailing.ui.view",
		"com.swaas.hidoctor.edetailing.ui.page",
		"com.swaas.hidoctor.edetailing.dao",
		"com.swaas.hidoctor.edetailing.service",
		"com.swaas.hidoctor.edetailing.net");

function MethodProfiler() {

}

MethodProfiler.prototype.execute = function(source, func, arguments, methodName) {

	var startTime = new Date().getTime();

	try {
		console.log("Calling method " + methodName + " in class "
				+ (/(\w+)\(/.exec(source.constructor.toString())[1]));
		var ret = func.apply(source, arguments);
		var endTime = new Date().getTime();
		console.log("Total Time take to execute method " + methodName + " : "
				+ (endTime - startTime));
		return ret;
	} catch (err) {
		var endTime = new Date().getTime();
		console.log("Total Time take to execute method " + methodName + " : "
				+ (endTime - startTime));
		throw err;
	}
};

function createProxy(source, handler) {

	var proxy = $.extend({}, source);

	if(handler == null){
		handler = new MethodProfiler();
	}
	$.each(source, function(index, property) {
		if (typeof property == "function") {
			proxy[index] = function() {
				handler.execute(source, property, arguments, index);
			};
		}
	});
	return proxy;
};

