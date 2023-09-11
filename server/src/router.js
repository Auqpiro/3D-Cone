import validate from '../utils/validate.js';
import calculate from '../utils/calculate.js';

const router = {
  POST: {
    '/api/cone': (_request, response, body) => {
      response.setHeader('Content-Type', 'application/json');
      const data = JSON.parse(body);
      const errors = validate(data);
      if (errors.length === 0) {
        response.writeHead(201);
        const vertices = calculate(data);
        response.end(JSON.stringify(vertices));
      } else {
        response.writeHead(422);
        response.end(JSON.stringify(errors));
      }
    },
  }
};

export default router;