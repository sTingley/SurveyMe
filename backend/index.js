
const service = require('./src/ingress/service');

service().start()
    .catch((err) => {
        console.log(err);
        console.log('\nFailed to initalize');
    })