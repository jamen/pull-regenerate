
const test = require('tape')
const { pull, values, collect } = require('pull-stream')
const regenerate = require('./lib/pull-regenerate.js')

console.log(regenerate)

test('regenerate', t => {
    t.plan(1)

    let source = regenerate(
        values([ 1, 2, 3 ]),
        (n, abort) => {
            if (n >= 10) return abort()
            return values([ n + 1, n + 2, n + 3 ])
        }
    )
    
    pull(
        source,
        collect((err, data) => {
            t.is(data.length, 30)
            console.log(data)
        })
    )
})
