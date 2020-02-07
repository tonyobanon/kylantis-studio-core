const restify = require('restify');

const server = restify.createServer({
    name: 'Kylantis Studio',
    versions: ['1.0.0'],
});

server.get('/*', restify.plugins.serveStatic({
    directory: 'client/',
    default: 'index.html',
}));

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
