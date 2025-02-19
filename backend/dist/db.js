"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const config_1 = require("./config");
mongoose_1.default
    .connect(config_1.DB_CONN_STRING)
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.error("MongoDB Connection Error", err));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
exports.UserModel = (0, mongoose_2.model)("users", UserSchema);
