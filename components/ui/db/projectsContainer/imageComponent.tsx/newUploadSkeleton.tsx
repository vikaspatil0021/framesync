
export default function NewuploadSkelton({
    progress
}: {
    progress: number
}) {

    return (
        <>
            <div className="rounded-lg w-full h-full aspect-video bg-[#555] text-[#fff] flex justify-center items-center">
               {
                progress && 0
               }
            </div>
        </>
    )
}