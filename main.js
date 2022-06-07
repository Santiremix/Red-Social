const express = require("express");
const app = express();
const PORT = 3000;
const { dbConnection } = require("./config/config")

app.use(express.json())

dbConnection()

app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Importacion de rutas
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));

