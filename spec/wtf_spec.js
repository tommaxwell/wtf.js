describe("WTF", function () {
	it("should call initialize when instantiated", function() {
	  var initializeSpy = spyOn(WTF.prototype, "initialize");
		new WTF();
		expect(initializeSpy).toHaveBeenCalled();
	});

	it("should be an instance of WTF", function() {
	  expect(new WTF).toBeInstanceOf(WTF)
	});

	describe("sharing extend without inheritance", function() {
		var BaseClass, SubClass, MyObject, subClassInitSpy,
				initSpy, instanceMethodSpy, accessSuperSpy, staticFuncSpy,
				subClassFunctionSpy;

		beforeEach(function() {
			subClassInitSpy = jasmine.createSpy();
			initSpy = jasmine.createSpy();
			accessSuperSpy = jasmine.createSpy();
			instanceMethodSpy = jasmine.createSpy();
			staticFuncSpy = jasmine.createSpy();
			subClassFunctionSpy = jasmine.createSpy();

			BaseClass = function() {
				this.init.apply(this, arguments);
			};

			BaseClass.extend = WTF.extend;

			SubClass = BaseClass.extend({
				i_am_a: "SubClass",
				init: function(arg) {
				  subClassInitSpy(arg);
				},
				subClassFunction: function(arg) {
				  subClassFunctionSpy(this.i_am_a);
				}
			}, {
				staticProperty: "bar",
				staticMethod: function() {

				}
			});

			MyObject = SubClass.extend({
				i_am_a: "MyObject",
				init: function(arg) {
					initSpy(arg);
				},
				instanceMethod: function(arg) {
				  instanceMethodSpy(arg);
				},
				accessSuperMethod: function(arg) {
					this.super.subClassFunction.call(this);
				}
			}, {
				staticProperty: "fu",
				staticMethod: function() {
					staticFuncSpy();
				}
			});
		});

		it("should extend properly after sharing #extend", function() {
			var sub = new SubClass("fubar");
			expect(subClassInitSpy).toHaveBeenCalledWith("fubar");
			expect(sub.i_am_a).toBe("SubClass");

			var obj = new MyObject("hello");
			expect(initSpy).toHaveBeenCalledWith("hello");
			expect(obj.i_am_a).toBe("MyObject");
		});

		it("should set instance methods correctly", function() {
			var sub = new SubClass("hey");
			expect(SubClass.subClassFunction).toBeUndefined();
			expect(sub.subClassFunction).toBeDefined();
			sub.subClassFunction();
			expect(subClassFunctionSpy).toHaveBeenCalledWith("SubClass");

			var obj = new MyObject();
			expect(MyObject.instanceMethod).toBeUndefined();
			expect(obj.instanceMethod).toBeDefined();
			obj.instanceMethod("bar");
			expect(instanceMethodSpy).toHaveBeenCalledWith("bar");
		});

		it("should have static properties and extend them properly", function() {
			expect(SubClass.staticProperty).toBe("bar");
			expect(MyObject.staticProperty).toBe("fu");
		});

		it("should have static methods and extend them properly", function() {
			expect(staticFuncSpy).not.toHaveBeenCalled();
			MyObject.staticMethod();
			expect(staticFuncSpy).toHaveBeenCalled();
		});

		it("should be an instance of itself and its parents, but not WTF", function() {
			expect(new SubClass).toBeInstanceOf(SubClass);
			expect(new SubClass).toBeInstanceOf(BaseClass);
			expect(new SubClass).not.toBeInstanceOf(WTF);

			expect(new MyObject).toBeInstanceOf(MyObject);
			expect(new MyObject).toBeInstanceOf(SubClass);
			expect(new MyObject).toBeInstanceOf(BaseClass);
			expect(new MyObject).not.toBeInstanceOf(WTF);
		});

		it("should be able to use 'super", function() {
			var obj = new MyObject();
			obj.instanceMethod(obj.super.i_am_a);
			expect(instanceMethodSpy).toHaveBeenCalledWith("SubClass");
		});
	});

	describe("inheriting from WTF", function() {
		var STFU, initializeSpy, staticMethodSpy, instanceMethodSpy,
				ROFL, childInitializeSpy, childInstanceMethodSpy, childStaticMethodSpy;

	  beforeEach(function() {
			initializeSpy = jasmine.createSpy();
			instanceMethodSpy = jasmine.createSpy();
			staticMethodSpy = jasmine.createSpy();
			childInitializeSpy = jasmine.createSpy();
			childInstanceMethodSpy = jasmine.createSpy();
			childStaticMethodSpy = jasmine.createSpy();

			STFU = WTF.extend({
				type: "STFU",
				initialize: function() {
					initializeSpy();
				},
				instanceMethod: function() {
				  instanceMethodSpy();
				}
			}, {
				staticProperty: "fubar",
				staticMethod: function() {
				  staticMethodSpy();
				}
			});

			ROFL = STFU.extend({
				type: "ROFL",
				initialize: function() {
					childInitializeSpy();
				},
				instanceMethod: function() {
					childInstanceMethodSpy();
				}
			}, {
				staticProperty: "lol",
				staticMethod: function() {
					childStaticMethodSpy();
				}
			});
	  });

		it("should be an instance of itself and of WTF", function() {
		  expect(new STFU()).toBeInstanceOf(WTF);
			expect(new STFU()).toBeInstanceOf(STFU);

			expect(new ROFL()).toBeInstanceOf(ROFL);
			expect(new ROFL()).toBeInstanceOf(STFU);
			expect(new ROFL()).toBeInstanceOf(WTF);
		});

		it("should still call the initialize function when instantiated", function() {
			expect(initializeSpy).not.toHaveBeenCalled();
			new STFU();
			expect(initializeSpy).toHaveBeenCalled();

			expect(childInitializeSpy).not.toHaveBeenCalled();
			new ROFL();
			expect(childInitializeSpy).toHaveBeenCalled();
		});

		it("should set instance properties correctly", function() {
			var stfuInstance = new STFU();
		  expect(stfuInstance.type).toBe("STFU");
			expect(STFU.type).toBeUndefined();

			var roflInstance = new ROFL();
			expect(roflInstance.type).toBe("ROFL");
		});

		it("should set instance methods correctly", function() {
		  var stfuInstance = new STFU();
			expect(STFU.instanceMethod).toBeUndefined();
			expect(stfuInstance.instanceMethod).toBeDefined();
			stfuInstance.instanceMethod();
			expect(instanceMethodSpy).toHaveBeenCalled();

			var roflInstance = new ROFL();
			expect(childInstanceMethodSpy).not.toHaveBeenCalled();
			roflInstance.instanceMethod();
			expect(childInstanceMethodSpy).toHaveBeenCalled();
		});

		it("should set static properties correctly", function() {
			expect(STFU.staticProperty).toBe("fubar");

			expect(ROFL.staticProperty).toBe("lol");
		});

		it("should set static methods correctly", function() {
		  expect(staticMethodSpy).not.toHaveBeenCalled();
			STFU.staticMethod();
			expect(staticMethodSpy).toHaveBeenCalled();

			expect(childStaticMethodSpy).not.toHaveBeenCalled();
			ROFL.staticMethod();
			expect(childStaticMethodSpy).toHaveBeenCalled();
		});
	});

	describe("extra super tests", function() {
		var Animal, Human, Clown, animalFunctionSpy, humanFunctionSpy, clownFunctionSpy;

		beforeEach(function() {
			animalFunctionSpy = jasmine.createSpy();
			humanFunctionSpy = jasmine.createSpy();
			clownFunctionSpy = jasmine.createSpy();

			Animal = WTF.extend({
				type: "animal",
				doSomething: function() {
					animalFunctionSpy(this.type);
				}
			});

			Human = Animal.extend({
				type: "human",
				doSomething: function() {
					this.super.doSomething.call(this);
					humanFunctionSpy(this.super.type);
				}
			});

			Clown = Human.extend({
				type: "clown",
				doSomething: function() {
					this.super.super.doSomething.call(this);
					clownFunctionSpy(this.super.super.type);
				}
			});
		});

		it("should be able to access the parent by calling this.super", function() {
			var dog = new Animal();
			dog.doSomething();
			expect(animalFunctionSpy).toHaveBeenCalledWith("animal");
			expect(humanFunctionSpy).not.toHaveBeenCalled();
			animalFunctionSpy.reset();

			var jennifer = new Human();
			jennifer.doSomething();
			expect(animalFunctionSpy).toHaveBeenCalledWith("human");
			expect(humanFunctionSpy).toHaveBeenCalledWith("animal");
		});

		it("should be able to chain super calls", function() {
			var bozo = new Clown();
			bozo.doSomething();
			expect(animalFunctionSpy).toHaveBeenCalledWith("clown");
			expect(humanFunctionSpy).not.toHaveBeenCalled();
			expect(clownFunctionSpy).toHaveBeenCalledWith("animal");
		});
	});
});