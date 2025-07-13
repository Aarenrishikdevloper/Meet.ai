import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { meetingsInsertSchema } from "../schema/schema";
import { db } from "@/lib/db";

export const meetingsRouter  = createTRPCRouter({
     create:protectedProcedure.input(meetingsInsertSchema).mutation(async({input,ctx})=>{
          const createMeetings = await db.meeting.create({
               data:{
                    ...input,  
                    userId:ctx.auth.user.id
                    
               }
          })
          return createMeetings
     })
})