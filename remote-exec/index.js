var fs = require('fs')
var exec = require('ssh-exec')


// exec(`docker inspect dev_backend`, {
//     user: 'jenkins',
//     host: '192.168.20.218',
//     password: 'anka_vision',
// }).pipe(fs.createWriteStream('./out.txt'))


function readStream(stream, encoding = "utf8") {

    stream.setEncoding(encoding);

    return new Promise((resolve, reject) => {
        let data = "";

        stream.on("data", chunk => data += chunk);
        stream.on("end", () => resolve(data));
        stream.on("error", error => reject(error));
    });
}


async function deneme() {

    const inspect = await readStream(
        exec(`docker container inspect bac550e264c3`, {
            user: 'jenkins',
            host: '192.168.20.218',
            password: 'anka_visionrfg',
        })
    ).catch(err => console.log('err',err))
    console.log(inspect);
    // const inspectData = inspect.toString()
    // const strInspect = inspectData.split('undefined')[1]
    // const inspectJsonData = JSON.parse(strInspect)
    // const serviceName = inspectJsonData[0].Config.Labels['com.docker.swarm.service.name']
    // console.log(serviceName);
    const info = await readStream(
        exec(`docker info --format '{{json .ID}}'`, {
            user: 'jenkins',
            host: '192.168.20.218',
            password: 'anka_vision',
        })
    ).catch(err => console.log(err))
    console.log(info);
}
deneme()

