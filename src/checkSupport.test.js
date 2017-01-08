import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import { SupportMap } from './checkSupport';
import { PASSIVE, CAPTURE, ONCE } from './constants';

describe(`${PASSIVE.toUpperCase()}`, () => {
    jsdom();

    it('should not be available and false in old browsers', () => {
        expect(SupportMap[PASSIVE]).to.equal(false);
    });
});

describe(`${CAPTURE.toUpperCase()}`, () => {
    jsdom();

    it('should not be available and false in old browsers', () => {
        expect(SupportMap[CAPTURE]).to.equal(false);
    });
});

describe(`${ONCE.toUpperCase()}`, () => {
    jsdom();

    it('should not be available and false in old browsers', () => {
        expect(SupportMap[ONCE]).to.equal(false);
    });
});

