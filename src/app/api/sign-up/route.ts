import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	await dbConnect();

	try {
		//getting params from request
		const { username, password, confirmPassword } = await request.json();

		const existingUserWithUserName = await UserModel.findOne({
			username,
		});

		//checking if user already exist in database
		if (existingUserWithUserName) {
			return Response.json(
				{
					success: false,
					message: "Username is already taken",
				},
				{ status: 400 }
			);
		}

		//checking if password and confirm password are same or not
		if (password != confirmPassword) {
			return Response.json(
				{
					success: false,
					message: "Both password must be same",
				},
				{ status: 400 }
			);
		}

		//hashing the password
		const hashedPassword = await bcrypt.hash(password, 10);

		//create new user with a dummy tree
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

		//save created user to database
		await newUser.save();

		//sending success response
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
