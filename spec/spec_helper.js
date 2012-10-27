beforeEach(function() {
	this.addMatchers({
		toBeInstanceOf: function(klass) {
			return this.actual instanceof klass;
		}
	});
});