require('app-module-path').addPath('.');

const qbLog = require('qb-log')('simple');
const controllers = require('./controllers');
const setup = require('./setup');
const port = 9090;

const app = setup(controllers);

app.disable('etag');

app.listen(port, () => qbLog.info(`Listening on PORT ${port}`));
