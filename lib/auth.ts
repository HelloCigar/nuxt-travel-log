import { betterAuth } from "better-auth";
import type { User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./db"; // your drizzle instance
import env from "./env";
import { createAuthMiddleware } from "better-auth/api";

export type UserWithId = Omit<User, "id"> & {
  id: number;
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
  }),
  advanced: {
    generateId: false,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
      }
      return ctx.json(ctx.context.session);
    }),
  },
});
