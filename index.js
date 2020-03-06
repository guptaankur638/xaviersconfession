const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const ejs = require('ejs');

const currentDate = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


mongoose.connect('mongodb+srv://guptaankur638:Ankur123@xaviersconfession-tdpxh.gcp.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });
// mongodb://localhost:27017/myapp
// mongodb + srv://xaviersconfession-tdpxh.gcp.mongodb.net/test


const PostSchema = {
    name: String,
    message: String,
    instaid: String,
    dateData: String
}
const Post = mongoose.model("Post", PostSchema);
let day = currentDate.getDate();

app.get("/", function (req, res) {
    Post.find({}, function (err, foundPost) {
        res.render("home", { postBody: foundPost });
    });

});
app.get("/post", function (req, res) {

    res.render("post");

});

app.post("/post", function (req, res) {
    const post = new Post({
        name: req.body.postName,
        message: req.body.postMessage,
        instaid: req.body.instaid,
        dateData: day

    });

    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
2
});

app.listen(3000);