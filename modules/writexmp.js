const { execSync } = require('child_process');

async function writemetadata(imgname, maxsupply, currentval, currentname) {
    try {
        var result = execSync(`exiftool -config exiftool/xmp.conf -satssupply="${maxsupply}" -satsvalue="${currentval}" -satsname="${currentname}" ${imgname}`).toString();
        if(result.includes("updated")) {
            return "OK";
        } else {
            return "Error"
        }

    } catch (err) {
        console.log( err )
        return "Error";
    }
}

module.exports = { writemetadata }