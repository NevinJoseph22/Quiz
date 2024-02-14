import admin_model from "../models/admin_model.js";
import question_model from "../models/question_model.js";
let currentAdmin
let all_questions = []
let ansarray = []

export const postSignup = async (req, res) => {
    const { email, password } = req.body
    const admin = new admin_model({
        email,
        password
    })
    const adminCheck = await admin_model.findOne({ email })

    if (adminCheck == null) {
        admin.save()
        res.redirect("/admin/login")
    }
    else {
        res.render("signup", { msg: "admin exist" })
    }
}

export const postLogin = async (req, res) => {
    const { email, password } = req.body
    const checkAdmin = await admin_model.findOne({ email })
    console.log("admin", checkAdmin);
    if (checkAdmin != null) {
        if (checkAdmin.password != password) {
            res.render("login", { msg: "Incorrect password" })
        }
        else {
            process.env.IsAdmin = true
            // console.log(process.env.IsAdmin);
            currentAdmin = checkAdmin
            res.redirect("/admin/")

        }
    }
    else
        res.render("login", { msg: "Invalid admin" })
}

export const UpdatePasswordform = (req, res) => {
    res.render("update")
}
export const UpdatePassword = async (req, res) => {
    const { email, password } = req.body
    const admin = await admin_model.findOne({ email })
    if (admin != null) {
        await admin_model.findByIdAndUpdate(admin._id, { $set: { password } })
        res.redirect("/admin/login")
    }
    else
        res.render("login", { msg: "Check email" })

}

export const getHome = (req, res) => {
    res.render("home")
}

export const getSignup = (req, res) => {
    res.render("signup")
}

export const getLogin = (req, res) => {
    res.render("login")
}

export const deleteadmin = async (req, res) => {
    await admin_model.findByIdAndDelete(currentAdmin._id)
    res.redirect("/admin/signup")
}

export const getQuiz = (req, res) => {

    res.render("adding")
}

export const postQuiz = async (req, res) => {
    const { question, option1, option2, option3, option4, answer } = req.body
    const enter = new question_model({
        question,
        option1,
        option2,
        option3,
        option4,
        answer
    })
    await enter.save()
    res.send("question added")
}


export const view = async (req, res) => {
    const collection = await question_model.find().lean({})
    //console.log(collection);
    res.render("view", { collection })
}

export const del = async (req, res) => {
    try {
        await question_model.findByIdAndDelete(req.params.id);
        res.redirect("/admin/view");
    } catch (err) {
        res.status(500).send('Error deleting collection');
    }
}

export const postEdit = async (req, res) => {
    try {
        await question_model.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/admin/view");
    } catch (err) {
        res.status(500).send('Error editing collection');
    }
}
export const getEdit = async (req, res) => {
    try {
        const collection = await question_model.findById(req.params.id).lean({})
        res.render("edit", { collection })
    } catch (err) {
        res.status(500).send('Error editing collection');
    }
}

export const getSubmit = async (req, res) => {
    let randomIndex
    try {
        if (all_questions.length == 0) {
            all_questions = await question_model.find().lean({})//to store the db to an array
        }
        if (ansarray.length < 5) {
            let array = []
            randomIndex = Math.floor(Math.random() * all_questions.length)
            console.log(randomIndex);   //randomly invoking an array index
            array.push(all_questions[randomIndex])
            console.log(all_questions[randomIndex]);
            all_questions.splice(randomIndex, 1)

            res.render("submit", { data: array[0] })

        }
        else {
            let result = ansarray.reduce((sum = 0, item) => {
                return sum += item
            })
            ansarray = []
            res.render("result", { result })
        }


    } catch (err) {
        console.log(err);
        res.status(500).send('Invalid');
    }
}
export const postSubmit = (req, res) => {
    console.log(req.body);
    req.body.question === req.body.answer ? ansarray.push(1) : ansarray.push(0)
    console.log("ans", ansarray);
    res.redirect("/admin/submit")


}

export const getStart = (req, res) => {
    res.render("quiz_intro",)

}