"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@trpc/server/adapters/express");
const routers_1 = require("./routers");
// import { appRouter } from "./routers";
const PORT = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use("/trpc", createExpressMiddleware({ router: appRouter }));
app.use("/trpc", (0, express_2.createExpressMiddleware)({ router: routers_1.mergedRouter }));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
