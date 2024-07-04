import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export function NodeDialog({
	isOpen,
	onClose,
	onInsertNode,
	onDeleteNode,
}: {
	isOpen: boolean;
	onClose: () => void;
	onInsertNode: (text: string) => void;
	onDeleteNode: () => void;
}) {
	const [value, setValue] = useState("");
	return (
		<Dialog open={isOpen}>
			<DialogContent className="max-w-2xl">
				<div className="flex">
					<div className="p-2 w-full flex flex-col justify-between">
						<div>
							<DialogHeader className="mb-2">
								<DialogTitle>Add Node</DialogTitle>
								<DialogDescription>
									Add a children node to the current node.
								</DialogDescription>
							</DialogHeader>

							<div className="w-full mb-4">
								<Input
									id="value"
									placeholder="Node value"
									className="col-span-3 w-full"
									onChange={(event) => setValue(event.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											onInsertNode(value);
										}
									}}
								/>
							</div>
						</div>
						<div className="flex md:flex-row flex-col gap-2">
							<Button
								className="w-full"
								type="submit"
								onClick={() => onInsertNode(value)}
							>
								Add
							</Button>
							<Button
								className="w-full"
								type="button"
								variant="secondary"
								onClick={onClose}
							>
								Close
							</Button>
						</div>
					</div>
					<Separator orientation="vertical" className="mx-2" />
					<div className="p-2 w-full flex flex-col justify-between">
						<DialogHeader className="mb-2">
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This will delete all the childrens of selected node.
							</DialogDescription>
						</DialogHeader>
						<Button
							className="w-full"
							type="submit"
							variant="destructive"
							onClick={() => onDeleteNode()}
						>
							Delete
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
