const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();

app.use(bodyParser());
app.use(router);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
