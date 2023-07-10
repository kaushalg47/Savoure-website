const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require("express-session");
const{v4:uuidv4}=require("uuid");

const router=require

const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.get('/', (req, res)=>{

    res.render("home");
})
app.get('/register', (req, res)=>{

    res.render("register");
})
app.get('/recipe', (req, res)=>{

    res.render("recipe");
})
app.get('/login', (req, res)=>{

    res.render("login");
})
app.get('/create', (req, res)=>{

    res.render("create");
})




mongoose.connect('mongodb+srv://vishwajeettiwari2003:qbGI7RAikkaFtZ8Y@cluster0.mj2hk8s.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("database connected"));

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

const User = mongoose.model('user', userSchema);


app.post('/', (req, res)=>{
    const username = req.body.username;
   const password = req.body.password;
   const newUser = new User({
       username, password
     })
     newUser.save().then(()=>{
         res.redirect('/')
     })
 })
 app.post('/register', (req, res)=>{
    const username = req.body.username;
   const password = req.body.password;
   const newUser = new User({
       username, password
     })
     newUser.save().then(()=>{
         res.redirect('/login')
     })
 })

 const blogSchema = mongoose.Schema({
    title: String,
    content: String
})
const Blog = mongoose.model('blog', blogSchema);

 app.post('/create', (req, res)=>{
    const title = req.body.title;
   const content = req.body.content;
   const newBlog = new Blog({
       title, content
     })
     newBlog.save().then(()=>{
        console.log('bolg created');
    })
 })

 app.use('/route', router );



app.listen(PORT, ()=>{
    console.log('Port is running on http://localhost:3000');
})

