import type { Config } from "tailwindcss";

export default {
	plugins: [require("@tailwindcss/typography")],
	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						a: {
							textUnderlineOffset: "2px",
							"&:hover": {
								"@media (hover: hover)": {
									textDecorationColor: "var(--color-link)",
									textDecorationThickness: "2px",
								},
							},
						},
						'a[target="_blank"]:not([data-fslightbox="gallery"])::after': {
							content: '""',
							display: "inline-block",
							width: "0.8em",
							height: "0.8em",
							mask: "url('data:image/svg+xml;utf8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22currentColor%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20d=%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%3E%3C/path%3E%3Cpolyline%20points=%2215%203%2021%203%2021%209%22%3E%3C/polyline%3E%3Cline%20x1=%2210%22%20y1=%2214%22%20x2=%2221%22%20y2=%223%22%3E%3C/line%3E%3C/svg%3E') center / contain no-repeat",
							WebkitMask: "url('data:image/svg+xml;utf8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22currentColor%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20d=%22M18%2013v6a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8a2%202%200%200%201%202-2h6%22%3E%3C/path%3E%3Cpolyline%20points=%2215%203%2021%203%2021%209%22%3E%3C/polyline%3E%3Cline%20x1=%2210%22%20y1=%2214%22%20x2=%2221%22%20y2=%223%22%3E%3C/line%3E%3C/svg%3E') center / contain no-repeat",
							backgroundColor: "currentColor",
							marginLeft: "0.25rem",
							verticalAlign: "middle",
						},
						blockquote: {
							borderLeftWidth: "0",
						},
						code: {
							border: "1px solid rgba(128, 128, 128, 0.2)",
							borderRadius: "4px",
							backgroundColor: "rgba(128, 128, 128, 0.1)",
							padding: "0.2em 0.4em",
							fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
						},
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
						kbd: {
							position: "relative",
							overflow: "visible",
							backgroundColor: "#f8f9fa",
							border: "1px solid #ced4da",
							borderBottomColor: "#adb5bd",
							borderBottomWidth: "3px",
							borderRadius: "0.25rem",
							boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
							color: "#495057",
							fontFamily: "inherit",
							fontSize: "0.85em",
							fontWeight: "600",
							padding: "0.15rem 0.4rem",
							cursor: "default",
							transition: "all 0.1s ease-in-out",
							"&:active": {
								transform: "translateY(2px)",
								borderBottomWidth: "1px",
								boxShadow: "none",
								marginBottom: "2px",
							},
							"&:where([data-theme='dark'], [data-theme='dark'] *)": {
								backgroundColor: "#343a40",
								border: "1px solid #495057",
								borderBottomColor: "#212529",
								borderBottomWidth: "3px",
								boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
								color: "#f8f9fa",
							},
							"&:where([data-theme='dark'], [data-theme='dark'] *):active": {
								borderBottomWidth: "1px",
								marginBottom: "2px",
							},
						},
						hr: {
							borderTopStyle: "dashed",
						},
						strong: {
							fontWeight: "700",
						},
						sup: {
							marginInlineStart: "calc(var(--spacing) * 0.5)",
							a: {
								"&:after": {
									content: "']'",
								},
								"&:before": {
									content: "'['",
								},
								"&:hover": {
									"@media (hover: hover)": {
										color: "var(--color-link)",
									},
								},
							},
						},
						/* Table */
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px dashed #666",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							borderBottom: "1px dashed #666",
							fontWeight: "700",
						},
						'th[align="center"], td[align="center"]': {
							"text-align": "center",
						},
						'th[align="right"], td[align="right"]': {
							"text-align": "right",
						},
						'th[align="left"], td[align="left"]': {
							"text-align": "left",
						},
						".expressive-code, .admonition, .github-card": {
							marginTop: "calc(var(--spacing)*4)",
							marginBottom: "calc(var(--spacing)*4)",
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: "var(--text-sm)",
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
} satisfies Config;
