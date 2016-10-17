import {
    PASSIVE,
    CAPTURE,
    ONCE
} from './constants';


export const isPassiveSupported = () => checkSupportForProperty(PASSIVE)
export const isOnceSupported    = () => checkSupportForProperty(ONCE)
export const isCaptureSupported = () => checkSupportForProperty(CAPTURE)

function checkSupportForProperty (property) {
    let supports = false;
    try {
        const opts = Object.defineProperty({}, property, {
            get: function() {
                supports = true;
            }
        });
        window.addEventListener("test", null, opts);
        window.removeListener("test", null);
    } catch (e) {}

    return supports;
}