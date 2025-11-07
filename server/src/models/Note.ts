import {Schema , model} from 'mongoose'

//Note Schema
const noteSchema = new Schema({

    userId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        maxLength : 50,
        index : true
    },
    content : {
        type : String,
        required : true
    },
    tags : {
        type : Array,
        default : [],
        maxLength : 10
    }

} , {timestamps : true , versionKey : false})

export const Note = model("Note" , noteSchema)