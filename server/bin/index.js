#!/usr/bin/env node

import server from '../src/server.js';

const port = 5001;

server.listen(port, () => {
  console.log('server!');
});