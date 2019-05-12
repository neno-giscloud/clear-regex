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
        .toEqual(/[123]+/gmi);
});

test('handle multiline input', () => {
    expect(crx`
        1
        2
        3
    `)
        .toEqual(/123/);
});

test('handle comments', () => {
    expect(crx`
        1   # this is the first part
        2   # this is the second
        3   # the end
    `).toEqual(/123/);
});

test('handle multiline with comments and flags', () => {
    expect(crx`/
        1   # this is the first part
        2   # this is the second
        3   # the end
    /mg`).toEqual(/123/mg);
});