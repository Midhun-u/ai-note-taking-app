import NoteHeader from "@/components/notes/NoteHeader"
import NoteList from "@/components/notes/NoteList"
import SearchBar from "@/components/notes/SearchBar"

const page = () => {
    
    return (

        <section className='pt-15 px-2 md:px-4 w-full h-full'>
           <NoteHeader />
           <SearchBar />
           <NoteList />
        </section>

    )
}

export default page