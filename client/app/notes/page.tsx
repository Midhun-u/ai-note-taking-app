import NoteHeader from "@/components/notes/NoteHeader"
import SearchBar from "@/components/notes/SearchBar"

const page = () => {
    
    return (

        <section className='pt-15 px-2 md:px-4 w-full h-full'>
           <NoteHeader />
           <SearchBar />
        </section>

    )
}

export default page