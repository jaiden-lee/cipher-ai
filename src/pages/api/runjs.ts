import type { NextApiRequest, NextApiResponse } from "next";
import problemHandlers from "@/utils/problem-handlers";

export default async function RunJS(req: NextApiRequest, res: NextApiResponse) {
    console.log("received");
    if (req.method === "POST") {
        try {
            const {problemId, starterFunctionName, userCode}: {problemId: string, starterFunctionName: string, userCode: string} = req.body;
            const code = userCode.slice(userCode.indexOf(starterFunctionName));
            const callback = new Function(`return ${code}`)();
            // you can't make helper functions with this method though, but idrc for now

            const codeResult = problemHandlers[problemId](callback);
            console.log(codeResult);
            if (codeResult.message) {
                res.status(200).json({
                    success: codeResult.success || false,
                    message: codeResult.message
                });
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({
                success: false,
                message: "An unexpected error has occurred"
            });
        }
        
    } else {
        res.status(400).json({
            success: false,
            message: "ERROR HAS OCCURRED"
        });
    }
}