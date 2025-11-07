import type { Context, Next } from "hono";
import "dotenv/config"
import {getAuth} from "@hono/clerk-auth";

//Middleware for handling authentication
export const authMiddleware = async (context : Context , next : Next) => {
    
    try{

        const auth = getAuth(context)
        
        if(!auth?.isAuthenticated){
            context.status(400)
            return context.json({success : false , error : "Unauthorized user"})
        }

        await context.set("userId" , auth?.userId)
        await next()

    }catch(error){
        throw new Error(`authMiddleware error : ${error}`)
    }

}