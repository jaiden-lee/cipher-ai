import type { NextApiRequest, NextApiResponse } from "next";
import runPython from "@/utils/python-client";
import { Worker } from "worker_threads";
import type { TestCase } from "@/utils/problemInfoType";

// this will run forever in NextJS if infinite loop; BUT, Vercel will auto cancel after 10 seconds
// https://stackoverflow.com/questions/45783219/stopping-synchronous-function-after-2-seconds -- this can optimize it in code tho, but i'm too lazy rn
export default async function executePython(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const data = req.body;
            const {starterFunctionName, test_cases, comparisonCode, code}: {starterFunctionName: string, test_cases:TestCase[], comparisonCode: string, code: string} = data;

//             const workerCode = `
// const { parentPort } = require('worker_threads');
// const {runPython} = require("@/utils/python-client");
// runPython({starterFunctionName: ${starterFunctionName}, test_cases: ${test_cases}, comparisonCode: ${comparisonCode}}, ${code}).then((res) => {
//     parentPort.postMessage(res);
// });
// `

//             const worker = new Worker(workerCode, {eval: true});
//             console.log("received");

            const result = await runPython({starterFunctionName, test_cases, comparisonCode}, code);
            res.status(200).json({
                success: result.success,
                message: result.message
            });
            
            // worker.on("message", (result) => {
            //     console.log(result);
            //     res.status(200).json({
            //         success: result.success,
            //         message: result.message
            //     });
            // });

            // setTimeout(() => {
            //     worker.terminate();
            //     res.status(400).json({
            //         success: false,
            //         message: "Timeout"
            //     });
            // }, 5000);
            
        } catch (e) {
            console.log(e);
            res.status(400).json({
                success: false,
                message: "API request had error"
            });
        }
        res.status(400).json({
            success: false,
            message: "NOT A POST REQUEST"
        });
    }
}