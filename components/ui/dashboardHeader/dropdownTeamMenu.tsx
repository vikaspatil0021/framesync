import { SwitchTeamIcon } from "@/components/icons/Icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { Check } from "lucide-react"
import { Skeleton } from "../skeleton";

type EachTeam = {

  team: {
    id: string,
    name: string
  },
  id: string,
  role: string

}


const ProfileComponent = ({
  eachTeam,
  activeTeam
}: {
  eachTeam: EachTeam | null,
  activeTeam: EachTeam | null
}) => {
  return (
    <>
      <div className="w-full" key={eachTeam?.team.id}>
        <Link href={'/t/' + eachTeam?.team.id}>
          <div className="flex items-center gap-2 justify-between cursor-pointer py-3 px-2 hover:bg-[#333] rounded-lg">
            <div className="flex items-center gap-2">

              <Skeleton className="h-6 w-6 rounded-full " />
              <span>{eachTeam?.team.name}</span>
            </div>
            {
              activeTeam?.team.id === eachTeam?.team.id &&
              <Check className="h-5 mr-3 text-green-500" />
            }
          </div>
        </Link>

      </div>
    </>
  )
}

export default function DropdownTeamMenu({
  personalTeam,
  sharedTeam,
  activeTeam
}: {
  personalTeam: EachTeam | null,
  sharedTeam: [] | null,
  activeTeam: EachTeam | null
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none data-[state=open]:bg-[#333] rounded-lg hover:bg-[#333] transition-all">
          <SwitchTeamIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="py-3 px-2">
            <div>

              <div className="px-2 text-sm mb-2 text-[#999]">
                Personal Team
              </div>
              <ProfileComponent
                key={personalTeam?.team.id}
                eachTeam={personalTeam}
                activeTeam={activeTeam}
              />
            </div>
            {
              sharedTeam && sharedTeam.length != 0 &&
              <div>

                <div className="px-2 text-sm my-2 text-[#999]">
                  Shared Team
                </div>
                {
                  sharedTeam.map((eachTeam: EachTeam) => {
                    return (

                      <ProfileComponent
                        key={eachTeam.team.id}
                        eachTeam={eachTeam}
                        activeTeam={activeTeam}
                      />
                    )
                  })
                }

              </div>
            }
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
