module.exports = async function() {
    // Importing from ESM modules into CommonJS space
    const { findAndReplace } = await import('mdast-util-find-and-replace');
    const { u } = await import ('unist-builder');
    // Constants
    const trustUsers = ['accts', 'autos', 'binmat', 'chats', 'corps', 'escrow', 'gui', 'kernel', 'market', 'scripts', 'sys', 'trust', 'users'];
    const scriptRegex = new RegExp(/\b([a-z_][a-z0-9_]{0,24})\.([a-z_][a-z0-9_]{0,24})\b/gi);
    // Return plugin callable, which accepts a (currently unused) config object
    return (config) => {
        // Replacer function
        function textToColoredSpan(text, user, script) {
            const isTrust = trustUsers.includes(user);
            return u('html',
                `<span class="inline-script"><span class="color-${isTrust ? 'trust' : 'user'}">${user}</span>` +
                '.' +
                `<span class="color-script">${script}</span></span>`
            );
        }
        // Function that acts on the AST
        return ast => {
            findAndReplace(ast, [scriptRegex, textToColoredSpan]);
            //findAndReplace(ast, [/\b([a-z_][a-z0-9_]{0,24})\.([a-z_][a-z0-9_]{0,24})\b/gi, textToColoredSpan])
        }
    }
}
