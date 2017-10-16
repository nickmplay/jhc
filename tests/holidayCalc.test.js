const expect = require('expect');
const holidayCalc = require('../server/holidayCalc.js');

//generic test 
describe('Boiler plate tests', () => {
	it('should all be ok', (done) => {
		const testString = "Hello tests";
		expect(testString).toBe("Hello tests");
		expect(testString).not.toBe("something else");
		done();
	})
});

//test holidayCalc functions 
describe('holidayCalc helper functions tests', () => {
	it('date should be within range', (done) => {
		const date1 = "2017-01-01";
		const date2 = "2017-12-01";
		const date3 = "2017-06-01";

		expect( holidayCalc.dateBetween(date1, date2, date3) ).toBe(true);
		expect( holidayCalc.dateBetween(date1, date2, date1) ).toBe(true);
		expect( holidayCalc.dateBetween(date1, date2, date2) ).toBe(true);
		done();
	});

	it('date should not be within range', (done) => {
		const date1 = "2017-01-01";
		const date2 = "2017-12-01";
		const date3 = "2017-06-01";

		expect( holidayCalc.dateBetween(date1, date3, date2) ).toBe(false);
		done();
	});

	it('date is/is not at the weekend', (done) => {
		const date1 = "2016-12-31" //Saturday;
		const date2 = "2017-01-01" //Sunday;
		const date3 = "2017-01-02" //Monday;
		

		expect( holidayCalc.isWeekend(date1) ).toBe(true);
		expect( holidayCalc.isWeekend(date2) ).toBe(true);
		expect( holidayCalc.isWeekend(date3) ).toBe(false);
		done();
	});

	it('date is/is not a bank holiday', (done) => {
		const date1 = "2017-01-02" //Bank Holiday;
		const date2 = "2017-01-10" //Not a Bank Holiday;
		
		expect( holidayCalc.isBankHol(date1) ).toBe(true);
		expect( holidayCalc.isBankHol(date2) ).toBe(false);
		done();
	});


});