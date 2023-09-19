import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

import solidJs from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Hackmud Wiki",
			sidebar: [
				{
					label: "Scripting",
					items: [
						{
							label: `Standard Script Response`,
							link: `/scripting/standard-script-response`
						}
					]
				},
				{
					label: `Scripts`,
					items: [
						{
							label: `accts`,
							items: [
								{
									label: `balance_of_owner`,
									link: `/scripts/accts/balance_of_owner`
								},
								{
									label: `xfer_gc_to_caller`,
									link: `/scripts/accts/xfer_gc_to_caller`
								}
							]
						}
					]
				}
			],
			customCss: [ "/src/global.css" ]
		}),
		solidJs()
	]
})
