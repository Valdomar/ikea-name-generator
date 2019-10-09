'use strict';
var expect = require('chai').expect;
var ikea = require('../dist/index.js');
describe('getName function test', () => {
    it('should return a name without swedish characters', () => {
        let containsSwedish = false;
        for (let i = 0; i < 10; i++) {
            var result = ikea.getName(false);
            if (result.indexOf("å") != -1 || result.indexOf("ö") != -1) {
                containsSwedish = true;
            }
        }
        expect(containsSwedish).to.equal(false);
    });
    it('should return a name between 3 and 9 characters', () => {
        var result = ikea.getName();
        expect((result.length >= 3 && result.length <= 9)).to.eq(true);
    });
});