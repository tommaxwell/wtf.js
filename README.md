WTF.js 0.0.9
=====

WTF.js aims to provide a simple and lightweight implementation of easy inheritance for Javascript projects of any size, without the bloat of extra functions or features. Use whatever other libraries or frameworks you want, and when you need simple objects to do simple inheritance, use WTF!

Based loosely off of the inheritance paradigm used in Backbone.js (http://backbonejs.org)

Includes fragments from Underscore.js to do forEach iteration and object extending (http://underscorejs.org)

Tests
=====

In the tradition of TDD, this library is tested using Jasmine. To run the specs, simply open `spec/run.html` in a browser. More information about Jasmine can be found at http://pivotal.github.com/jasmine

Usage
=====

Here are two annotated examples on how you can use WTF. The first example demonstrates inheriting from `WTF`. The second example demonstrates grabbing the `extend` function from `WTF` directly, without having to inherit from it.

Inheriting from WTF
-----

````javascript
// our base object extends WTF to get all of WTF.js's delicious benefits
var Animal = WTF.extend({
    // here we are setting a property of Animal
    i_am_a: "animal",

    // initialize gets called whenever you instantiate a WTF object
    initialize: function() {
        alert(this.i_am_a);
    }
});

new Animal(); // this will alert "animal"

// now we are going to extend Animal
// the extend function is propogated from parent to child
// also note that extend takes two arguments, both of are optional

// extend([instanceProps], [staticProps])

// instance properties are defined when you instantiate the object
// static properties are static on the class
var Dog = Animal.extend({
    // override Animal's i_am_a with Dog's
    i_am_a: "dog",

    // again, initialize gets called whenever you instantiate a WTF object
    // Dog's initialize will override Animal's
    initialize: function() {
        // you can access the parent by calling this.super
        // you need to use .call(this) to pass the context of the child to the parent
        this.super.initialize.call(this);
    }
}, {
    staticProperty: "wasup",
    staticMethod: function(arg) {
    		alert(arg);
    }
 });

var puppy = new Dog(); // this will alert "dog"

// to demonstrate static properties and methods, we call
// 'staticMethod' off of the Dog class, and not off the instance
// for example, 'puppy.staticMethod("foo")' will throw an error,
// as will trying to reference puppy.staticProperty
Dog.staticMethod(Dog.staticProperty); // this will alert "wasup"

var Chihuahua = Dog.extend({
    i_am_a: "chihuahua",

    initialize: function() {
        // here we are going to do our own alert, but we are going to alert
        // Animal's i_am_a by chaining calls to super
        alert(this.super.super.i_am_a);
    }
});

new Chihuahua(); // this will alert "animal"
````

Grabbing WTF's Functionality without Inheritance
-----

````javascript
// Set up your base class yourself. In my example I've made the base
// call 'setup' on anything that subclasses it, similar to the way WTF
// sets you up with 'initialize'
var BaseClass = function() {
	this.setup.apply(this, arguments);
}

// here we assign WTF's extend function to the BaseClass
BaseClass.extend = WTF.extend;

// define our subclass, similar to before
var SubClass = BaseClass.extend({
    i_am_a: "subclass",
	setup: function(arg) {
		alert(arg);
	}
});

new SubClass("foo"); // this will alert "foo"

// now we'll set up a sub class of our SubClass
// this is just to demonstrate that static properties work just as before
var SubSubClass = SubClass.extend({
    i_am_a: "subsubclass",
	setup: function(arg) {
		alert(arg);
	}
}, {
	staticProperty: "baz",
	staticMethod: function(arg) {
		alert(arg);
	}
});

var sub = new SubSubClass("bar"); // this will alert "bar"

alert(SubSubClass.staticProperty); // this will alert "baz"

// also, you still get the 'super' reference once you extend
SubSubClass.staticMethod(sub.super.i_am_a); // this will alert "subclass", not "subsubclass"
````

Configuring WTF
=====


WTF.js sets up two objects in the global namespace that you need to avoid colliding with in your own code, `WTF` and `WTFConfigs`. `WTFConfigs`, defined at the top of the `wtf.js` file, defines two configurations that you should not hesitate to change for any reason:

````javascript
var WTFConfigs = {
	extendFunctionName: "extend",
	superName: "super"
};
````

For example, you could set up `WTFConfigs` to be:

````javascript
var WTFConfigs = {
    extendFunctionName: "begets",
    superName: "father"
}
`````

And then in your code:

````javascript
var Bush41 = WTF.begets({
	name: "George H.W. Bush",
	initialize: function() {
		alert(this.name);
	}
});

var Bush43 = Bush41.begets({
	name: "George W. Bush",
	initialize: function() {
		alert("My father is " + this.father.name);
	}
});

new Bush43(); // alerts "My father is George H.W. Bush"
````

Thanks
=====

* Backbone.js - http://backbonejs.org
* Underscore.js - http://underscorejs.org
* Jasmine - http://pivotal.github.com/jasmine
* Pivotal Labs - http://pivotallabs.com
