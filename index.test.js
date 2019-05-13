const crx = require('./index.js');

expect.extend({
    toMatchRegex(a, b) {
        const sourcesMatch = a.source === b.source;
        const flagsMatch = a.flags === b.flags;
        const pass = sourcesMatch && flagsMatch;

        return {
            pass,
            message: pass ?
                () => `Didn't expect: ${a.toString()}\nReceived: ${b.toString()}` :
                () => `Expected: ${a.toString()}\nReceived: ${b.toString()}`
        };
    }
});

test('handle undefined', () => {
    expect(crx())
        .toMatchRegex(new RegExp());
});

test('handle null', () => {
    expect(crx(null))
        .toMatchRegex(new RegExp(null));
});

test('handle simple regex as string', () => {
    expect(crx('^yaba(daba)+do+$'))
        .toMatchRegex(new RegExp('^yaba(daba)+do+$'));
});

test('handle regex with flags', () => {
    expect(crx('/[123]+/gmi'))
        .toMatchRegex(new RegExp('[123]+', 'gmi'));
});

test('handle multiline input', () => {
    expect(crx`
        1
        2
        3
    `)
        .toMatchRegex(new RegExp('123'));
});

test('handle comments', () => {
    expect(crx`
        1   # this is the first part
        2   # this is the second
        3   # the end
    `).toMatchRegex(new RegExp('123'));
});

test('handle multiline with comments and flags', () => {
    expect(crx`/
        1   # this is the first part
        2   # this is the second
        3   # the end
    /mg`).toMatchRegex(new RegExp('123', 'mg'));
});

test('handle named matching groups', () => {
    const regex = crx`^
        (?<year>\\d{4})-
        (?<month>\\d{2})-
        (?<day>\\d{2})
    $`;
    const input = '2019-01-13';
    expect(input.match(regex)).toEqual(
        expect.objectContaining({
            groups: {
                day: '13',
                month: '01',
                year: '2019'
            }
        }));
});