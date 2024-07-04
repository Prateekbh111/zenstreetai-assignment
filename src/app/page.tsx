import VisualTree from "@/components/VisualTree";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";

export default async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) notFound();

	return (
		<div className="min-h-screen h-screen w-screen">
			<Navbar username={session?.user.username!} />
			<VisualTree />
		</div>
	);
}
