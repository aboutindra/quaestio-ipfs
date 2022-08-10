const ipfsClient = require('ipfs-http-client');
const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.PROJECT_SECRET;
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const uploadText = async(text) =>{
    console.log("[LOG] Text Added")
    return await client.add(text)
}

module.exports = {
    uploadText
}
