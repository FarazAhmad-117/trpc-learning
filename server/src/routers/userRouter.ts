import { t } from "../trpc";
import { z } from "zod";
import { EventEmitter } from "stream";
import { observable } from "@trpc/server/observable";

// const userProcedure = t.procedure.input((v) => {
//   if (typeof v === "string") return v;

//   throw new Error("Invalid input");
// });

const eventEmitter = new EventEmitter();
const userProcedure = t.procedure.input(z.object({ userId: z.string() }));

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => {
    return { id: input.userId, name: "John Doe", age: 30 };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ id: z.string(), name: z.string(), age: z.number() }))
    .mutation(({ ctx, input }) => {
      console.log("Here is the context", ctx);

      eventEmitter.emit("update", input.userId);
      return { id: input.userId, name: input.name, age: 30 };
    }),
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on("update", emit.next);

      return () => {
        eventEmitter.off("update", emit.next);
      };
    });
  }),
});
