import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { agentInsertSchema } from "../schema/schema";
import { db } from "@/lib/db";
import {z} from "zod"
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
    }),
    getAll:protectedProcedure.input(z.object({
      search:z.string().nullish()
    })).query(async({input,ctx})=>{
      const {search} = input
       const data = await db.agent.findMany({
        where:{
          userId:ctx.auth.user.id, 
          ...(search && {
            name:{
              contains:search, 
              mode:"insensitive"
            }
          })
        }, 
        orderBy:[
          {createdAt:'desc'}, 
          {"id":'desc'}
        ]

       }) 
       return{
         items:data, 
         total:1, 
         totalPages:1
       }
    })
})