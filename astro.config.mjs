import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import relativeLinks from "astro-relative-links"
import htmlMinify from "@frontendista/astro-html-minify"

// https://astro.build/config
export default defineConfig({
	integrations: [
		relativeLinks(),
		htmlMinify({
			html: {
				processConditionalComments: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true,
				removeTagWhitespace: true,
				sortClassName: true,
				useShortDoctype: true,
				preserveLineBreaks: false,
				conservativeCollapse: false,
				collapseInlineTagWhitespace: false
			}
		}),
		starlight({
			title: "Hackmud Wiki",
			sidebar: [
				{
					label: "Scripts",
					items: [
						{
							label: "accts",
							items: [
								{
									label: "balance_of_owner",
									link: "/scripts/accts/balance_of_owner"
								},
								{
									label: "xfer_gc_to_caller",
									link: "/scripts/accts/xfer_gc_to_caller"
								}
							]
						},
						{
							label: "chats",
							items: [
								{
									label: "chats.create",
									link: "/scripts/chats/create"
								}
							]
						},
						{
							label: "bbs.read",
							link: "/scripts/bbs/read"
						}
					]
				},
				{
					label: "Conventions",
					autogenerate: { directory: "conventions" }
				}
			],
			customCss: [ "/src/global.css" ]
		})
	]
})
