interface Media {
    id: string
    key: string
    name: string
    projectId:string
}

export default function PlayerHeader({ media }: { media: Media }) {

    return (
        <>
            <div>
                {media?.name}
            </div>
        </>
    )
}