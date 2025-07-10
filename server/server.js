const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./router/useRouter");


require('dotenv').config();
require("./dbConfig");

app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);
app.use((req, res) => {
    res.status(404).send('Page not found');
})

app.listen(8082, () => {
    console.log("Server is running");
});
