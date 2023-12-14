import { GoogleIcon } from "@/components/icons/Icons"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: 'Auth',
}

export default function Login() {
  return (
    <div className="text-center w-full max-w-md min-w-fit mb-10">
      <div className="font-semibold text-4xl py-2">
        Framesync.in
      </div>
      <div className="text-sm pt-2">
        Authenticate with
      </div>
      <div className="flex flex-col w-full gap-3 px-8 py-2">

        <Button variant="secondary" size='lg' className="gap-1">
          <GoogleIcon />
          Google
        </Button>
        <Button variant="secondary" size='lg' className="gap-1">
          <GitHubLogoIcon />
          Github
        </Button>
      </div>
      
    </div>
  )
}
