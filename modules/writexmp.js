const { execSync } = require('child_process');

async function writemetadata(imgname, satssupply, satsvalue, satsname, satstotalsupply, satsitems, satstype) {
    try {
        // Stringify JSON object with items
        satsitems = JSON.stringify(satsitems);

        // Write data to image using exiftool
        var result = execSync(`exiftool -config exiftool/xmp.conf -satssupply="${satssupply}" -satsvalue="${satsvalue}" -satsname="${satsname}" -satstotalsupply="${satstotalsupply}" -satsitems="${satsitems}" -satstype="${satstype}" ${imgname}`).toString();
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