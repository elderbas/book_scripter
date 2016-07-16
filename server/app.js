"use strict";
let express = require('express');
let app = express();


global._serverDir_ = __dirname;
const PORT = 3333;
app.use(require('cors')());
app.use(require('express-fileupload')());

app.use('/book_data', require(`${_serverDir_}/routes/book_data`));

app.listen(PORT, function () {
  console.log(`Bookscripter backend app listening on ${PORT}`);
});