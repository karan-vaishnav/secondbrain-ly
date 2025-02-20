"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserSchema = zod_1.z.object({
        username: zod_1.z
            .string()
            .min(3, "Username must be a minimum of 3 characters.")
            .max(10, "Username cannot exceed 10 characters."),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters long.")
            .max(20, "Password must be at most 20 characters long.")
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    });
    const parsedData = UserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "invalid Format",
            error: parsedData.error.errors,
        });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    let errorThrown = false;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        yield db_1.UserModel.create({
            username: username,
            password: hashedPassword,
        });
    }
    catch (e) {
        res.status(403).json({
            message: "User Already Exist",
        });
        errorThrown = true;
    }
    if (!errorThrown) {
        res.status(200).json({
            message: "You are signed up!",
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.UserModel.findOne({
        username: username,
    });
    if (!user) {
        res.status(403).json({
            message: "Incorrect username",
        });
        return;
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        res.status(403).json({
            message: "Invalid Password",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id.toString(),
    }, config_1.JWT_USER_SECRET);
    res.json({
        token,
    });
}));
app.post("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.body.type;
        const link = req.body.link;
        const title = req.body.title;
        // const tags = req.body.tags;
        yield db_1.ContentModel.create({
            type,
            link,
            title,
            userId: req.userId,
            tags: [],
        });
        res.json({
            message: "Content Added!",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding content", error });
    }
}));
app.get("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield db_1.ContentModel.find({});
    res.json({
        content,
    });
}));
app.delete("/api/v1/content", (req, res) => { });
app.post("/api/v1/secondbrain/share", (req, res) => { });
app.get("/api/v1/secondbrain/:shareLink", (req, res) => { });
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
