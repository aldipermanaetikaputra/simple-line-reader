# simple-line-reader

Simple, buffered, line-by-line file reader with customizable buffer size.

## Install

```sh
npm install simple-line-reader
```

```sh
yarn add simple-line-reader
```

## Usage

```js
const LineReader = require("simple-line-reader");

const reader = new LineReader({
  filePath: "./somefile.txt",
  bufferSize: 1024,
  skipBlank: true,
});

while (!reader.isDone) {
  console.log(reader.nextSingle());
}
```

## API

The module exports the following functions:

- [constructor](#constructor)
- [next](#next)
- [nextSingle](#nextSingle)
- [close](#close)

### constructor

- `new LineReader(options: LineReaderOptions): LineReader`

```ts
interface LineReaderOptions {
  filePath: string;
  bufferSize?: number; // Defaults to 1024 (1 kB)
  skipBlank?: boolean; // Defaults to false
}
```

### next

- `next(): string[]`

It returns a next lines of current file stream.

Syntax:

```js
const LineReader = require("simple-line-reader");

const reader = new LineReader({
  filePath: "./file.txt",
  bufferSize: 10,
});

while (!reader.isDone) {
  console.log(reader.next());
}
```

`./file.txt`

```txt
aaaa
bbbb
cccc
dddd
eeee
ffff
gggg
hhhh
iiii
jjjj
kkkk
llll
mmmm
nnnn
oooo
```

Output:

```bash
[ 'aaaa', 'bbbb' ]
[ 'cccc', 'dddd' ]
[ 'eeee', 'ffff' ]
[ 'gggg', 'hhhh' ]
[ 'iiii', 'jjjj' ]
[ 'kkkk', 'llll' ]
[ 'mmmm', 'nnnn' ]
[ 'oooo' ]
```

### nextSingle

- `nextSingle(): string`

It returns a next single line of current file stream.

Syntax:

```js
const LineReader = require("simple-line-reader");

const reader = new LineReader({
  filePath: "./file.txt",
  bufferSize: 10,
  skipBlank: true,
});

while (!reader.isDone) {
  console.log(reader.nextSingle());
}
```

`./file.txt`

```txt
aaaa
bbbb
cccc
dddd

eeee
ffff
gggg
hhhh

iiii
jjjj
kkkk
llll
mmmm


nnnn
oooo
```

Output:

```bash
aaaa
bbbb
cccc
dddd
eeee
ffff
gggg
hhhh
iiii
jjjj
kkkk
llll
mmmm
nnnn
oooo
```

### close

- `close(): void`

Close the current file descriptor thereby clearing the file stream that is associated with it.

You need to call this method only if you are done before reading the whole content stream. `next()` and `nextSingle()` will call this function automatically when reaching the end of the stream.

Syntax:

```js
const LineReader = require("simple-line-reader");

const reader = new LineReader({
  filePath: "./file.txt",
  bufferSize: 10,
  skipBlank: true,
});

console.log(reader.next());
console.log(reader.nextSingle());
console.log(reader.nextSingle());
console.log(reader.next());
console.log(reader.nextSingle());

reader.close();
```

`./file.txt`

```txt
aaaa
bbbb
cccc
dddd
eeee
ffff
gggg
hhhh
iiii
jjjj
kkkk
llll
mmmm
nnnn
oooo
```

Output:

```bash
[ 'aaaa', 'bbbb' ]
cccc
dddd
[ 'eeee', 'ffff' ]
gggg
[ 'hhhh' ]
```
