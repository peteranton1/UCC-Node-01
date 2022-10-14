const assert = require('assert');

/**
 * Eva Interpretter
 */
class Eva {
    eval(exp) {
        if (eva_isNumber(exp)) {
            return exp;
        }
        if (eva_isString(exp)) {
            return exp.slice(1, -1);
        }
        if (exp[0] === '+') {
            return eva_add(exp[1]) + eva_add(exp[2]) ;
        }
        throw 'Unimplemented';
    }
}

function eva_add(exp) {
    if (eva_isSlice(exp[0])) {
        return eva_add(exp[0]);
    } 
    if (exp[0] === '+') {
        return eva_add(exp[1]) + eva_add(exp[2]) ;
    } 
    if (eva_isNumber(exp)) {
        return exp;
    }
}

function eva_isSlice(exp) {
    return typeof exp === 'slice';
}

function eva_isNumber(exp) {
    return typeof exp === 'number';
}

function eva_isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

// ------------------------------------------
// Tests:

const eva = new Eva();

assert.strictEqual(eva.eval(1), 1)
assert.strictEqual(eva.eval('"Hello"'), 'Hello')

assert.strictEqual(eva.eval(['+', 1, 5]), 6)
assert.strictEqual(eva.eval(['+', ['+', 3, 2], 5]), 10)
assert.strictEqual(eva.eval(['+', 5, ['+', 3, 2]]), 10)

console.log('All assertions passed!');
