import { Network } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Navbar({ username }: { username: String }) {
	return (
		<nav className="dark:bg-black p-4 shadow-xl h-[12%]">
			<div className=" mx-auto flex flex-row justify-between items-center">
				<div className="flex items-center">
					<Network className="text-center mr-4 w-10 h-10" />
					<h1 className="text-2xl font-extrabold tracking-tight ">
						Deep Trees
					</h1>
				</div>
				<span className="mr-4">Welcome, {username}</span>
				<LogoutButton />
			</div>
		</nav>
	);
}
