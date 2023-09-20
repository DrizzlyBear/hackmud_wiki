const fs = require('fs');
const { globSync } = require('glob');
const matter = require('gray-matter');

// Separated into a function in case there ends up being more
// normalization to perform (e.g. swapping out accented characters)
function normalizeId(s) {
    return s.toLowerCase();
}

function genLinks() {
    const validPaths = [];
    const idToPath = {};

    const allMdx = globSync('./docs/**/*.mdx');

    for(path of allMdx) {
        const file = fs.readFileSync(path, {encoding: 'utf8'});
        const frontmatter = matter(file).data;

        // Get either the manually-specified slug or the file path from the docs folder, ignoring file extension
        // and considering the index file as belonging to the parent directory (e.g. /locks/index.mdx -> /locks)
        const linkPath = frontmatter.slug || path.slice(4).replace('.mdx', '').replace(/index$/, '');
        validPaths.push(linkPath);

        // Get the word or list of words that should be associated with the above path, case insensitive
        // e.g. EZ_21 -> /locks/t1/ez_21
        // Prefer those explicitly specified in the frontmatter, fallback to the title of the page, and worst
        // case use the filename
        const linkWords = frontmatter.wikilink || frontmatter.title || path.split('/').pop().replace('.mdx', '');
        if(typeof linkWords === 'object') {
            // Happens when `frontmatter.wikilink` is an array of words that should link to the same article
            for(let word of linkWords) {
                const normalized = normalizeId(word);
                if(normalized in idToPath) idToPath[normalized].push(linkPath); // This word maps to multiple valid pages, and additional functionality may later disambiguate
                else idToPath[normalized] = [linkWords];
            }
        }
        else {
            // Single word, either `frontmatter.wikilink` wasn't an array or we fell back to one of the other options
            const normalized = normalizeId(linkWords);
            if(normalized in idToPath) idToPath[normalized].push(linkWords); // See above for multiple mappings
            else idToPath[normalized] = [linkPath];
        }
        return {validPaths, idToPath};
    }
}

module.exports = { normalizeId, genLinks };