import type { Context } from "hono";
import { z } from 'zod'
import { Note } from "../models/Note.js";
import { pipeline } from '@xenova/transformers'
import { convertNumber } from "../utils/convertNumber.js";
import type { Body } from "../types/body.js";

//Controller for creating note
export const createNoteController = async (context: Context) => {

    try {

        const { title, content, tags } = await context.req.json() as Body || {}
        const userId = await context.get("userId")

        if (!userId) {
            context.status(400)
            return context.json({ success: false, error: "User id is missing" })
        }

        const noteSchema = z.object({
            title: z.string().min(1).max(50),
            content: z.string().min(1),
            tags: z.string().optional().array().max(10)
        })

        const { success, error } = noteSchema.safeParse(await context.req.json())

        if (!success && error) {
            console.log(error)
            context.status(400)
            return context.json({ success: false, error: "Invalid fields" })
        }

        const newNote = await Note.create({
            userId: userId,
            title: title,
            content: content,
            tags: tags
        })

        if (newNote) {
            context.status(201)
            return context.json({ success: true, message: "Note created" })
        }

        context.status(400)
        return context.json({ success: false, error: "Note is not created" })

    } catch (error) {
        throw new Error(`createNoteController error : ${error}`)
    }

}

//Controller for getting notes
export const getNotesController = async (context: Context) => {

    try {

        const { page = 1, limit = 50 } = await context.req.query()
        const pageNumber = convertNumber(page)
        const limitNumber = convertNumber(limit)
        const userId = await context.get("userId")

        if (!userId) {
            context.status(400)
            return context.json({ success: false, error: "User id is missing" })
        }

        let totalCount: number | null = null
        if (pageNumber === 1) {
            totalCount = await Note.countDocuments({ userId: userId })
        }
        const notes = await Note.find({ userId: userId }, { updatedAt: 0 }).skip((pageNumber - 1) * limitNumber).limit(limitNumber)
        return context.json({ success: true, notes: notes, totalCount: totalCount })

    } catch (error) {
        throw new Error(`getNoteController error : ${error}`)
    }

}

//Controller for removing note
export const removeNoteController = async (context: Context) => {

    try {

        const { noteId } = await context.req.param()
        const userId = await context.get("userId")

        if (!noteId) {
            context.status(400)
            return context.json({ success: false, error: "Note id is missing" })
        }

        if (!userId) {
            context.status(400)
            return context.json({ success: false, error: "User id is missing" })
        }

        await Note.deleteOne({userId : userId , _id : noteId})
        return context.json({success : true , message : "Note is deleted"})

    } catch (error) {
        throw new Error(`removeNoteController error : ${error}`)
    }

}

//Controller for getting a note
export const getNoteController = async (context : Context) => {

    try {
       
        const userId = await context.get("userId")
        const {noteId} = await context.req.param()
        
        if(!userId){
            context.status(400)
            return context.json({success : false , error : "User id is missing"})
        }

        if(!noteId){
            context.status(400)
            return context.json({success : false , error : "Note id is missing"})
        }

        const note = await Note.findOne({_id : noteId , userId : userId})
        return context.json({success : true , note : note})
        
    } catch (error) {
        throw new Error(`getNoteController error : ${error}`)
    }

}

//Controller for updating note
export const updateNoteController = async (context : Context)  => {

    try {
        
        const {noteId} = await context.req.param()
        const userId = await context.get("userId")
        const {title , content , tags} = await context.req.json() as Body || {}

        if(!userId){
            context.status(400)
            return context.json({success : false , error : "User id is missing"})
        }

        if(!noteId){
            context.status(400)
            return context.json({success : false , error : "Note id is missing"})
        }

        const noteSchema = z.object({
            title: z.string().min(1).max(50),
            content: z.string().min(1),
            tags: z.string().optional().array().max(10)
        })

        const {success , error} = noteSchema.safeParse(await context.req.json())

        if(!success && error){
            console.log(error)
            context.status(400)
            return context.json({success : false , error : "Invalid fields"})
        }

        const updateNote = await Note.findByIdAndUpdate(noteId , {
            title : title,
            content : content,
            tags : tags
        } , {new : true})

        if(updateNote){
            return context.json({success : true , message : "Updated"})
        }
        
        context.status(400)
        return context.json({success : false , error : "Note is note updated"})

    } catch (error) {
        throw new Error(`updateNoteController error : ${error}`)
    }

}

//Controller for taking summary of content
export const createSummaryController = async (context: Context) => {

    try {

        type Body = {
            content: string
        }
        const { content } = await context.req.json() as Body || {}

        const bodySchema = z.object({
            content: z.string().min(1)
        })

        const { success, error } = bodySchema.safeParse(await context.req.json())

        if (!success && error) {
            context.status(400)
            return context.json({ success: false, error: "Invalid fields" })
        }

        const pipe = await pipeline("summarization")
        const result = await pipe(content, { max_length: 50 })

        return context.json({ success: true, data: result[0] })

    } catch (error) {
        throw new Error(`createSummaryController error : ${error}`)
    }

}