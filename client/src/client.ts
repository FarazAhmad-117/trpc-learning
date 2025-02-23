import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/index";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
    }),
  ],
});

async function main() {
  console.log("Hello world!");
  const result = await client.sayHi.query();
  console.log(result);
}

export { main };
