const qbLog = require('qb-log')('simple');
const controllers = require('./controllers');
const setup = require('./setup');
const port = 9090;

const app = setup(controllers);

app.listen(port, () => qbLog.info(`Listening on PORT ${port}`));
