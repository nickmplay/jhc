const expect = require('expect');

describe('First test group', () => {
	it('should all be ok', (done) => {
		const testString = "Hello tests";
		expect(testString).toBe("Hello tests");
		expect(testString).not.toBe("something else");
		done();
	})
});