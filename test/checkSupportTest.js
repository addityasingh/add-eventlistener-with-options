import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import { isPassiveSupported } from '../dist/checkSupport';

describe('Passive', () => {
    jsdom();

    it('should be available and false in old browsers', (done) => {
        expect(isPassiveSupported()).to.equal(false);
        done()
    });
});
