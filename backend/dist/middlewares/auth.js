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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
var { verify } = require("jsonwebtoken");
function authorize(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ error: "unauthorized" });
        }
        try {
            const verifedUser = yield verify(token, process.env.JWT_SECRET);
            if (!verifedUser.id) {
                return res.status(401).json({ error: "You are not logged in" });
            }
            req.userId = verifedUser.id;
            next();
        }
        catch (e) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    });
}
