const axios = require('axios')


const createStyle = function () {
    return axios({
        method: 'GET',
        url: `https://dev-gis.ankageo.com/rest/v1/geoserver/safranbolu/ows?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=alisveris_usr&propertyName=*&bbox=28.58040224074892,41.206454665394084,28.582793003251066,41.20825330860592,EPSG:4326&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjEsImlhdCI6MTYyODA3MDM5MywiZXhwIjoxNjI4MTEzNTkzfQ.JFHu7Ue8qkbEqTpIsN2QH3Ym9LAybtOlSsBbmIdrmSU&srsName=EPSG:4326`,
    }).then(res => {
        console.log(res);
    }).catch(err => {
        return err
    })
}
createStyle()