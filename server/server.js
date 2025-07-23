const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./router/useRouter");
const movieRouter = require("./router/movieRouter");
const theatreRouter = require("./router/theatreRouter");



require('dotenv').config();
require("./dbConfig");

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use("/api/movies", movieRouter); // Route for all movie operations
app.use("/api/theatre", theatreRouter); // Route for all theatre operations


app.use((req, res) => {
    res.status(404).send('Page not found');
})

app.listen(8082, () => {
    console.log("Server is running");
});
