import * as express from 'express'
import * as logger from 'morgan'
import * as helmet from 'helmet'
import * as httpProxy from 'express-http-proxy'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'

const app = express()

const pathFile = resolve(process.cwd(), 'config.yml')
const readConfig = readFileSync(pathFile, { encoding: 'utf8' })
const { services } = load(readConfig, { json: true })

services.forEach(({ name, url }) => {
    app.use(`/${name}`, httpProxy(url, { timeout: 3000 }))
});

app.use(logger('dev'))
// app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    return res.json({ message: 'Running app' });
})


app.listen(3000, () => {
    console.log('Gateway started port 3000');
})