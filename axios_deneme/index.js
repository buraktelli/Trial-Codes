const axios = require('axios')

async function request() {
    const res = await axios({
        method: 'GET',
        url: `http://localhost:1002`,
        // url: `asdfasdf`,
    }).catch(err => {
        // console.log('err.response', err.response);
        console.log('err', err.message);
        // console.log('err', err);
        // console.log('stack', err.stack);
    })
    // console.log('res', res);
}
request()