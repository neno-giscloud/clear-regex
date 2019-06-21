# clear-regex
Write regular expressions clearly with comments and named matches.

## Usage

The most convenient way to use clear-regex is with tagged template literals. This way it's easy to

  * split regular expression accross lines
  * add comments
  * use other regexes or values inside the new regex

```js
const crx = require('clear-regex');

const yearRx = /\d{4}/;
const monthRx = /\d{2}/;
const dayRx = /\d{2}/;

const myNewRegex = crx`
        # this matches date strings like '2019-01-13'
        ${yearRx}-      # this is the year part
        ${monthRx}-     # month part
        ${dayRx}        # day part
    `;
```

The comments, whitespace and newline characters get stripped away and the result of the above is the same as

```js
const myNewRegex = /\d{4}-\d{2}-\d{2}/;
```

### Comments

The comments begin with a `#` character and go until the end of the line. Use them to explain what a certain part of your regular expression does.

```js
const phoneNumber = crx`
    # matches phone numbers
    #
    # there can be any number of digits
    # optionally grouped with spaces or dashes
    #
    ^\s*            # optional whitespace at the beginning
    (\+|0+)         # start with a plus or zeros
    (               # begin group od digits
        ([- ])?     # optional delimiter
        (\d+)       # some digits
    )+              # end group of digits
    \s*$            # optional whitespace at the end
`;
```

### Placeholders

If you use clear-regex as a tagged template literal, you can use placeholders to insert literal values or other regular expressions into your new regex. This makes dynamic regexes and reuse convenient.

```js
const year = 2019;
const monthRx = /\d{2}/;
const dayRx = /\d{2}/;

// match a date date string in 2019
const dateRx = crx`^${year}-${monthRx}-${dayRx}`;
```

### Named matching groups

You can use give names to your matching groups. This will make it easier to retrieve them from a matching result. The name tags look like `?<name>`.

```js
const regex = crx`^
    (?<year>\\d{4})-
    (?<month>\\d{2})-
    (?<day>\\d{2})
$`;

'2019-01-13'.match(regex);

// the result contains the groups prop with
// the named matches
//
// {
//     ...
//     groups: {
//         day: '13',
//         month: '01',
//         year: '2019'
//     }
// };
```

### Using flags

To use flags with the tagged template literals, start and end your reges with slashes, as you normally would, and put the flags after the closing slash.

```js
const regex = crx`/
    ice
    (cream|coffee)
    /gi`;

// this is the same as
const sameRegex = /ice(cream|coffee)/gi;
```


