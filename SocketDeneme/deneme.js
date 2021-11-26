const { networkInterfaces } = require('os')
const net = require('net')
const PORT = 1348
const os = require('os')
function getContainerIpArray() {
    const nets = networkInterfaces()
    const results = Object.create(null)
    var dockerHostIpAddresses = []
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = []
                }
                var blocks = net.address.split('.')
                if (blocks.indexOf('172') !== -1) {
                    // console.log('Container IP: ', net.address);
                    blocks[3] = '1'
                    var newIp = blocks.join('.')
                    dockerHostIpAddresses.push(newIp)
                }
            }
        }
    }
    return dockerHostIpAddresses
}


function connectSocket(ip, _status) {
    const hostname = os.hostname()

    const client = new net.Socket()
    console.log('Server Ip', ip)
    console.log('Hostname', hostname)
    let recievedData
    return new Promise((resolve, reject) => {
        client.connect(PORT, ip, () => {
            console.log('Socket Connection is Successful')
            // client.write(status)
            client.write(hostname)
        })
        client.on('error', (err) => {
            console.log('Socket Connection ERROR')
            reject(err)
        })
        client.on('data', (data) => {
            console.log('Received Data')
            recievedData += data
        })
        client.on('end', function () {
            console.log('Recevied a FIN packet')
            resolve(recievedData)
            client.end()
            client.destroy()
        })
        client.on('close', () => {
            console.log('Socket Connection Closed')
        })
    })
}
async function deneme() {
    const hostname = os.hostname()
    const containerIpArray = getContainerIpArray()
    // console.log('containerIpArray', containerIpArray)
    const dockerInspectData = await connectSocket(containerIpArray[0], `/inspect ${hostname}`)
        .catch(err => {
            console.log(err)
        })
    if (dockerInspectData) {
        const configData = dockerInspectData.toString()[0].config
        console.log('Docker Inspect Response', configData)
    }
    const dockerInfoData = await connectSocket(containerIpArray[0], '/info')
        .catch(err => {
            console.log(err)
        })
    if (dockerInfoData) {
        const dockerID = dockerInspectData.toString()[0].config
        console.log('Docker Info Response', dockerID)
    }
    const strInspect = `
    [
        {
            "Id": "e2b947c62578eadf47cc0fc3325e305ead997a823705d55d3ffa82ef52ae1a70",
            "Created": "2021-06-24T11:26:07.280915371Z",
            "Path": "docker-entrypoint.sh",
            "Args": [
                "/bin/sh",
                "-c",
                "yarn prod:win"
            ],
            "State": {
                "Status": "running",
                "Running": true,
                "Paused": false,
                "Restarting": false,
                "OOMKilled": false,
                "Dead": false,
                "Pid": 418739,
                "ExitCode": 0,
                "Error": "",
                "StartedAt": "2021-06-24T11:26:12.012169336Z",
                "FinishedAt": "0001-01-01T00:00:00Z"
            },
            "Image": "sha256:06c14cf39478437c47c7ee1721a98de0fdf33d7f8aa62e89f03840f0f89c9437",
            "ResolvConfPath": "/var/lib/docker/containers/e2b947c62578eadf47cc0fc3325e305ead997a823705d55d3ffa82ef52ae1a70/resolv.conf",
            "HostnamePath": "/var/lib/docker/containers/e2b947c62578eadf47cc0fc3325e305ead997a823705d55d3ffa82ef52ae1a70/hostname",
            "HostsPath": "/var/lib/docker/containers/e2b947c62578eadf47cc0fc3325e305ead997a823705d55d3ffa82ef52ae1a70/hosts",
            "LogPath": "/var/lib/docker/containers/e2b947c62578eadf47cc0fc3325e305ead997a823705d55d3ffa82ef52ae1a70/e2b947c62578eadf47cc0fc3325e305ead997a823705d55d3ffa82ef52ae1a70-json.log",
            "Name": "/katar_backend.1.uja35t61tbcl24kqbz16ephco",
            "RestartCount": 0,
            "Driver": "overlay2",
            "Platform": "linux",
            "MountLabel": "",
            "ProcessLabel": "",
            "AppArmorProfile": "docker-default",
            "ExecIDs": [
                "aff004ba38da19487f7a7ceb29220e386860fe45dd3d6c676e03b9c55ca2f49f"
            ],
            "HostConfig": {
                "Binds": null,
                "ContainerIDFile": "",
                "LogConfig": {
                    "Type": "json-file",
                    "Config": {}
                },
                "NetworkMode": "default",
                "PortBindings": {},
                "RestartPolicy": {
                    "Name": "",
                    "MaximumRetryCount": 0
                },
                "AutoRemove": false,
                "VolumeDriver": "",
                "VolumesFrom": null,
                "CapAdd": null,
                "CapDrop": null,
                "CgroupnsMode": "host",
                "Dns": null,
                "DnsOptions": null,
                "DnsSearch": null,
                "ExtraHosts": null,
                "GroupAdd": null,
                "IpcMode": "private",
                "Cgroup": "",
                "Links": null,
                "OomScoreAdj": 0,
                "PidMode": "",
                "Privileged": false,
                "PublishAllPorts": false,
                "ReadonlyRootfs": false,
                "SecurityOpt": null,
                "UTSMode": "",
                "UsernsMode": "",
                "ShmSize": 67108864,
                "Runtime": "runc",
                "ConsoleSize": [
                    0,
                    0
                ],
                "Isolation": "default",
                "CpuShares": 0,
                "Memory": 0,
                "NanoCpus": 0,
                "CgroupParent": "",
                "BlkioWeight": 0,
                "BlkioWeightDevice": null,
                "BlkioDeviceReadBps": null,
                "BlkioDeviceWriteBps": null,
                "BlkioDeviceReadIOps": null,
                "BlkioDeviceWriteIOps": null,
                "CpuPeriod": 0,
                "CpuQuota": 0,
                "CpuRealtimePeriod": 0,
                "CpuRealtimeRuntime": 0,
                "CpusetCpus": "",
                "CpusetMems": "",
                "Devices": null,
                "DeviceCgroupRules": null,
                "DeviceRequests": null,
                "KernelMemory": 0,
                "KernelMemoryTCP": 0,
                "MemoryReservation": 0,
                "MemorySwap": 0,
                "MemorySwappiness": null,
                "OomKillDisable": false,
                "PidsLimit": null,
                "Ulimits": [],
                "CpuCount": 0,
                "CpuPercent": 0,
                "IOMaximumIOps": 0,
                "IOMaximumBandwidth": 0,
                "Mounts": [
                    {
                        "Type": "bind",
                        "Source": "/home/devsunuser/Desktop/katar/attachment",
                        "Target": "/attachment"
                    },
                    {
                        "Type": "bind",
                        "Source": "/home/devsunuser/Desktop/katar/icons",
                        "Target": "/icons"
                    }
                ],
                "MaskedPaths": [
                    "/proc/asound",
                    "/proc/acpi",
                    "/proc/kcore",
                    "/proc/keys",
                    "/proc/latency_stats",
                    "/proc/timer_list",
                    "/proc/timer_stats",
                    "/proc/sched_debug",
                    "/proc/scsi",
                    "/sys/firmware"
                ],
                "ReadonlyPaths": [
                    "/proc/bus",
                    "/proc/fs",
                    "/proc/irq",
                    "/proc/sys",
                    "/proc/sysrq-trigger"
                ],
                "Init": false
            },
            "GraphDriver": {
                "Data": {
                    "LowerDir": "/var/lib/docker/overlay2/9b34e25fff8407bf7099ab1b71ac1d4f1ef5b7500c9ea8fedc6f79930b56b1d3-init/diff:/var/lib/docker/overlay2/4854bcc77518ec40b186d23cb65fa7de06c95ed22cf2efd45ff164ea2a7d0844/diff:/var/lib/docker/overlay2/7e222f7cbb4f8ff8339d406afce9355ecb99169f0fe4282a42837d7ab10baf9d/diff:/var/lib/docker/overlay2/f9ea75755c310839014da76c865ef4d5a47904a8e0bff57840c4cdfefa413f3b/diff:/var/lib/docker/overlay2/fdcb677bee792c668107fd5bb04a376b697e508960d6855dd7855ab97b5708e3/diff:/var/lib/docker/overlay2/390b715aa14b39580a8136133086e315ccfa5a1c29f3732ad8ee28dac002b5d0/diff:/var/lib/docker/overlay2/7dd3c4e891272d477922894ef6a838875e41f2677566263a8a7489e8fc3e207d/diff:/var/lib/docker/overlay2/f02b8a1ee1c8b90b888b525d619e2d65039afeff7f0e26ec52e59edfb91b1aed/diff:/var/lib/docker/overlay2/56ba691b3a52cf17ca51d0f6aa2fae4a2996b8c491fd3267ee145b2150a7a708/diff:/var/lib/docker/overlay2/223fce8d94c5ca9b299791ae8c3953b4966dea018cbe6a965ca89e4d4d4805b6/diff:/var/lib/docker/overlay2/1e5922c2f7500907f4d924a1b22f959bed7d98ede96a4fa8069276905d5bf48a/diff",
                    "MergedDir": "/var/lib/docker/overlay2/9b34e25fff8407bf7099ab1b71ac1d4f1ef5b7500c9ea8fedc6f79930b56b1d3/merged",
                    "UpperDir": "/var/lib/docker/overlay2/9b34e25fff8407bf7099ab1b71ac1d4f1ef5b7500c9ea8fedc6f79930b56b1d3/diff",
                    "WorkDir": "/var/lib/docker/overlay2/9b34e25fff8407bf7099ab1b71ac1d4f1ef5b7500c9ea8fedc6f79930b56b1d3/work"
                },
                "Name": "overlay2"
            },
            "Mounts": [
                {
                    "Type": "bind",
                    "Source": "/home/devsunuser/Desktop/katar/attachment",
                    "Destination": "/attachment",
                    "Mode": "",
                    "RW": true,
                    "Propagation": "rprivate"
                },
                {
                    "Type": "bind",
                    "Source": "/home/devsunuser/Desktop/katar/icons",
                    "Destination": "/icons",
                    "Mode": "",
                    "RW": true,
                    "Propagation": "rprivate"
                }
            ],
            "Config": {
                "Hostname": "e2b947c62578",
                "Domainname": "",
                "User": "node",
                "AttachStdin": false,
                "AttachStdout": false,
                "AttachStderr": false,
                "Tty": false,
                "OpenStdin": false,
                "StdinOnce": false,
                "Env": [
                    "POSTGIS_PASSWORD=katar",
                    "POSTGIS_PORT=5432",
                    "POSTGIS_USERNAME=postgres",
                    "POSTGIS_HOST=katar_postgis",
                    "GEOSERVER_ADMIN_USER=admin",
                    "GEOSERVER_ADMIN_PASS=katar",
                    "GEOSERVER_IP=192.168.20.180:85/geoserver",
                    "GEOSERVER_HOST=192.168.20.180:85",
                    "GEOSERVER_PORT=8888",
                    "GEOSERVER_SERVICE=http://192.168.20.180:85/geoserver/",
                    "PANO_HOST=htpp://katar_pano:9000/",
                    "PANO_PORT=9010",
                    "PORT=9000",
                    "POSTGIS_ADMINDBNAME=cloud_admin",
                    "POSTGIS_NEWADMINDBNAME=cloud_admin",
                    "POSTGIS_MAINDBNAME=cloud_data",
                    "ATTACHMENT_FOLDER_PATH=/attachment",
                    "REFRESH_TOKEN_MAX_AGE=60 * 24 * 3600 * 1000",
                    "CLOUD_REFRESH_SECRET_JWT_KEY=nbiqwhdiqbnd_+)(*qjsdqwsh%*)(wdiquwe9uuew9817394y213je4o2W$#^%$&^*@1i3je9qdjkndasdj9a8seoqwehj!@",
                    "CLOUD_ACCESS_SECRET_JWT_KEY=%%$^$di)(*khklkjkkx89xxxxxasjosd)HKGTTU*&&^&_)IHJVHJHKBHFR&YBUKJLKJJHHGUYUJHjfhdgutuyiyihbKKLKKH*Y()((*&&^*&^*^))",
                    "REFRESH_TOKEN_EXPIRE_TIME=1h",
                    "ACCESS_TOKEN_EXPIRE_TIME=12h",
                    "TOKEN_EXPIRE_TIME=24h",
                    "BODY_PARSER_BODY_LIMIT=8mb",
                    "JWT_KEY=grfwg67423t67ft4gfAhmad23t4f26734f253f4g7623",
                    "LAYER_ICON_URL=http://192.168.20.180:85/icons/",
                    "LAYER_ICON_FOLDER_PATH=/icons",
                    "LDAP_AUTH=false",
                    "REDIS_PORT=6379",
                    "LDAP_SOAP_SERVICE=https://192.168.20.180:389",
                    "LICENSE_HOST=https://license.ankageo.com/api/v1",
                    "REDIS_HOST=192.168.20.180",
                    "ALLOW_NODE_CACHE=true",
                    "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                    "NODE_VERSION=14.15.0",
                    "YARN_VERSION=1.22.5"
                ],
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "yarn prod:win"
                ],
                "Image": "geoanka/cloudapp-backend-katar:Katar_45@sha256:a089659647d231c64dcb601c09047acbd0f7f37d72b128a39aad034b69d311e0",
                "Volumes": null,
                "WorkingDir": "/home/node/app",
                "Entrypoint": [
                    "docker-entrypoint.sh"
                ],
                "OnBuild": null,
                "Labels": {
                    "com.docker.swarm.node.id": "mzm26p98qkv3j9grhlifwrfjs",
                    "com.docker.swarm.service.id": "4fdaau6dzbwpv7h7cvm65b47m",
                    "com.docker.swarm.service.name": "katar_backend",
                    "com.docker.swarm.task": "",
                    "com.docker.swarm.task.id": "uja35t61tbcl24kqbz16ephco",
                    "com.docker.swarm.task.name": "katar_backend.1.uja35t61tbcl24kqbz16ephco"
                }
            },
            "NetworkSettings": {
                "Bridge": "",
                "SandboxID": "789ee3dad4f8ab7b171d3100352adf1f1bcaf0b450cda07ba8da02f8fceb64a4",
                "HairpinMode": false,
                "LinkLocalIPv6Address": "",
                "LinkLocalIPv6PrefixLen": 0,
                "Ports": {},
                "SandboxKey": "/var/run/docker/netns/789ee3dad4f8",
                "SecondaryIPAddresses": null,
                "SecondaryIPv6Addresses": null,
                "EndpointID": "",
                "Gateway": "",
                "GlobalIPv6Address": "",
                "GlobalIPv6PrefixLen": 0,
                "IPAddress": "",
                "IPPrefixLen": 0,
                "IPv6Gateway": "",
                "MacAddress": "",
                "Networks": {
                    "ingress": {
                        "IPAMConfig": {
                            "IPv4Address": "10.0.0.152"
                        },
                        "Links": null,
                        "Aliases": [
                            "e2b947c62578"
                        ],
                        "NetworkID": "q6l25jqw2cby2s034d56k1njz",
                        "EndpointID": "59e2beaa0470c610b76d8dea61fcf5aae1ec796b9b562312cf609182cd605b12",
                        "Gateway": "",
                        "IPAddress": "10.0.0.152",
                        "IPPrefixLen": 24,
                        "IPv6Gateway": "",
                        "GlobalIPv6Address": "",
                        "GlobalIPv6PrefixLen": 0,
                        "MacAddress": "02:42:0a:00:00:98",
                        "DriverOpts": null
                    },
                    "katar_default": {
                        "IPAMConfig": {
                            "IPv4Address": "10.0.2.101"
                        },
                        "Links": null,
                        "Aliases": [
                            "e2b947c62578"
                        ],
                        "NetworkID": "040dr373gw0az6w63kgavsrjq",
                        "EndpointID": "b5d41bb51dd919a7b8c292421983dd95f4a2481a0ba4c7af72cddad98ca7ddb8",
                        "Gateway": "",
                        "IPAddress": "10.0.2.101",
                        "IPPrefixLen": 24,
                        "IPv6Gateway": "",
                        "GlobalIPv6Address": "",
                        "GlobalIPv6PrefixLen": 0,
                        "MacAddress": "02:42:0a:00:02:65",
                        "DriverOpts": null
                    }
                }
            }
        }
    ]
`
    const strInfo = `undefined"PGNF:HNBQ:MFOK:KAI2:7FLJ:Q7EV:KSUD:P7D7:74TZ:WLVB:QK3Y:LZFC"`
    const a = strInfo.split('undefined')[1]
    console.log('strInfo', a);
    const inspectJson = JSON.parse(strInspect)
    const serviceName = inspectJson[0].Config.Labels['com.docker.swarm.service.name']
    console.log('serviceName', serviceName);
}
deneme()
// const str2 = str.replace(/\\n/g, "\\n")
//     .replace(/\\'/g, "\\'")
//     .replace(/\\"/g, '\\"')
//     .replace(/\\&/g, "\\&")
//     .replace(/\\r/g, "\\r")
//     .replace(/\\t/g, "\\t")
//     .replace(/\\b/g, "\\b")
//     .replace(/\\f/g, "\\f");
// const str3 = str2.replace(/[\u0000-\u0019]+/g, "");