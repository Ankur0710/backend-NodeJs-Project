const express = require('express');
const path = require('path');
require("./db/conn");
const User = require("./models/user");
const Sign = require("./models/signup");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000

const static_path = path.join(__dirname, "../public");
const templatespath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

// This is the middleware
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", templatespath);
hbs.registerPartials(partialspath);



app.get('/', (req, res) => {
res.render("sign");
});
app.get('/logins', (req, res) => {
res.render("logins");
});
app.get('/index', (req, res) => {
res.render("index");
});
app.get('/contact', (req, res) => {
res.render("contact");
});
app.get('/about', (req, res) => {
res.render("about");
});
app.get('/plans', (req, res) => {
res.render("plans");
});
app.get('/gallery', (req, res) => {
res.render("gallery");
});
app.get('/logout', async (req, res) => {
try {
// console.log("Logout Successfully")
res.status(201).render("lo")
} catch (error) {
res.status(500).send(error);
}
});

app.post("/contact", async (req, res) => {
try {
// res.send(req.body);
const userData = new User(req.body);
await userData.save();
res.status(201).render("index");
} catch (error) {
res.status(500).send(error)
}
})

app.post("/sign", async (req, res) => {
try {
const password = req.body.password;
const cpassword = req.body.confirmpassword;
if (password === cpassword) {

const signData = new Sign(req.body);
await signData.save();
res.status(201).render("logins");
}
else {
res.send("You entered the wrong password ! please try again letter")
}
} catch (error) {
res.status(500).send(error)
}
})

app.post('/logins', async (req, res) => {
try {
const userid = req.body.userid;
const password = req.body.password;

const usersid = await Sign.findOne({ userid: userid });

if (usersid.password === password) {
res.status(201).render("index");
}
else {
res.send("Password are not Matching")
}

} catch (error) {
res.status(400).send("invalid Username and password")
}
});

app.listen(port, () => {
console.log(`Server is running very well ${port}`)
})
