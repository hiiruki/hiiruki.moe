declare module "@pagefind/default-ui" {
	export class PagefindUI {
		constructor(arg: unknown);
	}
}

declare module "*.ttf" {
	const content: number[];
	export default content;
}

declare module "*.woff" {
	const content: number[];
	export default content;
}

declare module "@resvg/resvg-js" {
	export class Resvg {
		constructor(svg: string, options?: any);
		render(): {
			asPng(): Uint8Array | Buffer;
		};
	}
}

declare module "astro" {
	export type APIContext = any;
	export type InferGetStaticPropsType<T> = any;
}

declare module "satori" {
	const satori: any;
	export default satori;
	export type SatoriOptions = any;
}

declare module "satori-html" {
	export function html(strings: TemplateStringsArray, ...values: any[]): any;
}

declare module "node:fs" {
	export function readFileSync(path: string, encoding: "utf-8"): string;
}

declare module "node:path" {
	export function join(...paths: string[]): string;
}

declare var process: {
	cwd(): string;
	env: Record<string, string>;
};

interface Buffer extends Uint8Array {}

declare var Buffer: {
	from(data: any, encoding?: string): any;
};
