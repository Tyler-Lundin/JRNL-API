"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyForm = (email, password) => {
    console.log('emailVerify(email) && passwordVerify(password)', emailVerify(email) && passwordVerify(password));
    return emailVerify(email) && passwordVerify(password);
};
function emailVerify(email) {
    // is a valid email address
    console.log('emailVerify: email', email);
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
        return false;
    }
    return email.length > 0 && email.length < 100;
}
function passwordVerify(password) {
    console.log('passwordVerify: password', password);
    // password doesn't contain any special characters except for '.' and '!'
    if (!/^[a-zA-Z0-9!.]+$/.test(password)) {
        return false;
    }
    return password.length > 0 && password.length < 20;
}
exports.default = verifyForm;
