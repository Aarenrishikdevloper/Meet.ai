import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { agentInsertSchema } from "../schema/schema";
import { db } from "@/lib/db";
import {z} from "zod"
import { TRPCError } from "@trpc/server";
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
    }), 
    getOne:protectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{
      const existinhAgent = await db.agent.findUnique({
        where:{
          id:input.id,  
          userId:ctx.auth.user.id
        }
      })
      if(!existinhAgent){
         throw new TRPCError({code:"NOT_FOUND", message:"Agent not found"})
      }
      return existinhAgent
    }), 
    remove:protectedProcedure.input(z.object({id:z.string()})).mutation(async({input, ctx})=>{
       const removeAgents = await db.agent.deleteMany({
        where:{
          id:input.id, 
          userId:ctx.auth.user.id
        }
       })
       return removeAgents
    })

})