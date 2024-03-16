'use client'

import Image from "next/image";
import { usePathname } from "next/navigation";

import { trpc } from "@/trpc/client/trpcClient";

import ProjectHeader from "@/components/ui/db/projectHeader/projectHeader";


export default function Page() {
    const awsCdnDomain = process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN + "/";

    const pathName = usePathname();
    const projectId = pathName.replace('/db/project/', '');

    const { data } = trpc.media.getAllMedia.useQuery({ projectId })
    console.log(data)
    return (
        <>
            <ProjectHeader
                projectId={projectId}
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-5">
                {
                    data && data.allMedia?.map((each) => {
                        return (
                            <>
                                <Image
                                
                                    loading="lazy"
                                    src={awsCdnDomain + each.key + ".jpg"}
                                    width={100}
                                    height={100}
                                    className="rounded-lg w-full aspect-video"
                                    alt={'media-Image'}
                                />
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}
