import express from "express"
import dotenv from "dotenv"
import path,{dirname} from "path"
import { fileURLToPath } from "url"
import { engine } from "express-handlebars"
import bodyParser from "body-parser"
import {DB} from "./Db/connections.js"
import admin_router from "./routers/admin_router.js"

const app = express()
dotenv.config()

const __dirname= dirname(fileURLToPath(import.meta.url))

//configuring hbs
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")
app.engine("hbs", engine({ extname: "hbs", defaultLayout: "mainLayout", layoutsDir: path.join(__dirname, "views") }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/admin", admin_router)

DB()
//server creation
app.listen(process.env.PORT, (err) => {
    if (err)
        console.log("error occured");
    else
        console.log(`server runing on port ${process.env.PORT} `);
})




