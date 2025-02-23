"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@trpc/server");
const express_2 = require("@trpc/server/adapters/express");
const t = server_1.initTRPC.create();
const appRouter = t.router({
    sayHi: t.procedure.query(() => {
        return "Hello, TRPC!";
    }),
    logToServer: t.procedure
        .input((v) => {
        if (v instanceof String)
            return v;
        throw new Error("Invalid input. Expected a string");
    })
        .mutation((req) => {
        console.log(`Client says: ${req.input}`);
    }),
});
const PORT = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/trpc", (0, express_2.createExpressMiddleware)({ router: appRouter }));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
