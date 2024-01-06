import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Session = {
  user: {
    personalTeamId: string
  }
}
export default async function Home() {
  const session: Session | null = await getServerSession(options);

  if (!session) redirect('/auth');

  redirect('/t/' + session.user.personalTeamId)
}
