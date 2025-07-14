import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type MeetingGetMany = inferRouterOutputs<AppRouter>["meettings"]["getAll"]["items"]  