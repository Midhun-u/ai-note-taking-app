import { openai } from "../config/openAI.js"

//Function for generating content
export const generateContent = async (content: string) => {

    const data = await openai.chat.completions.create({
        model: "minimax/minimax-m2:free",
        messages: [
            {
                role: "user",
                content: content
            }
        ]
    })
    
    return data.choices[0].message.content

}