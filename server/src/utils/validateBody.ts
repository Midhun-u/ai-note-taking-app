import type { Context } from "hono";
import {z} from "zod";

//Function for validating body
export const validateBody = async (context: Context) => {

    const bodySchema = z.object({
        content: z.string().min(1)
    })

    const { success, error } = bodySchema.safeParse(await context.req.json())

    if (!success && error) {
        context.status(400)
        return context.json({ success: false, error: "Invalid fields" })
    }

}