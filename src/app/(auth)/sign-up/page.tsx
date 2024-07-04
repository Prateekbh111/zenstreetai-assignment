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
import { SignUpSchema } from "@/lib/utils";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, Network } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SignUpPage() {
	const [isSubmitting, setIsSumitting] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: z.infer<typeof SignUpSchema>) {
		setIsSumitting(true);
		try {
			console.log(data);
			const response = await axios.post<ApiResponse>("/api/sign-up", data);
			toast({
				title: "Success",
				description: response.data.message,
			});
			router.replace("/sign-in");
		} catch (error) {
			console.log("Error in signup of user", error);
			const axiosError = error as AxiosError<ApiResponse>;
			const errorMessage = axiosError.response?.data.message;
			toast({
				title: "Sign Up failed!",
				description: errorMessage,
				variant: "destructive",
			});
		} finally {
			setIsSumitting(false);
		}
	}

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
			<div className="box w-full max-w-lg p-8 space-y-8 rounded-xl shadow-lg border-[1px] border-zinc-100 bg-white dark:border-zinc-800 dark:bg-black">
				<div className="text-center">
					<div className="flex justify-center items-center mb-6">
						<Network className="text-center mr-4 w-10 h-10" />
						<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
							Deep Trees
						</h1>
					</div>
					<p className="mb-4">Sign up to start building trees</p>
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
						<FormField
							name="confirmPassword"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-black dark:text-white">
										Confirm Password
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="••••••••••"
											className="outline-none focus:border-zinc-800 focus:border-2 border-[1px] border-zinc-300 dark:border-zinc-800 placeholder:text-neutral-500"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between">
							<Button
								type="submit"
								disabled={isSubmitting}
								className="focus:outline-zinc-500 bg-black hover:bg-neutral-800 dark:text-black dark:bg-white dark:hover:bg-zinc-950 dark:hover:text-white "
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
										wait
									</>
								) : (
									"Sign Up"
								)}
							</Button>
							<div className="text-center">
								<p>
									Already a member?{" "}
									<Link href="/sign-in" className="font-bold hover:underline">
										Sign in
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
