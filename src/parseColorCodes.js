export function parseColorCodes(text) {
	let startIndex = 0
	let endIndex = 0
	const tokens = []

	while (endIndex < text.length) {
		if (eat("`")) {
			let color

			for (const char of "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") {
				if (eat(char)) {
					color = char
					break
				}
			}

			if (color) {
				if (startIndex != endIndex - 2) {
					tokens.push({ text: text.slice(startIndex, endIndex - 2) })
					startIndex = endIndex - 2
				}

				while (!eat("`"))
					endIndex++

				tokens.push({ color, text: text.slice(startIndex + 2, endIndex - 1) })
				startIndex = endIndex
			}
		} else
			endIndex++
	}

	if (startIndex != text.length)
		tokens.push({ text: text.slice(startIndex) })

	return tokens

	function eat(chars) {
		if (endIndex + chars.length > text.length)
			throw Error("Unexpected end of input")

		if (text.slice(endIndex, endIndex + chars.length) == chars) {
			endIndex += chars.length
			return true
		}

		return false
	}
}
