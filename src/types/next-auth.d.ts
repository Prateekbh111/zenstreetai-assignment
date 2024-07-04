import "next-auth";
import { DefaultSession } from "next-auth";
import { RawNodeDatum } from "react-d3-tree";

declare module "next-auth" {
	interface User {
		_id?: string;
		username?: string;
	}
	interface Session {
		user: {
			_id?: string;
			username?: string;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		_id?: string;
		username?: string;
	}
}
