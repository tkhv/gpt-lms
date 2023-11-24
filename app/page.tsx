import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // const { userId, setUserId, courseList, setCourseList } = useUserContext();
  //this will be sent to navbar by using useContext

  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
    return null;
  } else {
    redirect("/dashboard");
  }
}
