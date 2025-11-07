'use client'

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
    SearchIcon,
    PlusSquare as PluseIcon
} from 'lucide-react'
import React, { ChangeEvent } from "react"

type SearchBarType = {
    setSearchQuery : React.Dispatch<React.SetStateAction<string>>,
    setPagination : React.Dispatch<React.SetStateAction<{page : number , limit : number , totalCount : number}>>
}

const SearchBar = ({setSearchQuery , setPagination} : SearchBarType) => {

    const router = useRouter()

    //Function for storing value
    const handleStoreValue = (event : ChangeEvent<HTMLInputElement>) => {

        setPagination((pagination) => {
            return {...pagination , page : 1}
        })
      
        setSearchQuery(event.target.value)

    }

    //Debouncing
    const debounce = (fn : Function , delay : number) => {

        let timer : NodeJS.Timeout
        return function (...arg : unknown[]) {

            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...arg)
            } , delay)

        }

    }

    //Function for handling event
    const handleOnChangeEvent = debounce(handleStoreValue , 1000)

    return (

        <div className="mt-5 w-full flex flex-col md:flex-row gap-3 z-50">
            <div className='w-full md:w-[70vw] flex items-center'>
                <SearchIcon
                    className="absolute left-5 md:left-7 stroke-disable-color -z-1"
                    size={18}
                />
                <Input
                    placeholder="Search notes by title"
                    className="relative text-xs pl-10 focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
                    onChange={handleOnChangeEvent}
                />
            </div>
            <Button
                size="sm"
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => router.push("/create-note")}
            >
                <PluseIcon
                    size={26}
                />
                <span>New Notes</span>
            </Button>
        </div>

    )
}

export default SearchBar