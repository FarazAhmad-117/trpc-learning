import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/index";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
    }),
  ],
});

async function main() {
  console.log("Hello world!");
  // const result = await client.sayHi.query();
  // console.log(result);

  // const result = await client.logToServer.mutate("Hi from the client!");
  // console.log(result);

  // const user = await client.users.get.query({ userId: "123" });
  // console.log(user);

  // const user = await client.users.update.mutate({
  //   userId: "123",
  //   name: "Faraz Ahmad",
  // });
  // console.log(user);

  const result = await client.secretData.mutate({
    username: "admin",
    password: "password",
  });
  console.log(result);
}

export { main };
