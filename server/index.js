const express=require('express');
const app=express()
const db=require('./databases/db')
const bodyParser=require('body-parser')
const cors=require('cors')  //cors is work to use soppot live sever 
app.use(bodyParser.urlencoded({extended:true}))  // body parser use to encoded
app.use(cors())
app.use(express.json())  // pars to json

// get userdata api
app.post("/create", (req, res) => {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Password = req.body.Password;
  
    db.query(
      "INSERT INTO user (Name, Email, Password) VALUES (?,?,?)",
      [Name,Email,Password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
  
  app.get("/employees", (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  app.put("/update", (req, res) => {
    const id = req.body.id; 
    const Email=req.body.Email
    db.query(
      "UPDATE user SET Email = ? WHERE id = ?",
      [Email, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM user WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

// losten port app
app.listen(3001,()=>{
    console.log("server start at 3001");
})