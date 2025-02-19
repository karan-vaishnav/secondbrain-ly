"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_USER_SECRET = exports.DB_CONN_STRING = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_CONN_STRING = process.env.DB_CONN_STRING || "";
exports.JWT_USER_SECRET = process.env.JWT_USER_SECRET || "defaultSecret";
