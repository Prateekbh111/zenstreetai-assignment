"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function LogoutButton() {
	const { toast } = useToast();
	async function handleSignOut() {
		await signOut();
		toast({
			className: "dark:bg-black",
			title: "Logged Out Successfully",
			description: "User logged out successfully",
		});
	}
	return (
		<Button className="w-auto" onClick={handleSignOut}>
			Logout
		</Button>
	);
}
