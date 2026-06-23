import { execFileSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const gitUpdatedDateCache = new Map<string, Date | undefined>();

interface CommitInfo {
	hash: string;
	date: Date;
}

function getGitCommits(relativePath: string): CommitInfo[] {
	const output = execFileSync(
		"git",
		["log", "--format=%H %aI", "--diff-filter=ACDMR", "--follow", "--", relativePath],
		{
			cwd: process.cwd(),
			encoding: "utf-8",
			timeout: 5000,
		},
	).trim();

	if (!output) return [];

	return output
		.split("\n")
		.map((line) => {
			const [hash = "", ...dateParts] = line.split(" ");
			if (!hash) return null;
			return { hash, date: new Date(dateParts.join(" ")) };
		})
		.filter((c): c is CommitInfo => c !== null);
}

function stripFrontmatterAndNormalize(content: string): string {
	let body = content;
	const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
	if (match) {
		body = match[1];
	}
	return body.replace(/\s+/g, " ").trim();
}

function isMeaningfulUpdate(commitHash: string, relativePath: string): boolean {
	try {
		const contentCurrent = execFileSync("git", ["show", `${commitHash}:${relativePath}`], {
			cwd: process.cwd(),
			encoding: "utf-8",
			timeout: 5000,
		});

		const contentParent = execFileSync("git", ["show", `${commitHash}^:${relativePath}`], {
			cwd: process.cwd(),
			encoding: "utf-8",
			timeout: 5000,
		});

		const bodyCurrent = stripFrontmatterAndNormalize(contentCurrent);
		const bodyParent = stripFrontmatterAndNormalize(contentParent);

		return bodyCurrent !== bodyParent;
	} catch {
		return true;
	}
}

export function getGitUpdatedDate(postId: string) {
	if (gitUpdatedDateCache.has(postId)) {
		return gitUpdatedDateCache.get(postId);
	}

	try {
		let relativePath = path.join("src", "content", "post", postId);
		if (!fs.existsSync(relativePath)) {
			if (fs.existsSync(relativePath + ".md")) {
				relativePath += ".md";
			} else if (fs.existsSync(relativePath + ".mdx")) {
				relativePath += ".mdx";
			} else if (relativePath.endsWith("/index")) {
				const folderPath = relativePath.slice(0, -6);
				if (fs.existsSync(folderPath)) {
					if (fs.existsSync(path.join(folderPath, "index.md"))) {
						relativePath = path.join(folderPath, "index.md");
					} else if (fs.existsSync(path.join(folderPath, "index.mdx"))) {
						relativePath = path.join(folderPath, "index.mdx");
					} else {
						relativePath = folderPath;
					}
				}
			}
		}
		const commits = getGitCommits(relativePath);

		if (commits.length <= 1) {
			gitUpdatedDateCache.set(postId, undefined);
			return undefined;
		}

		// Git returns newest first; exclude the oldest commit because it is creation/migration.
		for (const commit of commits.slice(0, -1)) {
			if (isMeaningfulUpdate(commit.hash, relativePath)) {
				gitUpdatedDateCache.set(postId, commit.date);
				return commit.date;
			}
		}

		gitUpdatedDateCache.set(postId, undefined);
		return undefined;
	} catch {
		gitUpdatedDateCache.set(postId, undefined);
		return undefined;
	}
}
