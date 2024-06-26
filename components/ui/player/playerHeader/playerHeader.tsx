import { ChevronLeftIcon } from "lucide-react"
import { Skeleton } from "../../skeleton"
import Link from "next/link"
import PlayerDropDownOptions from "./playeroptionsDropDown"

interface Media {
    id: string
    key: string
    name: string
    projectId: string
}

export default function PlayerHeader({ media }: { media: Media }) {

    return (
        <>
            <div className="flex w-full justify-between items-center py-2 px-3 bg-[#2c2c2c]">
                <div className="flex items-center gap-3 w-[calc(100%-24px)]">
                    <Link href={'/db/project/' + media?.projectId}>
                        <div className="bg-[#444] rounded-md h-6 w-6 flex items-center justify-center">
                            <ChevronLeftIcon className="h-4" />
                        </div>
                    </Link>
                    {
                        media?.name ?
                            <span className="text-[13px] truncate w-[200px] sm:w-full sm:max-w-[70%]">
                                {media?.name}
                            </span> :
                            <Skeleton className="h-4 w-[200px] bg-[#888]" />
                    }
                </div>
                    <PlayerDropDownOptions
                    media={media} />
            </div>
        </>
    )
}