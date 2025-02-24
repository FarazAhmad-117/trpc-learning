"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../trpc");
exports.userRouter = trpc_1.t.router({
    getUser: trpc_1.t.procedure.query(() => {
        return { name: "John Doe", age: 30 };
    }),
});
