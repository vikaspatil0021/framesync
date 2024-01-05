
import { Skeleton } from "../skeleton"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "../use-toast"

import DropdownTeamMenu from "./dropdownTeamMenu"
import { ManageMembersModal } from "../membersModal/membersModal"

type EachTeam = {

    team: {
        id: string,
        name: string
    },
    id: string,
    role: string

}


export const DashboardHeader = ({ params }: { params: { teamId: string } }) => {
    const session = useSession();
    //@ts-expect-error
    const userId = session?.data?.user?.id;

    const [personalTeam, setPersonalTeam] = useState<EachTeam | null>(null);
    const [sharedTeam, setSharedTeam] = useState<[] | null>(null);
    const [activeTeam, setActiveTeam] = useState<EachTeam | null>(null)

    const getTeamsByUserId = async (userId: string) => {
        const result = await fetch(`/api/teams?userId=${userId}`, {
            method: "GET"
        });

        if (!result.ok) {
            const errorMsg = await result.json();
            toast({
                variant: "destructive",
                title: errorMsg.error,
            });
            return;
        }

        const data = await result.json();

        const sharedTeamArr = data.teams.filter((eachTeam: EachTeam) => {
            if (eachTeam?.team.id === params.teamId) {
                setActiveTeam(eachTeam);
            }
            if (eachTeam.role === 'OWNER') {
                setPersonalTeam(eachTeam);
            } else if (eachTeam.role === "MEMBER") {
                return eachTeam;
            }
        })
        setSharedTeam(sharedTeamArr)
    }

    
    useEffect(() => {
        if (personalTeam === null && sharedTeam === null && userId) {

            getTeamsByUserId(userId as string)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [personalTeam, sharedTeam, userId]);
    return (
        <>
            <div className="flex items-center gap-10 bg-[#111] border-b border-[#555]/50 w-full px-10 py-3  text-lg">
                <Skeleton className="h-8 w-8 bg-[#222]" /> {/* //replace with logog */}
                <div className="inline-flex items-center gap-3 ">
                    <div className="flex items-center gap-2 cursor-pointer py-2">

                        <Skeleton className="h-6 w-6 rounded-full " />
                        <span>{activeTeam?.team.name}</span>
                    </div>

                    <DropdownTeamMenu
                        personalTeam={personalTeam}
                        sharedTeam={sharedTeam}
                        activeTeam={activeTeam}
                     />

                    <ManageMembersModal params={params} />
                </div>

            </div>
        </>
    )
}