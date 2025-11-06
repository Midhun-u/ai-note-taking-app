'use client'

import {
    Brain as AIicon
} from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const Hero = () => {

    const router = useRouter()

    return (

        <div className='mt-10 flex flex-col items-center gap-5'>
            <div className='flex gap-2 items-center justify-center py-2 px-3 rounded-full bg-primary-accent'>
                <AIicon
                    size={20}
                    className='stroke-primary'
                    strokeWidth={1.9}
                />
                <p className='text-xs text-primary'>AI-Powered Note Taking</p>
            </div>
            <h1 className='text-center text-3xl font-semibold lg:text-4xl'>
                Your notes, <span className='text-primary'>supercharged</span> with AI
            </h1>
            <p className='text-center text-sm text-disable-color  w-auto md:w-[500px] px-3 md:px-0'>
                Write, organize, and enhance your notes with the power of artificial intelligence. Get summaries, improve your writing, and auto-generate tags instantly.
            </p>
            <Button onClick={() => router.push("/notes")} className='cursor-pointer text-xs md:text-md hover:bg-primary-hover'>
                Start Taking Notes
            </Button>
        </div>

    )
}

export default Hero