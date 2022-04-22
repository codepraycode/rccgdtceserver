// This File generates fixed data

const randomString = (length) => {
    var result = "";
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

function generateRegionsData(number_of_regions = 34) {
    let data = []


    for (let ei = 1; ei <= number_of_regions; ei++) {
        let new_region = {
            name: `Region ${ei}`,
            email: `region${ei}@rccgdtce.com`,
            default_password: randomString(7)
        }

        data.push(new_region);
    }


    return data;
}


module.exports = {
    generateRegionsData
}