'use strict';

const scypt = require('scryptsy');

function scryptPromise(password, salt, keylen) {
    return scypt.async(password, salt, 8192, 8, 1, keylen, undefined, 300);
}

module.exports = {
    scrypt: scryptPromise
}