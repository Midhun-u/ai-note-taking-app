import type { Context } from "hono";

//Middleware for handling error
export const handleErrorMiddleware = (error : Error , context : Context) => {

    console.log(error)
    context.status(500)
    return context.json({success : false , error : "Server error"})

}