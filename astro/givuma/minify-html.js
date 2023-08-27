import fs from "node:fs";
import { glob } from "glob";
import minifyHtml from "@minify-html/node";

const files = await glob("./build/**/*.html", {
	ignore: "node_modules/**",
	signal: AbortSignal.timeout(60 * 1000 * 5),
});

for (const file of files) {
	const content = await fs.promises.readFile(file);
	const minified = minifyHtml.minify(content, {
		do_not_minify_doctype: true,
		ensure_spec_compliant_unquoted_attribute_values: true,
		keep_spaces_between_attributes: true,
		keep_html_and_head_opening_tags: true,
		keep_closing_tags: true,
	});
	await fs.promises.writeFile(file, minified);
}
