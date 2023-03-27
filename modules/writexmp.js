const { execSync } = require('child_process');

async function writemetadata(imgname, satssupply, satsvalue, satsname, satstotalsupply, satsitems) {
    try {
        var result = execSync(`exiftool -config exiftool/xmp.conf -satssupply="${satssupply}" -satsvalue="${satsvalue}" -satsname="${satsname}" -satstotalsupply="${satstotalsupply}" -satsitems="${satsitems}" ${imgname}`).toString();
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