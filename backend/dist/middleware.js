"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function authMiddleware(req, res, next) {
    const header = req.headers["authorization"];
    if (!header) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(header, config_1.JWT_USER_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid User!",
        });
    }
}
