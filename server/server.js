import { createServer } from 'http';
const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    switch (request.url) {
        case '/login': {
            switch (request.method) {
                case 'POST':
                    return response.end("res received");
                    let body = '';
                    request.on('data', (chunk) => {
                        body += chunk;
                    });
                    request.on('end', () => {
                        console.log(JSON.parse(body));
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(body);
                    });
                    break;
                default:
                    break;
            }
            break;
        }
        default: {
            response.statusCode = 404;
            response.end();
            break;
        }
    }
});
const PORT = 5000;
const HOST = '127.0.0.1';
server.listen(PORT, HOST, () => {
    console.log(`Server started on port ${PORT}`);
});
