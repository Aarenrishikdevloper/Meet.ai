import {z} from "zod"  
export const meetingsInsertSchema = z.object({
    name:z.string().min(1, {"message":"Name is required"}), 
    agentId:z.string().min(1, {message:"Instruction required"})
})
export const agentsUpdateSchema = meetingsInsertSchema.extend({
    id:z.string().min(1, {message:"Id is required"})
})