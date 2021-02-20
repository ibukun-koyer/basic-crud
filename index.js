const path = require("path");
//requiring and running express
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
//requiring and setting engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//setting static files 
app.use(express.static(path.join(__dirname, "public")));
//mongoose setup
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/CRUD", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongo connection successfully created");
}).catch(() => {
    console.log("Mongo connection failed");
});
mongoose.set("useCreateIndex", true);
//requiring and setting up method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//requiring ejs-mate
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);


//import schema
const { user } = require("./mongoose_schema/userSchema.js");
const { exception } = require("console");
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

//create a middleware to ensure that users are unable to send invalid post request from apps like postman
function valid(req, res, next) {
    const { name, id, grade } = req.body;
    if ((name === "") || (id === "")) {
        return next("Must supply a username or/and id string that is not empty");
    }
    if (isNaN(parseInt(grade)) || (parseInt(grade) < 0)) {
        return next("Grade must be a positive whole number");
    }
    return next();
}
//home directory
app.route("/")
    .get(async (req, res) => {
        try {
            let data = await user.find();
            data = { data }
            console.log(data.data);
            res.render("home", { data });
        }
        catch (e) {
            res.send("SOMETHING WENT WRONG: " + e);
        }
    });

app.route("/delete/:id")
    .delete(async (req, res) => {
        try {
            await user.findByIdAndDelete(req.params.id);
            res.redirect("/");
        }
        catch (e) {
            res.send("SOMETHING WENT WRONG: " + e);
        }
    })
app.route("/create")
    .post(valid, async (req, res) => {
        try {
            created = new user(req.body);
            await created.save();
            res.redirect("/");
        }
        catch (e) {
            res.send("SOMETHING WENT WRONG: " + e);
        }
    });

app.route("/edit/:id")
    .patch(valid, async (req, res) => {
        try {
            await user.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.redirect("/");
        }
        catch (e) {
            res.send("SOMETHING WENT WRONG: " + e);
        }
    });

//get any unhandled route
app.route("*")
    .all((req, res, next) => {
        //call error-handling middleware
        next("Page not found!!!");
    })

//error handling middleware
app.use((err, req, res, next) => {
    res.status(404).send("SOMETHING WENT WRONG: " + err);
});