import express from 'express';
import mongoose from 'mongoose';
import { Schema } from './Models/Schema.js';
import path from 'path';
import multer from 'multer';
// 6to13 from cloudinary
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'diwwlk3bl',
    api_key: '722628596564737',
    api_secret: 'epOpsyrT5jXre07f3gyvKfBiEw0' // Click 'View API Keys' above to copy your API secret
});

const app = express();
app.use(express.urlencoded({ extended: true }))

// from multer 18 to 25 line code 
const storage = multer.diskStorage({
    destination: "./public/uploads1",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


mongoose.connect("mongodb+srv://mdirshadcse2022:eGiVn38amsvq1kDH@cluster0.aa1fx.mongodb.net/", {
    "dbName": "test4_p"
}).then(() => console.log("Connected")).catch((err) => console.log(err))

// show login page
app.get("/", (req, res) => {
    res.render("Login.ejs")
})

// create account
app.post("/register", upload.single('file'), async (req, res) => {
    const file = req.file.path
    const { name, email, password } = req.body

    try {
        const cloudinaryR = await cloudinary.uploader.upload(file, {
            folder: 'my_folder'
        })

        let user = await Schema.create({
            imgURL: cloudinaryR.secure_url,
            name,
            email,
            password,
        });

        res.redirect("/");
        console.log(cloudinaryR, name, email, password)
    } catch (error) {
        res.send("Error ")
    }
})

// show registration page
app.get("/register", (req, res) => {
    res.render("Register.ejs")
})

// login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        let userP = await Schema.findOne({ email })
        console.log("getting user", userP)
        if (!userP) res.render("login.ejs");
        else if (userP.password != password) {
            res.render("Login.ejs");
        } else {
            res.render("Profile.ejs",{userP});
        }
    } catch (error) {
        res.send("Error Accure");
    }
})

// all users
app.get("/Users", async (req, res) => {
    let userss = await Schema.find();
    res.render("Users.ejs",{userss})
  });


app.listen(2000, () => console.log("ji sir"))

// multer in node.js,cloudinary,mongodb atlas,boostrap,mongodb compas