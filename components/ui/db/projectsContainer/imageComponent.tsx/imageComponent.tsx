import Image from "next/image"
import { useState } from "react"

type Media = {
    id: String
    key: String
    size: number
    type: "VideoFile" | "Folder"
    projectId: String
}

export default function ImageComponent({
    each
}: {
    each: Media
}){

    const [keyy, setKey] = useState(Math.random())


    const awsCdnDomain = process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN + "/";

    return (
        <>
            <div>
                <Image
                    key={keyy}
                    loading="eager"
                    src={awsCdnDomain + each.key + ".jpg"}
                    width={100}
                    height={100}
                    className="rounded-lg w-full aspect-video"
                    alt='media-Image'
                    onError={(e) => {
                        console.log(e);
                        setTimeout(() => {
                            setKey(Math.random())
                        }, 3000);
                    }}
                />
            </div>
        </>
    )
}