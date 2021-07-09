const got = require('got')
const { createWriteStream } = require('fs')
const stream = require('stream')
const { promisify } = require('util')
const pipeline = promisify(stream.pipeline)

exports.downloader = (src, dst) => {
    const downloadstream = got.stream(src);
    const writerstream = createWriteStream(dst)
    downloadstream.on("downloadProgress", ({ transferred, total, percent }) => {
        const percentage = Math.round(percent * 100);
        console.error(`progress: ${transferred}/${total} (${percentage}%)`);
    });
    pipeline(downloadstream, writerstream)
        .then(() => console.log(`File downloaded to ${dst}`))
        .catch((error) => console.error(`Something went wrong. ${error.message}`));
}