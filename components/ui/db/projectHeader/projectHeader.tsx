import { trpc } from "@/trpc/client/trpcClient";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../button";
import { AngleDown } from "@/components/icons/Icons";

type Team = {
    id: string,
    name: string
}

export default function ProjectHeader() {
    const pathName = usePathname()
    const projectId = pathName.replace('/db/project/', '');

    const [currentTeam, setCurrentTeam] = useState<Team | null>(null)

    useEffect(() => {
        const team = localStorage.getItem('currentTeam');
        setCurrentTeam(JSON.parse(team as string));
    }, []);

    const { data } = trpc.project.getProject.useQuery({ projectId })


    return (
        <>
            <div className="py-5 px-10 text-[#f2f2f2]">
                <div className="text-[13px] text-[#999]">
                    {currentTeam?.name}
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[16px] my-2 py-2">

                    {data?.project?.name}
                    </div>
                    <div>
                        <Button size='sm' variant='default' className="gap-1 flex items-center bg-[#4a5878] hover:bg-[#536795] transition-all">
                            New
                            <AngleDown />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}