import { expect } from 'chai';

import { isPassiveSupported } from '../src/checkSupport';

describe('Passive', () => {
    it('should be available and true in new browsers', () => {
        expect(isPassiveSupported()).to.equal(true);
    });
});
