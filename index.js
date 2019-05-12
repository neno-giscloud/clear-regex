const inputWithSlashesAndFlags = /^\/([\w\W]+)\/([\w\W]+)?$/;
const wrappingWhitespace = /(?:^\s+)|(?:\s+$)|(?:[\n\r]+)/gm;

function removeWrappingWhitespace(str) {
    return str.replace(wrappingWhitespace, "");
}

function handleArrayInput(arr) {
    if (arr.length === 0) return "";

    return arr.map(removeWrappingWhitespace).join("");
}

function clearRegex(input) {
    if (!input) return new RegExp(input);

    const str = Array.isArray(input) ?
        handleArrayInput(input) :
        input;

    const slashesAndFlages = str.match(inputWithSlashesAndFlags);
    if (slashesAndFlages && slashesAndFlages.length > 1) {
        const regex = slashesAndFlages[1];
        const flags = slashesAndFlages[2] || '';

        return new RegExp(regex, flags);
    }

    return new RegExp(str);
}

module.exports = clearRegex;