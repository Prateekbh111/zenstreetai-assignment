import { RawNodeDatum } from "react-d3-tree";

export function insertNode(id: string, tree: RawNodeDatum, node: RawNodeDatum) {
	const queue: RawNodeDatum[] = [];

	queue.unshift(tree as RawNodeDatum);
	while (queue.length > 0) {
		const curNode: RawNodeDatum = queue.pop()!;

		if (curNode.attributes?.id === id) {
			curNode.children!.push(node);

			return { ...tree };
		}

		const len = curNode.children!.length;

		for (let i = 0; i < len; i++) {
			queue.unshift(curNode.children![i]);
		}
	}
}
