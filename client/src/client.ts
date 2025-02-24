import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  httpLink,
  loggerLink,
  splitLink,
  wsLink,
} from "@trpc/client";
import { AppRouter } from "../../server/src/index";

const wsClient = createWSClient({
  url: "http://localhost:8000/trpc",
});

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    splitLink({
      condition: (op) => {
        return op.type === "subscription";
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: "http://localhost:8000/trpc",
        headers: {
          Authorization: "Bearer faraz_ahmad",
        },
      }),
    }),
    // httpLink({
    //   url: "http://localhost:8000/trpc",
    //   headers: {
    //     Authorization: "Bearer faraz_ahmad",
    //   },
    // }),
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

  // await client.secretData.mutate({
  //   username: "admin",
  //   password: "password",
  // });

  client.users.onUpdate.subscribe(undefined, {
    onData: (id) => {
      console.log(`User ${id} updated!`);
    },
  });

  const result = await client.secretData.mutate({
    username: "admin",
    password: "password",
  });
  console.log(result);
}

export { main };
