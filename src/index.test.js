import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import addEventListenerWithOptions from "./index";

describe("addEventListenerWithOptions", () => {
    jsdom();

    it("should be able to attach event listener successfully", () => {
        const target = document.createElement("button");
        target.id = "target-id";
        target.textContent = "Hello World!";
        const mockListener = sinon.spy();
        addEventListenerWithOptions(target, "click", mockListener);
        const evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        target.dispatchEvent(evt)

        expect(mockListener.callCount).to.equal(1);
    });
});