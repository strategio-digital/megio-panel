type CharTable = { [key: string]: string };

const charTable: CharTable = {
    \u00e1: 'a',
    \u00e4: 'a',
    \u010d: 'c',
    \u010f: 'd',
    \u00e9: 'e',
    \u011b: 'e',
    \u00ed: 'i',
    \u013e: 'l',
    \u0148: 'n',
    \u00f3: 'o',
    \u00f4: 'o',
    \u0159: 'r',
    \u0161: 's',
    \u0165: 't',
    \u00fa: 'u',
    \u016f: 'u',
    \u00fd: 'y',
    \u017e: 'z'
};


export const makeSlug = (value: string) => {
    value = value.toLowerCase();
    let result = '';

    for (let i = 0; i < value.length; i++) {
        const ch = charTable[value.charAt(i)];
        result += ch ? ch : value.charAt(i);
    }

    return result.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}