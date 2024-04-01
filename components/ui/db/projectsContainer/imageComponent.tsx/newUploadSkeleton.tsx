import { motion } from "framer-motion"

import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";


import convertBytes from "@/lib/convertBytesFunction";

type NewUploadData = {
    uploadProgress: number,
    name: string,
    size: number,
    key: string,
    stage: string,
    projectId: string,
}
export default function NewuploadSkeleton({
    newUploadData
}: {
    newUploadData: NewUploadData
}) {
    const { name, size, stage, uploadProgress } = newUploadData;

    return (
        <>
            <div className="relative rounded-lg w-full h-full  bg-[#555] text-[#fff] shadow-md shadow-[#111] flex flex-col">
                <div className="flex flex-col justify-end items-center aspect-video p-3">
                    <span className="flex-1 flex  items-center">
                        {
                            stage === 'uploading' ?
                                uploadProgress + "%"
                                :
                                <motion.div
                                    initial={{ opacity: 0, scale: 1 }}
                                    animate={{ opacity: 1, scale: 1.5 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0, 0.71, 0.2, 1.01],
                                        scale: {
                                            type: "spring",
                                            damping: 5,
                                            stiffness: 100,
                                            restDelta: 0.001,
                                            repeat: Infinity
                                        }
                                    }}
                                >
                                    <Skeleton className="h-5 w-5 rounded-full bg-transparent border" aria-label="wave" />
                                </motion.div>
                        }
                    </span>
                    {
                        stage === 'uploading' &&
                        <Progress className="" value={uploadProgress} />
                    }

                </div>
                <div className="text-[11px] bg-[#363c4c] rounded-b-md p-2.5  h-[52px]">
                    <div className="flex justify-between">
                        <span className="truncate w-[70%]">
                            {newUploadData?.name}
                        </span>
                        <span>
                            {convertBytes(newUploadData?.size)}
                        </span>
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <Skeleton className="h-1.5 w-[30%] bg-[#999]" />
                        <Skeleton className="h-1.5 w-[20%] bg-[#999]" />
                    </div>
                </div>
            </div >
        </>
    )
}