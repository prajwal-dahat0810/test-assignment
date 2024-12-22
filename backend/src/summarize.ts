import axios from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env["API_KEY"]);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export async function summarizeText(content: string) {
  /// model accepts there parameter to summarize
  try {
    const prompt = `Summarize this content  ` + content;

    const result = await model.generateContent(prompt);

    const resText = result.response.text();

    return resText;
  } catch (err) {
    return err;
  }
}
