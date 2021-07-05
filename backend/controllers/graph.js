const graph = require('@microsoft/microsoft-graph-client')
require('isomorphic-fetch')

exports.getUser = async (accessToken) => {
    const client = getAuthenticatedClient(accessToken)
    const user = await client.api('/me').get()
    return user
}

function getAuthenticatedClient(accessToken) {
    return graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
}