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
exports.summarizeText = summarizeText;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env["API_KEY"]);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function summarizeText(content) {
    return __awaiter(this, void 0, void 0, function* () {
        /// model accepts there parameter to summarize
        try {
            const prompt = `Summarize this content  ` + content;
            const result = yield model.generateContent(prompt);
            const resText = result.response.text();
            return resText;
        }
        catch (err) {
            return err;
        }
    });
}
