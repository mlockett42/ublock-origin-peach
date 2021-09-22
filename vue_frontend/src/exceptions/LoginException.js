'use strict';

// From: https://stackoverflow.com/a/27724419

/**
 * Create a HistoryGrapException with the given message. This allows us to reliabily get the stack trace.
 * @class
 * @param {string} message 
 */
function LoginException(message) {
    this.message = message;
    // Use V8's native method if available, otherwise fallback
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, LoginException);
    else
        this.stack = (new Error()).stack;
}

LoginException.prototype = Object.create(Error.prototype);
LoginException.prototype.name = "LoginException";
LoginException.prototype.constructor = LoginException;

export default {
    LoginException: LoginException
}