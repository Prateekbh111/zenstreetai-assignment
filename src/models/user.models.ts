import mongoose, { Schema } from "mongoose";
import { RawNodeDatum } from "react-d3-tree";
import { object } from "zod";

export interface User extends Document {
	username: string;
	password: string;
	tree: RawNodeDatum | RawNodeDatum[];
}

const userSchema: Schema<User> = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	tree: {
		type: Schema.Types.Mixed,
		required: true,
	},
});

const UserModel =
	(mongoose.models.User as mongoose.Model<User>) ||
	mongoose.model<User>("User", userSchema);

export default UserModel;
