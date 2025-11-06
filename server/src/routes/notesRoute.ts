import { Hono } from "hono"
import { authMiddleware } from "../middlewares/auth.js"
import { createNoteController, createSummaryController, getNoteController, getNotesController, removeNoteController, updateNoteController } from "../controllers/noteController.js"
import { clerkMiddleware } from "@hono/clerk-auth"

//Note router
export const noteRouter = new Hono()

//Applying clerk middleware
noteRouter.use("*" , clerkMiddleware({
    secretKey : process.env.CLERK_SECRET_KEY , 
    publishableKey : process.env.CLERK_PUBLISHABLE_KEY
}))
noteRouter.use(authMiddleware)

//Route for creating note
noteRouter.post("/create-note" , createNoteController)

//Route for getting notes
noteRouter.get("/get-notes" , getNotesController)

//Route for removing note
noteRouter.delete("/remove-note/:noteId" , removeNoteController)

//Route for getting a note
noteRouter.get("/get-note/:noteId" , getNoteController)

//Route for updating note
noteRouter.put("/update-note/:noteId" , updateNoteController)

//Route for taking summary of content
noteRouter.post("/summary" , createSummaryController)