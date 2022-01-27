const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname,'../')

const loadWaitListers = () => {
    try {
        const dataBuffer = fs.readFileSync(dir+'/waitlist.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveWaitListers = (waitListers) => {
    const dataJSON = JSON.stringify(waitListers)
    fs.writeFileSync(dir+'/waitlist.json', dataJSON)
}

const addWaitLister = (body) => {
    const waitListers = loadWaitListers()
    const duplicateWaitLister = waitListers.find((waitlister) => waitlister.email === body.email)

    if (!duplicateWaitLister) {
        waitListers.push(body)
        saveWaitListers(waitListers)
    } else {
        throw new Error('Email already used')
    }
}

module.exports = {
    loadWaitListers: loadWaitListers,
    saveWaitListers: saveWaitListers,
    addWaitLister : addWaitLister
}