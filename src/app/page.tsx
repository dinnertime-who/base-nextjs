import { auth } from "@server/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {JSON.stringify(session)}
    </div>
  );
}
