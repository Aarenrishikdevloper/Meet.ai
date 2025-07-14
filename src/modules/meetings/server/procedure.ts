import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { meetingsInsertSchema } from "../schema/schema";
import { db } from "@/lib/db";
import z from "zod";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGES, MAX_PAGE_Size, MIN_PAGE_Size } from "@/constants";

export const meetingsRouter = createTRPCRouter({
     create: protectedProcedure.input(meetingsInsertSchema).mutation(async ({ input, ctx }) => {
          const createMeetings = await db.meeting.create({
               data: {
                    ...input,
                    userId: ctx.auth.user.id

               }
          })
          return createMeetings
     }),
     getAll: protectedProcedure.input(z.object({
          page: z.number().default(DEFAULT_PAGES),
          pageSizes: z.number().min(MIN_PAGE_Size).max(MAX_PAGE_Size).default(DEFAULT_PAGE_SIZE),
          search: z.string().nullish()
     })).query(async ({ input, ctx }) => {
          const { search, page, pageSizes } = input
          const data = await db.meeting.findMany({
               where: {
                    userId: ctx.auth.user.id,
                    ...(search && {
                         name: {
                              contains: search,
                              mode: "insensitive"
                         }
                    })
               },
               include:{
                  agent:true
               },
               orderBy: [
                    { createdAt: 'desc' },
                    { "id": 'desc' }
               ],

               take: pageSizes,
               skip: (page - 1) * pageSizes



          })
          const resultWithDuration = data.map((meeting) => {
               const endedAt = meeting.endedAt ? meeting.endedAt.getTime() : null;
               const startedAt = meeting.startedAt ? meeting.startedAt.getTime() : null
               const duration = endedAt !== null && startedAt !== null
                    ? endedAt - startedAt
                    : null;
               return {
                    ...meeting,
                    duration
               }
          })
          const total = await db.agent.count({
               where: {
                    userId: ctx.auth.user.id,
                    ...(search && {
                         name: {
                              contains: search,
                              mode: "insensitive"
                         }
                    })
               }
          })
          const totalPages = Math.ceil(total / pageSizes)
          return {
               items: resultWithDuration,
               total: total,
               totalPages
          }
     }),

})