const express = require('express')
const app = express()

app.get('', (req, res) => {
    res.send('ProductApi')
})

app.listen(3002, () => {
    console.log('Product Api Started port 3002');
})