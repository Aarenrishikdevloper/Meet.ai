import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
export type AgentGetMany = inferRouterOutputs<AppRouter>["agents"]["getAll"]["items"]  
export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]