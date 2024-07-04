"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
	CustomNodeElementProps,
	RawNodeDatum,
	TreeNodeDatum,
} from "react-d3-tree";
import { v4 } from "uuid";
import { NodeDialog } from "./NodeDialog";
import { useToast } from "@/components/ui/use-toast";
import { insertNode } from "@/lib/insertNode";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { deleteNode } from "@/lib/deleteNode";
const Tree = dynamic(() => import("react-d3-tree"), {
	ssr: false,
});

export default function VisualTree() {
	const { toast } = useToast();
	const [tree, setTree] = useState<RawNodeDatum | undefined>();
	const [node, setNode] = useState<TreeNodeDatum | undefined>();
	const [isSaving, setIsSaving] = useState(false);
	const [isFetchingTree, setIsFetchingTree] = useState(false);

	async function handleSave() {
		setIsSaving(true);
		try {
			const response = await axios.post("/api/saveTree", {
				treeToBeSaved: tree,
			});
			toast({
				title: "Success",
				description: response.data.message,
			});
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;
			const errorMessage = axiosError.response?.data.message;
			toast({
				title: "Failed Saving Tree!",
				description: errorMessage,
				variant: "destructive",
			});
		} finally {
			setIsSaving(false);
		}
	}

	function handleInsertNode(nodeName: string) {
		const newTree = insertNode(node!.attributes!.id!.toString(), tree!, {
			name: nodeName,
			attributes: {
				id: v4(),
			},
			children: [],
		});

		if (newTree) {
			setTree(newTree);
		}

		setNode(undefined);
		toast({ title: "Node Created Successfully!!!" });
	}

	function handleDeleteNode() {
		if (node?.children?.length === 0) {
			toast({ title: "Node doesn't have any children to delete!!!" });
			return;
		}
		const newTree = deleteNode(node!.attributes!.id!.toString(), tree!);

		if (newTree) {
			setTree(newTree);
		}

		setNode(undefined);
		toast({ title: "Node Deleted Successfully!!!" });
	}

	function renderNodes(customProps: CustomNodeElementProps) {
		const { nodeDatum } = customProps;

		return (
			<g className="dark:stroke-white">
				<circle
					r="20"
					onClick={() => setNode(nodeDatum)}
					className=" fill-neutral-900 dark:fill-white"
				/>
				<text
					className="fill-neutral-900 dark:fill-white dark:stroke-white"
					strokeWidth="0.5"
					x="-10"
					y="-30"
				>
					{nodeDatum.name}
				</text>
			</g>
		);
	}

	useEffect(() => {
		async function fetchUserTree() {
			setIsFetchingTree(true);
			try {
				const response = await axios.get("/api/getTree");
				setTree(response.data.tree);

				toast({
					title: "Success",
					description: response.data.message,
				});
			} catch (error) {
				const axiosError = error as AxiosError<ApiResponse>;
				const errorMessage = axiosError.response?.data.message;
				toast({
					title: errorMessage,
					variant: "destructive",
				});
			} finally {
				setIsFetchingTree(false);
			}
		}

		fetchUserTree();
	}, []);

	return (
		<div className=" w-full h-[88%]">
			{!tree ? (
				<div className="flex items-center justify-center h-full">
					<h1>Fetching Tree...</h1>
				</div>
			) : (
				<>
					<Tree
						data={tree!}
						translate={{
							x: 200,
							y: 200,
						}}
						renderCustomNodeElement={(nodeInfo) => renderNodes(nodeInfo)}
					/>
					<NodeDialog
						isOpen={Boolean(node)}
						onInsertNode={handleInsertNode}
						onDeleteNode={handleDeleteNode}
						onClose={() => setNode(undefined)}
					/>
					<Button
						className="fixed left-10 bottom-10"
						onClick={handleSave}
						disabled={isSaving}
					>
						{isSaving ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
							</>
						) : (
							"Save"
						)}
					</Button>
				</>
			)}
		</div>
	);
}
