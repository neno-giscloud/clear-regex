require('regexp-polyfill');

const inputWithSlashesAndFlags = /^\/([\w\W]+)\/([\w\W]+)?$/;
const whitespaceAndComments = /(^\s*)|(\s*(#.*)?\n)/gm;

function cleanInput(str) {
    return str.replace(whitespaceAndComments, '');
}

function isRegex(val) {
    return (Object.prototype.toString
        .call(val) === '[object RegExp]');
}

function handleArrayInput(input, params) {
    const length = input.length;

    if (length === 0) return '';

    const arr = [cleanInput(input[0])];

    for (let i = 1; i < length; i++) {
        const param = params[i - 1];

        arr.push(isRegex(param) ? param.source : param.toString());
        arr.push(cleanInput(input[i]));
    }

    return arr.join('');
}

function clearRegex(input, ...params) {
    if (!input) return new RegExp(input);

    const str = Array.isArray(input) ?
        handleArrayInput(input, params) :
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