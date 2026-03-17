import { type CollectionEntry, getCollection } from "astro:content";

export async function getAllTil(): Promise<CollectionEntry<"til">[]> {
	return await getCollection("til");
}

export function getAllTilTags(tils: CollectionEntry<"til">[]) {
	return tils.flatMap((til) => [...(til.data.tags || [])]);
}

export function getUniqueTilTags(tils: CollectionEntry<"til">[]) {
	return [...new Set(getAllTilTags(tils))];
}

export function getUniqueTilTagsWithCount(tils: CollectionEntry<"til">[]): [string, number][] {
	return [
		...getAllTilTags(tils).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
