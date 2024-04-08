const express = require("express");
const mongoose=require("mongoose");
const path=require("path");
const app=express();
const staticPath=path.join(__dirname,"../html")

const port= process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/Registration");

const registrationSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const data=mongoose.model("data", registrationSchema);

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        const registrationData = new data({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        let result = await registrationData.save();
        console.log(result);
        res.sendFile(path.join(__dirname, "../html/success.html"));
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

  app.listen(port);