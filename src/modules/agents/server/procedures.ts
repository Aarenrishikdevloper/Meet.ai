import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { agentInsertSchema, agentsUpdateSchema } from "../schema/schema";
import { db } from "@/lib/db";
import {z} from "zod"
import { TRPCError } from "@trpc/server";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGES, MAX_PAGE_Size, MIN_PAGE_Size } from "@/constants";
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
      page:z.number().default(DEFAULT_PAGES), 
      pageSizes:z.number().min(MIN_PAGE_Size).max(MAX_PAGE_Size).default(DEFAULT_PAGE_SIZE),
      search:z.string().nullish()
    })).query(async({input,ctx})=>{
      const {search, page, pageSizes} = input
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
        include:{
          _count:{
            select:{
              Meeting:true
            }
          }
        },
        orderBy:[
          {createdAt:'desc'}, 
          {"id":'desc'}
        ], 
        
        take:pageSizes,  
        skip:(page - 1) * pageSizes  

        
    
       })
       const total = await db.agent.count({
        where:{
          userId:ctx.auth.user.id, 
          ...(search && {
            name:{
              contains:search, 
              mode:"insensitive"
            }
          })
        }
       })
       const totalPages = Math.ceil(total/pageSizes)
       return{
         items:data, 
         total:total, 
         totalPages
       }
    }), 
    getOne:protectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{
      const existinhAgent = await db.agent.findUnique({
        where:{
          id:input.id,  
          userId:ctx.auth.user.id
        },
         include:{
          _count:{
            select:{
              Meeting:true
            }
          }
        },  
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
    }),
    update:protectedProcedure.input(agentsUpdateSchema).mutation(async({input,ctx})=>{
      const updateAgents = await db.agent.update({
        where:{
          id:input.id, 
          userId:ctx.auth.user.id
        }, 
        data:{
          instructions:input.instruction, 
          name:input.name
        }
      })
      if(!updateAgents){
        throw new TRPCError({code:"NOT_FOUND", message:"Agent not found"})
      }
      return updateAgents
    })

})