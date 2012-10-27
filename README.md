WTF.js 0.0.9
=====

WTF.js aims to provide a simple and lightweight implementation of easy inheritance for Javascript projects of any size, without the bloat of extra functions or features. Use whatever other libraries or frameworks you want, and when you need simple objects to do simple inheritance, use WTF!

Based loosely off of the inheritance paradigm used in Backbone.js (http://www.backbonejs.org)

Tests
=====

In the tradition of TDD, this library is tested using Jasmine. To run the specs, simply open `spec/run.html` in a browser. More information about Jasmine can be found at http://pivotal.github.com/jasmine

Usage
=====

In order to use WTF.js you will need to include Underscore.js (http://www.underscorejs.org)

Here's an annotated example of how to use it:

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
});

new Dog(); // this will alert "dog"

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

* Backbone.js - http://www.backbonejs.org
* Underscore.js - http://www.underscorejs.org
* Jasmine - http://pivotal.github.com/jasmine
* Pivotal Labs - http://www.pivotallabs.com