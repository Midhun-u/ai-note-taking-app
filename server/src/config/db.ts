import 'dotenv/config'
import mongoose from 'mongoose'

//Function for connecting database
export const connectDatabase = async () => {

    const URL = process.env.DATABASE_URL as string

    if(!URL) throw new Error(`Database URL is missing`)

    try {
        
        const connction = await mongoose.connect(URL)
        console.log(`Database is connected ${connction.connection.host}`)

    } catch (error) {
        console.log(`Database is not connected error : ${error}`)
    }

}