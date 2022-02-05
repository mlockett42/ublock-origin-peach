'use strict';

import chromeLocalStorageService from '../services/chromeLocalStorageService';

async function getSellingState() {
    return !!(await chromeLocalStorageService.localStorageGet("PEACHSELLINGSTATE"));
}

async function setSellingState(sellingState) {
    await chromeLocalStorageService.localStorageSet("PEACHSELLINGSTATE", sellingState);
}

export default {
    getSellingState,
    setSellingState
}