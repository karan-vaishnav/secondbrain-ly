"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const config_1 = require("./config");
mongoose_1.default
    .connect(config_1.DB_CONN_STRING)
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.error("MongoDB Connection Error", err));
const UserSchema = new mongoose_2.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
exports.UserModel = (0, mongoose_2.model)("users", UserSchema);
const ContentSchema = new mongoose_2.Schema({
    type: { type: mongoose_1.default.Types.ObjectId, ref: "Types" },
    link: String,
    title: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "users", required: true },
});
exports.ContentModel = (0, mongoose_2.model)("Content", ContentSchema);
