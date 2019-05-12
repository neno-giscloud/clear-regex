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