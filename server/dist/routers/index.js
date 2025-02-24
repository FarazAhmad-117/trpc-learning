"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergedRouter = exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const userRouter_1 = require("./userRouter");
exports.appRouter = trpc_1.t.router({
    sayHi: trpc_1.t.procedure.query(() => {
        return "Hello, TRPC!";
    }),
    logToServer: trpc_1.t.procedure
        .input((v) => {
        if (typeof v === "string")
            return v;
        throw new Error("Invalid input. Expected a string");
    })
        .mutation((req) => {
        console.log(`Client says: ${req.input}`);
        return "Logged successfully!";
    }),
    //   users: userRouter,
});
exports.mergedRouter = trpc_1.t.mergeRouters(exports.appRouter, userRouter_1.userRouter);
