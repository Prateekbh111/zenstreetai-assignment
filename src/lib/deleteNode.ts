import { RawNodeDatum } from "react-d3-tree";

//function to delete all children of node with given id
export function deleteNode(id: string, tree: RawNodeDatum) {
	const queue: RawNodeDatum[] = [];

	//putting our tree in array
	queue.unshift(tree as RawNodeDatum);
	while (queue.length > 0) {
		//get front element of the queue
		const curNode: RawNodeDatum = queue.pop()!;

		//checking the front element is the one whose children has to be deleted
		if (curNode.attributes?.id === id) {
			//delete all children
			while (curNode.children!.length > 0) {
				curNode.children!.pop();
			}

			return { ...tree };
		}

		const len = curNode.children!.length;
		//putting all children of the first element in array
		for (let i = 0; i < len; i++) {
			queue.unshift(curNode.children![i]);
		}
	}
}
