module.exports = async function() {
    // Importing from ESM modules into CommonJS space
    const { findAndReplace } = await import('mdast-util-find-and-replace');
    const { u } = await import ('unist-builder');

    // Constants
    const trustUsers = ['accts', 'autos', 'binmat', 'chats', 'corps', 'escrow', 'gui', 'kernel', 'market', 'scripts', 'sys', 'trust', 'users'];
    const autocolorRegex = /\{\{(.*?)\}\}/g;
    const scriptRegex = /\b(?<!#)([a-z_][a-z0-9_]{0,24})\.([a-z_][a-z0-9_]{0,24})\b/gi;
    const colorTagRegex = /~([0-9a-zA-z])(.+?)~/g;
    const kvpRegex = /(\w+)[ ]*:[ ]*(?:(".*?"|\d+(?:\.\d*)?|null|true|false|#s\.\w+\.\w+)|(?=\{|\[))/g;
    const gcRegex = /(?=\d)(?:(\d+)Q)?(?:(\d{1,3})T)?(?:(\d{1,3})B)?(?:(\d{1,3})M)?(?:(\d{1,3})K)?(\d{1,3})?GC/g;

    // Replacer functions

    function scriptColoring(_fullMatch, user, script) {
        const isTrust = trustUsers.includes(user);
        return `<span class="color-${isTrust ? 'trust' : 'user'}">${user}</span>` +
            '.' +
            `<span class="color-script">${script}</span>`;
    }

    function colorTagReplacer(_fullMatch, tag, inner) {
        return `<span class="color-tag" tag="${tag}">${inner}</span>`;
    }

    function kvpReplacer(_fullMatch, key, value) {
        if (!value) {
            return `<span class="color-key">${key}</span>: `;
        } else {
            return `<span class="color-key">${key}</span>: <span class="color-value">${value}</span>`;
        }
    }

    function gcReplacer(_fullMatch, q, t, b, m, k, units) {
        const out = []

        const letters_and_values = [
            ["q", q],
            ["t", t],
            ["b", b],
            ["m", m],
            ["k", k],
        ];

        for (const [letter, value] of letters_and_values) {
            if (value) {
                out.push(`<span class="color-gc-text">${value}</span><span class="color-gc-${letter}">${letter.toUpperCase()}</span>`);
            }
        }

        if (units) {
            out.push(`<span class="color-gc-text">${units}</span>`);
        }

        out.push(`<span class="color-gc-end">GC</span>`)

        return out.join("")
    }

    function colorizeContent(_fullMatch, content) {
        const passes = [
            {regex: colorTagRegex, replacer: colorTagReplacer},
            {regex: kvpRegex, replacer: kvpReplacer},
            {regex: scriptRegex, replacer: scriptColoring},
            {regex: gcRegex, replacer: gcReplacer},
        ];

        for (const {regex, replacer} of passes) {
            content = content.replace(regex, replacer);
        }

        return u("html", `<span>${content}</span>`);
    }

    // Return plugin callable, which accepts a (currently unused) config object
    return (_config) => {
        // Function that acts on the AST
        return ast => {
            findAndReplace(ast, [autocolorRegex, colorizeContent]);
        }
    }
}
