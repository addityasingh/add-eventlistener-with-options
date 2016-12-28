import {
    SupportMap
} from './checkSupport';


/**
 * Add event listener with additional options
 * @param {EventTarget} target - The EventTarget element
 * @param {string} name - The name of the event
 * @param {function} listener - The event listener callback
 * @param {object} options - The options explicitly passed from caller
 * @param {string} optionName - The additioanl option to add to the event listener 
 */
export default function addEventListenerWithOptions (
    target, 
    name, 
    listener, 
    options,
    optionName = 'passive') {
    if (target.addEventListener !== undefined) {
        const listenerOptions = SupportMap[optionName] 
                ? Object.assign({}, { [optionName]: true }, options) 
                : options;
        target.addEventListener(name, listener, listenerOptions);
    }
}
