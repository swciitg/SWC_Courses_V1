const graph = require('@microsoft/microsoft-graph-client')
const { dirpath } = require('../dirname')
const path = require('path')
const moment = require('moment')
require('isomorphic-fetch')
const { downloader } = require('../utils/downloader')

exports.getUser = async (accessToken) => {
    const client = getAuthenticatedClient(accessToken)
    const user = await client.api('/me').get()
    return user
}

exports.UserJoinedTeams = async (accessToken) => {
    try {
        const client = getAuthenticatedClient(accessToken)
        const teams = await client.api('/me/joinedTeams').select(["displayName", "description", "id"]).get()
        return { status: true, teams: teams.value }
    } catch (err) {
        console.log(err)
        return { status: false, error: err.message }
    }
}

exports.getTeamRecordings = async (accessToken, teamsid) => {
    const client = getAuthenticatedClient(accessToken)
    const recordings = await client.api(`/groups/${teamsid}/drive/root:/General/Recordings:/children`).get()
    console.log(dirpath)
    return recordings.value.map(recording => {
        const { lastModifiedDateTime, name } = recording
        return { lastModifiedDateTime, name, downloadUrl: recording["@microsoft.graph.downloadUrl"] }
    })
}

exports.saveNewTeamRecordings = async (accessToken, course) => {
    try {
        const { downloadedtill } = course.msteams
        console.log("downloadedtill")
        console.log(downloadedtill)
        const teamsid = course.msteams.id
        const client = getAuthenticatedClient(accessToken)
        const recordings = await client.api(`/groups/${teamsid}/drive/root:/General/Recordings:/children`).get()
        recordings.value.forEach((recording) => {
            if (moment(recording.lastModifiedDateTime).isAfter(downloadedtill)) {
                const src = recording["@microsoft.graph.downloadUrl"]
                const dst = path.join(dirpath, 'assets', 'courserecordings', course.id, recording.name)
                downloader(src, dst)
                if (moment(recording.lastModifiedDateTime).isAfter(course.msteams.downloadedtill)){
                    flag = false
                    course.msteams.downloadedtill = recording.lastModifiedDateTime
                }
            }
        })
        console.log(course.msteams.downloadedtill)
        await course.save()
        return { status: true, course }
    } catch (err) {
        console.log(err)
        return { status: false, error: err.message }
    }

}

function getAuthenticatedClient(accessToken) {
    return graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
}