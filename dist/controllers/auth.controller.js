"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyForm_1 = __importDefault(require("../utils/verifyForm"));
/**************
 *
 *  VARIABLES
 *
 **************/
const cookieOptions = {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
};
/**********
 *
 *  LOGIN
 *
 **********/
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!(0, verifyForm_1.default)(email, password))
        return res.status(409);
    const user = await user_model_1.default.findOne({ email: email.toLowerCase() });
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    const verifyPass = bcryptjs_1.default.compare(password, user.password || '');
    if (!verifyPass)
        return res.status(401).json({ message: 'Invalid credentials' });
    const authToken = jsonwebtoken_1.default.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    });
    return res
        .cookie('authToken', authToken, cookieOptions) // 1 hour
        .status(200)
        .json({
        message: 'Login successful',
        user: {
            id: user._id,
            email: user.email,
            jrnlIDs: user.jrnlIDs,
        },
    });
};
/*************
 *
 *  REGISTER
 *
 *************/
const register = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await user_model_1.default.findOne({ email: email.toLowerCase() });
    if (userExists)
        return res.status(409).json({ message: 'Email already in use!' });
    if ((0, verifyForm_1.default)(email, password)) {
        const newUser = new user_model_1.default({
            email: email.toLowerCase(),
            password: await bcryptjs_1.default.hash(password, 10),
        });
        const savedUserRes = await newUser.save();
        if (savedUserRes)
            return res.status(200).json({ message: `Account for ${newUser.email} created` });
    }
    else {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
};
exports.default = {
    login,
    register,
};
