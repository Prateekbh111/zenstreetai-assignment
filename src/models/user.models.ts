import mongoose, { Schema } from "mongoose";
import { RawNodeDatum } from "react-d3-tree";

//extending interface such that we can get suggestions in vscode
export interface User extends Document {
	username: string;
	password: string;
	tree: RawNodeDatum | RawNodeDatum[];
}

//defining user schema
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

//create usermodel using above defined schema
const UserModel =
	(mongoose.models.User as mongoose.Model<User>) ||
	mongoose.model<User>("User", userSchema);

export default UserModel;
