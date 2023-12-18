const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const { Redirect } = require("react-router");
var qs = require('qs');
const app = express();
const crypter = require('bcrypt');
app.use(express.json());
app.use(cors());
const jwt = require('jsonwebtoken')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "home"

});
const secondDb = mysql.createConnection({
    host :"localhost",
    user:"root",
    password:"root",
    database:"inventory&orders"
})
db.connect(function (err) {
    if (err) throw err;
    console.log("MY SQL First Connection Established");
})
secondDb.connect(function (err){
    if(err) throw err;
    console.log("My SQL second connection established");
})
 app.get("/data",(req,res)=>{
    db.query("SELECT * FROM inventory",(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            // console.log(result);
            res.send(result);
            
        }
    })
 })
 app.get("/Groceries",(req,res)=>{
    var Category = "Groceries";
    db.query("SELECT * FROM inventory where Category=?",[Category],(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            // console.log(result);
            res.send(result);
            
        }
    })
 })
 app.get("/Food",(req,res)=>{
    var Category = "Food";
    db.query("SELECT * FROM inventory where Category=?",[Category],(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            // console.log(result);
            res.send(result);
            
        }
    })
 })
app.get("/ProductNo/:id",(req,res)=>{
    const id = req.params.id;
    db.query("Select * from inventory where id=?",[id],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            // console.log(result);
            res.send(result);
        }
    })
})
app.get("/Stock&Inventory/Inventory",(req,res)=>{
    db.query("Select id,title,price,Stock,Category from inventory",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
})
app.get("/DashDetails/MaxCount",(req,res)=>{
    // const limit = req.body.params;
    var responser=[];
    // db.query("Select stock,title,id from inventory order by Stock asc Limit ? ; ",[limit],(err,result)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //       //  console.log(result);
    //         res.send(result);
    //     }
    // })
    db.query("Select stock,title,id,image from inventory where Stock= (Select min(Stock) from inventory) ; ",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
          //  console.log(result);
            res.send(result);
        }
    })
    
})

