//create mongo connection
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

//import schema
const { user } = require("../mongoose_schema/userSchema.js");

//create a base array
start = [{ name: "joe", id: "21", grade: 90 },
{ name: "jian", id: "22", grade: 92 },
{ name: "chris", id: "23", grade: 90 },
{ name: "sai", id: "24", grade: 95 },
{ name: "andrew", id: "25", grade: 100 },
{ name: "lynn", id: "26", grade: 90 },
{ name: "robert", id: "27", grade: 85 }]

//async function 
async function seed() {
    try {
        //add all to db
        for (i of start) {
            new_user = new user(i);
            await new_user.save();
        }
        //if successful, resolve promise
        return Promise.resolve();
    }
    //else reject promise
    catch (e) {
        return Promise.reject();
    }
}
seed()
    //if successful, print success
    .then(() => {
        mongoose.disconnect("mongodb://localhost:27017/CRUD");
        console.log("Database has been successfully seeded");
    })
    //else print faillure
    .catch(() => {
        mongoose.disconnect("mongodb://localhost:27017/CRUD");
        console.log("An error occured");
    })

