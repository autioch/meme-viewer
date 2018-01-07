const { render, h } = require('preact');
const AppView = require('./view');

require('./favicon.ico');
require('./styles');

render(<AppView />, document.body);
