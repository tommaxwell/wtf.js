//                   WTF.js
//********************************************
//               by Arjun Sharma
//               v0.0.9 (c) 2012
//
// With thanks to the awesome people of:
// Backbone.js - http://www.backbonejs.org
// Underscore.js - http://www.underscorejs.org
// Jasmine - http://pivotal.github.com/jasmine
// Pivotal Labs - http://www.pivotallabs.com

var WTFConfigs = {
	extendFunctionName: "extend",
	superName: "super"
};

(function() {
	var root = this;
	var WTF;
	WTF = root.WTF = function() { this.initialize.apply(this, arguments); }
//	var _ = root._;

	// START UnderscoreJS fragments *************
	// http://underscorejs.org
	var breaker = {};
	var u_each = function(obj, iterator, context) {
		if (obj == null) return;
		if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
			obj.forEach(iterator, context);
		} else if (obj.length === +obj.length) {
			for (var i = 0, l = obj.length; i < l; i++) {
				if (iterator.call(context, obj[i], i, obj) === breaker) return;
			}
		} else {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					if (iterator.call(context, obj[key], key, obj) === breaker) return;
				}
			}
		}
	};

	var u_extend = function(obj) {
		u_each(Array.prototype.slice.call(arguments, 1), function(source) {
			for (var prop in source) {
				obj[prop] = source[prop];
			}
		});
		return obj;
	};
	// END Underscore JS fragments *************


	u_extend(WTF.prototype, { initialize: function(){} });

	var extend = function (protoProps, classProps) {
		var child = inherits(this, protoProps, classProps);
		child[WTFConfigs.extendFunctionName] = this[WTFConfigs.extendFunctionName];
		return child;
	};

	var ctor = function(){};

	var inherits = function(parent, protoProps, staticProps) {
		var child = function(){ parent.apply(this, arguments); };
		u_extend(child, parent);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		if (protoProps) u_extend(child.prototype, protoProps);
		if (staticProps) u_extend(child, staticProps);
		child.prototype[WTFConfigs.superName] = parent.prototype;
		return child;
	};
	WTF[WTFConfigs.extendFunctionName] = extend;

}).call(this);