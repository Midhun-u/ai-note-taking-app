import axios from 'axios'

const API_NOTE_URL = process.env.NEXT_PUBLIC_API_NOTE_URL

//Note instance
export const noteInstance = axios.create({
    baseURL : API_NOTE_URL,
    withCredentials : true
})