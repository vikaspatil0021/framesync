import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserMinusIcon, X } from "lucide-react"
import { Button } from "../button"
import { Badge } from "../badge"

type EachMember = {
    user: {
        name: string,
        email: string,
        id: string,
        picture: string
    },
    role: "OWNER" | "MEMBER"
}

const ProfileCard = ({
    imageURL,
    name,
    email,
    isInvitationtab,
}: {
    imageURL: string,
    name: string,
    email: string,
    isInvitationtab: boolean,
}) => {
    return (
        <>
            <div className="flex items-center justify-between bg-[#151515] p-3  border-[.5px] border-white/10 mt-1 rounded-lg">
                <div className="flex items-center  gap-3">

                    <Avatar>
                        <AvatarImage src={imageURL} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="text-base font-bold flex items-center gap-2">
                            {name}
                            {isInvitationtab ? <Badge variant="default">Pending</Badge> : null}

                        </div>
                        <div className="text-sm text-[#f2f2f2]/70">
                            {email}
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 items-center">

                    <Popover>
                        <PopoverTrigger>
                            {
                                isInvitationtab ?
                                    <X className=" h-6 w-6 p-1 text-red-400 hover:text-red-500 cursor-pointer" />
                                    :
                                    <UserMinusIcon className=" h-6 w-6 p-1 text-red-400 hover:text-red-500 cursor-pointer" />
                            }

                        </PopoverTrigger>
                        <PopoverContent className="flex gap-3 items-center">
                            <div className="text-sm text-center text-white/70">
                                {isInvitationtab ? "Revoke invite?" : "Remove member?"}
                            </div>
                            <Button variant='destructive'>
                                Confirm
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </>
    )
}

export const MembersTabContent = ({
    members
}: {
    members: EachMember[]
}) => {

    return (
        <>
            {members?.map((eachMember: EachMember, index: number) => {
                return (
                    <>
                        <ProfileCard
                            key={index}
                            imageURL={eachMember?.user?.picture}
                            name={eachMember.user.name}
                            email={eachMember.user.email} isInvitationtab={false}
                        />
                    </>
                )
            })}
        </>
    )
}

export const InvitationTabContent = () => {
    return (
        <>
            <ProfileCard imageURL={"https://github.com/shadcn.png"} name={"vikaspatil0021o@gmail.com".split('@')[0]} email={"vikaspatil0021o@gmail.com"} isInvitationtab={true} />
        </>
    )
}