const express = require('express');
const dbConfig = require('./app/config/db.config')
const db = require('./app/models');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const expSession = require('express-session');
const axios = require('axios');
const { response } = require('express');
const path = require('path');
const con = require('consolidate');
const {signupHelpers} = require('./app/middlewares')
const User = db.user;
// mongodb connection
db.mongoose.connect(`mongodb+srv://Shahzaib-Dev:User0007@cluster0.p7tdz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`successfuly connected to ${dbConfig.DB}`)
}).catch((err)=>{
    console.log(`Connection error : ${err}`)
    process.exit()
})

app.engine('html', con.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

// cors setup
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



// session setup
app.use(expSession({
    name:'EMS-session',
    secret:`my-secret-session`,
    resave:true,
    saveUninitialized:true,
    cookie:{}
}))

// create an admin 
const createAdmin=()=>{
    User.findOne({email:"admin"})
    .exec((err,user)=>{
        if(err){
            return err;
        }
        if(user){ 
            console.log("admin exists");
        }
        else{
            const user = new User({
                email:"admin",
                role:"admin",
                password:"admin"
            })
            user.save((err,user)=>{
                if(err){
                    res.status(500).send({message:err})
                }
                 console.log("Admin inserted successfully!")
             })
        }
    })
    
    
}
createAdmin();
// routes
require('./app/routes/common.route')(app);
require('./app/routes/user.route')(app);
require('./app/routes/course.route')(app);

app.get('/',(req,res)=>{
    res.render('login');
})
app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.get("/instructor-homepage",[signupHelpers.checkLogin],(req,res)=>{
    res.render('instructor-homepage');
})
app.get("/student-homepage",[signupHelpers.checkLogin],(req,res)=>{
    res.render('student-homepage');
})
app.get("/admin-dashboard",[signupHelpers.checkLogin],(req,res)=>{
    res.render('admin-dashboard');
})



app.get("/add-course",[signupHelpers.checkLogin],(req,res)=>{
    res.render('add-course');
})
app.get("/student-roster",[signupHelpers.checkLogin],(req,res)=>{
    res.render('student-roster');
})
 

// server setup
const PORT= process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})