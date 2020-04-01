const expect = require('expect');

const {isRealString} = require('./isRealString');

describe('is Real String', () => {
    it('rejects non-string values', () => {
        let result = isRealString(85);
        expect(result).toBe(false);
    })
    it('rejects strings with only spaces', () => {
        let result = isRealString('        ');
        expect(result).toBe(false);
    })
    it('allows strings containing non-space chars', () => {
        let result = isRealString('Mahdi  Arabpour');
        expect(result).toBe(true);
    })
})