import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
// import { mergedRouter } from "./routers";
import { appRouter } from "./routers";
import { createContext } from "./context";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";

const PORT = 8000;
const app = express();

app.use(cors());

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));
// app.use("/trpc", createExpressMiddleware({ router: mergedRouter }));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext: () => {
    return { isAdmin: true };
  },
});

export type AppRouter = typeof appRouter;
// export type AppRouter = typeof mergedRouter;
