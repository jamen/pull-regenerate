
function regenerate (initial, swap) {
    let stream = initial
    let nth = 0

    function abort () {
        stream(true, () => {}) 
    }

    function set (newStream) {
        stream = newStream
    }

    function source (end, cb) {
        
        if (!end && !stream) {
            stream = swap(nth, abort)
        }
        
        stream(end, function next (end, chunk) {
            console.log(end, chunk)
            if (end === true) {
                nth++
                stream = swap(nth, abort)
                if (stream) stream(null, next)
                else cb(true)
            } else {
                cb(end, chunk)
            }
        })
    }

    source.abort = abort
    source.set = set

    return source
}

module.exports = regenerate
