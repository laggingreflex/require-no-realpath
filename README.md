# require-no-realpath

[NodeJS `require`][modules] uses [fs.realpathSync] to expand all symbolic links. This module makes it not do that.

It smartly patches `fs.realpathSync` to return original (non-symlink-expanded) path when called from a require call.

[modules]: https://nodejs.org/api/modules.html
[fs.realpathSync]: https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options

## Install

```
npm i require-no-realpath
```

## Usage

```js
console.log(require.resolve('some-npm-linked-module'))
// => .../your-forks-original-path/some-npm-linked-module

require('require-no-realpath')

console.log(require.resolve('some-npm-linked-module'))
// => .../project/node_modules/some-npm-linked-module
```
