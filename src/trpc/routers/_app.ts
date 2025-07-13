import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { agentsRouter } from '@/modules/agents/server/procedures';
import { meetingsRouter } from '@/modules/meetings/server/procedure';
export const appRouter = createTRPCRouter({
  agents:agentsRouter,
  meettings:meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;