app.get("/OrderStatus",(req,res)=>{
    db.query("Select image,title,price,DeliveryStatus,Address,id_Orders from inventory right join orders on orders.item_id = inventory.id",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            // console.log(result);
            res.send(result);
        }
    })
})
app.get("/DashDetails/Orders",(req,res)=>{
    db.query("Select Count(id_Orders) as totalOrders, Sum(Cost+ShippingPrice) as TotalDayEarnings ,OrderDate as OnDay from orders group by OrderDate",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            // console.log(result);
            res.send(result);
        }
    })
})
app.post("/DelStatus", (req, res) => {
    const Status = req.body.DeliveryStatus;
    const order = req.body.order;
    db.query("Update orders Set DeliveryStatus =? Where id_Orders=? ",[Status,order],
        (err, result) => {
            if(err){

                console.log(err);
                var data = JSON.parse(JSON.stringify(err))
                res.send(data);
            }
            else{
                res.send("Okay");
            }

        }
    );

})
app.post("/Signup/Seller", (req, res) => {
    const name = req.body.name;
    const email = req.body.Email;
    const phone = req.body.phone;
    const category = req.body.category;
    const image = req.body.image;
    const Title = req.body.title;
    const password = req.body.password;
    var role ="Seller";
    db.query("INSERT INTO user (name,email,password,phone,role) VALUES (?,?,?,?,?)",
        [name, email, password, phone,role],
        (err, result) => {
            if(err){

                console.log(err);
                var data = JSON.parse(JSON.stringify(err))
                res.send(data);
            }
            else{
                res.send("Okay");
            }

        }
    );

})
app.post("/Signup", (req, res) => {
    const name = req.body.name;
    const email = req.body.Email;
    const phone = req.body.phone;
    const password = req.body.password;
    var role;
    var x = name.substring(0,3);
    console.log(x);
    if(name.substring(0,3)==='@ad'){
        role = "admin";
    }
    else if(name.substring(0,3)==='@sel'){
        role="seller";
    }
    else{
        role="user";
    }
    var updatedname= name.substring(4,name.length);
    console.log(updatedname,email,password,phone,role);
    db.query("INSERT INTO user (name,email,password,phone,role) VALUES (?,?,?,?,?)",
        [updatedname, email, password, phone,role],
        (err, result) => {
            if(err){

                console.log(err);
                var data = JSON.parse(JSON.stringify(err))
                res.send(data);
            }
            else{
                res.send("Okay");
            }

        }
    );

})
app.get("/ProfileEdit/:username",(req,res)=>{
    const name = req.params.username;
    //console.log(name);
    // db.query("SELECT mobile FROM addresses WHERE name=?", [name],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         if (result.length > 0) {
    //             setOutput(result);
    //          // console.log(result[0]);
    //         }
    //     })
    // const setOutput = (rows) => {
       // var mob = rows[0].mobile;
        //console.log(mob);
        db.query("SELECT email,phone FROM user where name=? ", [name], (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result.length > 0) {

                console.log(result);
                res.send(result);
            }
        });
    //}
})
app.post("/ForgotPassword",(req,res)=>{
    const phone = req.body.phone;
    var Verres = "true";
    const verificationString = req.body.verifier;
    console.log(verificationString);
    const Verifier=(e)=>{
        const backverify =e[0].name;
        const verify2 = e[0].email;
        console.log(backverify);
        console.log(verify2);
        const VerStr = backverify[0]+backverify[1]+verify2[0]+verify2[1];
         if(VerStr.toUpperCase()===verificationString.toUpperCase()){
            Verres = "true";
         }
         else{
            Verres = "false";
         }
         console.log(Verres);
         if(Verres == "true"){
            res.send("Ok");
        }
        else{
            res.send("NO");
        }
    }
    db.query("SELECT name,email from user where phone=?",[phone],(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            Verifier(result);
            console.log(result);
        }
    })
    
    
})
app.get("/Addressdef/:name", (req, res) => {
    const name = req.params.name;
    //console.log(name);
    db.query("SELECT mobile FROM addresses WHERE name=?", [name],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                setOutput(result);
                //   console.log(result[0]);
            }
        })
    const setOutput = (rows) => {
        var mob = rows[0].mobile;
        console.log(mob);
        db.query("SELECT name,secmob,flatno,area,city,state,country,defaults FROM addresses where mobile=? and defaults=1 ", [mob], (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result.length > 0) {

                console.log(result);
                res.send(result);
            }
        });
    }
});
let normalObj;
app.get("/Address/:name", (req, res) => {
    const name = req.params.name;
    // console.log(name);
    db.query("SELECT mobile FROM addresses WHERE name=?", [name],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                setOutput(result);
                //   console.log(result[0]);
            }
        })
    const setOutput = (rows) => {
        var mob = rows[0].mobile;
        // console.log(mob);
        db.query("SELECT name,secmob,flatno,area,city,state,country,defaults FROM addresses where mobile=? ", [mob], (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result.length > 0) {

                // console.log(result);
                res.send(result);
            }
        });
    }
});
app.get("/getorders/:name",(req,res)=>{
    const name = req.params.name;
    var data;
    // console.log("orders hit with ",name);
    db.query("SELECT mobile FROM addresses WHERE name=?", [name],
    (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            // console.log("Second fucntion called");
            setOp(result);
            //   console.log(result[0]);
        }
    })
    const setOp=(rows)=>{
        var p = rows[0].mobile;
        // console.log(p);
        db.query("SELECT id_Orders,Address,OrderDate,title,text,image,DeliveryStatus,Cost as price,Stock FROM home.orders left join inventory on item_id = id where mobile= ?",[p],(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                // console.log("orders list");
                // console.log(result);
                // data = result.data;
                res.send(result);
            }
        })
    }
    // console.log(data);
})
var finalresult=0;
var intermeditatecheck =0;
app.post("/checkoutinfo/:name",(req,res)=>{
    const name = req.params.name;
    const billingaddress = req.body.billing;
    const shippingcharges = req.body.shipping;
    const itemquantity = req.body.itemquant;
    const itemids = req.body.individualitems;
    const prices = req.body.separateprices;
    const status = req.body.DeliveryStatus;
    const date = req.body.date;
    var pricestobeEntered =JSON.parse(prices);
    var item = JSON.parse(itemids);
    var quants = JSON.parse(itemquantity);
    // console.log(pricestobeEntered.length);
    db.query("SELECT mobile FROM addresses WHERE name=?", [name],
    (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            console.log("Second fucntion called");
            setOutput(result);
            //   console.log(result[0]);
        }
    })
   
const setOutput = (rows) => {
    console.log("In the second function");
    var p = rows[0].mobile;
    // console.log(pricestobeEntered);
    for (let i = 0; i < pricestobeEntered.length; i++) {
         intermeditatecheck =0;
        console.log("Looped for ",i,"times");
        // console.log(i);
        if(i===0){
            db.query("INSERT into orders (item_id,Address,Quantity,DeliveryStatus,mobile,Cost,OrderDate,ShippingPrice) VALUES (?,?,?,?,?,?,?,?)",[parseInt(item[i]),billingaddress,parseInt(quants[i]),status,p,parseInt(pricestobeEntered[i]),date,shippingcharges],(err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(result);
                    
                }
            })       
        }
        else{
            db.query("INSERT into orders (item_id,Address,Quantity,DeliveryStatus,mobile,Cost,OrderDate,ShippingPrice) VALUES (?,?,?,?,?,?,?,?)",[parseInt(item[i]),billingaddress,parseInt(quants[i]),status,p,parseInt(pricestobeEntered[i]),date,0],(err,result)=>{
                if(err){
                    console.log(err);
                }
                else{                    
                }
            })
        }
        secondDb.query("UPDATE inventory SET stock=stock-? where id=? AND stock>0",[parseInt(quants[i]),item[i]],(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                
             //   console.log("Intermediate value is",intermeditatecheck);
            }
    })       
    }
    
    console.log("Value of final result is ",finalresult);
}
    res.send("Okay");
    // console.log("name of user is "+name+"address is "+billingaddress+"shipping charges are"+shippingcharges+"no of items are"+itemquantity+"item ids are"+itemids+"prices are"+prices+"Delivery status is "+status+"Order Date is "+date);
})
app.post("/paymentInfo/:names",(req,res)=>{
    const cardno = req.body.cardnumber;
    const cvno = req.body.cvv;
    const name = req.params.names;
    const payment = req.body.paymentType;
    console.log(name);
    console.log(payment);
    // console.log(cardno);
    // console.log(cvno);
    if(cvno.length>0 && cardno.length>0){
        db.query("Select phone from user where name=? ",[name],(err,result)=>{
            if(err){
                console.log(err);
            }
            else if(result.length>0){
                console.log(result);
                setOp(result);
            }
        })
        var final;
        const setOp=(rows)=>{
            const p = rows[0].phone;
            db.query("Insert into paymentinfo (CardNo,CVV,PaymentType,mobile) Values(?,?,?,?)",[cardno,cvno,payment,p],(err,result)=>{
                if(err){
                    console.log(err);
                }
                else if(result.length>0){
                    console.log(result);
                    final = "Okay";                    
                }
            })
            res.send(final);
        }
    }
})
app.get("/getPaymentInfo/:name",(req,res)=>{
    const h= req.params.name;
    var r;
    db.query("SELECT phone FROM user WHERE name=?", [h],
    (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            console.log(result);
            setO(result);
        }
    })
    const setO = (rows) => {
        var i = rows[0].phone;
        db.query("SELECT DISTINCT PaymentType,CardNo FROM paymentinfo WHERE mobile=?",[i],(err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                   res.send(result);
                }
            });
    }
   
})
app.post("/NewAddress/:profname", (req, res) => {
    const profile = req.params.profname;
    const name = req.body.name;
    db.query("SELECT phone FROM user WHERE name=?", [profile],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                setOutput(result);
            }
        })
    const flat = req.body.flat;
    const area = req.body.Area;
    const city = req.body.city;
    const state = req.body.State;
    const country = req.body.Country;
    const pincode = req.body.pincode;
    const landmark = req.body.landmark;
    const secphone = req.body.phone;
    const checked = req.body.checked;
    const setOutput = (rows) => {
        normalObj = rows[0].phone;
        const def = JSON.stringify(checked);
        console.log(normalObj);
        console.log(state);
        console.log(checked);
        db.query("INSERT INTO addresses (country,state,name,secmob,mobile,pincode,flatno,area,landmark,city,defaults) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [country, state, name, secphone, normalObj, pincode, flat, area, landmark, city, checked],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var data = JSON.parse(JSON.stringify(err))
                    res.send(data);
                    console.log("success");
                    console.log(data);
                }
            });
    }
    //console.log(normalObj);
})
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send("You dont have a token")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Failed to auth" });
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}
app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("You are okay")
})
app.post("/Login", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    console.log(phoneNumber);
    db.query("SELECT * FROM user WHERE phone = ?",
        [phoneNumber],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }

            if (result.length > 0) {
                console.log(result);
                if (result[0].password === password) {
                    const name = result[0].name;
                    const token = jwt.sign({ name }, "jwtSecret", {
                        expiresIn: 600,
                    })

                    res.json({ auth: true, token: token, result: result });
                }
                else {
                    res.send({ auth: false, message: "Wrong Username Passwrod Combo" });
                }

            } else {
                //res.send("Invalid")
                res.json({ auth: false, message: "User doesn't exist" });
            }

        }
    );
})
const port = process.env.PORT || 3001;
const dotenv = require('dotenv');
dotenv.config();
app.listen(port, () => {
    console.log("server running on port",port);
});






























