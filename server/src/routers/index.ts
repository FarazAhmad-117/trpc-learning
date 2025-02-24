import { z } from "zod";
import { adminProcedure, t } from "../trpc";
import { userRouter } from "./userRouter";

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hello, TRPC!";
  }),
  logToServer: t.procedure
    .input((v) => {
      if (typeof v === "string") return v;
      throw new Error("Invalid input. Expected a string");
    })
    .mutation((req) => {
      console.log(`Client says: ${req.input}`);
      return "Logged successfully!";
    }),
  users: userRouter,
  secretData: adminProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation((req) => {
      console.log("Here is the context", req.ctx);
      if (req.input.username === "admin" && req.input.password === "password") {
        return "Access granted!";
      } else {
        throw new Error("Invalid credentials");
      }
    }),
});

// export const mergedRouter = t.mergeRouters(appRouter, userRouter);
