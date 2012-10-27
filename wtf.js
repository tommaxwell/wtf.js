//                   WTF.js
//********************************************
//               by Arjun Sharma
//               v0.0.9 (c) 2012
//
// With thanks to the awesome people of:
// Backbone.js - http://www.backbonejs.org
// Underscore.js - http://www.underscore.js
// Jasmine - http://pivotal.github.com/jasmine
// Pivotal Labs - http://www.pivotallabs.com

(function() {
	var root = this;
	var WTF;
	WTF = root.WTF = function() {
		this.initialize.apply(this, arguments);
	}
	var _ = root._;

	_.extend(WTF.prototype, {
		initialize: function(){}
	});

	var extend = function (protoProps, classProps) {
		var child = inherits(this, protoProps, classProps);
		child.extend = this.extend;
		return child;
	};

	var ctor = function(){};

	var inherits = function(parent, protoProps, staticProps) {
		var child;

//		if (protoProps && protoProps.hasOwnProperty('constructor')) {
//			child = protoProps.constructor;
//		} else {
		child = function(){ parent.apply(this, arguments); };
//		}

		_.extend(child, parent);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();

		if (protoProps) _.extend(child.prototype, protoProps);
		if (staticProps) _.extend(child, staticProps);
//		child.prototype.constructor = child;
		child.prototype.super = parent.prototype;

		return child;
	};

	WTF.extend = extend;

}).call(this);