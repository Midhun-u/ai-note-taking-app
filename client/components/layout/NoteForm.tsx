'use client'

import { useParams, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
    FileChartColumnIncreasing as SummarizeIcon,
    Flame as ImproveIcon,
    TagIcon,
    X as CloseIcon
} from 'lucide-react'
import React, { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { z } from 'zod'
import { createNoteApi, generateTagsApi, getNoteApi, improveTextApi, takeSummaryApi, updateNoteApi } from "@/api/note"
import { toast } from "react-toastify"
import Spinner from "../ui/Spinner"

type NoteFormDataType = {
    title: string,
    content: string,
    tags: Array<string | undefined>,
}

type NoteFormType = {
    updateForm?: boolean,
}

const NoteForm = ({ updateForm = false}: NoteFormType) => {

    const router = useRouter()
    const [noteFormData, setNoteFormData] = useState<NoteFormDataType>({
        title: '',
        content: '',
        tags: []
    })
    const [tag, setTag] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState<string>('')
    const [improvedText, setImprovedText] = useState<string>('')
    const { id: noteId } = useParams()

    //Function for submitting form
    const handleSubmitForm = async () => {

        try {

            const formSchema = z.object({
                title: z.string().min(1).max(50),
                content: z.string().min(1),
                tags: z.string().optional().array().max(10)
            })

            const { success, error } = formSchema.safeParse(noteFormData)

            if (!success && error) {
                console.log(error)
                return
            }

            if (updateForm) {

                const result = await updateNoteApi(noteId as string, noteFormData.title, noteFormData.content, noteFormData.tags)

                if (result?.success) {

                    router.push("/notes")
                    setNoteFormData({ ...noteFormData, title: '', content: '', tags: [] })
                    toast.success("Updated")

                }

            } else {

                const result = await createNoteApi(noteFormData.title, noteFormData.content, noteFormData.tags)

                if (result?.success) {
                    router.push("/notes")
                    setNoteFormData({ ...noteFormData, title: '', content: '', tags: [] })
                    toast.success("Created")
                }
            }


        } catch (error) {
            console.log(error)
            toast.error("Note is not updated")
        }

    }

    //Function for removing tag
    const handleRemoveTag = (tagIndex: number) => {

        const filteredTag = noteFormData.tags.filter((_, index) => index !== tagIndex)
        setNoteFormData({ ...noteFormData, tags: filteredTag })

    }

    //Function for adding tag
    const handleAddTag = () => {

        if (!tag) return

        setNoteFormData({ ...noteFormData, tags: [...noteFormData.tags, tag] })
        setTag('')

    }

    //Function for taking summary
    const handleGetSummary = async () => {

        try {

            if (!noteFormData.content) return

            setLoading(true)
            const result = await takeSummaryApi(noteFormData.content)
            if (result?.success) {
                setSummary(result?.summary)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    //Function for getting note
    const handleGetNote = async () => {

        try {

            const result = await getNoteApi(noteId as string)
            if (result?.success) {
                setNoteFormData({
                    ...noteFormData,
                    title: result?.note?.title,
                    content: result?.note?.content,
                    tags: result?.note?.tags
                })
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

    }

    //Function for improving text
    const handleGetImprovedText = async () => {

        try {

            if (!noteFormData.content) return

            setLoading(true)
            const result = await improveTextApi(noteFormData.content)
            if (result?.success) {
                setImprovedText(result?.improvedText)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    //Function for generating tags
    const handleGenerateTags = async () => {

        try {

            if (!noteFormData.content) return

            setLoading(true)

            const result = await generateTagsApi(noteFormData.content)
            if (result?.success) {
                setNoteFormData({ ...noteFormData, tags: [...result?.tags] })
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }

    }


    useEffect(() => {

        if (noteId) {
            handleGetNote()
        }

    }, [noteId])

    return (

        <div className='w-full h-full flex justify-center py-10 px-3'>
            <form action={handleSubmitForm} className="md:w-[70vw] w-full">
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>
                            {
                                updateForm
                                    ?
                                    "Update Note"
                                    :
                                    "Create New Note"
                            }
                        </FieldLegend>
                        <FieldDescription>
                            {
                                updateForm
                                    ?
                                    "Update your existing note to refine content, fix mistakes, or add new details."
                                    :
                                    "Quickly add a new note with a title and content. Capture your thoughts, ideas, or important details and save them securely for later access."
                            }
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">
                                    Title
                                </FieldLabel>
                                <Input
                                    id="title"
                                    placeholder="Enter title"
                                    required
                                    className="focus-visible:ring-1 text-xs focus-visible:ring-primary rounded-xs"
                                    minLength={1}
                                    maxLength={50}
                                    onChange={(event) => setNoteFormData({ ...noteFormData, title: event.target.value })}
                                    value={noteFormData.title}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="content">
                                    Content
                                </FieldLabel>
                                <Textarea
                                    id="content"
                                    placeholder="Enter content"
                                    required
                                    className="focus-visible:ring-1 text-xs focus-visible:ring-primary rounded-xs"
                                    minLength={1}
                                    onChange={(event) => setNoteFormData({ ...noteFormData, content: event.target.value })}
                                    value={noteFormData.content}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <FieldSeparator />
                    {
                        summary
                            ?
                            <Field>
                                <FieldLabel>
                                    Summary
                                </FieldLabel>
                                <p className="text-xs text-disable-color">
                                    {summary}
                                </p>
                            </Field>
                            :
                            null
                    }
                    {
                        improvedText
                            ?
                            <Field>
                                <FieldLabel>
                                    Improved Text
                                </FieldLabel>
                                <p className="text-xs text-disable-color">
                                    {improvedText}
                                </p>
                            </Field>
                            :
                            null
                    }
                    <Field>
                        <FieldLabel>
                            AI Actions
                        </FieldLabel>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                className="bg-background text-foreground cursor-pointer border hover:bg-popover"
                                onClick={handleGetSummary}
                                type="button"
                                disabled={loading}
                            >
                                {
                                    loading
                                        ?
                                        <Spinner />
                                        :
                                        <>
                                            <SummarizeIcon
                                                size={18}
                                                strokeWidth={1.5}
                                            />
                                            <span className="text-xs font-normal">AI Summary</span>
                                        </>
                                }
                            </Button>
                            <Button
                                className="bg-background text-foreground cursor-pointer border hover:bg-popover"
                                type="button"
                                disabled={loading}
                                onClick={handleGetImprovedText}
                            >
                                {
                                    loading
                                        ?
                                        <Spinner />
                                        :
                                        <>
                                            <ImproveIcon
                                                size={18}
                                                strokeWidth={1.5}

                                            />
                                            <span className="text-xs font-normal">AI Improve</span>
                                        </>
                                }
                            </Button>
                            <Button
                                className="bg-background text-foreground cursor-pointer border hover:bg-popover"
                                type="button"
                                disabled={loading}
                                onClick={handleGenerateTags}
                            >
                                {
                                    loading
                                        ?
                                        <Spinner />
                                        :
                                        <>
                                            <TagIcon
                                                size={18}
                                                strokeWidth={1.5}
                                            />
                                            <span className="text-xs font-normal">Generate Tags</span>
                                        </>

                                }
                            </Button>
                        </div>
                    </Field>
                    <Field>
                        <FieldLabel>Tag</FieldLabel>
                        <div className="flex gap-2">
                            <Input
                                className="focus-visible:ring-1 text-xs focus-visible:ring-primary rounded-xs"
                                placeholder="Add tag"
                                value={tag}
                                onChange={(event) => setTag(event.target.value)}
                            />
                            <Button
                                className="bg-background text-foreground cursor-pointer border hover:bg-popover"
                                onClick={handleAddTag}
                                disabled={noteFormData?.tags.length >= 10}
                                type="button"
                            >
                                Add
                            </Button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {
                                noteFormData.tags.map((tag, index) => (
                                    tag
                                        ?
                                        <React.Fragment key={index}>
                                            <div
                                                className="border p-2 text-xs pr-10 flex items-center relative cursor-pointer"
                                                onClick={() => handleRemoveTag(index)}
                                            >
                                                <p>{tag}</p>
                                                <CloseIcon
                                                    size={15}
                                                    className="absolute right-2"
                                                />
                                            </div>
                                        </React.Fragment>
                                        :
                                        null
                                ))
                            }
                        </div>
                    </Field>
                    <Field>
                        <div className="flex gap-3 flex-wrap">
                            <SubmitForm
                                updateForm={updateForm}
                            />
                            <Button
                                className="bg-background text-foreground cursor-pointer border hover:bg-popover"
                                onClick={() => router.push('/notes')}
                                type="button"
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Field>
                </FieldGroup>
            </form>
        </div>

    )
}

function SubmitForm({ updateForm }: { updateForm: boolean }) {

    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            disabled={pending}
            className="cursor-pointer"
        >
            {
                pending
                    ?
                    <Spinner />
                    :
                    (
                        updateForm
                            ?
                            "Update Note"
                            :
                            "Create New Note"
                    )
            }
        </Button>
    )


}

export default NoteForm