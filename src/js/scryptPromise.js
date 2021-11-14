'use strict';

// Wrap the globally imported object from scryptsy onto the µBlock object.
µBlock.scyptsy = scrypt;

µBlock.scrypt = function (password, salt, keylen) {
    return µBlock.scyptsy.async(password, salt, 8192, 8, 1, keylen, undefined, 300);
}