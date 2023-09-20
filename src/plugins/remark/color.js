module.exports = async function() {
    // Importing from ESM modules into CommonJS space
    const { findAndReplace } = await import('mdast-util-find-and-replace');
    const { u } = await import ('unist-builder');

    // Constants
    const trustUsers = ['accts', 'autos', 'binmat', 'chats', 'corps', 'escrow', 'gui', 'kernel', 'market', 'scripts', 'sys', 'trust', 'users'];

    // Matches {{ <content> }}
    const autocolorRegex = /\{\{(.*?)\}\}/g;

    // Matches <user>.<script> *except* when preceeded by a #
    // This is so that in #s.<user>.<script>, the s.<user> portion won't be colored
    const scriptRegex = /\b(?<!#)([a-z_][a-z0-9_]{0,24})\.([a-z_][a-z0-9_]{0,24})\b/gi;

    // Matches ~<one character long color tag><content>~
    const colorTagRegex = /~([0-9a-zA-z])(.+?)~/g;

    // Matches <key>: <value> with an arbitrary amount of spaces around the :

    // Key can either be a word like some_parameter:
    // or a quoted string like "this is multiple words":

    // Values can be strings, numbers, null, true, false, or scriptors
    // This will also match <key>: { or <key>: [ but will NOT include the { or [ in the match to be colorized
    const kvpRegex = /(\w+|".*?")[ ]*:[ ]*(?:(".*?"|\d+(?:\.\d*)?|null|true|false|#s\.\w+\.\w+)|(?=\{|\[))/g;

    // Matches GC strings, e.g. 1Q1T1B1M1K1GC
    // Explicitly does NOT match the text GC on its own

    // Notably, this only matches uppercase GC strings currently
    // This can be changed by adding an i to the regex flags, but lowercase strings will still be converted to uppercase when colorized
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
        const out = [];

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

        out.push(`<span class="color-gc-end">GC</span>`);

        return out.join("");
    }

    function colorizeContent(_fullMatch, content) {
        const passes = [
            // Note that the order of replacements here is important, and shuffling it may cause breakage

            {regex: colorTagRegex, replacer: colorTagReplacer},
            {regex: kvpRegex, replacer: kvpReplacer},
            {regex: scriptRegex, replacer: scriptColoring},
            {regex: gcRegex, replacer: gcReplacer},
        ];

        for (const {regex, replacer} of passes) {
            content = content.replace(regex, replacer);
        }

        // As far as the author knows, the content of an mdast html node must be contained within a single root html tag
        // We wrap the content in an unstyled span tag so that this requirement is met
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
