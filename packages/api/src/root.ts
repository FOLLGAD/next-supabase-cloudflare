import { chatRouter } from "./router/chat";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  chat: chatRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
