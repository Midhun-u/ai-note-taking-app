'use client'

import SearchBar from './SearchBar'
import NoteList from './NoteList'
import { useEffect, useState } from 'react'
import { getNotesApi } from '@/api/note'
import { toast } from 'react-toastify'
import { NoteType } from '@/types/NoteType'
import { searchNotesApi } from '../../api/note'

const NoteContent = () => {

    const [searchQuery, setSearchQuery] = useState<string>('')
    const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>({
        page: 1,
        limit: 50,
        totalCount: 0
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [notes, setNotes] = useState<NoteType[]>([])


    //Function for getting notes
    const handleGetNotes = async () => {

        try {

            setLoading(true)

            if(pagination.page === 1){

                setNotes([])

            }
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
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }

    }


    //function for search notes
    const handleSearchNotes = async () => {

        try {

            if(pagination.page === 1){
                setNotes([])
            }
            setLoading(true)
            const result = await searchNotesApi(searchQuery , pagination.page , pagination.limit)
            
            if(result?.success){

                setNotes((preNotes) => {
                    return preNotes.length && pagination.page !== 1 ? [...preNotes , ...result?.searchedNotes] : [...result?.searchedNotes]
                })

                if(result?.totalCount){
                    setPagination({...pagination , totalCount : result?.totalCount})
                }
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }

    }


    useEffect(() => {

        if(searchQuery.trim()) return

        handleGetNotes()

    }, [pagination.page])

    useEffect(() => {

        if(searchQuery.trim()){
            handleSearchNotes()
        }else{
            handleGetNotes()
        }


    } , [pagination.page , searchQuery])

    return (

        <>
            <SearchBar
                setSearchQuery={setSearchQuery}
                setPagination={setPagination}
            />
            <NoteList
                notes={notes}
                setNotes={setNotes}
                setPagination={setPagination}
                pagination={pagination}
                loading={loading}
            />
        </>

    )
}

export default NoteContent