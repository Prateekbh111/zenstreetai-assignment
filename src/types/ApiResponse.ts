import { RawNodeDatum } from "react-d3-tree";

export interface ApiResponse {
	success: boolean;
	message: string;
	tree?: RawNodeDatum;
}
