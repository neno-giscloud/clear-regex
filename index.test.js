const crx = require('./index.js');

test('handle null', () => {
    expect(crx(null))
        .toEqual(new RegExp(null));
});

test('handle simple regex as string', () => {
    expect(crx('^yaba(daba)+do+$'))
        .toEqual(new RegExp('^yaba(daba)+do+$'));
});

test('handle regex with flags', () => {
    expect(crx('/[123]+/gmi'))
        .toEqual(new RegExp('[123]+', 'gmi'));
});

test('handle multiline input', () => {
    expect(crx`
        1
        2
        3
    `)
        .toEqual(new RegExp('123'));
});

test('handle comments', () => {
    expect(crx`
        1   # this is the first part
        2   # this is the second
        3   # the end
    `).toEqual(new RegExp('123'));
});

test('handle multiline with comments and flags', () => {
    expect(crx`/
        1   # this is the first part
        2   # this is the second
        3   # the end
    /mg`).toEqual(new RegExp('123', 'mg'));
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