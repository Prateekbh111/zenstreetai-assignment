import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import zod from "zod";

//Merging predefined and user classes for shadcn/ui
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

//signIn schema for user
export const SignInSchema = zod.object({
	username: zod
		.string()
		.max(16, { message: "Username must be 16 or fewer characters long" })
		.min(8, { message: "Username must be 8 or more characters long" }),
	password: zod
		.string()
		.min(8, { message: "Password must be 8 or more characters long" }),
});

//signUp schema for user
export const SignUpSchema = zod.object({
	username: zod
		.string()
		.max(16, { message: "Username must be 16 or fewer characters long" })
		.min(8, { message: "Username must be 8 or more characters long" }),
	password: zod
		.string()
		.min(8, { message: "Password must be 8 or more characters long" }),

	confirmPassword: zod
		.string()
		.min(8, { message: "Password must be 8 or more characters long" }),
});
