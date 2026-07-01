import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { betterAuth } from "better-auth/minimal";
import authConfig from "./auth.config";


// The component client handles communication between Better Auth and Convex
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: process.env.SITE_URL,
    database: authComponent.adapter(ctx),
    plugins: [
      convex({ authConfig }),
    ],
    rateLimit: {
      enabled: true,
      window: 900, // 15 minutes in seconds
      max: 5, // 5 requests
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
  });
};


