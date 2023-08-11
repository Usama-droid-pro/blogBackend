
const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 3000;

const cors = require('cors');
app.use("/tmp" , express.static("tmp"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin : "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

require('dotenv').config()


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

//middleware
app.use(express.json());


//Routes

app.use("/category" , require("./routes/categoryRoute.js"));
app.use("/imageUpload" , require("./routes/imageUpload.js"));
app.use("/user" , require("./routes/userRoute.js"));
app.use("/blog" , require("./routes/blogRoute.js"));




app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));