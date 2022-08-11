const restify = require('restify');
const { uploadText } = require('./ipfs');
const corsMiddleware = require('restify-cors-middleware');
const server = restify.createServer({
    name: 'quaestio-ipfs',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
});

this.server.pre(corsConfig.preflight);
this.server.use(corsConfig.actual);

server.get('/', function (req, res) {
    res.send({message: "Server running properly"});
});

server.post('/text', async function (req, res) {
    const text = req.body.text;
    const result = await uploadText(text)
    res.json(result);
});

server.listen(process.env.PORT || 80, function () {
    console.log('%s listening at %s', server.name, server.url);
});
