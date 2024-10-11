import { redirect } from "next/navigation";
import { Settings } from "../settings";
import { getTeamForUser, getUser } from "@/lib/db/queries";

export default async function TeamsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error("Team not found");
  }

  return <Settings teamData={teamData} />;
}
