import express from "express"
import {postLogin,getHome, postSignup,getSignup,UpdatePasswordform,UpdatePassword,getLogin,getEdit,deleteadmin,postQuiz,getQuiz, del, view, postEdit, getSubmit, postSubmit, getStart} from "../controllers/admin_controller.js"
const admin_router= express.Router()

const middleware=(req,res,next)=>{
     if(process.env.IsAdmin)
        next()
     else
        console.log("NOT AUTHORITATIVE TO ACCESS THIS PAGE");
    
}



admin_router.get("/",getHome)
admin_router.post("/signup", postSignup)
admin_router.get("/signup",getSignup)
admin_router.get("/login",getLogin)
admin_router.post("/login", postLogin)
admin_router.get("/forgot",UpdatePasswordform)
admin_router.post("/forgot",UpdatePassword)
admin_router.get("/delete",deleteadmin)
admin_router.get("/quiz",middleware,getQuiz)
admin_router.post("/quiz",postQuiz)
admin_router.get("/view",view)
admin_router.get("/delete/:id",del)
admin_router.get("/edit/:id",getEdit)
admin_router.post("/edit/:id",postEdit)
admin_router.get("/submit",getSubmit)
admin_router.post("/submit",postSubmit)
admin_router.get("/start",getStart)

export default admin_router