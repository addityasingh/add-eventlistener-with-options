import {
    isPassiveSupported,
    isCaptureSupported,
    isOnceSupported
} from './checkPassiveSupport';


export default function addEventListenerWithOptions (target, eventName, listener, options) {
    if (target.addEventListener !== undefined) {
        const listenerOption =  isPassiveSupported() ? { passive: true } : false;
        target.addEventListener(eventName, listener, listenerOption, options);
    }
}

function sanitizeOptions (options) {
    // Filter out all the options which are nit present and apply pnly thise which are supported
}
