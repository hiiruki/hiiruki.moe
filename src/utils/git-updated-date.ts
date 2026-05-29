import { execFileSync } from "node:child_process";
import path from "node:path";

const gitUpdatedDateCache = new Map<string, Date | undefined>();

function getGitTimestamp(relativePath: string) {
	return execFileSync("git", ["log", "-1", "--format=%aI", "--", relativePath], {
		cwd: process.cwd(),
		encoding: "utf-8",
		timeout: 5000,
	}).trim();
}

export function getGitUpdatedDate(postId: string) {
	if (gitUpdatedDateCache.has(postId)) {
		return gitUpdatedDateCache.get(postId);
	}

	try {
		const relativePath = path.join("src", "content", "post", postId);
		const timestamp = getGitTimestamp(relativePath);
		const date = timestamp ? new Date(timestamp) : undefined;

		gitUpdatedDateCache.set(postId, date);
		return date;
	} catch {
		gitUpdatedDateCache.set(postId, undefined);
		return undefined;
	}
}
