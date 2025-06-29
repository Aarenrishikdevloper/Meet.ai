import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { agentInsertSchema } from "../schema/schema";
import { db } from "@/lib/db";

export const agentsRouter = createTRPCRouter({
    create:protectedProcedure.input(agentInsertSchema).mutation(async({input,ctx})=>{
        const createdAgents = await db.agent.create({
           data:{
             name:input.name, 
             instructions:input.instruction,
             userId:ctx.auth.user.id
           }
        })
        return createdAgents
    })
})