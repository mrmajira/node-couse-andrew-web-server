const   express =   require("express"),
        hbs     =   require("hbs"),
        fs     =   require("fs");

let app = express();




hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine',"hbs");

app.use((req,res,next)=>{
    let now = new Date().toString();
    let log=`${now}: ${req.method} ${req.url}`;


    fs.appendFileSync("server-logs.txt",log+"\n");
    console.log(log);
    next();
});

// MAINTAINANCE STOP SERVER
// app.use((req,res,next)=>{
//     res.render("maintainance");
//     // next();
// });

app.use(express.static(__dirname+'/public'));



hbs.registerHelper("getCurrentYear",()=>{
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt",(str)=>{
    return str.toUpperCase();
});

app.get("/",(req,res)=>{
    // console.log(req);
    

    message="hey fellas";
    res.render("index.hbs",{
         message
    });

        // res.send({
        //     message:"res.send message",
        //     name:"mister",
        //     likes:[
        //         "good food",
        //         "csgo",
        //         "anime"
        //     ]
        // });
});

app.get("/about",(req,res)=>{
    // res.send("<h2>this is about us</h2>");
    let header="About";
    res.render("about.hbs",{
        header, 
    });
});


app.get("/*",(req,res)=>{
    // res.send("404 BAD REQUEST nonono");
    res.send({
        errorMessage:"page not found"
    });
})
app.listen(3000,()=>{
    console.log("Server listening on port: 3000");
    
});
