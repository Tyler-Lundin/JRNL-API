"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!emailValidator(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    if (!passwordValidator(password)) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const user = await user_model_1.default.findOne({ email: email.toLowerCase() });
    if (!user)
        return res.status(400).json({ message: 'User not found' });
    const passwordValid = await bcryptjs_1.default.compare(password, user.password || '');
    console.log('user: ', user);
    if (passwordValid) {
        const authToken = jsonwebtoken_1.default.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',
        });
        return res.status(200).json({
            user,
            authToken,
        });
    }
    else {
        res.status(401).json({
            message: 'Invalid credentials',
        });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await user_model_1.default.findOne({ email: email.toLowerCase() });
    if (userExists?.email === email)
        return res.status(400).send('Email already in use!');
    if (emailValidator(email) && passwordValidator(password)) {
        console.log('VALID EMAIL AND PASSWORD');
        const newUser = new user_model_1.default({
            email: email.toLowerCase(),
            password: await bcryptjs_1.default.hash(password, 10),
        });
        const savedUserRes = await newUser.save();
        if (savedUserRes)
            return res.status(200).json({ msg: `Account for ${newUser.email} created` });
    }
    else {
        return res.status(400).json({ msg: 'Invalid email or password' });
    }
};
exports.register = register;
function emailValidator(email) {
    // is a valid email address
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
        return false;
    }
    return email.length > 0 && email.length < 100;
}
function passwordValidator(password) {
    // password doesn't contain any special characters except for '.' and '!'
    if (!/^[a-zA-Z0-9!.]+$/.test(password)) {
        return false;
    }
    return password.length > 0 && password.length < 20;
}
const AUTH_CONTROLLER = {
    login: exports.login,
    register: exports.register,
};
exports.default = AUTH_CONTROLLER;
