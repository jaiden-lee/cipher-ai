import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

export default async function QueryAI(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const data = req.body;
            const {messages, system} = data;
            if (messages && system) {
                const output = await anthropic.messages.create({
                    model: "claude-3-haiku-20240307",
                    max_tokens: 1000,
                    temperature: 1,
                    system: system,
                    messages: messages
                });
                res.status(200).json({
                    success: true,
                    message: output.content
                });
            }
        } catch (e) {
            res.status(400).json({
                success: false,
                message: "AI FAILED TO PRODUCE OUTPUT"
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: "NOT A POST REQUEST"
        });
    }
    
}