// const phone = req.body.phoneNumber;
// const accountSid = 'AC339fdd24488ea69f6174534756737a23';
// const authToken = 'ede980f61577ec6d4c28317f3f1c5380';
// const client = require('twilio')(accountSid, authToken);
// var otp= '11223';
// client.messages
//  .create({
//      body: `Hello this is the OTP ,${otp}`,
//      from: '+12177278624',
//      to: `+91,${phone}`
//  })
//  .then(message => console.log(message.sid));
// const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/ProdData', 
//         {useNewUrlParser: true, 
//         useUnifiedTopology: true, 
//         useCreateIndex:true
//         });
// var conn = mongoose.connection;
// conn.on('connected', function() {
//     console.log('Mongo database is connected successfully');
// });
// conn.on('disconnected',function(){
//     console.log('database is disconnected successfully');
// })
// conn.on('error', console.error.bind(console, 'connection error:'));
// const dataschema =new mongoose.Schema(
//     { 
//         image:String,
//         title:String,
//         text:String,
//         price:Number,
//         Stock:Number    
//        },
//        {
//         collection:'Data',
//        },
// );

// const Users = mongoose.model('User', dataschema); 
// app.get("/fetchall",async (req,res)=>{
//     try {
//         const a = await Users.find();
//         res.json(a);
//         console.log(a);
//       } catch (err) {
//         console.log(err);
//       }  
// })

