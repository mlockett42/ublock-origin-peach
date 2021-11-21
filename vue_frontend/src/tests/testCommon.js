'use strict';

function setEquals(as, bs) {
    // From: https://stackoverflow.com/a/31129384
    if (as.size !== bs.size) return false;
    for (let a of as) if (!bs.has(a)) return false;
    return true;
  }
  
  function dictEquals(a, b) {
    let valuesA = Object.values(a);
    let valuesB = Object.values(b);
    if (!(setEquals(new Set(valuesA), new Set(valuesB)))) {
      // If the keys differ return false
      return false;
    }
    // If every value is equal return true
    return valuesA.every(k => a[k] === b[k]);
  }

  export default {
    dictEquals,
    setEquals
  }