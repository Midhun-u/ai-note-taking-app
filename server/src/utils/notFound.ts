import type { Context } from "hono";

//route for handling not found
export const notFoundRoute = (context : Context) => {

    context.status(404)
    return context.json({success : false , error : "Route is not found"})

}