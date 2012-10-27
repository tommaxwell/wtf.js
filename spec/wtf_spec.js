describe("WTF", function () {
	it("should call initialize when instantiated", function() {
	  var initializeSpy = spyOn(WTF.prototype, "initialize");
		new WTF();
		expect(initializeSpy).toHaveBeenCalled();
	});

	describe("#extend", function() {
		var STFU, initializeSpy, staticMethodSpy, instanceMethodSpy;
	  beforeEach(function() {
			initializeSpy = jasmine.createSpy();
			instanceMethodSpy = jasmine.createSpy();
			staticMethodSpy = jasmine.createSpy();
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
	  });

		it("TODO TODO TODO - should test constructor? - TODO TODO TODO", function() {});

		it("should still call the initialize function when instantiated", function() {
			expect(initializeSpy).not.toHaveBeenCalled();
			new STFU();
			expect(initializeSpy).toHaveBeenCalled();
		});

		it("should set instance properties correctly", function() {
			var stfuInstance = new STFU();
		  expect(stfuInstance.type).toBe("STFU");
			expect(STFU.type).toBeUndefined();
		});

		it("should set instance methods correctly", function() {
		  var stfuInstance = new STFU();
			expect(STFU.instanceMethod).toBeUndefined();
			expect(stfuInstance.instanceMethod).toBeDefined();
			stfuInstance.instanceMethod();
			expect(instanceMethodSpy).toHaveBeenCalled();
		});

		it("should set static properties correctly", function() {
			expect(STFU.staticProperty).toBe("fubar");
		});

		it("should set static methods correctly", function() {
		  expect(staticMethodSpy).not.toHaveBeenCalled();
			STFU.staticMethod();
			expect(staticMethodSpy).toHaveBeenCalled();
		});

		describe("extending multiple levels", function() {
			var ROFL, childInitializeSpy, childInstanceMethodSpy, childStaticMethodSpy;
			beforeEach(function() {
				childInitializeSpy = jasmine.createSpy();
				childInstanceMethodSpy = jasmine.createSpy();
				childStaticMethodSpy = jasmine.createSpy();
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

			it("should still call the initialize function when instantiated", function() {
				expect(childInitializeSpy).not.toHaveBeenCalled();
				new ROFL();
				expect(childInitializeSpy).toHaveBeenCalled();
			});

			it("should override instance properties of its parent", function() {
				var roflInstance = new ROFL();
			  expect(roflInstance.type).toBe("ROFL");
			});

			it("should override instance methods of its parent", function() {
				var roflInstance = new ROFL();
			  expect(childInstanceMethodSpy).not.toHaveBeenCalled();
				roflInstance.instanceMethod();
				expect(instanceMethodSpy).not.toHaveBeenCalled();
				expect(childInstanceMethodSpy).toHaveBeenCalled();
			});

			it("should override static properties of its parent", function() {
				expect(ROFL.staticProperty).toBe("lol");
			});

			it("should override static methods of its parent", function() {
				expect(childStaticMethodSpy).not.toHaveBeenCalled();
				ROFL.staticMethod();
				expect(childStaticMethodSpy).toHaveBeenCalled();
			});
		});

		describe("the super method", function() {
		  var Animal, Human, parentFunctionSpy, childFunctionSpy;
			beforeEach(function() {
				parentFunctionSpy = jasmine.createSpy();
				childFunctionSpy = jasmine.createSpy();
			  Animal = WTF.extend({
					type: "animal",
					doSomething: function() {
					  parentFunctionSpy(this.type);
					}
				});

				Human = Animal.extend({
					type: "human",
					doSomething: function() {
						this.super.doSomething.call(this);
					  childFunctionSpy(this.super.type);
					}
				});
			});

			it("should be able to access the parent by calling this.super", function() {
				var dog = new Animal();
				dog.doSomething();
				expect(parentFunctionSpy).toHaveBeenCalledWith("animal");
				expect(childFunctionSpy).not.toHaveBeenCalled();
				parentFunctionSpy.reset();
			  var bozo = new Human();
				bozo.doSomething();
				expect(parentFunctionSpy).toHaveBeenCalledWith("human");
				expect(childFunctionSpy).toHaveBeenCalledWith("animal");
			});
		});
	});
});