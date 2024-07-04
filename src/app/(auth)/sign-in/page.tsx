"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SignInSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Network } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SignInPage() {
	const { toast } = useToast();
	const router = useRouter();

	//ZOD IMPLEMENTATION
	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof SignInSchema>) {
		try {
			const result = await signIn("credentials", {
				username: data.username,
				password: data.password,
				callbackUrl: "/",
			});
			console.log(result);
			if (result?.error) {
				toast({
					title: "Login Failed",
					description: "Incorrect email or password",
					variant: "destructive",
				});
			}

			toast({
				className: "dark:bg-black dark:border-zinc-800",
				title: "Logged In Successfully",
				description: "User logged in successfully",
			});
		} catch (error) {
			console.error("SignIn error:", error);
			toast({
				title: "Login Error",
				description: "An error occurred during login.",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
			<div className="w-full max-w-lg p-8 space-y-8 rounded-xl shadow-lg border-[1px] border-zinc-100 bg-white dark:border-zinc-800 dark:bg-black">
				<div className="text-center">
					<div className="flex justify-center items-center mb-6">
						<Network className="text-center mr-4 w-10 h-10" />
						<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
							Deep Trees
						</h1>
					</div>
					<p className="mb-4">Sign In to start building trees</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							name="username"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-black dark:text-white">
										Username
									</FormLabel>
									<FormControl>
										<Input
											placeholder="JohnDoe"
											className="outline-none focus:border-zinc-800 focus:border-2 border-[1px] border-zinc-300 dark:border-zinc-800 placeholder:text-neutral-500"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-black dark:text-white">
										Password
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="••••••••••"
											{...field}
											className="outline-none focus:border-zinc-800 focus:border-2 border-[1px] border-zinc-300 dark:border-zinc-800 placeholder:text-neutral-500"
										/>
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between">
							<Button
								type="submit"
								className="focus:outline-zinc-500 bg-black hover:bg-neutral-800 dark:text-black dark:bg-white dark:hover:bg-zinc-950 dark:hover:text-white "
							>
								Sign In
							</Button>
							<div className="text-center">
								<p>
									Not a member?{" "}
									<Link href="/sign-up" className="font-bold hover:underline">
										Sign Up
									</Link>
								</p>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
