// @ts-check

const GITHUB_ORG = 'DrizzlyBear'; // TODO: update when repo ownership changes
const GITHUB_PROJECT = 'hackmud_wiki';


module.exports = async function createConfigAsync() {
    /** @type {import('@docusaurus/types').Config} */
    const config = {
        /**
         * GENERAL CONFIG
         */
        // Metadata
        title: 'hackmud Wiki',
        tagline: 'Knowledgebase for the game hackmud',
        favicon: 'img/favicon.ico',

        // Deployment details
        url: `https://${GITHUB_ORG}.github.io`,
        baseUrl: `/${GITHUB_PROJECT}/`,

        // Used if deployed to GH Pages from local CLI
        organizationName: GITHUB_ORG,
        projectName: GITHUB_PROJECT,

        // Fail loudly if any links are broken
        onBrokenLinks: 'throw',
        onBrokenMarkdownLinks: 'throw',

        // Internationalization options, useful to set even if you only use one
        // because it sets the `lang` property on the `html` tag
        i18n: {
            defaultLocale: 'en',
            locales: ['en']
        },

        /**
         * INSTALLED PLUGINS
         */
        plugins: [
            [
                '@docusaurus/plugin-content-docs',
                {
                    // Path of the docs plugin relative to root. Since it's the
                    // only plugin we're using atm, put it up top
                    routeBasePath: '/',
                    // Base url for "Edit This Page" button on content pages
                    editUrl: `https://github.com/${GITHUB_ORG}/${GITHUB_PROJECT}/edit/main`, // TODO: decide whether to accept edits directly to `main` or have some staging branch
                    // Plugins for remark, at the Markdown AST level
                    remarkPlugins: [
                    ],
                    // Plugins for rehype, at the HTML AST level
                    rehypePlugins:[
                    ]
                }
            ]
        ],

        /**
         * INSTALLED THEMES
         */
        themes: [
            [
                '@docusaurus/theme-classic',
                {
                    // customCSS: require.resolve('./src/css/custom.css')
                }
            ]
        ],

        /**
         * THEME CONFIG
         */
        /**@type {import('@docusaurus/types').ThemeConfig} */
        themeConfig: {
            // Default color mode
            colorMode: {
                defaultMode: 'dark'
            },
            // Theme config specific to the docs plugin
            docs: {
                sidebar: {
                    autoCollapseCategories: true
                }
            },
            // Metadata
            /*image: path/relative/to/static/logo.png, // Image used when embedded (e.g. in a tweet)
            metadata: [{name: 'twitter:card', content:'summary'}] // Any fields normally present in <meta> tags*/
            // Navbar layout
            navbar: {
                // Top most site/"home" button and associated logo
                title: 'hackmud wiki',
                logo: {
                    alt: 'hackmud logo',
                    src: 'img/logo.png'
                }
            },
            // Footer layout
            footer: {
                // TODO: Get an ok on who to put for the copyright
                //copyright: `Copyright © ${new Date().getFullYear()} <ENTITY_NAME>.`,
                links: [ // TODO: populate with real links
                    {
                        title: 'hackmud',
                        items: [
                            {label: 'Steam', href:'#'},
                            {label: 'itch.io', href:'#'},
                        ]
                    },
                    {
                        title: 'Community',
                        items: [
                            {label: 'Discord', href:'#'}
                        ]
                    }
                ]
            }
        }
    };

    return config;
}