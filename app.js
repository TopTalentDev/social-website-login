const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');

require('dotenv').config({
  path: path.join(__dirname, './config/dev.env'),
});

const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth/', authRouter);

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
// catch 404
app.use(function (req, res, next) {
  res.status(404).send();
});

// global error handler
app.use(function (err, req, res, next) {
  res.status(500).send();
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => ;
https
  .createServer(
    {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
    },
    app
  )
  .listen(PORT, () => console.log(`server started of port ${PORT}`));
module.exports = app;
