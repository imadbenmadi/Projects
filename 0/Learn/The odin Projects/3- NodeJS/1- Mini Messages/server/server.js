const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Database = require("./database");
const app = express();
const port =  5000;
const db = new Database()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/messages", require("./routes/api/messages"));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    db.connect();
});
