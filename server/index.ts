import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const t = initTRPC.create();

const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hello, TRPC!";
  }),
  logToServer: t.procedure
    .input((v) => {
      if (v instanceof String) return v;
      throw new Error("Invalid input. Expected a string");
    })
    .mutation((req) => {
      console.log(`Client says: ${req.input}`);
    }),
});

const PORT = 8000;
const app = express();

app.use(cors());

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export type AppRouter = typeof appRouter;
