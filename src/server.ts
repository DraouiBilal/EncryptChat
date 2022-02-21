import { createServer, IncomingMessage, ServerResponse }  from 'http'

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json');
    switch (request.url) {
      case '/login': {
        switch (request.method) {
          case 'POST':
            return response.end("res received")
            let body:string = '';

            request.on('data', (chunk:string) => {
              body += chunk;
            });
            request.on('end', () => {
              console.log(JSON.parse(body))
              response.writeHead(200, {'Content-Type': 'application/json'})
              response.end(body);
            });
            break;
        
          default:
            
            
            break;
        }
        break
      }
      default: {
        response.statusCode = 404;
        response.end();
        break
      }
    }
});



const PORT:number = 5000
const HOST:string = '127.0.0.1'

server.listen(PORT,HOST,()=>{
  console.log(`Server started on port ${PORT}`);
})

