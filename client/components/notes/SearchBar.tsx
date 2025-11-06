'use client'

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
    SearchIcon,
    PlusSquare as PluseIcon
} from 'lucide-react'

const SearchBar = () => {

    const router = useRouter()

    return (

        <div className="mt-5 w-full flex flex-col md:flex-row gap-3">
            <div className='w-full md:w-[70vw] flex items-center'>
                <SearchIcon
                    className="absolute left-5 md:left-7 stroke-disable-color -z-1"
                    size={18}
                />
                <Input
                    placeholder="Search notes"
                    className="relative text-xs pl-10 focus-visible:ring-1 focus-visible:ring-primary rounded-xs -z-1"
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