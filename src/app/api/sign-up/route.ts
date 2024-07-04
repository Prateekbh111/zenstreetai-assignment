import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const { username, password, confirmPassword } = await request.json();
		const existingUserWithUserName = await UserModel.findOne({
			username,
		});

		if (existingUserWithUserName) {
			return Response.json(
				{
					success: false,
					message: "Username is already taken",
				},
				{ status: 400 }
			);
		}

		if (password != confirmPassword) {
			return Response.json(
				{
					success: false,
					message: "Both password must be same",
				},
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new UserModel({
			username,
			password: hashedPassword,
			tree: {
				name: "1",
				attributes: {
					id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f",
				},
				children: [
					{
						name: "2",
						attributes: {
							id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f2",
						},
						children: [],
					},
					{
						name: "3",
						attributes: {
							id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f3",
						},
						children: [],
					},
				],
			},
		});

		await newUser.save();

		return Response.json(
			{
				success: true,
				message: "User registered successfully!",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error registering user", error);
		return Response.json(
			{
				success: false,
				message: "Error registering user",
			},
			{ status: 500 }
		);
	}
}
