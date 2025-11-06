'use client'

import { getNotesApi, removeNoteApi } from '@/api/note'
import { useCallback, useEffect, useState } from 'react'
import Spinner from '../ui/Spinner'
import NoteCard from './NoteCard'
import { convertDate } from '@/utils/convertISODate'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'

const NoteList = () => {

    const [notes, setNotes] = useState<NoteType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>({
        page: 1,
        limit: 50,
        totalCount: 0
    })

    //Function for getting notes
    const handleGetNotes = async () => {

        try {

            setLoading(true)
            const result = await getNotesApi(pagination.page, pagination.limit)

            if (result?.success) {

                setNotes((preNotes) => {
                    return preNotes.length && pagination.page !== 1 ? [...preNotes, ...result?.notes] : [...result?.notes]
                })

                if (result?.totalCount) {
                    setPagination({ ...pagination, totalCount: result?.totalCount })
                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    //function for removing note
    const handleRemoveNote = useCallback(async (noteId: string) => {

        try {

            if(!noteId) return 

            const result = await removeNoteApi(noteId)
            if(result?.success){
                toast.success("Note is deleted")
                setNotes((preNotes) => {
                    return preNotes.filter((note) => note._id !== noteId)
                })
                setPagination({...pagination , totalCount : pagination.totalCount - 1})
            }

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }

    } , [])

    useEffect(() => {

        handleGetNotes()

    }, [pagination.page])

    return (

        <div className='mt-4 flex gap-3 flex-wrap w-full justify-center'>
            {
                notes.length
                    ?
                    notes.map((note) => (

                        <NoteCard
                            key={note?._id}
                            id={note?._id}
                            title={note?.title}
                            createdAt={convertDate(note?.createdAt)}
                            content={note?.content}
                            tags={note?.tags}
                            handleRemoveNote={handleRemoveNote}
                        />

                    ))
                    :
                    (
                        !loading
                        ?
                        <h1 className='text-lg md:text-xl mt-4'>No Notes Yet</h1>
                        :
                        <Spinner />
                    )
            }
            <div className='w-full flex justify-center'>
                {
                    notes.length < pagination.totalCount
                        ?
                        <Button
                            disabled={loading}
                            className='bg-background text-foreground cursor-pointer border hover:bg-popover text-xs'
                            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                        >
                            Load More
                        </Button>
                        :
                        null
                }
            </div>
        </div>

    )
}

export default NoteList