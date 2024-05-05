import { LoadingIcon } from "@/components/icons/Icons";
import { useAppSelector } from "@/lib/redux-toolkit/hook";
import { motion } from "framer-motion";

export default function DownloadsStatusNotifier() {
    const { downloadMediaCount } = useAppSelector((state) => state.downloadMediaReducer);

    if (downloadMediaCount === 0) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0.5, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
            >
                <div className="flex bottom-0 sm:right-0  z-[100] fixed  max-h-screen max-w-screen w-full sm:w-auto transition-all">
                    <div className="relative sm:w-[250px] w-full flex items-center justify-between pointer-events-auto text-white p-3 mx-5 my-3 bg-[#555] rounded-md">
                        <span className="text-[13px] ps-2">{downloadMediaCount} files downloading...</span>
                        <LoadingIcon className="right-0 h-3 w-3" />
                    </div>
                </div >
            </motion.div>
        </>
    )
}