import { RawNodeDatum } from "react-d3-tree";

export function insertNode(id: string, tree: RawNodeDatum, node: RawNodeDatum) {
	const queue: RawNodeDatum[] = [];

	//putting our tree in array
	queue.unshift(tree as RawNodeDatum);
	while (queue.length > 0) {
		//get front element of the queue
		const curNode: RawNodeDatum = queue.pop()!;

		//checking the front element is the one whose children has to be deleted
		if (curNode.attributes?.id === id) {
			//pushing node to its children
			curNode.children!.push(node);

			return { ...tree };
		}

		const len = curNode.children!.length;
		//putting all children of the first element in arra
		for (let i = 0; i < len; i++) {
			queue.unshift(curNode.children![i]);
		}
	}
}
