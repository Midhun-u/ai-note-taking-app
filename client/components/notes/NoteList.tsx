'use client'

import { removeNoteApi } from '@/api/note'
import React, { useCallback} from 'react'
import Spinner from '../ui/Spinner'
import NoteCard from './NoteCard'
import { convertDate } from '@/utils/convertISODate'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'
import { NoteType } from '@/types/NoteType'

type NoteListType = {
    notes : NoteType[],
    pagination : {page : number , limit : number  , totalCount : number},
    setPagination : React.Dispatch<React.SetStateAction<{page : number , limit : number , totalCount : number}>>,
    setNotes : React.Dispatch<React.SetStateAction<NoteType[]>>,
    loading : boolean
}

const NoteList = ({notes , setPagination , setNotes , pagination , loading} : NoteListType) => {
    
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
                        <h1 className='text-lg md:text-xl mt-4'>No Notes are found</h1>
                        :
                        <Spinner />
                    )
            }
            <div className='w-full flex justify-center'>
                {
                    notes.length < pagination.totalCount && notes.length
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