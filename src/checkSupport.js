import {
    PASSIVE,
    CAPTURE,
    ONCE
} from './constants';

const OptionsMap = {
    [PASSIVE]:  false,
    [CAPTURE]:  false,
    [ONCE]:     false  
}

const getOptionsMap = () => {
    Object.keys(OptionsMap).forEach((k, i) => {
        OptionsMap[k] = checkSupportForProperty(k);
    });

    return OptionsMap; 
};

function checkSupportForProperty (property) {
    if (!!OptionsMap[property]) {
        return OptionsMap[property];
    }

    try {
        const opts = Object.defineProperty({}, property, {
            get: function() {
                OptionsMap[property] = true;
            }
        });
        window.addEventListener("test", null, opts);
        window.removeListener("test", null);
    } catch (e) {}

    return OptionsMap[property];
}

export const SupportMap = getOptionsMap();