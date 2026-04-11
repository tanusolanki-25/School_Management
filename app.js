const express = require('express')
const userRouter = require('./routes/user')
const path = require("path");
require('dotenv').config()

const app = express()


app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})