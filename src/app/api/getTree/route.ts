import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import UserModel from "@/models/user.models";

export async function GET() {
	await dbConnect();

	try {
		const session = await getServerSession(authOptions);
		const userId = new mongoose.Types.ObjectId(String(session?.user._id));

		const user = await UserModel.findById(userId);
		console.log(user?.tree);
		return Response.json(
			{
				success: true,
				message: "Tree fetched successfully!",
				tree: user?.tree,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error Fetching Tree", error);
		return Response.json(
			{
				success: false,
				message: "Error Fetching Tree",
			},
			{ status: 500 }
		);
	}
}
