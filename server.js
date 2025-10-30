// jani ye basic imports hn express ko is app ma use krney k liye 
import express from "express";

//gettign the connection from config file to cnnect to the database
import connectToMyDatabase from "./config/configdb.js"
import gameRoute from "./routes/game.js"
import authRouter from "./routes/auth.route.js"
// body aprser aik middleware ha
// that is used to parse the incomming 
// request body, aur ye bodyParser
// express sy hi a rha ha
import bodyParser from "body-parser";
import dotenv from "dotenv";
// jani ab user route ko le atey hn main file ma
// jani ager koi bhi file import kr rheyy hona in es6 modules
// make sure to put .js extension or whatever the extension is
// to make it available inside any file
// ❌ import userRoutes from './routes/user';
// ✅ import userRoutes from './routes/user.js';
import userRoute from "./routes/user.js"
import morgan from "morgan";


// jani loading the env variables
dotenv.config();
connectToMyDatabase();
// to sue express in this app jani 
const app = express();

// morgan
app.use(morgan("dev"))

// apun ki port 
const port = process.env.PORT || 5000; // ADDED: fallback port if env variable not set

// body parser use krtey huwe
// aur ham specify kr rhey hn 
// k json data hi used hoga hmari
// app ma
// app.use() mounts a rounter or middlewares 
app.use(bodyParser.json());

// ab server ko btatay hn k ager koi ye 
// route search kreyga to ye dena ha response
// express will join all routes of user.js
// inside /gameUsers

// user routes
app.use('/gameUsers',userRoute)
// game routes
app.use('/games', gameRoute)
// register game User ROute
app.use('/register',authRouter)



// making routes so we can see smthing on 
// http://localhost:5000/
// ab hm bna rhey hn k home route pr jab bhi koi bhi
// request aye to ye krna ha 

app.get('/', (req,res)=>{
    console.log("on Main Route Fixing CannotGet at http://localhost:5000");
    res.send("Welcome to the home of Express()")
})


// ===================================================================== 
// ager hm abhi ye url pass karein browser pr 
// http://localhost:5000/
// to humein ye show hoga 
// Cannot GET /
// kui k is specific url pr hum ne 
// koi route bnaya hi ni huwa
// and nodejs and express js is all
// about routing

// we can define the api routes for our application
// using app.get()
// app.post()
// app.put()
// app.delete()
// inside index.js or server.js
// ====================================================================

// server 
// listen is a method which is used for
// listening the incomming requests
// ye method do chezein accept krta ha 
// aik port number jis pr hm requests
// listen kr rhey hn client side sy
// aur dusra ye aik callback function
// trigger kr rha ha jab hmara server set hoga !

app.listen(port, ()=> {
    console.log(`server zinda hogya ha aur iski port number ha : ${port}`);

})


// some important info

// res.send('Hello') → send text or data

// res.json({ msg: 'ok' }) → send JSON data

// res.status(404).send('Not Found') → send custom status

// res.redirect('/login') → redirect user

// and ----> / means the home route 

// uuid is needed because when we need to update delete the user by id request so it 
// is needed to generate the unique ids for each user we will be creating