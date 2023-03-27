const ExifReader = require('exifreader');
const fetch = require('node-fetch')

async function urlmetadata(imgurl) {
    try {
        const res = await fetch(imgurl);
        const imgbuffer = await res.arrayBuffer();
        const tags = ExifReader.load(imgbuffer, {
            expanded: true,
            includeUnknown: true
        });

        if (tags['xmp'] === undefined) {
            return "No XMP data found";
        } else {
            const xmponly = tags['xmp'];
            const { ['_raw']: rawonly, ...tagswithoutraw } = xmponly 
            return tagswithoutraw;
        }

    } catch (err) {
        return err;
    }
}

async function buffermetadata(imgbuffer) {
    try {
        const tags = ExifReader.load(imgbuffer, {
            expanded: true,
            includeUnknown: true
        });

        if (tags['xmp'] === undefined) {
            return "No XMP data found";
        } else {
            const xmponly = tags['xmp'];
            const { ['_raw']: rawonly, ...tagswithoutraw } = xmponly 
            return tagswithoutraw;
        }

    } catch (err) {
        console.log(err)
        return err;
    }
}

module.exports = { urlmetadata, buffermetadata }