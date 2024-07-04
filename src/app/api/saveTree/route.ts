import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
	await dbConnect();

	try {
		const { treeToBeSaved } = await req.json();
		const session = await getServerSession(authOptions);
		const userId = new mongoose.Types.ObjectId(String(session?.user._id));

		const updatedUserWithTree = await UserModel.findByIdAndUpdate(userId, {
			tree: treeToBeSaved,
		});

		if (!updatedUserWithTree) {
			return Response.json(
				{
					success: false,
					message: "Failed to update your tree",
				},
				{ status: 401 }
			);
		}

		return Response.json(
			{
				success: true,
				message: "User Tree Saved Successfully!",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error Saving Tree", error);
		return Response.json(
			{
				success: false,
				message: "Error Saving Tree",
			},
			{ status: 500 }
		);
	}
}
