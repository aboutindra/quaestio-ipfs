const restify = require('restify');
const { uploadText } = require('./ipfs')
const server = restify.createServer({
    name: 'quaestio-ipfs',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/text', async function (req, res) {
    const text = req.body.text;
    const {path} = await uploadText(text)
    res.send({path});
});

server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});
