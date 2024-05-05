import { LoadingIcon } from "@/components/icons/Icons";
import { getPreSignedUrl } from "@/lib/aws/s3/preSignedUrl";
import downloadMedia from "@/lib/downloadMedia";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hook";
import { trpc } from "@/trpc/client/trpcClient";
import { Download } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"


export const DownloadAllBtn = ({
    setOpenStatus,
    projectId
}: {
    setOpenStatus: Dispatch<SetStateAction<boolean>>,
    projectId: string
}) => {
    const dispatch = useAppDispatch();
    const [loadingIcon, setLoadingicon] = useState<boolean>(false);

    const { orderBy } = useAppSelector((state) => state.mediaOrderOptions);

    const { data: mediaArr } = trpc.media.getAllMedia.useQuery({ projectId, orderBy });

    const downloadAllHandler = async () => {
        setLoadingicon(true);

        const keys = mediaArr?.allMedia?.map(each => {
            return {
                key: each?.key,
                mediaName: each?.name
            }
        });
        keys && keys?.forEach(async (element) => {
            
            await downloadMedia(element?.key, element?.mediaName, dispatch);
        });

        setOpenStatus(false);
        setLoadingicon(false);
    }

    return (
        <>
            <div className="relative p-1.5 text-[11px] rounded-sm hover:bg-[#4c4c4c] flex items-center justify-between gap-2 cursor-pointer"
                onClick={downloadAllHandler}>
                <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download All
                </div>
                {loadingIcon &&
                    <LoadingIcon className="-right-2 h-4 w-4" />}
            </div >
        </>
    )
}