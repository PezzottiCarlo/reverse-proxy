const express = require('express');
const cors = require('cors');
const Service = require('./util/service');
const config = require('./config.json');
const service = new Service(config.path);

const app = express();

app.use(express.json());
app.use(express.static('../build'));
app.use(cors());

app.get('/list', async (req, res) => {
    let list = service.get();
    res.json(list.services);
})

app.post('/add', async (req, res) => {
    let { hostname, target } = req.body;
    let result = service.add(hostname, target);
    res.json({success:result});
})

app.post('/addConfig', async (req, res) => {
    let { serviceIndex, confName, confValue } = req.body;
    let result = service.addConfig(serviceIndex, confName, confValue);
    res.json({success:result});
})

app.post('/removeConfig', async (req, res) => {
    let { serviceIndex, confName, confIndex } = req.body;
    let result = service.removeConfig(serviceIndex, confName, confIndex);
    res.json({success:result});
})

app.post('/removeService', async (req, res) => {
    let { serviceIndex } = req.body;
    let result = service.removeService(serviceIndex);
    res.json({success:result});
})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})