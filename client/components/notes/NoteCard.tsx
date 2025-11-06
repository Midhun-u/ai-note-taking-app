'use client'

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "../ui/card"
import {
    EditIcon,
    Trash2 as RemoveIcon,
    Eye as ShowIcon
} from 'lucide-react'

type NoteCardType = {
    id: string,
    title: string,
    createdAt: string,
    content: string,
    tags: Array<string | undefined>,
    handleRemoveNote: (noteId: string) => void
}

const NoteCard = ({ id, title, createdAt, content, tags, handleRemoveNote }: NoteCardType) => {

    const router = useRouter()

    return (

        <Card className="w-100 relative">
            <div className="flex gap-4 absolute right-4 top-2">
                <ShowIcon
                    size={17}
                    className="hover:stroke-disable-color"
                    onClick={() => router.push(`/edit-note/${id}`)}
                />
                <EditIcon
                    size={17}
                    className="hover:stroke-disable-color"
                />
                <RemoveIcon
                    size={17}
                    className="hover:stroke-red-400"
                    onClick={() => handleRemoveNote(id)}
                />
            </div>
            <CardHeader className="mt-1">
                <h1>{title}</h1>
                <p className="text-xs text-disable-color">{createdAt}</p>
            </CardHeader>
            <CardContent className="text-sm text-disable-color">
                <p className="max-h-21 overflow-hidden">{content}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {
                        tags?.map((tag, index) => (
                            <p className="text-xs bg-disable-color text-background py-1 px-1.5 rounded-md" key={index}>{tag}</p>
                        ))
                    }
                </div>
            </CardContent>
        </Card>

    )
}

export default NoteCard