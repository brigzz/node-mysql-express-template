const app = require('./controller/app.js');

const port = 8081;

const server = app.listen(port, () => {

    console.log('Web App hosted at http://localhost:' +port);
})
