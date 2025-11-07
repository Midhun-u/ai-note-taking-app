import { noteInstance } from "./axiosInstance"

//Function creating notes
export const createNoteApi = async (title : string, content : string , tags : Array<string | undefined>) => {

    const {data} = await noteInstance.post("/create-note" , {
        title : title,
        content : content,
        tags : tags
    })
    return data

}

//Function for getting notes
export const getNotesApi = async (page : number = 1, limit : number = 50) => {

    const {data} = await noteInstance.get(`/get-notes/?page=${page}&limit=${limit}`)
    return data

}

//Function for removing note
export const removeNoteApi = async (noteId : string) => {

    const {data} = await noteInstance.delete(`/remove-note/${noteId}`)
    return data

}

//Function for getting a note
export const getNoteApi = async (noteId : string) => {

    const {data} = await noteInstance.get(`/get-note/${noteId}`)
    return data

}

//Function for updating a note
export const updateNoteApi = async (noteId : string , title : string , content : string , tags : Array<string | undefined>) => {

    const {data} = await noteInstance.put(`/update-note/${noteId}` , {title : title , content : content , tags : tags})
    return data

}

//Function for taking summary
export const takeSummaryApi = async (content : string) => {

    const {data} = await noteInstance.post("/summary" , {content : content}) 
    return data

}

//Function for improving text
export const improveTextApi = async (content : string) => {

    const {data} = await noteInstance.post("/improve-text" , {content : content})
    return data

}

//Function for generating tags
export const generateTagsApi = async (content : string) => {

    const {data} = await noteInstance.post('/generate-tags' , {content : content})
    return data

}

//Function for searching note
export const searchNotesApi = async (searchQuery : string , page : number = 1 , limit : number = 50) => {

    const {data} = await noteInstance.get(`/search-notes/${searchQuery.toString()}/?page=${page}&limit=${limit}`)
    return data

}