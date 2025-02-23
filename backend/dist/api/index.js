"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Backend is running on Vercel!");
});
// ✅ Ensure API Routes Are Available
app.get("/api/v1/test", (req, res) => {
    res.json({ message: "API is working on Vercel!" });
});
// ✅ Export the app for Vercel
exports.default = app;
