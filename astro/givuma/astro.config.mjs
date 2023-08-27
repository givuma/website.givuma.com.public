import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import { SITE_URL, SITE_PORT } from "./src/config.js";

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	base: "/",
	trailingSlash: "never",
	output: "static",
	outDir: "./build",
	vite: {
		resolve: {
			alias: {
				"~": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			watch: {
				ignored: [
					"/dist/**",
					"/build/**",
					"/node_modules/**",
					"/.astro/**",
					"astro.log",
				],
			},
		},
		build: {
			rollupOptions: {
				output: {
					entryFileNames: "main.[hash].js",
					chunkFileNames: "chunks/chunk.[hash].js",
					assetFileNames: "assets/asset.[hash][extname]",
				},
			},
		},
	},
	server: {
		port: SITE_PORT,
	},
	build: {
		format: "file",
		assets: "assets",
	},
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: true,
			},
		}),
		sitemap(),
		mdx(),
	],
});
