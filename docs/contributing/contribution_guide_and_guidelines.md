---
title: Contribution Guide & Guidelines
linkmdname: contribution_guide
linkdisplayname: Contribution Guide
---

# Getting Started

To submit changes to this wiki, you should make a pull request to the [hackmud_wiki](https://github.com/DrizzlyBear/hackmud_wiki) repository. First fork the repository, make changes either directly through github on your forked version or locally, then submit a new pull request to contribute back your changes.

If you need any help at all, please file an issue on the github repository, or ask a helperbot/moderator in the discord.

## Project Structure

Article content should be posted within the `/wiki/` folder within the repository and images should be posted within the `/assets/images/` folder. Keep pages within their respective folders - for instance, locks should go in `/wiki/locks/`.

### Front Matter

Each page on the wiki begins with some content (called the front matter) enclosed within two `---` markers, for example:

```
---
title: Your Page Title
categories: somecategory (e.g. locks)
linkmdname: somename
linkdisplayname: shortname
tags: [locks, tier_1]
---
```

This should contain `title: <article title>`, `linkmdname: <name used within markdown to link to this article>`, and `linkdisplayname: <name displayed when someone links to this article>`, at a minimum. `linkmdname` _should_ match the filename of the article, but may be shortened for convenience or for disambiguation purposes. Similarly, `linkdisplayname` should match the title of the article, but may also be shortened for convenience. Pages must have unique `linkmdname`s, so be mindful of that.

### Tags

Each article can be assigned an array of two tags within the front matter: the first tag will determine which table of related articles will be linked in the "See Also:" footer, and the second tag will determine which column this article will appear in. For instance, if you were to put `tags: [locks, tier_1]` in the front matter of the ez_21 article, a table of all other locks would appear in the footer of that article, and the ez_21 article would appear within the tier_1 column of all other article's locks table. If you omit the second tag (e.g. `tags: [locks]`), a table of all locks will appear without adding the current article to a column.

## Plugins

We have plugins to link to both article pages and images. In order to link to a page, you should use the syntax \[\[linkmdname\]\]. In order to link to an image, use the syntax !\[\[image_path\]\]. This image path is interpreted relative to `/assets/images`, so for instance, !\[\[hackmud.png\]\] will link to `/assets/images/hackmud.png` within the repository, and similarly !\[\[locks/ez_21.png\]\] will link to `/assets/imags/locks/ez_21.png`. In general, we want to avoid any future potential breakages related to moving pages around, which is why these plugins operate like this.

### Table of Contents

Each page should have a table of contents automatically generated by a plugin from the markdown headers written in the article text. If your page has a table of contents and it should not, add `toc: false` within the front matter.

# Guidelines

## Content

Spoilers are allowed on this wiki: if someone chooses to seek out spoilers for game mechanics, that is their own choice. The wiki should work for ~95% of usecases. For instance, with locks, there should be enough detail to comfortably solve or write a solver for the lock given the information on the pages. Extraneous detail or trivia should in general be left out. A good rule of thumb is if it is something you would bring up while giving a solid explanation of the mechanic, it belongs on the wiki.

Writing should be relatively professional: use of abbreviations or contractions such as "isn't" or "don't" is discouraged.

## Style

### Casing and Conventions

When adding files or folders, use lowercase path names, and replace spaces with underscores. However, article titles and heading names should be capitalized as if they were book titles. The names of locks should reflect the name of the _item_ within the game - in particular, "ez_21" should always be preferred to "Ez_21" or "EZ_21", including at the start of a sentence or within a title. The name hackmud should always be in all lowercase within article content, with no spaces between the letters. "hackmud" is preferred to "h a c k m u d" or "ｈａｃｋｍｕｄ" for consistency and ease of writing. However, it is acceptable to stylize it as "ｈａｃｋｍｕｄ" in places where it appears prominently: for instance, as the title for the hackmud page, in the wiki name, or in the text that appears at the bottom of all pages.

### Contributing Markdown & Code

In terms of the _raw_ markdown content of articles: paragraphs should be on a single line in markdown; it is expected that contributors will turn on line wrap in their editors. If you contribute to code within the repository, you should be using spaces instead of tabs, and should be using Unix line endings ("\\n").
