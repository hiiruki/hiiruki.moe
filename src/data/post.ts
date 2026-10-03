import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft posts based on the environment */
export async function getAllPosts(): Promise<CollectionEntry<"post">[]> {
	return await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** returns the previous (older) and next (newer) post relative to the given post id */
export async function getAdjacentPosts(currentId: string) {
	const posts = (await getAllPosts()).sort(
		(a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
	);
	const index = posts.findIndex((p) => p.id === currentId);
	if (index === -1) return { newer: undefined, older: undefined };
	return {
		newer: index > 0 ? posts[index - 1] : undefined,
		older: index < posts.length - 1 ? posts[index + 1] : undefined,
	};
}

/** returns posts most related to the given post, ranked by shared tag count then recency */
export async function getRelatedPosts(
	current: CollectionEntry<"post">,
	limit = 3,
): Promise<CollectionEntry<"post">[]> {
	const posts = await getAllPosts();
	const currentTags = new Set(current.data.tags);
	return posts
		.filter((p) => p.id !== current.id)
		.map((p) => ({
			post: p,
			shared: p.data.tags.filter((t) => currentTags.has(t)).length,
		}))
		.sort((a, b) => {
			if (b.shared !== a.shared) return b.shared - a.shared;
			return b.post.data.publishDate.getTime() - a.post.data.publishDate.getTime();
		})
		.slice(0, limit)
		.map((entry) => entry.post);
}

/** Get tag metadata by tag name */
export async function getTagMeta(tag: string): Promise<CollectionEntry<"tag"> | undefined> {
	const tagEntries = await getCollection("tag", (entry) => {
		return entry.id === tag;
	});
	return tagEntries[0];
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"post">[]) {
	return posts.reduce((acc, post) => {
		const year = post.data.publishDate.getFullYear().toString();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(post);
		return acc;
	}, {} as Record<string, CollectionEntry<"post">[]>);
}

/** groups posts by year then by month (0-indexed month key), using year/month as keys
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYearAndMonth(posts: CollectionEntry<"post">[]) {
	return posts.reduce(
		(acc, post) => {
			const date = post.data.publishDate;
			const year = date.getFullYear().toString();
			const month = date.getMonth().toString();
			acc[year] ??= {};
			acc[year][month] ??= [];
			acc[year][month].push(post);
			return acc;
		},
		{} as Record<string, Record<string, CollectionEntry<"post">[]>>,
	);
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(posts: CollectionEntry<"post">[]) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts: CollectionEntry<"post">[]) {
	return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[]): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
