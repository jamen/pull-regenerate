
# pull-regenerate

> A source that masks other sources over its lifetime.

## Install

```sh
npm i pull-regenerate
``` 

## Usage

### `regenerate(initial, swap)`

Create a [`pull-stream` source][1] that masks other sources over its lifetime. Instead of aborting when the initial stream aborts, it uses a new source returned from `swap(nth, abort)`, where `nth` is the amount of times it has swapped and `abort` is a function that lets you actually abort.

The stream also has `abort()` and `set(stream)` methods attached.

```js
let source = regenerate(
    values([ 1, 2, 3 ]),
    (nth, abort) => {
        if (nth > 10) return abort()
        return values([ i + 1, i + 2, i + 3 ])
    }
)

if (something) {
    source.set(
        values([0, 1, 2, 3])
    )
} else if (otherthing) {
    source.abort()
}

pull(
    source,
    collect((err, data) => {
        console.log(data)
    })
)
```

[1]: https://github.com/pull-stream/pull-stream/blob/master/docs/spec.md#source-streams
