import mongoose from "mongoose";

type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
	//checking that is there a connection already so that our application don't get chokked
	if (connection.isConnected) {
		console.log("Already connected to database");
		return;
	}

	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`
		);

		//when get connected update the connection oject so that we can check later if we are already connected or not
		connection.isConnected = connectionInstance.connections[0].readyState;

		console.log("DB connected Successfully");
	} catch (error) {
		console.log("DB connection failed", error);
		process.exit(1);
	}
}

export default dbConnect;
