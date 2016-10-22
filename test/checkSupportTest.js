import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import { SupportMap } from '../dist/checkSupport';
import { PASSIVE, CAPTURE, ONCE } from '../dist/constants';

describe(`${PASSIVE.toUpperCase()}`, () => {
    jsdom();

    it('should not be available and false in old browsers', (done) => {
        expect(SupportMap[PASSIVE]).to.equal(false);
        done()
    });
});

describe(`${CAPTURE.toUpperCase()}`, () => {
    jsdom();

    it('should not be available and false in old browsers', (done) => {
        expect(SupportMap[CAPTURE]).to.equal(false);
        done()
    });
});

describe(`${ONCE.toUpperCase()}`, () => {
    jsdom();

    it('should not be available and false in old browsers', (done) => {
        expect(SupportMap[ONCE]).to.equal(false);
        done()
    });
});

