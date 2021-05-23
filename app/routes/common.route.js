const {userCont,courseCont} = require('../controllers');
const {signupHelpers} = require('../middlewares');
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    app.get('/logout',(req,res)=>{
        console.log(req.session.isLoggedIn);
    if (req.session.isLoggedIn) {
        req.session.destroy(() => {
          res.render('login')
        });
       
      }
      else {
        res.status(404).end();
      }
    });

    app.get("/api/user/getAllStudents",[signupHelpers.checkLogin],[userCont.getAllStudents]);
    app.get("/api/user/getAllInstructors",[signupHelpers.checkLogin],[userCont.getAllInstructors]);
    app.get("/api/course/getAllCourses",[signupHelpers.checkLogin],[courseCont.getAllCourses]);
    

}