import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			async authorize(credentials: any, req): Promise<any> {
				await dbConnect();
				try {
					const user = await UserModel.findOne({
						username: credentials.username,
					});
					if (!user) {
						throw new Error("No user find with this email");
					}
					const isPasswordCorrect = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (isPasswordCorrect) {
						return user;
					} else {
						throw new Error("Incorrect password");
					}
				} catch (error: any) {
					throw new Error(error);
				}
			},
			credentials: {
				username: {
					label: "username",
					type: "text ",
					placeholder: "JohnDoe",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id?.toString();
				token.username = user.username;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id;
				session.user.username = token.username;
			}
			return session;
		},
	},
	pages: {
		signIn: "/sign-in",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
