import http from 'http';
import router from './router.js';

const server = http.createServer((request, response) => {
  const body = [];

  request
    .on('data', (chunk) => body.push(chunk.toString()))
    .on('end', () => {
      const { pathname } = new URL(request.url, `http://${request.headers.host}`);
      const routes = router[request.method];

      const result = pathname && routes && Object.keys(routes)
        .find((str) => {
          const regexp = new RegExp(`^${str}$`);
          const matches = pathname.match(regexp);
          if (!matches) { 
            return false;
          }
          routes[str](request, response, body);
          return true;
        });
      if (!result) {
        response.writeHead(404);
        response.end();
      }
    });
});

export default server;