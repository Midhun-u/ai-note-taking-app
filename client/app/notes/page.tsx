import NoteContent from "@/components/notes/NoteContent"
import NoteHeader from "@/components/notes/NoteHeader"

const page = () => {
    
    return (

        <section className='pt-15 px-2 md:px-4 w-full h-full'>
           <NoteHeader />
           <NoteContent />
        </section>

    )
}

export default page